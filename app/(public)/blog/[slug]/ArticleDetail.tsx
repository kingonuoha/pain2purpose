"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { JoinedArticle } from "@/components/blog-grid";
import { CommentsSection } from "@/components/comments-section";
import { Newsletter } from "@/components/newsletter";

interface ArticleContentProps {
    initialArticle: JoinedArticle;
    slug: string;
}

export function ArticleContent({ initialArticle, slug }: ArticleContentProps) {
    const article = useQuery(api.articles.getBySlug, { slug }) || initialArticle;
    const recentArticlesResult = useQuery(api.articles.list, { paginationOpts: { numItems: 3, cursor: null } });
    const categories = useQuery(api.categories.listAll, {});

    if (!article) return null;

    const recentArticles = recentArticlesResult?.page?.filter(a => a._id !== article._id).slice(0, 3) || [];

    const copyLink = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    return (
        <main className="page_content">
            {/* Page Banner - Start */}
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <h1 className="page_title">{article.title}</h1>
                    <ul className="breadcrumb_nav unordered_list justify-content-center justify-content-lg-start">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li>Blog Details</li>
                    </ul>
                </div>
                <div className="decoration_item shape_leaf_1">
                    <Image src="/assets/images/shapes/shape_leaf_left.svg" width={100} height={100} alt="Shape Leaf" />
                </div>
                <div className="decoration_item shape_leaf_2">
                    <Image src="/assets/images/shapes/shape_leaf_right.svg" width={100} height={100} alt="Shape Leaf" />
                </div>
            </section>
            {/* Page Banner - End */}

            {/* Blog Details Section - Start */}
            <section className="blog_details_section section_space_lg pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="details_image">
                                <Image 
                                    src={(article.coverImage && (article.coverImage.startsWith('/') || article.coverImage.startsWith('http'))) ? article.coverImage : "/assets/images/blogs/blog_details_image_1-min.jpg"} 
                                    alt={article.title}
                                    width={1170}
                                    height={600}
                                    className="rounded-[30px]"
                                />
                            </div>
                            <div className="details_content">
                                <ul className="post_meta unordered_list mb-4">
                                    <li><i className="fa-regular fa-calendar-days"></i> {new Date(article.publishedAt || article.createdAt || 0).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</li>
                                    <li><a href="#!"><i className="fa-regular fa-eye"></i> {article.viewCount || 0} Views</a></li>
                                    <li><Link href="#comments-section"><i className="fa-regular fa-comment"></i> Community Reflections</Link></li>
                                </ul>
                                
                                <div 
                                    className="prose prose-p2p max-w-none 
                                        prose-p:text-[#51565D] prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
                                        prose-headings:font-bold prose-headings:text-[#293039] prose-headings:mt-12 prose-headings:mb-6
                                        prose-h2:text-4xl prose-h3:text-2xl
                                        prose-blockquote:border-l-0 prose-blockquote:p-0 prose-blockquote:m-0
                                        prose-img:rounded-[30px] prose-img:my-12
                                        prose-a:text-p2p-sage prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                                        prose-ul:list-disc prose-ul:pl-8 prose-li:text-[#51565D] prose-li:text-lg prose-li:mb-4
                                    "
                                    dangerouslySetInnerHTML={{ __html: (article.content || "") as string }} 
                                />

                                <div className="post_tagsandshare">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h4 className="wrap_title">Related Tags</h4>
                                            <ul className="post_tags unordered_list">
                                                {article.tags?.map(tag => (
                                                    <li key={tag}>
                                                        <Link href={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h4 className="wrap_title text-md-end">Share:</h4>
                                            <ul className="social_links unordered_list justify-content-md-end">
                                                <li><button onClick={copyLink} title="Copy Link"><i className="fa-solid fa-link"></i></button></li>
                                                <li><a href="#!"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                <li><a href="#!"><i className="fa-brands fa-instagram"></i></a></li>
                                                <li><a href="#!"><i className="fa-brands fa-twitter"></i></a></li>
                                                <li><a href="#!"><i className="fa-brands fa-whatsapp"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="prev_next_post_nav">
                                    <Link href="/blog">
                                        <span className="item_icon">
                                            <i className="fa-regular fa-angle-left"></i>
                                        </span>
                                        <span className="item_content">
                                            <b>Previous</b>
                                            <strong>Return to Insights</strong>
                                        </span>
                                    </Link>
                                    <Link href="/blog">
                                        <span className="item_icon">
                                            <i className="fa-regular fa-angle-right"></i>
                                        </span>
                                        <span className="item_content">
                                            <b>Next</b>
                                            <strong>Explore More Articles</strong>
                                        </span>
                                    </Link>
                                </div>
                            </div>

                            <div className="blog_post_author">
                                <div className="author_image">
                                    <Image 
                                        src="/assets/images/new_pics/sandra-square (1).png" 
                                        alt="Sandra Opara"
                                        width={170}
                                        height={170}
                                        className="rounded-full object-cover aspect-square"
                                    />
                                </div>
                                <div className="author_content">
                                    <h4 className="author_name">{article.authorName || "Sandra Opara"}</h4>
                                    <span className="author_designation">Psychotherapist, Founder of P2P</span>
                                    <p className="mb-0 italic">
                                        Helping individuals navigate the complexities of grief, loss, and life transitions through compassionate therapy and authentic storytelling.
                                    </p>
                                </div>
                            </div>

                            <div className="comment_area section_space_lg pb-0" id="comments-section">
                                <CommentsSection articleId={article._id} />
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <aside className="sidebar ps-lg-4">
                                <div className="sidebar_widget">
                                    <h3 className="sidebar_widget_title">
                                        <span className="title_icon">
                                            <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                                        </span>
                                        <span className="title_text">Categories</span>
                                    </h3>
                                    <ul className="post_category_list unordered_list_block">
                                        {categories?.map(cat => (
                                            <li key={cat._id}>
                                                <Link href={`/category/${cat.slug}`}>
                                                    <span className="category_name">{cat.name}</span>
                                                    <span className="category_counter">{cat.articleCount || 0}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="sidebar_widget">
                                    <h3 className="sidebar_widget_title">
                                        <span className="title_icon">
                                            <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                                        </span>
                                        <span className="title_text">Recent Insights</span>
                                    </h3>
                                    <ul className="reecommended_post_group unordered_list_block">
                                        {recentArticles.map((ra) => (
                                            <li key={ra._id}>
                                                <div className="blog_item_small">
                                                    <div className="blog_image">
                                                        <Link className="blog_image_wrap" href={`/blog/${ra.slug}`}>
                                                            <Image 
                                                                src={(ra.coverImage && (ra.coverImage.startsWith('/') || ra.coverImage.startsWith('http'))) ? ra.coverImage : "/assets/images/blogs/small_blog_image_1.jpg"} 
                                                                alt={ra.title}
                                                                width={80}
                                                                height={80}
                                                                className="object-cover"
                                                            />
                                                        </Link>
                                                    </div>
                                                    <div className="blog_content">
                                                        <h3 className="item_title">
                                                            <Link href={`/blog/${ra.slug}`}>{ra.title}</Link>
                                                        </h3>
                                                        <ul className="post_meta unordered_list">
                                                            <li>{new Date(ra.publishedAt || ra.createdAt || 0).toLocaleDateString()}</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="sidebar_widget">
                                    <h3 className="sidebar_widget_title">
                                        <span className="title_icon">
                                            <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                                        </span>
                                        <span className="title_text">Popular Tags</span>
                                    </h3>
                                    <ul className="post_tags unordered_list">
                                        {article.tags?.slice(0, 7).map(tag => (
                                            <li key={tag}>
                                                <Link href={`/tags/${tag.toLowerCase()}`}>{tag}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
            {/* Blog Details Section - End */}

            <Newsletter />
        </main>
    );
}
