import { mutation } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const seedAdmin = mutation({
  handler: async (ctx) => {
    const email = "kingsleyomof@gmail.com"; // Default admin email
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), email))
      .first();
    
    if (existing) {
        await ctx.db.patch(existing._id, { 
            role: "admin",
            password: "$2b$10$Bp7yCQGWGV3bwgZkYQ8HJ.X6ct/NvulwMyGVI9RXYk0XabDRcranC",
            provider: "email"
        });
        return existing._id;
    }

    return await ctx.db.insert("users", {
      name: "Sandra Opara",
      email: email,
      password: "$2b$10$Bp7yCQGWGV3bwgZkYQ8HJ.X6ct/NvulwMyGVI9RXYk0XabDRcranC", // Hashed 'admin123'
      role: "admin",
      provider: "email",
      newsletterSubscribed: false,
      createdAt: Date.now(),
    });
  },
});

export const seedServices = mutation({
  handler: async (ctx) => {
    const services = [
      {
        title: "Individual Counselling",
        slug: "individual-counselling",
        shortDescription: "One-on-one therapeutic support tailored to your unique challenges and goals.",
        fullDescription: `<p>Individual counselling provides a safe, confidential space where you can explore your thoughts, feelings, and experiences with a trained professional.</p>`,
        icon: "User",
        coverImage: "",
        order: 1,
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Grief & Loss Support",
        slug: "grief-and-loss-support",
        shortDescription: "Guided healing for those navigating the complex journey of loss and bereavement.",
        fullDescription: `<p>Grief is one of the most profound human experiences, and yet many of us are expected to navigate it alone.</p>`,
        icon: "HeartHandshake",
        coverImage: "",
        order: 2,
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Autism & Family Support",
        slug: "autism-and-family-support",
        shortDescription: "Specialist support for families raising children on the autism spectrum.",
        fullDescription: `<p>Raising a child on the autism spectrum is a journey of immense love, and immense challenge.</p>`,
        icon: "Users",
        coverImage: "",
        order: 3,
        isActive: true,
        createdAt: Date.now(),
      }
    ];

    for (const service of services) {
      const existing = await ctx.db
        .query("services")
        .filter((q) => q.eq(q.field("slug"), service.slug))
        .first();
      if (!existing) {
        await ctx.db.insert("services", service);
      }
    }
    return { seeded: services.length };
  },
});

export const seedCategories = mutation({
  handler: async (ctx) => {
    const existing = await ctx.db.query("categories").collect();
    for (const cat of existing) {
      await ctx.db.delete(cat._id);
    }

    const categories = [
      { name: "Healing & Recovery", slug: "healing-and-recovery", description: "Stories and insights on the journey back to wholeness.", coverImage: "", articleCount: 0, createdAt: Date.now() },
      { name: "Grief & Loss", slug: "grief-and-loss", description: "Navigating bereavement and finding meaning after loss.", coverImage: "", articleCount: 0, createdAt: Date.now() },
      { name: "Autism & Family", slug: "autism-and-family", description: "Resources and reflections for families on the spectrum journey.", coverImage: "", articleCount: 0, createdAt: Date.now() },
      { name: "Resilience & Growth", slug: "resilience-and-growth", description: "Building strength, purpose, and forward momentum.", coverImage: "", articleCount: 0, createdAt: Date.now() },
      { name: "Mental Wellness", slug: "mental-wellness", description: "Practical tools and perspectives for everyday emotional health.", coverImage: "", articleCount: 0, createdAt: Date.now() },
      { name: "Sandra's Journal", slug: "sandras-journal", description: "Personal reflections and stories from Sandra Opara.", coverImage: "", articleCount: 0, createdAt: Date.now() },
    ];

    for (const category of categories) {
      await ctx.db.insert("categories", category);
    }
    return { seeded: categories.length };
  },
});

export const seedArticles = mutation({
  handler: async (ctx) => {
    const categories = await ctx.db.query("categories").collect();
    const adminUser = await ctx.db.query("users").filter(q => q.eq(q.field("role"), "admin")).first();
    
    if (!adminUser) return { error: "No admin user found." };

    const findCat = (slug: string) => categories.find(c => c.slug === slug)?._id;

    const articles = [
      {
        title: "Finding Beauty in the Brokenness",
        slug: "finding-beauty-in-brokenness",
        excerpt: "How to navigate the first few months after a profound loss.",
        content: `<p>Resilience isn't about bouncing back; it's about being forged into someone new.</p>`,
        authorId: adminUser._id,
        categoryId: findCat("grief-and-loss"),
        status: "published" as const,
        source: "human" as const,
        publishedAt: Date.now() - (45 * 24 * 60 * 60 * 1000),
        viewCount: 245,
        uniqueViewCount: 167,
        readingTime: 4,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }
    ];

    for (const article of articles) {
      const existing = await ctx.db
        .query("articles")
        .filter((q) => q.eq(q.field("slug"), article.slug))
        .first();
      if (!existing) {
        await ctx.db.insert("articles", article as unknown as Doc<"articles">);
      }
    }
    return { seeded: articles.length };
  },
});

export const seedAll = mutation({
  handler: async (ctx) => {
    // We execute logic inline to avoid type issues with mutation handlers
    const adminEmail = "kingsleyomof@gmail.com";
    let admin = await ctx.db.query("users").filter(q => q.eq(q.field("email"), adminEmail)).first();
    if (!admin) {
        const id = await ctx.db.insert("users", {
            name: "Sandra Opara",
            email: adminEmail,
            role: "admin",
            provider: "google",
            newsletterSubscribed: false,
            createdAt: Date.now(),
        });
        admin = await ctx.db.get(id);
    } else if (admin.role !== "admin") {
        await ctx.db.patch(admin._id, { role: "admin" });
    }

    // Services
    const services = ["Individual Counselling", "Grief & Loss Support", "Autism & Family Support"];
    for (const s of services) {
        const slug = s.toLowerCase().replace(/ /g, "-");
        const existing = await ctx.db.query("services").filter(q => q.eq(q.field("slug"), slug)).first();
        if (!existing) {
            await ctx.db.insert("services", {
                title: s,
                slug,
                shortDescription: "Sample description for " + s,
                fullDescription: "<p>Sample content</p>",
                icon: "User",
                order: 1,
                isActive: true,
                createdAt: Date.now(),
            });
        }
    }

    // Categories
    const cats = ["Healing & Recovery", "Grief & Loss", "Autism & Family"];
    for (const c of cats) {
        const slug = c.toLowerCase().replace(/ /g, "-").replace(/&/g, "and");
        const existing = await ctx.db.query("categories").filter(q => q.eq(q.field("slug"), slug)).first();
        if (!existing) {
            await ctx.db.insert("categories", {
                name: c,
                slug,
                description: "Description for " + c,
                coverImage: "",
                articleCount: 0,
                createdAt: Date.now(),
            });
        }
    }

    return { success: true };
  },
});
