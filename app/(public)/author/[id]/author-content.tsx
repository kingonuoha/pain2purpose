"use client";

import { Doc } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Clock, User, Instagram, Mail } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { FooterWrapper } from "@/components/layout/FooterWrapper";

interface JoinedArticle extends Doc<"articles"> {
    categoryName: string;
    authorName?: string;
    authorImage?: string;
}

interface AuthorContentProps {
    author: Doc<"users">;
    initialArticles: JoinedArticle[];
}

export function AuthorContent({ author, initialArticles }: AuthorContentProps) {
    return (
        <div className="min-h-screen bg-p2p-cream">
            <Navbar solid />

            {/* Header / Cover Section */}
            <div className="relative h-64 md:h-80 bg-p2p-charcoal overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-p2p-sage/20 to-p2p-charcoal" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-p2p-cream to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-32 relative z-10 pb-20">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar / Profile Info */}
                    <div className="w-full lg:w-80 shrink-0">
                        <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-p2p-sage/5 border border-p2p-soft-green/20 sticky top-32">
                            <div className="relative w-32 h-32 mx-auto mb-8">
                                <div className="absolute inset-0 bg-p2p-sage rounded-full blur-2xl opacity-20 animate-pulse" />
                                <div className="relative w-full h-full rounded-[40px] border-4 border-white shadow-xl overflow-hidden bg-p2p-cream">
                                    {author.profileImage ? (
                                        <Image
                                            src={author.profileImage}
                                            alt={author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-p2p-cream text-p2p-sage">
                                            <User size={48} />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-serif font-bold text-p2p-charcoal mb-2 italic">{author.name}</h1>
                                <p className="text-p2p-sage font-black text-[9px] uppercase tracking-[0.2em] px-4 py-1.5 bg-p2p-soft-green/20 rounded-full inline-block">
                                    {author.role === 'admin' ? 'Founder & Counsellor' : 'Contributor'}
                                </p>
                            </div>

                            <div className="space-y-6 mb-10">
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="w-10 h-10 rounded-2xl bg-p2p-cream flex items-center justify-center text-p2p-sage">
                                        <BookOpen size={16} />
                                    </div>
                                    <span className="font-bold">{initialArticles.length} Insights Shared</span>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                    <div className="w-10 h-10 rounded-2xl bg-p2p-cream flex items-center justify-center text-p2p-sage">
                                        <Calendar size={16} />
                                    </div>
                                    <span className="font-bold">Since {new Date(author.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-gray-50">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-6 text-center">Connect</p>
                                <div className="flex justify-center gap-4">
                                    <a href="#" className="w-12 h-12 rounded-2xl bg-p2p-cream flex items-center justify-center text-p2p-sage hover:bg-p2p-sage hover:text-white transition-all group">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="w-12 h-12 rounded-2xl bg-p2p-cream flex items-center justify-center text-p2p-sage hover:bg-p2p-sage hover:text-white transition-all group">
                                        <Mail size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content / Articles */}
                    <div className="flex-1 space-y-12">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-1 bg-p2p-sage rounded-full" />
                                <h2 className="text-3xl font-serif font-bold text-p2p-charcoal italic">Insights from {author.name.split(' ')[0]}</h2>
                            </div>
                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{initialArticles.length} Results</p>
                        </div>

                        {initialArticles.length === 0 ? (
                            <div className="bg-white rounded-[3rem] p-20 text-center border border-p2p-soft-green/20 shadow-sm">
                                <div className="w-20 h-20 bg-p2p-cream rounded-3xl flex items-center justify-center text-p2p-sage mx-auto mb-6">
                                    <BookOpen size={40} />
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-p2p-charcoal mb-4 italic">No insights shared yet</h3>
                                <p className="text-gray-500 font-medium">Sandra is currently working on new resources for you. Check back soon.</p>
                            </div>
                        ) : (
                            <div className="grid gap-8">
                                {initialArticles.map((article: JoinedArticle, idx: number) => (
                                    <motion.article
                                        key={article._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="group bg-white rounded-[3rem] p-8 md:p-10 flex flex-col md:flex-row gap-10 shadow-2xl shadow-p2p-sage/5 border border-p2p-soft-green/10 hover:border-p2p-sage transition-all"
                                    >
                                        <Link href={`/blog/${article.slug}`} className="relative w-full md:w-72 h-56 rounded-[2rem] overflow-hidden shrink-0">
                                            <Image
                                                src={article.coverImage || ""}
                                                alt={article.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                                            />
                                            <div className="absolute top-4 left-4 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-black text-p2p-sage uppercase tracking-widest">
                                                {article.categoryName}
                                            </div>
                                        </Link>

                                        <div className="flex flex-col justify-center">
                                            <Link href={`/blog/${article.slug}`}>
                                                <h3 className="text-2xl font-serif font-bold text-p2p-charcoal mb-4 group-hover:text-p2p-sage transition-colors leading-tight italic">
                                                    {article.title}
                                                </h3>
                                            </Link>
                                            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                                                {article.excerpt}
                                            </p>
                                            <div className="mt-auto flex items-center gap-8">
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    <Calendar size={14} className="text-p2p-sage" />
                                                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                                    <Clock size={14} className="text-p2p-sage" />
                                                    {article.readingTime} min read
                                                </div>
                                            </div>
                                        </div>
                                    </motion.article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <FooterWrapper />
        </div>
    );
}
