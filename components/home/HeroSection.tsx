"use client";

import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
    return (
        <section className="hero_section decoration_wrapper">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="hero_content_wrap">
                            <h1 className="heading_text">
                                Private Mental Health Consultation from a Professional
                            </h1>
                            <p className="heading_description">
                                We provide a safe haven for individuals, couples, and families navigating life&apos;s most difficult transitions. Support for healing, growth, and finding meaning.
                            </p>
                            <ul className="btns_group unordered_list">
                                <li>
                                    <Link className="btn btn-primary" href="/contact">
                                        <span className="btn_text" data-text="Get A Consultation">
                                            Get A Consultation
                                        </span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="btn btn-outline-secondary" href="/about">
                                        <span className="btn_text" data-text="Learn More">
                                            Learn More
                                        </span>
                                        <span className="btn_icon">
                                            <i className="fa-solid fa-arrow-up-right"></i>
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                            <ul className="hero_section_counter unordered_list">
                                <li>
                                    <div className="counter_item">
                                        <div className="counter_value mb-0">
                                            <span className="odometer" data-count="20">20</span>
                                            <span>+</span>
                                        </div>
                                        <hr />
                                        <p className="counter_description mb-0">
                                            The years of our experience
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="counter_item">
                                        <div className="counter_value mb-0">
                                            <span className="odometer" data-count="840">840</span>
                                            <span>+</span>
                                        </div>
                                        <hr />
                                        <p className="counter_description mb-0">
                                            Patients received help this year
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div className="counter_item">
                                        <div className="counter_value mb-0">
                                            <span className="odometer" data-count="98">98</span>
                                            <span>%</span>
                                        </div>
                                        <hr />
                                        <p className="counter_description mb-0">
                                            Client improved their condition
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="hero_image_wrap">
                            <Image 
                                src="/assets/images/new_pics/sandra-square (12).png" 
                                alt="Sandra Opara, Pain2Purpose Counselling"
                                width={600}
                                height={600}
                                style={{ borderRadius: '0 80px 0 80px', objectFit: 'cover', width: '100%', aspectRatio: '1 / 1' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="decoration_item shape_blur_shadow"></div>
            <div className="decoration_item shape_leaf">
                <Image src="/assets/images/shapes/shape_leaf_left_top.svg" alt="Shape Leaf" width={200} height={200} />
            </div>
        </section>
    );
}

export default HeroSection;
