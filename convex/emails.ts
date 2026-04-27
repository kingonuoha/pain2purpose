import { v } from "convex/values";
import {
  mutation,
  query,
  internalMutation,
  internalQuery,
} from "./_generated/server";

export const addToQueue = mutation({
  args: {
    recipient: v.string(),
    subject: v.string(),
    templateName: v.string(),
    templateData: v.any(),
    scheduledFor: v.optional(v.float64()),
  },
  handler: async (ctx, args) => {
    const scheduledFor = args.scheduledFor ?? Date.now();
    return await ctx.db.insert("emailQueue", {
      recipient: args.recipient,
      subject: args.subject,
      templateName: args.templateName,
      templateData: args.templateData,
      status: "pending",
      scheduledFor,
      retries: 0,
    });
  },
});

export const getPendingEmails = internalQuery({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("emailQueue")
      .withIndex("by_status_scheduled", (q) =>
        q.eq("status", "pending").lt("scheduledFor", Date.now()),
      )
      .take(args.limit);
  },
});

export const updateEmailStatus = internalMutation({
  args: {
    id: v.id("emailQueue"),
    status: v.union(
      v.literal("pending"),
      v.literal("sending"),
      v.literal("sent"),
      v.literal("failed"),
    ),
    error: v.optional(v.string()),
    sentAt: v.optional(v.float64()),
    retryIncrement: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const email = await ctx.db.get(args.id);
    if (!email) return;

    const updates: {
      status: "pending" | "sending" | "sent" | "failed";
      error?: string;
      sentAt?: number;
      retries?: number;
    } = {
      status: args.status,
    };

    if (args.error !== undefined) updates.error = args.error;
    if (args.sentAt !== undefined) updates.sentAt = args.sentAt;
    if (args.retryIncrement) updates.retries = email.retries + 1;

    await ctx.db.patch(args.id, updates);
  },
});

export const generateWeeklyNewsletter = internalMutation({
  args: {},
  handler: async (ctx) => {
    // 1. Fetch top 3 articles from past week
    const lastWeek = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const topArticles = await ctx.db
      .query("articles")
      .withIndex("by_publishedAt", (q) => q.gt("publishedAt", lastWeek))
      .order("desc")
      .take(10); // Take 10 then sort by views

    // Convert to array and sort by views
    const articles = [...topArticles].sort((a, b) => b.viewCount - a.viewCount);
    const featured = articles.slice(0, 3);

    if (featured.length === 0) return;

    // 2. Fetch all subscribed users
    const users = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "user"))
      .filter((q) => q.eq(q.field("newsletterSubscribed"), true))
      .collect();

    // 3. Fetch a random quote
    const quotes = await ctx.db.query("quotes").collect();
    const randomQuote =
      quotes.length > 0
        ? quotes[Math.floor(Math.random() * quotes.length)]
        : null;

    // 4. Generate articles HTML
    const articlesHtml = featured
      .map(
        (art) => `
      <div style="margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 20px;">
        <h3 style="margin: 0 0 10px 0; color: #1e293b;">${art.title}</h3>
        <p style="margin: 0 0 15px 0; color: #64748b; font-size: 14px;">${art.excerpt || ""}</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://thePain2Purpose.org"}/${art.slug}" style="color: #0ea5e9; text-decoration: none; font-weight: bold;">Read Article &rarr;</a>
      </div>
    `,
      )
      .join("");

    // 5. Add to queue for each user
    for (const user of users) {
      await ctx.db.insert("emailQueue", {
        recipient: user.email,
        subject: "Your Weekly Pain2Purpose Digest 📰",
        templateName: "newsletter",
        templateData: {
          name: user.name,
          articlesHtml,
          quoteText:
            randomQuote?.text ||
            "The only way to do great work is to love what you do.",
          quoteAuthor: randomQuote?.author || "Steve Jobs",
          siteUrl:
            process.env.NEXT_PUBLIC_SITE_URL || "https://thePain2Purpose.org",
          unsubscribeUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "https://thePain2Purpose.org"}/unsubscribe?email=${encodeURIComponent(user.email)}`,
        },
        status: "pending",
        scheduledFor: Date.now(),
        retries: 0,
      });
    }

    return users.length;
  },
});

import { paginationOptsValidator } from "convex/server";

export const getEmailLogs = query({
  args: {
    paginationOpts: paginationOptsValidator,
    status: v.optional(v.union(v.literal("sent"), v.literal("failed"), v.literal("pending"), v.literal("sending"))),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let q;
    
    if (args.search) {
      q = ctx.db.query("emailQueue")
        .withSearchIndex("search_emails", (q) => {
          const search = q.search("recipient", args.search!);
          return args.status ? search.eq("status", args.status) : search;
        });
    } else if (args.status) {
      q = ctx.db.query("emailQueue").withIndex("by_status", (q) => q.eq("status", args.status!)).order("desc");
    } else {
      q = ctx.db.query("emailQueue").order("desc");
    }

    return await q.paginate(args.paginationOpts);
  },
});

export const getEmailStats = query({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("emailQueue").collect();
    return {
      total: all.length,
      sent: all.filter(e => e.status === "sent").length,
      failed: all.filter(e => e.status === "failed").length,
      pending: all.filter(e => e.status === "pending").length,
    };
  },
});

export const getEmailById = query({
  args: { id: v.id("emailQueue") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const retryEmail = mutation({
  args: { id: v.id("emailQueue") },
  handler: async (ctx, args) => {
    const email = await ctx.db.get(args.id);
    if (!email) throw new Error("Email not found");

    await ctx.db.patch(args.id, {
      status: "pending",
      error: undefined,
      scheduledFor: Date.now(),
    });
  },
});

export const deleteEmail = mutation({
  args: { id: v.id("emailQueue") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

import { renderTemplate } from "./email_templates";

export const renderPreview = query({
  args: { id: v.id("emailQueue") },
  handler: async (ctx, args) => {
    const email = await ctx.db.get(args.id);
    if (!email) return null;
    
    const html = renderTemplate(email.templateName, email.templateData);
    return {
      html,
      templateName: email.templateName,
      subject: email.subject,
    };
  },
});

export const deleteMultiple = mutation({
  args: { ids: v.array(v.id("emailQueue")) },
  handler: async (ctx, args) => {
    for (const id of args.ids) {
      await ctx.db.delete(id);
    }
  },
});

export const deleteAll = mutation({
  args: { confirm: v.boolean() },
  handler: async (ctx, args) => {
    if (!args.confirm) return;
    const all = await ctx.db.query("emailQueue").collect();
    for (const item of all) {
      await ctx.db.delete(item._id);
    }
  },
});


