"use client";

import Link from "next/link";
import Image from "next/image";

export function AboutTeaser() {
    return (
        <section className="about_section section_space_lg">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="about_image_wrap decoration_wrapper">
                            <div className="about_image">
                                <Image
                                    src="/assets/images/new_pics/sandra-square (13).png"
                                    alt="Sandra Opara speaking at a counselling event"
                                    width={600}
                                    height={600}
                                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '0 80px 0 80px', aspectRatio: '1 / 1', objectFit: 'cover' }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about_content_wrap">
                            <div className="section_heading">
                                <h2 className="section_heading_text">About Sandra Opara</h2>
                                <p className="section_heading_description">
                                    My mission is to help you move beyond your current struggles and find the purpose buried within your pain. With over 15 years of experience, I specialize in supporting families through their most difficult moments.
                                </p>
                            </div>
                            <ul className="info_list unordered_list_block">
                                <li>
                                    <span className="info_icon">
                                        <i className="fa-solid fa-circle-check"></i>
                                    </span>
                                    <span className="info_text">Certified Professional Counselor</span>
                                </li>
                                <li>
                                    <span className="info_icon">
                                        <i className="fa-solid fa-circle-check"></i>
                                    </span>
                                    <span className="info_text">Over 20 years of experience</span>
                                </li>
                                <li>
                                    <span className="info_icon">
                                        <i className="fa-solid fa-circle-check"></i>
                                    </span>
                                    <span className="info_text">Individual, Couples &amp; Family Support</span>
                                </li>
                            </ul>
                            <div className="btn_wrap">
                                <Link className="btn btn-primary" href="/about">
                                    <span className="btn_text" data-text="Learn More">Learn More</span>
                                    <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutTeaser;
