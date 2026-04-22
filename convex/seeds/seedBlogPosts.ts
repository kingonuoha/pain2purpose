// convex/seeds/seedBlogPosts.ts
//
// WHAT THIS DOES:
// 1. Seeds Pain2Purpose site settings (siteName, contact info, socials)
// 2. Auto-creates any missing categories referenced by posts
// 3. Seeds all 6 blog posts from blog-posts-seed.json
// 4. Updates globalStats to reflect seeded data
//
// PREREQUISITES:
// - At least one admin user must exist in the DB
// - Run once via Convex dashboard: Functions > seeds:seedBlogPosts > Run
//
// SAFE TO RE-RUN:
// - Duplicate slugs are skipped for both categories and posts
// - globalStats is patched, not overwritten
//
// ROLLBACK:
// - Run seeds:rollbackBlogPosts to undo everything this function did

import { mutation } from "../_generated/server";
import { Id } from "../_generated/dataModel";
import blogPostsData from "./data/blog-posts-seed.json";

// ── Category definitions ─────────────────────────────────────────────────────
// These are auto-created if they don't already exist.
// Add more here if needed — slugs must match categorySlug in the JSON.

const CATEGORIES = [
  {
    name: "Mental Wellness",
    slug: "mental-wellness",
    description: "Practical tools and perspectives for everyday emotional health.",
  },
  {
    name: "Healing & Recovery",
    slug: "healing-and-recovery",
    description: "Stories and insights on the journey back to wholeness.",
  },
  {
    name: "Resilience & Growth",
    slug: "resilience-and-growth",
    description: "Building strength, purpose, and forward momentum.",
  },
  {
    name: "Grief & Loss",
    slug: "grief-and-loss",
    description: "Navigating bereavement and finding meaning after loss.",
  },
  {
    name: "Autism & Family",
    slug: "autism-and-family",
    description: "Resources and reflections for families on the spectrum journey.",
  },
  {
    name: "Sandra's Journal",
    slug: "sandras-journal",
    description: "Personal reflections and stories from Sandra Opara.",
  },
];

// ── Main seed mutation ────────────────────────────────────────────────────────

export const seedBlogPosts = mutation({
  handler: async (ctx) => {
    const results = {
      siteSettings: "skipped" as "seeded" | "skipped",
      categoriesCreated: 0,
      categoriesExisted: 0,
      postsSeeded: 0,
      postsSkipped: 0,
      globalStatsUpdated: false,
      errors: [] as string[],
    };

    // ── 1. Seed site settings ──────────────────────────────────────────────
    const existingSettings = await ctx.db.query("siteSettings").first();

    if (!existingSettings) {
      await ctx.db.insert("siteSettings", {
        siteName: "Pain2Purpose Counselling Practice",
        siteDescription:
          "Professional counselling and therapy support with Sandra Opara. From pain to purpose — supporting your journey to healing and growth.",
        email: "",
        phone: "08033444411",
        address: "10 Bishop Okoye Street, Owerri, Imo State, Nigeria",
        socials: {
          facebook: "",
          twitter: "",
          instagram: "",
          youtube: "",
          tiktok: "",
          linkedin: "",
          github: "",
        },
        footerText:
          "© 2025 Pain2Purpose Counselling Practice. All rights reserved.",
        updatedAt: Date.now(),
      });
      results.siteSettings = "seeded";
    }

    // ── 2. Auto-create missing categories ─────────────────────────────────
    // Build a slug → _id map for use during post insertion
    const categoryMap: Record<string, Id<"categories">> = {};

    for (const cat of CATEGORIES) {
      const existing = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", cat.slug))
        .first();

      if (existing) {
        categoryMap[cat.slug] = existing._id;
        results.categoriesExisted++;
      } else {
        const newId = await ctx.db.insert("categories", {
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          coverImage: undefined,
          pexelsImages: undefined,
          articleCount: 0,
          createdAt: Date.now(),
        });
        categoryMap[cat.slug] = newId;
        results.categoriesCreated++;
      }
    }

    // ── 3. Resolve admin user ──────────────────────────────────────────────
    const adminUser = await ctx.db
      .query("users")
      .withIndex("by_role", (q) => q.eq("role", "admin"))
      .first();

    if (!adminUser) {
      return {
        ...results,
        errors: [
          "No admin user found. Create an admin account first, then re-run this seed.",
        ],
      };
    }

    // ── 4. Seed blog posts ─────────────────────────────────────────────────
    let newPostCount = 0;

    for (const post of blogPostsData) {
      try {
        // Duplicate check
        const existing = await ctx.db
          .query("articles")
          .withIndex("by_slug", (q) => q.eq("slug", post.slug))
          .first();

        if (existing) {
          results.postsSkipped++;
          continue;
        }

        // Resolve categoryId — auto-create if somehow still missing
        let categoryId = categoryMap[post.categorySlug];

        if (!categoryId) {
          // Fallback: create a bare-minimum category on the fly
          categoryId = await ctx.db.insert("categories", {
            name: post.categorySlug
              .split("-")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
            slug: post.categorySlug,
            articleCount: 0,
            createdAt: Date.now(),
          });
          categoryMap[post.categorySlug] = categoryId;
          results.categoriesCreated++;
        }

        const publishedAtMs = new Date(post.publishedAt).getTime();

        await ctx.db.insert("articles", {
          title:             post.title,
          slug:              post.slug,
          excerpt:           post.excerpt,
          content:           post.content,
          coverImage:        post.coverImage || undefined,
          coverImageAlt:     post.coverImageAlt || undefined,
          authorId:          adminUser._id,
          categoryId:        categoryId,
          pillar:            post.pillar ?? undefined,
          topics:            post.topics,
          tags:              post.tags,
          type:              post.type as
                               | "pillar"
                               | "cluster"
                               | "micro"
                               | "insight"
                               | "observant",
          status:            "published",
          source:            "human",
          scheduledFor:      undefined,
          publishedAt:       publishedAtMs,
          viewCount:         Math.floor(Math.random() * 800) + 200,
          uniqueViewCount:   Math.floor(Math.random() * 500) + 100,
          readingTime:       post.readingTime,
          actualReadingTime: undefined,
          metaTitle:         post.metaTitle,
          metaDescription:   post.metaDescription,
          focusKeyword:      post.focusKeyword,
          createdAt:         publishedAtMs,
          updatedAt:         Date.now(),
          isFeatured:        post.isFeatured,
          isArchived:        false,
        });

        // Increment category articleCount
        const cat = await ctx.db.get(categoryId);
        if (cat) {
          await ctx.db.patch(categoryId, {
            articleCount: (cat.articleCount ?? 0) + 1,
          });
        }

        newPostCount++;
        results.postsSeeded++;

      } catch (err) {
        results.errors.push(
          `Failed "${post.title}": ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    }

    // ── 5. Update globalStats ──────────────────────────────────────────────
    // Only runs if we actually seeded new posts
    if (newPostCount > 0) {
      const stats = await ctx.db.query("globalStats").first();

      if (stats) {
        await ctx.db.patch(stats._id, {
          articleCount:          (stats.articleCount ?? 0) + newPostCount,
          publishedArticleCount: (stats.publishedArticleCount ?? 0) + newPostCount,
        });
      } else {
        // globalStats doesn't exist yet — create it
        await ctx.db.insert("globalStats", {
          articleCount:          newPostCount,
          publishedArticleCount: newPostCount,
          draftArticleCount:     0,
          scheduledArticleCount: 0,
          aiDraftCount:          0,
          usersCount:            1,
          commentsCount:         0,
          pendingCommentsCount:  0,
          totalViews:            0,
          totalUniqueViews:      0,
        });
      }

      results.globalStatsUpdated = true;
    }

    return results;
  },
});

// ── Rollback ──────────────────────────────────────────────────────────────────
// Removes seeded posts, categories that were created by this seed (articleCount
// === 0 after removal), and resets globalStats.
// Does NOT remove siteSettings — edit that manually if needed.

export const rollbackBlogPosts = mutation({
  handler: async (ctx) => {
    const removed = { posts: 0, categories: 0, statsReset: false };
    const slugs = blogPostsData.map((p) => p.slug);

    for (const slug of slugs) {
      const post = await ctx.db
        .query("articles")
        .withIndex("by_slug", (q) => q.eq("slug", slug))
        .first();

      if (!post) continue;

      // Decrement category count
      if (post.categoryId) {
        const cat = await ctx.db.get(post.categoryId);
        if (cat) {
          const newCount = Math.max(0, (cat.articleCount ?? 1) - 1);
          await ctx.db.patch(post.categoryId, { articleCount: newCount });
        }
      }

      await ctx.db.delete(post._id);
      removed.posts++;
    }

    // Remove categories that are now empty and were seeded by us
    for (const cat of CATEGORIES) {
      const category = await ctx.db
        .query("categories")
        .withIndex("by_slug", (q) => q.eq("slug", cat.slug))
        .first();

      if (category && category.articleCount === 0) {
        await ctx.db.delete(category._id);
        removed.categories++;
      }
    }

    // Reset globalStats article counts
    const stats = await ctx.db.query("globalStats").first();
    if (stats) {
      await ctx.db.patch(stats._id, {
        articleCount:          Math.max(0, stats.articleCount - removed.posts),
        publishedArticleCount: Math.max(0, stats.publishedArticleCount - removed.posts),
      });
      removed.statsReset = true;
    }

    return removed;
  },
});
