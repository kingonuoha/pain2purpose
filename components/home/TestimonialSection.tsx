"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";

export function TestimonialSection() {
    const testimonialsResult = useQuery(api.testimonials?.listActive) || [];
    
    // Premium fallback testimonials for production-grade first-load
    const testimonials = testimonialsResult.length > 0 ? testimonialsResult : [
        {
            name: "Faith E.",
            role: "Mother & Caregiver",
            content: "Navigating my son's autism diagnosis felt like drowning until I met Sandra. She didn't just give me advice; she gave me a lifeline and the strength to keep going.",
            rating: 5,
            avatar: "/assets/images/meta/author_image_3-min.png"
        },
        {
            name: "Bayo A.",
            role: "Professional",
            content: "I always thought therapy was for a different kind of person. Sandra's approach was direct, empathetic, and culturally relevant. I finally have the tools to handle my anxiety.",
            rating: 5,
            avatar: "/assets/images/meta/author_image_3-min.png"
        }
    ];

    return (
        <section className="testimonial_section section_space_lg">
            <div className="container">
                <div className="section_heading text-center">
                    <h2 className="section_heading_text italic">
                        Real Stories of <span className="text-[#7C9A7E]">Healing</span>
                    </h2>
                    <p className="section_heading_description">
                        From pain to purpose — stories of transformation from those who have walked the path.
                    </p>
                </div>
                <div className="row justify-content-center">
                    {testimonials.map((item, idx) => (
                        <div key={idx} className="col-lg-6 col-md-6">
                            <div className="testimonial_item">
                                <ul className="rating_star unordered_list">
                                    {[...Array(item.rating)].map((_, i) => (
                                        <li key={i}><i className="fa-solid fa-star"></i></li>
                                    ))}
                                </ul>
                                <p className="testimonial_text">
                                    &quot;{item.content}&quot;
                                </p>
                                <div className="testimonial_admin">
                                    <div className="admin_image">
                                        <Image
                                            src={item.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(item.name)}&background=7C9A7E&color=fff&bold=true`}
                                            alt={item.name}
                                            width={60}
                                            height={60}
                                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }}
                                        />
                                    </div>
                                    <div className="admin_info">
                                        <h4 className="admin_name">{item.name}</h4>
                                        <p className="admin_designation">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TestimonialSection;
