import { ServicesGrid } from "@/components/home/ServicesGrid";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import Link from "next/link";
import Image from "next/image";
import CertificateSection from "@/components/home/CertificateSection";

export default function AboutPage() {
    return (
        <main className="page_content">
            {/* Page Banner - Start */}
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="page_title mb-0">About</h1>
                        </div>
                        <div className="col-lg-6">
                            <ul className="breadcrumb_nav unordered_list justify-content-lg-end justify-content-center">
                                <li><Link href="/">Home</Link></li>
                                <li>About</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="decoration_item shape_leaf_1">
                    <Image src="/assets/images/shapes/shape_leaf_left.svg" alt="Shape Leaf" width={150} height={150} />
                </div>
                <div className="decoration_item shape_leaf_2">
                    <Image src="/assets/images/shapes/shape_leaf_right.svg" alt="Shape Leaf" width={150} height={150} />
                </div>
            </section>
            {/* Page Banner - End */}

            {/* About Section - Start */}
            <section className="about_section section_space_lg">
                <div className="container">
                    <div className="row align-items-center justify-content-lg-between">
                        <div className="col-lg-6 order-lg-last">
                            <div className="image_widget relative">
                                <Image 
                                    src="/assets/images/new_pics/sandra-square (11).png" 
                                    alt="Sandra Opara speaking at a counselling event" 
                                    width={600}
                                    height={600}
                                    className="rounded-[30px] object-cover w-full aspect-square"
                                />
                                <div className="image_shape bg_primary_light"></div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about_content">
                                <div className="section_heading mb-4">
                                    <h2 className="section_heading_text">
                                        <mark>Sandra Opara</mark> — LPC, Family Transitions.  
                                    </h2>
                                    <p className="section_heading_description mb-0">
                                        With over 15 years in therapeutic practice, my journey has always been about one thing: guiding people back to themselves. I believe that pain is not a dead end, but a catalyst for profound personal transformation.
                                    </p>
                                    <p className="section_heading_description mt-3">
                                        Whether you are navigating the heavy fog of grief or the turbulent waters of a major life transition, my goal is to provide the steady ground and the tools you need to find your way forward.
                                    </p>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 col-sm-6">
                                        <ul className="info_list unordered_list_block">
                                            <li>
                                                <span className="info_icon">
                                                    <i className="fa-solid fa-circle-check"></i>
                                                </span>
                                                <span className="info_text">Personal Consultations</span>
                                            </li>
                                            <li>
                                                <span className="info_icon">
                                                    <i className="fa-solid fa-circle-check"></i>
                                                </span>
                                                <span className="info_text">Compassionate Support</span>
                                            </li>
                                            <li>
                                                <span className="info_icon">
                                                    <i className="fa-solid fa-circle-check"></i>
                                                </span>
                                                <span className="info_text">Online Therapy</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-5 col-sm-6">
                                        <ul className="info_list unordered_list_block">
                                            <li>
                                                <span className="info_icon">
                                                    <i className="fa-solid fa-circle-check"></i>
                                                </span>
                                                <span className="info_text">Lived Experience</span>
                                            </li>
                                            <li>
                                                <span className="info_icon">
                                                    <i className="fa-solid fa-circle-check"></i>
                                                </span>
                                                <span className="info_text">Healing Pathways</span>
                                            </li>
                                        </ul>
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

            {/* Speaking & Advocacy Section - Start */}
            <section className="speaking_section section_space_lg bg_primary_light">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="image_widget relative">
                                <Image 
                                    src="/assets/images/new_pics/sandra-square (14).png" 
                                    alt="Sandra Opara advocating for mental health awareness" 
                                    width={600} 
                                    height={600} 
                                    className="rounded-[30px] object-cover w-full shadow-2xl aspect-square"
                                />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="ps-lg-5 mt-5 mt-lg-0">
                                <div className="section_heading">
                                    <h2 className="section_heading_text">Speaking & Advocacy</h2>
                                    <p className="section_heading_description">
                                        Beyond the therapy room, Sandra is a passionate advocate for mental health awareness. She frequently speaks at events, sharing insights on grief, autism, and the transformative power of purposeful living.
                                    </p>
                                </div>
                                <p className="mb-4">
                                    Her mission is to break the stigma surrounding mental health challenges and empower individuals to reclaim their narratives through authenticity and shared experience.
                                </p>
                                <Link className="btn btn-outline-primary" href="/contact">
                                    <span className="btn_text" data-text="Book for Speaking">Book for Speaking</span>
                                    <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Speaking & Advocacy Section - End */}

            <CertificateSection />
            {/* Work Process Section - Start */}
            <section className="work_process_section section_space_lg">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-last">
                            <div className="images_group_widget">
                                <ul className="unordered_list">
                                    <li>
                                        <Image src="/assets/images/new_pics/sandra-square (1).png" alt="Sandra Opara - Counseling" width={300} height={300} className="rounded-[20px]" />
                                        <Image src="/assets/images/new_pics/sandra-square (14).png" alt="Sandra Opara - Therapy" width={300} height={300} className="rounded-[20px]" />
                                    </li>
                                    <li>
                                        <Image src="/assets/images/new_pics/sandra-square (13).png" alt="Sandra Opara - Support" width={300} height={300} className="rounded-[20px]" />
                                        <Image src="/assets/images/new_pics/sandra- (13).png" alt="Sandra Opara - Healing" width={300} height={300} className="rounded-[20px]" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="section_heading">
                                <h2 className="section_heading_text mb-0">
                                    Stages of consultation with patients on mental health
                                </h2>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <div className="work_process_item">
                                        <div className="serial_number">01</div>
                                        <h3 className="item_title">Request on the site</h3>
                                        <p className="mb-0">
                                            Fill out the contact form to schedule an initial consultation.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="work_process_item">
                                        <div className="serial_number">02</div>
                                        <h3 className="item_title">Timing</h3>
                                        <p className="mb-0">
                                            We will coordinate a time that works best for your schedule.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="work_process_item">
                                        <div className="serial_number">03</div>
                                        <h3 className="item_title">Conducting a session</h3>
                                        <p className="mb-0">
                                            A safe, confidential space to discuss your needs and goals.
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="work_process_item">
                                        <div className="serial_number">04</div>
                                        <h3 className="item_title">Healing Pathway</h3>
                                        <p className="mb-0">
                                            Ongoing support tailored to your unique journey toward purpose.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Work Process Section - End */}

            <ServicesGrid />

            <ConsultationSection />

        </main>
    );
}


