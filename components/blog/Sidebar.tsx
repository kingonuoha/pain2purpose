"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { slugify } from "@/lib/utils";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function Sidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const categories = useQuery(api.categories.listAll) || [];
    const topics = (useQuery(api.articles.getAllTopics) || []).slice(0, 6);

    interface SidebarCategory {
        _id: string;
        slug: string;
        name: string;
        articleCount?: number;
    }

    return (
        <aside className="sidebar ps-lg-4">
            <form onSubmit={handleSearch} className="form-group">
                <input 
                    id="sidebar_search" 
                    className="form-control" 
                    type="search" 
                    name="search" 
                    placeholder="Search" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="input_icon">
                    <i className="fa-regular fa-magnifying-glass"></i>
                </button>
            </form>
            
            <div className="sidebar_widget">
                <h3 className="sidebar_widget_title">
                    <span className="title_icon">
                        <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                    </span>
                    <span className="title_text">Categories</span>
                </h3>
                <ul className="post_category_list unordered_list_block">
                    {categories.length > 0 ? (
                        (categories as SidebarCategory[]).map((cat) => (
                            <li key={cat._id}>
                                <Link href={`/category/${cat.slug}`}>
                                    <span className="category_name">{cat.name}</span>
                                    <span className="category_counter">{cat.articleCount || 0}</span>
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li className="text-muted small italic">No categories yet</li>
                    )}
                </ul>
            </div>

            <div className="sidebar_widget">
                <h3 className="sidebar_widget_title">
                    <span className="title_icon">
                        <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                    </span>
                    <span className="title_text">Popular Topics</span>
                </h3>
                <ul className="post_tags unordered_list">
                    {topics.length > 0 ? (
                        topics.map((topic) => (
                            <li key={topic}>
                                <Link href={`/tags/${slugify(topic)}`}>{topic}</Link>
                            </li>
                        ))
                    ) : (
                        <li className="text-muted small italic">No topics yet</li>
                    )}
                </ul>
            </div>
        </aside>
    );
}
