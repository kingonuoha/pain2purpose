import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { ArticleContent } from "./ArticleDetail";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOgImageUrl, truncate } from "@/lib/utils";
import { JoinedArticle } from "@/components/blog-grid";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await fetchQuery(api.articles.getBySlug, { slug });

    if (!article) return { title: "Article Not Found | Pain2Purpose" };

    const ogImage = article.coverImage || getOgImageUrl(article.title);

    return {
        title: `${article.title} | Pain2Purpose`,
        description: article.metaDescription || truncate(article.excerpt || "", 160),
        openGraph: {
            title: article.title,
            description: article.metaDescription || truncate(article.excerpt || "", 160),
            images: [ogImage],
            type: "article",
            publishedTime: new Date(article.publishedAt || article.createdAt).toISOString(),
            authors: [article.authorName || "Sandra Opara"],
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.metaDescription || truncate(article.excerpt || "", 160),
            images: [ogImage],
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const article = await fetchQuery(api.articles.getBySlug, { slug });

    if (!article) notFound();

    const ogImage = article.coverImage || getOgImageUrl(article.title);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.title,
        "description": article.metaDescription || truncate(article.excerpt || "", 160),
        "image": ogImage,
        "datePublished": new Date(article.publishedAt || article.createdAt).toISOString(),
        "dateModified": new Date(article.updatedAt || article.createdAt).toISOString(),
        "author": {
            "@type": "Person",
            "name": article.authorName || "Sandra Opara",
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/about`
        },
        "publisher": {
            "@type": "Organization",
            "name": "Pain2Purpose",
            "logo": {
                "@type": "ImageObject",
                "url": `${process.env.NEXT_PUBLIC_SITE_URL}/p2p/logo.png`
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ArticleContent initialArticle={article as unknown as JoinedArticle} slug={slug} />
        </>
    );
}
