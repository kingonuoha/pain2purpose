import { DriveStep } from "driver.js";

export type TourConfig = {
  [tourId: string]: DriveStep[];
};

export const TOUR_DEFINITIONS: TourConfig = {
  "admin-blog-creation": [
    {
      element: "#tour-article-author",
      popover: {
        title: "Who's Posting?",
        description:
          "By default, this will be you! But you can easily tap this dropdown to post an article on behalf of someone else in your team.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-article-title",
      popover: {
        title: "Catchy Main Title",
        description:
          "This is the first thing people read. Ensure your title is punchy and gets immediately to the point.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-article-banner",
      popover: {
        title: "Your Post's Banner",
        description:
          "This is the large, beautiful image that appears at the top of your post. You can upload one from your computer or search our free library right here!",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-article-editor",
      popover: {
        title: "The Writing Canvas",
        description:
          "Here is where the magic happens! Type out your thoughts, add headings, format text, and write the body of your article. We track your word count instantly.",
        side: "top",
        align: "start",
      },
    },
    {
      element: "#tour-article-seo",
      popover: {
        title: "Ranking & Organization",
        description:
          "This tab is super important! Here, you can place your article inside a Category, link it to a Pillar (a fancy sub-category), and give it tags so people can easily find your post.",
        side: "left",
        align: "start",
      },
    },
    {
      element: "#tour-article-save",
      popover: {
        title: "Save & Publish",
        description:
          "All done? Click here to save your work as a draft, or publish it to the world instantly. Happy writing!",
        side: "top",
        align: "end",
      },
    },
  ],
  "admin-categories": [
    {
      element: "#tour-categories-top",
      popover: {
        title: "Welcome to Taxonomy",
        description:
          "This is where you organize the entire structure of your platform's topics. It keeps everything neat and easy to find.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-categories-search",
      popover: {
        title: "Powerful Filtering",
        description:
          "Looking for something specific? You can toggle this search tool to filter by either the actual 'Name' or the 'Category'. It filters the data instantly!",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-categories-creation",
      popover: {
        title: "Constructing New Groups",
        description:
          "Click the blue button to create a broad category, or the purple button to create a deeper 'Pillar' nested inside a category.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-categories-tabs",
      popover: {
        title: "Toggle Views",
        description:
          "Switch back and forth between viewing your top-level Categories and your detailed Knowledge Pillars. Simple and easy!",
        side: "bottom",
        align: "start",
      },
    },
  ],
  "admin-dashboard": [
    {
      element: "#tour-dashboard-root",
      popover: {
        title: "The Pulse",
        description: "Welcome to your command center. Here you can see a high-level overview of everything happening in your practice.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-nav-analytics",
      popover: {
        title: "Deep Insights",
        description: "Track your traffic, user engagement, and growth trends over time.",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#tour-nav-blog-posts",
      popover: {
        title: "Content Management",
        description: "Create, edit, and publish articles to your blog here.",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#tour-nav-services",
      popover: {
        title: "Service Offerings",
        description: "Manage the professional services you offer to your clients.",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#tour-nav-contacts",
      popover: {
        title: "Lead Management",
        description: "View and respond to all consultation requests and contact form submissions.",
        side: "right",
        align: "start",
      },
    },
    {
      element: "#tour-dashboard-stats",
      popover: {
        title: "Key Metrics",
        description: "Your most important numbers, updated in real-time.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-dashboard-traffic",
      popover: {
        title: "Visitor Flow",
        description: "Visualize how people are interacting with your website.",
        side: "top",
        align: "start",
      },
    },
    {
      element: "#tour-dashboard-activity",
      popover: {
        title: "Real-time Activity",
        description: "A live feed of every significant event happening on the platform.",
        side: "left",
        align: "start",
      },
    },
  ],
  "admin-services": [
    {
      element: "#tour-services-header",
      popover: {
        title: "Service Portfolio",
        description: "Define the specific therapeutic areas and counseling services you provide.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-services-list",
      popover: {
        title: "Active Services",
        description: "Manage your existing services, update descriptions, or adjust pricing and availability.",
        side: "top",
        align: "start",
      },
    },
  ],
  "admin-contacts": [
    {
      element: "#tour-contacts-header",
      popover: {
        title: "Inbound Leads",
        description: "Every time a user requests a consultation or sends a message, it ends up here.",
        side: "bottom",
        align: "start",
      },
    },
    {
      element: "#tour-contacts-filters",
      popover: {
        title: "Smart Filtering",
        description: "Filter requests by status to stay on top of your follow-ups.",
        side: "bottom",
        align: "start",
      },
    },
  ],
};


