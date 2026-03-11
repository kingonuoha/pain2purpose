import { MetadataRoute } from "next";
import { fetchQuery } from "convex/nextjs";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { slugify } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://thetruthpill.org";

  // Fetch articles
  const articles = (await fetchQuery(api.articles.list, {
    limit: 1000,
  })) as Doc<"articles">[];
  const articleUrls = articles.map((article: Doc<"articles">) => ({
    url: `${baseUrl}/${article.slug}`,
    lastModified: new Date(
      article.updatedAt || article.publishedAt || Date.now(),
    ),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Fetch categories
  const categories = (await fetchQuery(
    api.categories.listAll,
    {},
  )) as (Doc<"categories"> & { articleCount?: number })[];
  const categoryUrls = categories.map((category: Doc<"categories">) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: new Date(category.createdAt || Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Fetch Topics
  const topics = (await fetchQuery(api.articles.getAllTopics)) || [];
  const topicEntries: MetadataRoute.Sitemap = topics.map((topic: string) => ({
    url: `${baseUrl}/topics/${slugify(topic)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  // Combine entries
  return [
    ...staticPages,
    ...categoryUrls,
    ...articleUrls,
    ...topicEntries,
  ];
}
