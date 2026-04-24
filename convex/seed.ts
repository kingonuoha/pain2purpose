import { mutation, MutationCtx } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { BLOG_POSTS } from "./seeds/articles_data";

/**
 * HELPER FUNCTIONS
 * These can be called directly within other mutations.
 */

async function runSeedAdmin(ctx: MutationCtx) {
  const email = "kingonuoha01@gmail.com";
  const existing = await ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("email"), email))
    .first();
  
  const passwordHash = "$2b$12$bbIr.8PONHDE5jPoXIOXK.wmnixidQ53UHijTA9.f1x1UvYjAZIJ2";

  if (existing) {
      await ctx.db.patch(existing._id, { 
          role: "admin",
          password: passwordHash,
          provider: "email"
      });
      return existing._id;
  }

  return await ctx.db.insert("users", {
    name: "Sandra Opara",
    email: email,
    password: passwordHash,
    role: "admin",
    provider: "email",
    newsletterSubscribed: false,
    createdAt: Date.now(),
  });
}

async function runSeedSiteSettings(ctx: MutationCtx) {
  const existing = await ctx.db.query("siteSettings").first();
  const settings = {
      siteName: "CounsellingP2P",
      siteDescription: "Therapeutic counselling support for healing, growth, and finding meaning. Sandra Opara supports individuals through life's complex transitions with compassion and evidence-based care.",
      email: "info@counsellingp2p.com",
      phone: "08033444411",
      secondaryPhone: "+1- 223- 364 8160, PA",
      address: "10 Bishop okoye Street, Owerri, Imo State Nigeria.",
      secondaryAddress: "Owerri, Nigeria",
      socials: {
        facebook: "https://facebook.com/pain2purpose",
        twitter: "https://twitter.com/pain2purpose",
        instagram: "https://instagram.com/pain2purpose",
        youtube: "",
        tiktok: "",
        linkedin: "",
        github: "",
      },
      footerText: "Helping you find beauty in the brokenness. Professional Mental Health Support.",
      updatedAt: Date.now(),
  };

  if (existing) {
      await ctx.db.patch(existing._id, settings);
  } else {
      await ctx.db.insert("siteSettings", settings);
  }
}

async function runSeedServices(ctx: MutationCtx) {
  const services = [
    {
      title: "Individual Counselling",
      slug: "individual-counselling",
      shortDescription: "One-on-one sessions where you can speak freely, be heard fully, and start finding your way forward.",
      fullDescription: `<p>Individual counselling provides a private, confidential space to put it all down. Just you and Sandra, in a conversation that goes at your pace, with no judgment and no agenda other than your wellbeing.</p><h3>What We Work Through Together</h3><ul><li>Anxiety, low mood, or persistent emotional weight</li><li>Relationship challenges — with partners or family</li><li>Loss of identity, direction, or purpose</li><li>Burnout and emotional exhaustion</li></ul>`,
      icon: "User",
      coverImage: "/assets/images/new_pics/sandra-square (12).png",
      order: 1,
      isActive: true,
      createdAt: Date.now(),
    },
    {
      title: "Grief and Loss Support",
      slug: "grief-and-loss-support",
      shortDescription: "Compassionate support for anyone navigating the painful and often isolating experience of loss.",
      fullDescription: `<p>Grief is not a problem to be solved. It is love with nowhere left to go. Sandra's personal and professional understanding of loss shapes every session, providing validation for naming your feelings and finding a gentle path forward.</p><h3>What Grief Support Looks Like</h3><ul><li>Finding language for feelings that have no name yet</li><li>Processing complex emotions — guilt, anger, numbness</li><li>Learning how to hold loss while staying present in life</li><li>Finding meaning on the other side of pain</li></ul>`,
      icon: "HeartHandshake",
      coverImage: "/assets/images/new_pics/sandra- (13).png",
      order: 2,
      isActive: true,
      createdAt: Date.now(),
    },
    {
      title: "Autism and Family Support",
      slug: "autism-and-family-support",
      shortDescription: "Specialist support for families raising children on the autism spectrum — from a counsellor who lives this journey too.",
      fullDescription: `<p>Raising a neurodivergent child asks everything of you. Sandra provides a lived-experience perspective to help parents manage burnout, stabilize family dynamics, and celebrate wins that the world might not notice.</p><h3>What Family Support Covers</h3><ul><li>Processing the emotional weight of diagnosis</li><li>Managing caregiver burnout and sustainability</li><li>Improving family connection and communication</li><li>Practical guidance on advocacy and routines</li></ul>`,
      icon: "Users",
      coverImage: "/assets/images/new_pics/sandra-square (14).png",
      order: 3,
      isActive: true,
      createdAt: Date.now(),
    },
    {
      title: "Resilience Coaching",
      slug: "resilience-coaching",
      shortDescription: "For when life has knocked you down and you are ready — even just slightly — to figure out what comes next.",
      fullDescription: `<p>Resilience is the quiet, stubborn decision to keep moving. This coaching sits at the intersection of counselling and purposeful goal-setting, helping you re-emerge from failure, rejection, or major life changes.</p><h3>Rebuilding With Purpose</h3><ul><li>Identifying strengths gained from hardship</li><li>Rebuilding confidence and sense of self</li><li>Redefining identity for the next chapter</li><li>Developing sustainable mindset habits</li></ul>`,
      icon: "Zap",
      coverImage: "/assets/images/new_pics/sandra-square (11).png",
      order: 4,
      isActive: true,
      createdAt: Date.now(),
    }
  ];

  for (const service of services) {
    const existing = await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("slug"), service.slug))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, service);
    } else {
      await ctx.db.insert("services", service);
    }
  }
}

async function runSeedCategories(ctx: MutationCtx) {
  const categories = [
    { name: "Healing & Recovery", slug: "healing-and-recovery", description: "Stories and insights on the journey back to wholeness.", coverImage: "/assets/images/gallery/gallery_image_1.jpg", articleCount: 0, createdAt: Date.now() },
    { name: "Grief & Loss", slug: "grief-and-loss", description: "Navigating bereavement and finding meaning after loss.", coverImage: "/assets/images/gallery/gallery_image_2.jpg", articleCount: 0, createdAt: Date.now() },
    { name: "Autism & Family", slug: "autism-and-family", description: "Resources and reflections for families on the spectrum journey.", coverImage: "/assets/images/gallery/gallery_image_3.jpg", articleCount: 0, createdAt: Date.now() },
    { name: "Resilience & Growth", slug: "resilience-and-growth", description: "Building strength, purpose, and forward momentum.", coverImage: "/assets/images/gallery/gallery_image_4.jpg", articleCount: 0, createdAt: Date.now() },
    { name: "Mental Wellness", slug: "mental-wellness", description: "Practical tools and perspectives for everyday emotional health.", coverImage: "/assets/images/gallery/gallery_image_5.jpg", articleCount: 0, createdAt: Date.now() },
    { name: "Sandra's Journal", slug: "sandras-journal", description: "Personal reflections and stories from Sandra Opara.", coverImage: "/assets/images/gallery/gallery_image_6.jpg", articleCount: 0, createdAt: Date.now() },
  ];

  for (const category of categories) {
    const existing = await ctx.db.query("categories").withIndex("by_slug", q => q.eq("slug", category.slug)).first();
    if (existing) {
      await ctx.db.patch(existing._id, category);
    } else {
      await ctx.db.insert("categories", category);
    }
  }
}

async function runSeedTestimonials(ctx: MutationCtx) {
  const items = [
    {
        name: "Faith E.",
        role: "Mother & Caregiver",
        content: "Navigating my son's autism diagnosis felt like drowning until I met Sandra. She didn't just give me advice; she gave me a lifeline and the strength to keep going.",
        rating: 5,
        avatar: "/assets/images/meta/author_image_3-min.png",
        isActive: true,
        createdAt: Date.now(),
    },
    {
        name: "Bayo A.",
        role: "Professional",
        content: "I always thought therapy was for a different kind of person. Sandra's approach was direct, empathetic, and culturally relevant. I finally have the tools to handle my anxiety.",
        rating: 5,
        avatar: "/assets/images/meta/author_image_3-min.png",
        isActive: true,
        createdAt: Date.now(),
    },
    {
        name: "Chioma O.",
        role: "Entrepreneur",
        content: "Losing my husband left a hole I thought would never close. Sandra walked through that valley with me, helping me find a quiet purpose on the other side of grief.",
        rating: 5,
        avatar: "/assets/images/meta/author_image_3-min.png",
        isActive: true,
        createdAt: Date.now(),
    }
  ];

  for (const item of items) {
    const existing = await ctx.db.query("testimonials").filter(q => q.eq(q.field("name"), item.name)).first();
    if (!existing) {
        await ctx.db.insert("testimonials", item);
    }
  }
}

async function runSeedArticles(ctx: MutationCtx) {
  const categories = await ctx.db.query("categories").collect();
  const adminUser = await ctx.db.query("users").filter(q => q.eq(q.field("role"), "admin")).first();
  
  if (!adminUser) return { error: "No admin user found. Run seedAdmin first." };

  const categoryMap = new Map(categories.map(c => [c.slug, c._id]));

  for (const post of BLOG_POSTS) {
    const existing = await ctx.db
      .query("articles")
      .filter((q) => q.eq(q.field("slug"), post.slug))
      .first();
    
    const categoryId = categoryMap.get(post.categorySlug);

    const statusValue = post.status === "archived" ? "published" : post.status;

    const sourceValue = post.source === "hybrid" ? "human" : post.source;

    const articleData = {
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      coverImageAlt: post.coverImageAlt,
      authorId: adminUser._id,
      categoryId: categoryId as Id<"categories">,
      pillar: post.pillar ?? undefined,
      topics: post.topics,
      tags: post.tags,
      type: post.type as "micro" | "cluster" | "pillar" | "insight" | "observant",
      status: (statusValue as "draft" | "published" | "scheduled"),
      source: (sourceValue as "human" | "ai"),
      publishedAt: post.publishedAt || Date.now(),
      viewCount: (post.publishedAt || 0) > 1767225600000 
          ? Math.floor(Math.random() * 260) + 40   // 2026: 40-300
          : Math.floor(Math.random() * 500) + 400, // Legacy: 400-900
      uniqueViewCount: (post.publishedAt || 0) > 1767225600000
          ? Math.floor(Math.random() * 30) + 10
          : Math.floor(Math.random() * 100) + 50,
      readingTime: post.readingTime,
      createdAt: post.publishedAt || Date.now(),
      updatedAt: post.publishedAt || Date.now(),
      isFeatured: post.isFeatured,
      isArchived: post.isArchived,
    };

    if (existing) {
      await ctx.db.patch(existing._id, articleData);
    } else {
      await ctx.db.insert("articles", articleData);
    }
  }
}

/**
 * EXPORTED MUTATIONS
 * Use these via Convex CLI/Dashboard.
 */

export const seedAdmin = mutation({
  handler: async (ctx) => {
    return await runSeedAdmin(ctx);
  },
});

export const seedSiteSettings = mutation({
  handler: async (ctx) => {
    await runSeedSiteSettings(ctx);
  },
});

export const seedServices = mutation({
  handler: async (ctx) => {
    await runSeedServices(ctx);
    return { success: true };
  },
});

export const seedCategories = mutation({
  handler: async (ctx) => {
    await runSeedCategories(ctx);
    return { success: true };
  },
});

export const seedArticles = mutation({
  handler: async (ctx) => {
    return await runSeedArticles(ctx);
  },
});

export const seedTestimonials = mutation({
    handler: async (ctx) => {
        await runSeedTestimonials(ctx);
        return { success: true };
    },
});

export const nukeAndSeed = mutation({
  handler: async (ctx) => {
    // 1. Identify tables to clear
    const tables = [
      "users", 
      "articles", 
      "categories", 
      "services", 
      "testimonials", 
      "siteSettings",
      "comments",
      "contactSubmissions"
    ] as const;

    // 2. Wipe data
    for (const table of tables) {
      const docs = await ctx.db.query(table).collect();
      for (const doc of docs) {
        await ctx.db.delete(doc._id);
      }
    }

    // 3. Run fresh seed
    await runSeedAdmin(ctx);
    await runSeedSiteSettings(ctx);
    await runSeedCategories(ctx);
    await runSeedServices(ctx);
    await runSeedTestimonials(ctx);
    await runSeedArticles(ctx);

    return { success: true, message: "Database nuked and fresh production data seeded." };
  },
});

export const seedAll = mutation({
  handler: async (ctx) => {
    await runSeedAdmin(ctx);
    await runSeedSiteSettings(ctx);
    await runSeedCategories(ctx);
    await runSeedServices(ctx);
    await runSeedTestimonials(ctx);
    await runSeedArticles(ctx);
    return { success: true };
  },
});
