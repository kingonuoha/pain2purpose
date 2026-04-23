"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { slugify } from "@/lib/utils";
import { JoinedArticle } from "@/components/blog-grid";
import { CommentsSection } from "@/components/comments-section";
import { Newsletter } from "@/components/newsletter";

import { Sidebar } from "@/components/blog/Sidebar";

interface ArticleContentProps {
    initialArticle: JoinedArticle;
    slug: string;
}

export function ArticleContent({ initialArticle, slug }: ArticleContentProps) {
    const article = useQuery(api.articles.getBySlug, { slug }) || initialArticle;
    if (!article) return null;

    // recentArticlesResult used in Sidebar implicitly or for SEO/Preload

    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const shareTitle = article.title;

    const handleShare = async (platform?: string) => {
        if (platform === 'copy') {
            navigator.clipboard.writeText(shareUrl);
            toast.success("Link copied to clipboard!");
            return;
        }

        if (navigator.share && !platform) {
            try {
                await navigator.share({
                    title: shareTitle,
                    url: shareUrl,
                });
                return;
            } catch (err) {
                console.log("Share failed", err);
            }
        }

        const urls: Record<string, string> = {
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
            whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + shareUrl)}`,
        };

        if (platform && urls[platform]) {
            window.open(urls[platform], '_blank', 'width=600,height=400');
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
                                                        <Link href={`/tags/${slugify(tag)}`}>{tag}</Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <h4 className="wrap_title text-md-end">Share:</h4>
                                            <ul className="social_links unordered_list justify-content-md-end">
                                                <li><button onClick={() => handleShare('copy')} title="Copy Link"><i className="fa-solid fa-link"></i></button></li>
                                                <li><button onClick={() => handleShare('facebook')} title="Share on Facebook"><i className="fa-brands fa-facebook-f"></i></button></li>
                                                <li><button onClick={() => handleShare('twitter')} title="Share on Twitter"><i className="fa-brands fa-twitter"></i></button></li>
                                                <li><button onClick={() => handleShare('whatsapp')} title="Share on WhatsApp"><i className="fa-brands fa-whatsapp"></i></button></li>
                                                <li><button onClick={() => handleShare()} title="More Share Options"><i className="fa-solid fa-share-nodes"></i></button></li>
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

                            <CommentsSection articleId={article._id} />
                        </div>

                        <div className="col-lg-4">
                            <Sidebar />
                        </div>
                    </div>
                </div>
            </section>
            {/* Blog Details Section - End */}

            <Newsletter />
        </main>
    );
}
