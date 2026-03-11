import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/navbar";
import { BlogGrid, JoinedArticle } from "@/components/blog-grid";
import { Metadata } from "next";
import { Tags } from "lucide-react";

interface TopicPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
    const { slug } = await params;
    const topicDisplay = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: `${topicDisplay} | The Truth Pill`,
        description: `Explore all articles related to ${topicDisplay} on The Truth Pill.`,
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { slug } = await params;
    
    // Check if there are articles with this topic
    const articles = await fetchQuery(api.articles.list, { topic: slug }) || [];
    
    const topicDisplay = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-6 pt-32 pb-24">
                <header className="mb-20">
                    <div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                        <Tags size={14} />
                        Topic Deep Dive
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif font-black text-gray-950 mb-6 italic tracking-tight">
                        {topicDisplay}
                    </h1>
                    <div className="h-1.5 w-32 bg-blue-600 rounded-full mb-10" />
                    <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                        Curated insights and radical truths exploring the dynamics of {topicDisplay.toLowerCase()}.
                    </p>
                </header>

                <BlogGrid topic={slug} initialArticles={articles as JoinedArticle[]} />
            </div>
        </main>
    );
}
