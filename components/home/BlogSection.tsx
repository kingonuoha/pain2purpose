"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";

export function BlogSection() {
    const listResult = useQuery(api.articles.list, { 
        paginationOpts: { numItems: 3, cursor: null } 
    });
    const articles = listResult?.page || [];

    return (
        <section className="blog_section section_space_lg">
            <div className="container">
                <div className="section_heading text-center">
                    <h2 className="section_heading_text">Our Latest Articles</h2>
                    <p className="section_heading_description">
                        Deep truths, delivered. Join seekers getting weekly insights on healing and growth.
                    </p>
                </div>
                <div className="row">
                    {articles.map((article) => (
                        <div key={article._id} className="col-lg-4 col-md-6 col-sm-6">
                            <div className="blog_item">
                                <Link className="blog_image_wrap" href={`/blog/${article.slug}`}>
                                    <Image
                                        src={(article.coverImage && (article.coverImage.startsWith('/') || article.coverImage.startsWith('http'))) ? article.coverImage : "/assets/images/blogs/blog_image_1-min.jpg"}
                                        alt={article.title}
                                        width={400}
                                        height={280}
                                        style={{ width: '100%', height: '280px', objectFit: 'cover', display: 'block' }}
                                    />
                                </Link>
                                <div className="blog_content">
                                    <div className="author_byline d-flex align-items-center mb-3">
                                        <div className="author_image me-2">
                                            <Image 
                                                src="/assets/images/new_pics/sandra-square (1).png" 
                                                alt="Sandra Opara" 
                                                width={40} 
                                                height={40} 
                                                className="rounded-full object-cover"
                                                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                            />
                                        </div>
                                        <span className="author_name text-xs font-bold uppercase tracking-wider" style={{ fontSize: '11px', color: 'var(--p2p-sage)' }}>Sandra Opara</span>
                                    </div>
                                    <ul className="post_meta unordered_list">
                                        <li>{new Date(article.createdAt).toLocaleDateString()}</li>
                                        <li><Link href="/blog">Insight</Link></li>
                                    </ul>
                                    <h3 className="item_title">
                                        <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                                    </h3>
                                    <Link className="btn-link" href={`/blog/${article.slug}`}>
                                        <span className="btn_text" data-text="Read More">Read More</span>
                                        <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="btn_wrap text-center">
                    <Link className="btn btn-primary" href="/blog">
                        <span className="btn_text" data-text="View All Articles">View All Articles</span>
                        <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default BlogSection;
