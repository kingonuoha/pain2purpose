"use client";

import { useState } from "react";
import { BlogGrid } from "./blog-grid";
import { Id } from "../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { ChevronDown } from "lucide-react";

interface FilteredBlogGridProps {
    categoryId?: Id<"categories">;
    pillar?: string;
}

const TYPE_FILTERS = [
    { label: "All", value: "all" },
    { label: "Clusters", value: "cluster" },
    { label: "Micro posts", value: "micro" },
    { label: "Insight pages", value: "insight" },
    { label: "Guides", value: "pillar" },
];

export function FilteredBlogGrid({ categoryId, pillar }: FilteredBlogGridProps) {
    const [selectedType, setSelectedType] = useState<string>("all");
    const [selectedTopic, setSelectedTopic] = useState<string>("all");

    const allTopics = useQuery(api.articles.getAllTopics) || [];

    return (
        <div className="w-full flex flex-col gap-8">
            {/* Filters UI */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                
                {/* Type Filters (Pills) */}
                <div className="flex flex-wrap gap-2">
                    {TYPE_FILTERS.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setSelectedType(filter.value)}
                            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                                selectedType === filter.value
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                            }`}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                {/* Topic Filter Dropdown */}
                <div className="relative min-w-[200px]">
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                        <ChevronDown size={14} />
                    </div>
                    <select
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                        className="w-full appearance-none bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 text-sm font-medium rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer"
                    >
                        <option value="all">All Topics</option>
                        {allTopics.map((topic) => (
                            <option key={topic} value={topic}>
                                {topic.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Blog Grid with applied filters */}
            <BlogGrid 
                categoryId={categoryId} 
                pillar={pillar} 
                type={selectedType !== "all" ? selectedType : undefined} 
                topic={selectedTopic !== "all" ? selectedTopic : undefined} 
            />
        </div>
    );
}
