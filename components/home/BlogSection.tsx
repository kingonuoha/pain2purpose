"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";

export function BlogSection() {
    const listResult = useQuery(api.articles.list, { 
        paginationOpts: { numItems: 3, cursor: null } 
    });
    const articles = listResult?.page || [];

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-p2p-charcoal italic">Latest Articles</h2>
                    <Link 
                        href="/articles"
                        className="bg-p2p-charcoal text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-p2p-sage transition-all shadow-xl shadow-p2p-charcoal/10 active:scale-95 flex items-center gap-3"
                    >
                        Read More Articles <ArrowRight size={16} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <div key={article._id} className="group">
                            <Link href={`/articles/${article.slug}`} className="block relative aspect-[16/10] rounded-[40px] overflow-hidden mb-8 shadow-xl">
                                <Image
                                    src={article.coverImage || "/p2p/hero-main.jpg"}
                                    alt={article.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-p2p-sage">
                                        Insights
                                    </span>
                                </div>
                            </Link>
                            
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-p2p-sage mb-4 opacity-70">
                                <span className="flex items-center gap-1.5"><Clock size={12} /> {new Date(article.createdAt).toLocaleDateString()}</span>
                                <span className="w-1 h-1 bg-p2p-sage rounded-full" />
                                <span>5 min read</span>
                            </div>

                            <h3 className="text-2xl font-serif font-bold text-p2p-charcoal mb-4 italic group-hover:text-p2p-sage transition-colors leading-tight">
                                <Link href={`/articles/${article.slug}`}>{article.title}</Link>
                            </h3>
                            
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-2 font-medium">
                                {article.excerpt}
                            </p>

                            <Link 
                                href={`/articles/${article.slug}`}
                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-p2p-sage hover:gap-4 transition-all"
                            >
                                Read More <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
