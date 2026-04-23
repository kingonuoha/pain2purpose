import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listActive = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("testimonials")
      .withIndex("by_active", (q) => q.eq("isActive", true))
      .order("desc")
      .collect();
  },
});

export const listAll = query({
    handler: async (ctx) => {
      return await ctx.db.query("testimonials").order("desc").collect();
    },
});

export const toggleActive = mutation({
  args: { id: v.id("testimonials"), isActive: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { isActive: args.isActive });
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    content: v.string(),
    rating: v.number(),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("testimonials", {
      ...args,
      isActive: true,
      createdAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("testimonials"),
    name: v.optional(v.string()),
    role: v.optional(v.string()),
    content: v.optional(v.string()),
    rating: v.optional(v.number()),
    avatar: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args;
    await ctx.db.patch(id, fields);
  },
});

export const remove = mutation({
    args: { id: v.id("testimonials") },
    handler: async (ctx, args) => {
      await ctx.db.delete(args.id);
    },
});
