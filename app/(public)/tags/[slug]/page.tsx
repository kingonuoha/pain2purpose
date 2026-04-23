import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { BlogGrid } from "@/components/blog-grid";
import { Sidebar } from "@/components/blog/Sidebar";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Topic: ${slug.split('-').join(' ')} | Pain2Purpose`,
        description: `Explore all insights tagged with ${slug.split('-').join(' ')}.`,
    };
}

export default async function TagPage({ 
    params,
}: { 
    params: Promise<{ slug: string }>,
}) {
    const { slug } = await params;
    const displayTag = slug.split('-').join(' ');
    
    return (
        <main className="page_content">
            {/* Page Banner - Start */}
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="page_title mb-0">#{displayTag}</h1>
                        </div>
                        <div className="col-lg-6">
                            <ul className="breadcrumb_nav unordered_list justify-content-md-end justify-content-center">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href="/blog">Blog</Link></li>
                                <li>#{displayTag}</li>
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

            {/* Tag Blog Section - Start */}
            <section className="blog_section section_space_lg">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="category_header mb-5">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className="line bg-primary" style={{ width: '40px', height: '2px' }} />
                                    <span className="text-uppercase fw-bold text-primary tracking-widest" style={{ fontSize: '12px' }}>Topic Collection</span>
                                </div>
                                <h2 className="section_heading_text italic">Insights Tagged: {displayTag}</h2>
                                <p className="lead text-muted italic mt-3">
                                    Curated collection of reflections specifically labeled under the <strong>{displayTag}</strong> theme.
                                </p>
                            </div>
                            <BlogGrid tag={displayTag} />
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
