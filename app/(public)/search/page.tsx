import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BlogGrid, JoinedArticle } from "@/components/blog-grid";
import { Sidebar } from "@/components/blog/Sidebar";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
    const { q } = await searchParams;
    return {
        title: q ? `Search results for "${q}" | Pain2Purpose` : "Search | Pain2Purpose",
        description: q ? `Search results for "${q}" on Pain2Purpose blog.` : "Search articles on Pain2Purpose.",
    };
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    
    // Using the search query if provided, otherwise returning empty or latest?
    // Let's use the search query
    const results = q ? await fetchQuery(api.articles.search, { query: q }) : [];

    return (
        <main className="page_content">
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="page_title mb-0">Search Results</h1>
                        </div>
                        <div className="col-lg-6">
                            <ul className="breadcrumb_nav unordered_list justify-content-md-end justify-content-center">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li>Search</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="decoration_item shape_leaf_1">
                    <Image src="/assets/images/shapes/shape_leaf_left.svg" alt="Shape Leaf" width={200} height={200} />
                </div>
                <div className="decoration_item shape_leaf_2">
                    <Image src="/assets/images/shapes/shape_leaf_right.svg" alt="Shape Leaf" width={200} height={200} />
                </div>
            </section>

            <section className="blog_section section_space_lg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="search_header mb-5">
                                <h2 className="section_heading_text italic">
                                    {q ? `Showing results for "${q}"` : "Enter a search term"}
                                </h2>
                                <p className="text-muted mt-2">
                                    {results.length} {results.length === 1 ? 'article' : 'articles'} found
                                </p>
                            </div>
                            
                            {results.length > 0 ? (
                                <BlogGrid initialArticles={results as unknown as JoinedArticle[]} />
                            ) : (
                                <div className="text-center py-5 bg-light rounded-xl">
                                    <i className="fa-regular fa-face-frown-slight fs-1 text-muted mb-3 d-block"></i>
                                    <h3 className="text-muted">No articles found matching your search.</h3>
                                    <p className="mb-4">Try different keywords or browse our categories.</p>
                                    <Link href="/blog" className="btn btn-primary">
                                        <span className="btn_text" data-text="Browse All Posts">Browse All Posts</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
