import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ConsultationSection } from "@/components/home/ConsultationSection";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const service = await fetchQuery(api.services.getBySlug, { slug });
    
    if (!service) return { title: "Service Not Found | Pain2Purpose" };

    return {
        title: `${service.title} | Therapeutic Services`,
        description: service.shortDescription || `Professional counselling and support for ${service.title}.`,
    };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [service, allServices] = await Promise.all([
        fetchQuery(api.services.getBySlug, { slug }),
        fetchQuery(api.services.listAll, {})
    ]);

    if (!service) notFound();

    return (
        <main className="page_content">
            {/* Page Banner - Start */}
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <h1 className="page_title">{service.title}</h1>
                    <ul className="breadcrumb_nav unordered_list justify-content-center justify-content-lg-start">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/#services">Services</Link></li>
                        <li>Service Details</li>
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

            {/* Service Details Section - Start */}
            <section className="service_details_section section_space_lg pb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="service_details_content">
                                <div className="video_wrapper rounded-[30px] overflow-hidden mb-5">
                                    <Image 
                                        src={service.coverImage || "/assets/images/services/service_details_image_1-min.jpg"} 
                                        alt={service.title}
                                        width={1170}
                                        height={600}
                                        className="w-full"
                                    />
                                    {/* Video play button placeholder if we had a video url */}
                                </div>
                                <h2 className="details_item_title">{service.title}</h2>
                                <div 
                                    className="prose prose-p2p max-w-none 
                                        prose-p:text-[#51565D] prose-p:text-lg prose-p:leading-relaxed prose-p:mb-8
                                        prose-headings:font-bold prose-headings:text-[#293039] prose-headings:mt-12 prose-headings:mb-6
                                        prose-h3:text-2xl"
                                    dangerouslySetInnerHTML={{ __html: service.fullDescription || service.shortDescription || "" }} 
                                />

                                <div className="row mb-5">
                                    <div className="col-md-12">
                                        <div className="service_author">
                                            <div className="author_image">
                                                <Image src="/assets/images/new_pics/sandra-square (1).png" alt="Sandra Opara" width={100} height={100} className="object-cover aspect-square" />
                                            </div>
                                            <div className="author_content">
                                                <h4 className="author_name">Sandra Opara</h4>
                                                <span className="author_designation">Therapist</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="service_problem_solve">
                                    <h3 className="details_info_title">How therapy can solve your problem?</h3>
                                    <p>
                                        Through our collaborative sessions, we work to identify the root causes of your challenges and develop practical strategies for sustainable change.
                                    </p>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <ul className="info_list unordered_list_block">
                                                <li>
                                                    <span className="info_icon"><i className="fa-solid fa-circle-check"></i></span>
                                                    <span className="info_text">Provides a safe, non-judgmental space</span>
                                                </li>
                                                <li>
                                                    <span className="info_icon"><i className="fa-solid fa-circle-check"></i></span>
                                                    <span className="info_text">Helps process complex emotions</span>
                                                </li>
                                                <li>
                                                    <span className="info_icon"><i className="fa-solid fa-circle-check"></i></span>
                                                    <span className="info_text">Builds resilience and coping skills</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="info_list unordered_list_block">
                                                <li>
                                                    <span className="info_icon"><i className="fa-solid fa-circle-check"></i></span>
                                                    <span className="info_text">Improves self-awareness and clarity</span>
                                                </li>
                                                <li>
                                                    <span className="info_icon"><i className="fa-solid fa-circle-check"></i></span>
                                                    <span className="info_text">Strengthens personal relationships</span>
                                                </li>
                                                <li>
                                                    <span className="info_icon"><i className="fa-solid fa-circle-check"></i></span>
                                                    <span className="info_text">Supports long-term mental wellness</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="work_process_stages section_space_lg pb-0">
                                    <h3 className="details_info_title">Work Process</h3>
                                    <div className="row">
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className="work_process_item">
                                                <div className="serial_number">01</div>
                                                <h4 className="item_title">Discovery</h4>
                                                <p className="mb-0">Initial meeting to understand your history and goals.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className="work_process_item">
                                                <div className="serial_number">02</div>
                                                <h4 className="item_title">Integration</h4>
                                                <p className="mb-0">Active therapy sessions using evidence-based techniques.</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-6 col-sm-6">
                                            <div className="work_process_item">
                                                <div className="serial_number">03</div>
                                                <h4 className="item_title">Growth</h4>
                                                <p className="mb-0">Applying insights to your daily life for lasting change.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="prev_next_post_nav">
                                    <Link href="/#services">
                                        <span className="item_icon">
                                            <i className="fa-regular fa-angle-left"></i>
                                        </span>
                                        <span className="item_content">
                                            <b>Previous</b>
                                            <strong>View All Services</strong>
                                        </span>
                                    </Link>
                                    <Link href="/contact">
                                        <span className="item_icon">
                                            <i className="fa-regular fa-angle-right"></i>
                                        </span>
                                        <span className="item_content">
                                            <b>Next</b>
                                            <strong>Book a Consultation</strong>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <aside className="sidebar service_sidebar ps-lg-4">
                                <div className="sidebar_widget">
                                    <h3 className="sidebar_widget_title">
                                        <span className="title_icon">
                                            <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                                        </span>
                                        <span className="title_text">All Services</span>
                                    </h3>
                                    <ul className="service_category_list unordered_list_block">
                                        {allServices.map((s) => (
                                            <li key={s._id} className={s.slug === slug ? "active" : ""}>
                                                <Link href={`/services/${s.slug}`}>
                                                    <i className="fa-solid fa-arrow-up-right"></i>
                                                    <span>{s.title}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="sidebar_widget bg_primary_light">
                                    <div className="contact_info_box">
                                        <div className="author_image_sidebar mb-4">
                                            <Image 
                                                src="/assets/images/new_pics/sandra-square (9).png" 
                                                alt="Sandra Opara" 
                                                width={400} 
                                                height={400} 
                                                className="rounded-[30px] shadow-sm" 
                                                style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h3 className="sidebar_widget_title">
                                            <span className="title_icon">
                                                <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                                            </span>
                                            <span className="title_text">Need Urgent Support?</span>
                                        </h3>
                                        <p>
                                            If you&apos;re in crisis or need immediate assistance, please reach out directly. I am here to support you.
                                        </p>
                                        <ul className="contact_info_list unordered_list_block">
                                            <li>
                                                <div className="item_icon">
                                                    <i className="fa-solid fa-phone"></i>
                                                </div>
                                                <div className="item_content">
                                                    <h4 className="item_title">Call Us:</h4>
                                                    <span className="item_info">+44 (0) 000 000 000</span>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="item_icon">
                                                    <i className="fa-solid fa-envelope"></i>
                                                </div>
                                                <div className="item_content">
                                                    <h4 className="item_title">Email Us:</h4>
                                                    <span className="item_info">hello@counsellingp2p.com</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <Link href="/contact" className="btn btn-primary w-100 mt-4">
                                            <span className="btn_text" data-text="Book a Session">Book a Session</span>
                                            <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                                        </Link>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
            {/* Service Details Section - End */}

            <ConsultationSection />
        </main>
    );
}
