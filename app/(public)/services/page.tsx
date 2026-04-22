import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import Link from "next/link";
import Image from "next/image";

// /* eslint-disable @next/next/no-img-element */

export default function ServicesPage() {
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
            <ServicesGrid />
            {/* Service Section - End */}

            {/* About Section - Start */}
            <section className="about_section section_space_lg bg_primary_light">
                <div className="container">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 order-lg-last">
                            <div className="image_widget ps-lg-4">
                                <Image src="/assets/images/about/about_image_10-min.jpg" alt="About Therapy" width={600} height={400} className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about_content">
                                <div className="section_heading mb-lg-5">
                                    <h2 className="section_heading_text">
                                        Personalized Therapy
                                    </h2>
                                    <p className="section_heading_description mb-0">
                                        Our practice offers a range of specialized counseling services designed to meet you exactly where you are. We combine evidence-based techniques with deep compassion.
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
                                                We lead with empathy, ensuring you feel seen, heard, and valued.
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
                                                Consistent support to navigate your healing journey.
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
                                                We address the mind, body, and spirit for lasting healing.
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
                                                A safe environment to express your truths without judgment.
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
