import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Therapeutic Services | Pain2Purpose Counselling",
    description: "Specialized counselling services including individual therapy, grief support, neurodivergence counselling, and trauma-informed care with Sandra Opara.",
    keywords: ["counselling services", "therapy PA", "grief support", "trauma therapy", "neurodivergence support", "Sandra Opara"],
};

import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const revalidate = 60;

export default async function ServicesPage() {
    const services = await fetchQuery(api.services.list);

    return (
        <main className="page_content">
            {/* Page Banner - Start */}
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="page_title mb-0">All Programs</h1>
                        </div>
                        <div className="col-lg-6">
                            <ul className="breadcrumb_nav unordered_list justify-content-lg-end justify-content-center">
                                <li><Link href="/">Home</Link></li>
                                <li>All Programs</li>
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
            {/* Page Banner - End */}

            {/* Service Section - Start */}
            <ServicesGrid initialServices={services} />
            {/* Service Section - End */}

            {/* About Section - Start */}
            <section className="about_section section_space_lg bg_primary_light">
                <div className="container">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 order-lg-last">
                            <div className="image_widget ps-lg-4">
                                <Image 
                                    src="/assets/images/new_pics/sandra- (13).png" 
                                    alt="Sandra Opara - Personalized Therapy" 
                                    width={600} 
                                    height={400} 
                                    className="img-fluid shadow-lg" 
                                    style={{ borderRadius: '0 80px 0 80px', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about_content">
                                <div className="section_heading mb-lg-5">
                                    <h2 className="section_heading_text italic">
                                        Personalized Therapy from a <span className="text-[#7C9A7E]">Compassionate Expert</span>
                                    </h2>
                                    <p className="section_heading_description mb-0">
                                        My practice offers a range of specialized counseling services designed to meet you exactly where you are. We combine evidence-based techniques with deep compassion to support your unique journey of healing and growth.
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 col-sm-6">
                                        <div className="policy_item">
                                            <div className="title_wrap">
                                                <div className="item_icon">
                                                    <i className="fa-solid fa-hand-holding-heart"></i>
                                                </div>
                                                <h3 className="item_title">Compassionate Care</h3>
                                            </div>
                                            <p className="mb-0">
                                                I lead with empathy, ensuring you feel seen, heard, and valued in every session.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="policy_item">
                                            <div className="title_wrap">
                                                <div className="item_icon">
                                                    <i className="fa-solid fa-headset"></i>
                                                </div>
                                                <h3 className="item_title">Ongoing Support</h3>
                                            </div>
                                            <p className="mb-0">
                                                Consistent, professional support to navigate your healing journey at your own pace.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="policy_item">
                                            <div className="title_wrap">
                                                <div className="item_icon">
                                                    <i className="fa-solid fa-head-side-medical"></i>
                                                </div>
                                                <h3 className="item_title">Holistic Approach</h3>
                                            </div>
                                            <p className="mb-0">
                                                Addressing the mind, body, and spirit for comprehensive and lasting healing.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-sm-6">
                                        <div className="policy_item">
                                            <div className="title_wrap">
                                                <div className="item_icon">
                                                    <i className="fa-solid fa-shield-halved"></i>
                                                </div>
                                                <h3 className="item_title">Confidentiality</h3>
                                            </div>
                                            <p className="mb-0">
                                                A safe environment to express your truths without judgment or breach of trust.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="btn_wrap pb-0">
                                    <Link className="btn btn-primary" href="/contact">
                                        <span className="btn_text" data-text="Get A Consultation">
                                            Get A Consultation
                                        </span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* About Section - End */}

            {/* Why Sandra Section - Start */}
            <section className="why_choose_section section_space_lg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="image_widget pe-lg-4">
                                <Image 
                                    src="/assets/images/new_pics/sandra- (6).png" 
                                    alt="Sandra Opara - Expert Counselling" 
                                    width={600} 
                                    height={400} 
                                    className="img-fluid" 
                                    style={{ borderRadius: '80px 0 80px 0', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about_content">
                                <div className="section_heading mb-lg-5">
                                    <h2 className="section_heading_text italic">
                                        Expert Counselling For <span className="text-[#7C9A7E]">Life&apos;s Challenges</span>
                                    </h2>
                                    <p className="section_heading_description">
                                        I specialize in helping individuals and families navigate the most difficult moments of their lives. Whether you are dealing with grief, trauma, or the complexities of neurodivergence in the family, I am here to guide you toward purpose and peace.
                                    </p>
                                </div>
                                <ul className="info_list unordered_list_block">
                                    <li className="mb-3">
                                        <span className="info_icon text-[#7C9A7E] mr-3"><i className="fa-solid fa-circle-check"></i></span>
                                        <span className="info_text">Safe, Non-judgmental Environment</span>
                                    </li>
                                    <li className="mb-3">
                                        <span className="info_icon text-[#7C9A7E] mr-3"><i className="fa-solid fa-circle-check"></i></span>
                                        <span className="info_text">Tailored Therapeutic Strategies</span>
                                    </li>
                                    <li className="mb-3">
                                        <span className="info_icon text-[#7C9A7E] mr-3"><i className="fa-solid fa-circle-check"></i></span>
                                        <span className="info_text">Support for All Life Transitions</span>
                                    </li>
                                    <li className="mb-3">
                                        <span className="info_icon text-[#7C9A7E] mr-3"><i className="fa-solid fa-circle-check"></i></span>
                                        <span className="info_text">Focus on Long-term Empowerment</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Why Sandra Section - End */}

            {/* Work Process Section - Start */}
            <section className="work_process_section section_space_lg">
                <div className="container">
                    <div className="section_heading text-center">
                        <h2 className="section_heading_text">
                            Counseling Process
                        </h2>
                        <p className="section_heading_description mb-0">
                            A clear and structured path to support your healing and personal growth.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="work_process_item">
                                <div className="serial_number">01</div>
                                <h3 className="item_title">Request on the site</h3>
                                <p className="mb-0">
                                    Fill out the contact form to schedule an initial consultation.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="work_process_item">
                                <div className="serial_number">02</div>
                                <h3 className="item_title">Timing</h3>
                                <p className="mb-0">
                                    We will coordinate a time that works best for your schedule.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="work_process_item">
                                <div className="serial_number">03</div>
                                <h3 className="item_title">Conducting a session</h3>
                                <p className="mb-0">
                                    A safe, confidential space to discuss your needs and goals.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="work_process_item">
                                <div className="serial_number">04</div>
                                <h3 className="item_title">Satisfied review</h3>
                                <p className="mb-0">
                                    Assess your progress and adapt the therapy as needed.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Work Process Section - End */}

            <ConsultationSection />

        </main>
    );
}
