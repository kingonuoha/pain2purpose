import { mutation } from "./_generated/server";

export const seedServices = mutation({
  handler: async (ctx) => {
    const services = [
      {
        title: "Individual Counselling",
        slug: "individual-counselling",
        shortDescription:
          "One-on-one therapeutic support tailored to your unique challenges and goals.",
        fullDescription: `<p>Individual counselling provides a safe, confidential space where you can explore your thoughts, feelings, and experiences with a trained professional. Sandra works collaboratively with you to understand the root of your challenges and develop practical strategies for moving forward.</p>
        <p>Whether you're dealing with anxiety, low self-esteem, relationship difficulties, or simply feeling stuck, individual counselling helps you gain clarity, build resilience, and reconnect with your sense of purpose.</p>`,
        icon: "User",
        coverImage: "",
        order: 1,
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Grief & Loss Support",
        slug: "grief-and-loss-support",
        shortDescription:
          "Guided healing for those navigating the complex journey of loss and bereavement.",
        fullDescription: `<p>Grief is one of the most profound human experiences, and yet many of us are expected to navigate it alone. Sandra's grief support sessions provide a compassionate, non-judgmental space where your pain is honoured and your healing is prioritised.</p>
        <p>Drawing on her own lived experience of loss, Sandra understands that grief doesn't follow a timeline. Together, you will work through your emotions at your own pace, finding ways to carry your loss while still moving toward a meaningful life.</p>`,
        icon: "Heart",
        coverImage: "",
        order: 2,
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Autism & Family Support",
        slug: "autism-and-family-support",
        shortDescription:
          "Specialist support for families raising children on the autism spectrum.",
        fullDescription: `<p>Raising a child on the autism spectrum is a journey of immense love, and immense challenge. Sandra brings both professional expertise and personal experience as a parent to this work, offering families a space to be heard, understood, and equipped.</p>
        <p>Sessions focus on helping parents and caregivers manage stress, improve communication within the family, advocate confidently for their child, and find community and meaning in their journey.</p>`,
        icon: "Users",
        coverImage: "",
        order: 3,
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "Resilience Coaching",
        slug: "resilience-coaching",
        shortDescription:
          "Build emotional strength and rediscover purpose after hardship or adversity.",
        fullDescription: `<p>Resilience is not the absence of pain — it is the ability to move through pain and emerge stronger. Sandra's resilience coaching combines therapeutic techniques with practical goal-setting to help you rebuild confidence, redefine your identity, and step into your next chapter.</p>
        <p>This service is ideal for individuals transitioning through major life changes, recovering from burnout, or seeking to transform a difficult season into a foundation for growth.</p>`,
        icon: "Zap",
        coverImage: "",
        order: 4,
        isActive: true,
        createdAt: Date.now(),
      },
      {
        title: "PR & Narrative Coaching",
        slug: "pr-and-narrative-coaching",
        shortDescription:
          "Help communicating your story clearly and authentically to the world.",
        fullDescription: `<p>Your story is your power. Sandra's unique background in public relations combined with her counselling expertise enables her to help clients articulate their personal and professional narratives with clarity, confidence, and authenticity.</p>
        <p>Whether you're building a personal brand, preparing for media appearances, writing your memoir, or simply learning to speak your truth, this coaching will help you find and own your voice.</p>`,
        icon: "MessageSquare",
        coverImage: "",
        order: 5,
        isActive: true,
        createdAt: Date.now(),
      },
    ];

    for (const service of services) {
      // Avoid duplicate seeds if they exist
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
    // First clear existing Pain2Purpose categories
    const existing = await ctx.db.query("categories").collect();
    for (const cat of existing) {
      await ctx.db.delete(cat._id);
    }

    const categories = [
      {
        name: "Healing & Recovery",
        slug: "healing-and-recovery",
        description: "Stories and insights on the journey back to wholeness.",
        coverImage: "",
        articleCount: 0,
        createdAt: Date.now(),
      },
      {
        name: "Grief & Loss",
        slug: "grief-and-loss",
        description: "Navigating bereavement and finding meaning after loss.",
        coverImage: "",
        articleCount: 0,
        createdAt: Date.now(),
      },
      {
        name: "Autism & Family",
        slug: "autism-and-family",
        description: "Resources and reflections for families on the spectrum journey.",
        coverImage: "",
        articleCount: 0,
        createdAt: Date.now(),
      },
      {
        name: "Resilience & Growth",
        slug: "resilience-and-growth",
        description: "Building strength, purpose, and forward momentum.",
        coverImage: "",
        articleCount: 0,
        createdAt: Date.now(),
      },
      {
        name: "Mental Wellness",
        slug: "mental-wellness",
        description: "Practical tools and perspectives for everyday emotional health.",
        coverImage: "",
        articleCount: 0,
        createdAt: Date.now(),
      },
      {
        name: "Sandra's Journal",
        slug: "sandras-journal",
        description: "Personal reflections and stories from Sandra Opara.",
        coverImage: "",
        articleCount: 0,
        createdAt: Date.now(),
      },
    ];

    for (const category of categories) {
      await ctx.db.insert("categories", category);
    }

    return { seeded: categories.length };
  },
});


