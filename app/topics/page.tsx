import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { ChevronRight, LayoutGrid, Tags, Search } from "lucide-react";
import { Metadata } from "next";
import { slugify } from "@/lib/utils";
import { EmptyState } from "@/components/empty-state";

export const metadata: Metadata = {
    title: "Explore Topics | The Truth Pill",
    description: "Discover the deep psychological and philosophical topics we explore, from human behavior to emotional clarity.",
};

export default async function TopicsPage() {
    const allTopics = await fetchQuery(api.articles.getAllTopics) || [];

    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-6 py-32">
                <div className="flex flex-col mb-16">
                    <div className="flex items-center gap-3 text-blue-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">
                        <LayoutGrid size={14} />
                        Topic Directory
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-black text-gray-950 mb-6 italic">
                        Explore Topics
                    </h1>
                    <div className="h-1 w-24 bg-blue-600 rounded-full mb-8" />
                    <p className="text-xl text-gray-500 max-w-2xl font-medium leading-relaxed">
                        Navigate through specific psychological patterns and behavioral themes explored in our research.
                    </p>
                </div>

                {allTopics.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allTopics.map((topic) => (
                            <Link 
                                key={topic}
                                href={`/topics/${slugify(topic)}`}
                                className="group p-8 bg-white border border-gray-100 rounded-[32px] hover:border-blue-600 hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-500 flex flex-col justify-between h-full"
                            >
                                <div>
                                    <div className="p-3 bg-zinc-50 rounded-2xl w-fit group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-500 mb-6 text-zinc-400 group-hover:text-blue-600">
                                        <Tags size={24} />
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-gray-950 mb-4 capitalize group-hover:text-blue-600 transition-colors">
                                        {topic.split('-').join(' ')}
                                    </h3>
                                </div>
                                <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-blue-600 transition-colors">
                                    View Articles
                                    <ChevronRight size={16} className="translate-x-0 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <EmptyState 
                        title="No Topics Found" 
                        description="We haven't categorized any specific topics just yet. Check back soon for deep dives into behavioral patterns."
                        illustration="Empty-folder.svg"
                        action={
                            <Link 
                                href="/"
                                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-600 text-white font-black uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95"
                            >
                                <Search size={14} />
                                Back to Home
                            </Link>
                        }
                    />
                )}

                {/* Linking to Categories */}
                <div className="mt-32 pt-20 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-950 mb-2">Explore by Pillars</h2>
                            <p className="text-gray-500 font-medium">Browse our core research categories to find related articles.</p>
                        </div>
                        <Link 
                            href="/category" 
                            className="group flex items-center gap-3 bg-gray-950 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-all shadow-xl shadow-gray-200 active:scale-95"
                        >
                            View All Pillars <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
