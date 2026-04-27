"use client";

import Link from "next/link";
import Image from "next/image";
import { usePaginatedQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Id } from "../convex/_generated/dataModel";
import { BlogSkeleton } from "./skeletons";
import { getCloudinaryUrl } from "@/lib/utils";
import { EmptyState } from "./empty-state";

interface BlogGridProps {
    categoryId?: Id<"categories">;
    pillar?: string;
    type?: string;
    tag?: string;
}

export type JoinedArticle = {
    _id: Id<"articles">;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    tags?: string[];
    coverImage?: string;
    publishedAt?: number;
    createdAt?: number;
    updatedAt?: number;
    viewCount?: number;
    categoryId?: Id<"categories">;
    categoryName?: string;
    authorName?: string;
    authorImage?: string;
    authorId?: string;
    type?: string;
    readingTime?: number;
};

export function BlogGrid({ categoryId, pillar, type, tag, initialArticles }: BlogGridProps & { initialArticles?: JoinedArticle[] }) {
    const { results, status, loadMore } = usePaginatedQuery(
        api.articles.list,
        { categoryId, pillar, type, tag },
        { initialNumItems: initialArticles?.length || 6 }
    );

    const articles = results.length > 0 ? results : initialArticles;

    if (articles === undefined && status === "LoadingFirstPage") {
        return <BlogSkeleton />;
    }

    if (!articles || articles.length === 0) {
        return (
            <EmptyState
                title="No Articles Found"
                description="No articles found matching your current filter."
                illustration="No-results-found.svg"
                action={
                    <Link href="/" className="btn btn-primary">
                        <span className="btn_text" data-text="Back to Home">Back to Home</span>
                        <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                    </Link>
                }
            />
        );
    }

    const hasMore = status === "CanLoadMore";

    return (
        <div className="w-full">
            <div className="row">
                {articles.map((article: JoinedArticle) => (
                    <div key={article._id} className="col-md-6 mb-4">
                        <div className="blog_item h-100 d-flex flex-column border-0 shadow-sm rounded-4 overflow-hidden bg-white transition-all hover-lift">
                            <div className="blog_image">
                                <Link className="blog_image_wrap ratio ratio-16x9 d-block overflow-hidden position-relative" href={`/blog/${article.slug}`}>
                                    <Image
                                        src={getCloudinaryUrl(
                                            (article.coverImage && (article.coverImage.startsWith('/') || article.coverImage.startsWith('http'))) 
                                                ? article.coverImage 
                                                : "/assets/images/blogs/blog_image_1-min.jpg", 
                                            "w_800,c_fill,q_auto,f_auto"
                                        )}
                                        alt={article.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="object-fit-cover"
                                        unoptimized
                                    />
                                </Link>
                            </div>
                            <div className="blog_content p-4 d-flex flex-column flex-grow-1">
                                <div className="author_byline d-flex align-items-center mb-3">
                                    <div className="author_image me-2">
                                        <Image 
                                            src="/assets/images/new_pics/sandra-square (1).png" 
                                            alt="Sandra Opara" 
                                            width={32} 
                                            height={32} 
                                            className="rounded-circle object-cover"
                                            style={{ width: '32px', height: '32px' }}
                                        />
                                    </div>
                                    <span className="author_name fw-bold text-uppercase tracking-wider" style={{ fontSize: '10px', color: 'var(--p2p-sage)' }}>Sandra Opara</span>
                                </div>
                                {article.categoryName && (
                                    <ul className="post_category unordered_list mb-2">
                                        <li><Link href="#!" className="text-decoration-none text-muted small">{article.categoryName}</Link></li>
                                    </ul>
                                )}
                                <ul className="post_meta unordered_list mb-3 small text-muted">
                                    <li>
                                        {new Date(article.publishedAt || article.createdAt || 0).toLocaleDateString("en-US", {
                                            day: "numeric", month: "long", year: "numeric"
                                        })}
                                    </li>
                                    {article.viewCount !== undefined && (
                                        <li>
                                            <i className="fa-regular fa-eye me-1"></i>
                                            {article.viewCount} Views
                                        </li>
                                    )}
                                </ul>
                                <h3 className="item_title h5 fw-bold mb-3">
                                    <Link href={`/blog/${article.slug}`} className="text-dark text-decoration-none">{article.title}</Link>
                                </h3>
                                {article.excerpt && <p className="text-muted small mb-4 flex-grow-1 line-clamp-3">{article.excerpt}</p>}
                                <div className="mt-auto pt-3 border-top">
                                    <Link className="btn-link d-inline-flex align-items-center gap-2 text-decoration-none fw-bold" style={{ color: 'var(--p2p-sage)' }} href={`/blog/${article.slug}`}>
                                        <span className="btn_text">Read More</span>
                                        <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {hasMore && (
                <div className="pagination_wrap mt-5">
                    <ul className="pagination_nav unordered_list justify-content-center">
                        <li>
                            <button onClick={() => loadMore(6)} className="btn btn-primary btn-sm">
                                Load More
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default BlogGrid;
