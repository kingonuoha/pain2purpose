import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { BlogGrid } from "@/components/blog-grid";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Sidebar } from "@/components/blog/Sidebar";

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = await fetchQuery(api.categories.getBySlug, { slug });
    
    if (!category) return { title: "Category Not Found | Pain2Purpose" };

    return {
        title: `${category.name} | Pain2Purpose Blog`,
        description: category.description || `Explore insights and reflections on ${category.name}.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await fetchQuery(api.categories.getBySlug, { slug });

    if (!category) notFound();

    return (
        <main className="page_content">
            {/* Page Banner - Start */}
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="page_title mb-0">{category.name}</h1>
                        </div>
                        <div className="col-lg-6">
                            <ul className="breadcrumb_nav unordered_list justify-content-md-end justify-content-center">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li>{category.name}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="decoration_item shape_leaf_1">
                    <Image src="/assets/images/shapes/shape_leaf_left.svg" alt="Leaf" width={100} height={100} />
                </div>
                <div className="decoration_item shape_leaf_2">
                    <Image src="/assets/images/shapes/shape_leaf_right.svg" alt="Leaf" width={100} height={100} />
                </div>
            </section>
            {/* Page Banner - End */}

            {/* Category Blog Section - Start */}
            <section className="blog_section section_space_lg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="category_header mb-5">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="line bg-primary" style={{ width: '40px', height: '2px' }} />
                                    <span className="text-uppercase fw-bold text-primary tracking-widest" style={{ fontSize: '12px' }}>Topic Exploration</span>
                                </div>
                                <h2 className="section_heading_text italic">{category.name} Reflections</h2>
                                {category.description && (
                                    <p className="lead text-muted italic mt-3">{category.description}</p>
                                )}
                            </div>
                            <BlogGrid categoryId={category._id} />
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
