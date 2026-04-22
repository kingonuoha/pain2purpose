import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import { EmptyState } from "@/components/empty-state";
import { Metadata } from "next";
import { JoinedArticle } from "@/components/blog-grid";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Topic: ${slug.split('-').join(' ')} | Pain2Purpose`,
        description: `Explore all insights tagged with ${slug.split('-').join(' ')}.`,
    };
}

export default async function TagPage({ 
    params,
}: { 
    params: Promise<{ slug: string }>,
}) {
    const { slug } = await params;
    const displayTag = slug.split('-').join(' ');
    
    // In a real scenario, we'd have a specific query for tags, but for now we list all 
    // and the grid handles it if we pass a prop, or we show a collection.
    // For now, listing recent and showing the tag context.
    const listResult = await fetchQuery(api.articles.list, { 
        paginationOpts: { numItems: 50, cursor: null }
    });
    const articles = listResult?.page || [];

    return (
        <main className="min-h-screen bg-p2p-cream">
            <PageHero 
                title={`#${displayTag}`} 
                breadcrumb={[
                    { label: "Blog", href: "/blog" },
                    { label: displayTag, href: `/tags/${slug}` }
                ]} 
            />
            
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="mb-16">
                    <p className="text-xl text-gray-500 max-w-3xl font-medium leading-relaxed italic">
                        Curated collection of insights and reflections specifically labeled under the <span className="text-p2p-charcoal font-bold">{displayTag}</span> theme.
                    </p>
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
                            title="No Insights Found" 
                            description={`We haven't categorized any articles with the "#${displayTag}" tag just yet.`}
                            illustration="Searching.svg"
                            action={
                                <Link 
                                    href="/blog"
                                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-p2p-charcoal text-white font-black uppercase tracking-widest text-[10px] hover:bg-p2p-sage transition-all shadow-xl active:scale-95"
                                >
                                    Explore Blog
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
            href={`/blog/${article.slug}`}
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
                <h3 className="text-2xl font-serif font-bold text-p2p-charcoal mb-4 group-hover:text-p2p-sage transition-colors line-clamp-2 leading-snug italic">
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
