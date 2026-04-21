import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    serviceInterest: v.optional(v.string()),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactSubmissions", {
      ...args,
      status: "new",
      createdAt: Date.now(),
    });
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


