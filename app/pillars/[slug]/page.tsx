import { PageHero } from "@/components/layout/PageHero";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/layout/Navbar";
import Link from "next/link";
import { Clock, ArrowRight, Brain, Lightbulb, Compass, Layers } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { EmptyState } from "@/components/empty-state";
import { Metadata } from "next";
import { JoinedArticle } from "@/components/blog-grid";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const pillar = await fetchQuery(api.pillars.getBySlug, { slug });
    return {
        title: `${pillar?.name || "Topic"} | Pain2Purpose`,
        description: pillar?.description || "Explore insights and resources on healing and growth.",
    };
}

export default async function PillarPage({ 
    params,
    searchParams 
}: { 
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ type?: string }>
}) {
    const { slug } = await params;
    const { type } = await searchParams;
    const pillar = await fetchQuery(api.pillars.getBySlug, { slug });
    
    if (!pillar) {
        return (
            <main className="min-h-screen bg-white">
                <Navbar solid />
                <div className="pt-40 px-6 text-center">
                    <h1 className="text-4xl font-serif font-bold mb-4">Topic Not Found</h1>
                    <Link href="/articles" className="text-p2p-sage hover:underline">Back to Archive</Link>
                </div>
            </main>
        );
    }

    const typeFilter = type || undefined;
    const listResult = await fetchQuery(api.articles.list, { 
        pillar: pillar.slug,
        type: typeFilter,
        paginationOpts: { numItems: 50, cursor: null }
    });
    const articles = listResult?.page || [];

    const postTypes = [
        { label: "All Insights", value: "", icon: <Compass size={14} /> },
        { label: "Core Pillars", value: "pillar", icon: <Brain size={14} /> },
        { label: "Articles", value: "cluster", icon: <Layers size={14} /> },
        { label: "Quick Tips", value: "micro", icon: <Lightbulb size={14} /> },
    ];

    return (
        <main className="min-h-screen bg-p2p-cream">
            <Navbar solid />
            <PageHero 
                title={pillar.name} 
                breadcrumb={[
                    { label: "Blog", href: "/articles" },
                    { label: pillar.name, href: `/pillars/${pillar.slug}` }
                ]} 
            />
            
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Intro section */}
                <div className="mb-16">
                    <p className="text-xl text-gray-500 max-w-3xl font-medium leading-relaxed mb-12 italic">
                        {pillar.description || "Exploring the paths to healing and psychological transformation."}
                    </p>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center gap-3">
                        {postTypes.map((type) => (
                            <Link
                                key={type.label}
                                href={`/pillars/${pillar.slug}${type.value ? `?type=${type.value}` : ''}`}
                                className={cn(
                                    "flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm border",
                                    (typeFilter || "") === type.value
                                        ? "bg-p2p-sage text-white border-p2p-sage shadow-p2p-sage/20"
                                        : "bg-white text-gray-500 border-gray-100 hover:border-p2p-sage"
                                )}
                            >
                                {type.icon}
                                {type.label}
                            </Link>
                        ))}
                    </div>
                </div>

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article: JoinedArticle) => (
                            <ArticleCard key={article._id} article={article} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 border-2 border-dashed border-p2p-soft-green rounded-[64px]">
                        <EmptyState 
                            title="No Resources Found" 
                            description={`We haven't published any ${typeFilter ? typeFilter : ''} resources in ${pillar.name} yet. Check back soon for fresh insights.`}
                            illustration="Searching.svg"
                            action={
                                <Link 
                                    href="/articles"
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-p2p-charcoal text-white font-black uppercase tracking-widest text-[10px] hover:bg-p2p-sage transition-all shadow-xl active:scale-95"
                                >
                                    Explore Other Topics
                                </Link>
                            }
                        />
                    </div>
                )}
            </div>
        </main>
    );
}

function ArticleCard({ article }: { article: JoinedArticle }) {
    return (
        <Link 
            href={`/articles/${article.slug}`}
            className="group flex flex-col bg-white rounded-[48px] overflow-hidden border border-gray-100 hover:border-p2p-sage hover:shadow-2xl hover:shadow-p2p-sage/10 transition-all duration-700 h-full"
        >
            <div className="relative h-64 overflow-hidden">
                <Image 
                    src={article.coverImage || ""} 
                    alt={article.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-p2p-sage">
                        {article.type || "Insight"}
                    </span>
                </div>
            </div>
            
            <div className="p-10 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative border border-gray-100">
                        <Image 
                            src={article.authorImage || "/p2p/logo.png"} 
                            alt={article.authorName || "Author"} 
                            fill 
                            className="object-cover"
                        />
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        {article.authorName}
                    </span>
                </div>

                <h3 className="text-2xl font-serif font-bold text-p2p-charcoal mb-4 group-hover:text-p2p-sage transition-colors line-clamp-2 leading-snug">
                    {article.title}
                </h3>
                
                <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">
                    {article.excerpt}
                </p>

                <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-1.5"><Clock size={12} className="text-p2p-sage" /> {article.readingTime}m read</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-p2p-sage group-hover:text-white transition-all transform group-hover:translate-x-2">
                        <ArrowRight size={18} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
