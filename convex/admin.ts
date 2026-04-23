import { query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get overall dashboard statistics for the admin overview.
 */
/**
 * Get overall dashboard statistics for the admin overview.
 * Uses the pre-calculated globalStats counter document to prevent full table scans.
 */
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const stats = await ctx.db.query("globalStats").first();
    const testimonialCount = await ctx.db.query("testimonials").collect();
    
    if (!stats) {
      return {
        articles: { total: 0, published: 0, draft: 0, scheduled: 0, aiDrafts: 0 },
        usersCount: 0,
        totalViews: 0,
        totalUniqueViews: 0,
        totalReach: 0,
        pendingCommentsCount: 0,
        testimonialCount: testimonialCount.length,
      };
    }

    return {
      articles: {
        total: stats.articleCount,
        published: stats.publishedArticleCount,
        draft: stats.draftArticleCount,
        scheduled: stats.scheduledArticleCount,
        aiDrafts: stats.aiDraftCount,
      },
      usersCount: stats.usersCount,
      totalViews: stats.totalViews,
      totalUniqueViews: stats.totalUniqueViews,
      totalReach: 0, // visitorTracking is too large to .collect(), needs a counter
      pendingCommentsCount: stats.pendingCommentsCount,
      testimonialCount: testimonialCount.length,
    };
  },
});

/**
 * Get recent activity feed for the admin dashboard.
 */
export const getRecentActivity = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 10;

    // 1. Recent comments
    const recentComments = await ctx.db
      .query("comments")
      .order("desc")
      .take(limit);

    // 2. Recent users (signups)
    const recentUsers = await ctx.db.query("users").order("desc").take(limit);

    // 3. Recent articles
    const recentArticles = await ctx.db
      .query("articles")
      .order("desc")
      .take(limit);

    // Combine and sort
    const activities = [
      ...recentComments.map((c) => ({
        id: c._id,
        type: "comment",
        content: `New comment on article`,
        timestamp: c.createdAt,
        articleId: c.articleId,
        userId: c.userId,
      })),
      ...recentUsers.map((u) => ({
        id: u._id,
        type: "signup",
        content: `New user: ${u.name}`,
        timestamp: u.createdAt,
      })),
      ...recentArticles.map((a) => ({
        id: a._id,
        type: "article",
        content: `${a.source === "ai" ? "AI" : "Human"} drafted: ${a.title}`,
        timestamp: a.createdAt,
      })),
    ];

    return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, limit);
  },
});


