import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    serviceInterest: v.optional(v.string()),
    sessionDate: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });

    // Queue confirmation email to user
    await ctx.db.insert("emailQueue", {
      recipient: args.email,
      subject: "Confirmation: Your Consultation Request - CounsellingP2P",
      templateName: "contact_received",
      templateData: {
        name: args.name,
        siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://counsellingp2p.com",
      },
      status: "pending",
      scheduledFor: Date.now(),
      retries: 0,
    });

    // Queue alert email to admin
    const adminEmail = process.env.ADMIN_EMAIL || "kingonuoha01@gmail.com";
    await ctx.db.insert("emailQueue", {
      recipient: adminEmail,
      subject: `New Consultation Request: ${args.name}`,
      templateName: "admin_alert",
      templateData: {
        name: args.name,
        email: args.email,
        phone: args.phone || "Not provided",
        service: args.serviceInterest || "General",
        date: args.sessionDate || "Not specified",
        message: args.message,
      },
      status: "pending",
      scheduledFor: Date.now(),
      retries: 0,
    });

    return submissionId;
  },
});

export const list = query({
  args: {
    status: v.optional(
      v.union(v.literal("new"), v.literal("read"), v.literal("responded")),
    ),
  },
  handler: async (ctx, args) => {
    const q = ctx.db.query("contactSubmissions").withIndex("by_createdAt");

    const results = await q.order("desc").take(100);

    if (args.status) {
      return results.filter((r) => r.status === args.status);
    }
    return results;
  },
});

export const updateStatus = mutation({
  args: {
    id: v.id("contactSubmissions"),
    status: v.union(v.literal("new"), v.literal("read"), v.literal("responded")),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { status: args.status });
  },
});


