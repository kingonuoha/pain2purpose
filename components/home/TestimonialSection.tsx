"use client";

import Image from "next/image";

export function TestimonialSection() {
    const testimonials = [
        {
            name: "Kerry Banks",
            role: "Housewife",
            content: "Pain2Purpose gave me the strength to navigate my family transitions with grace. The compassionate support I received was life-changing.",
            rating: 5,
            avatar: "/assets/images/meta/author_image_3-min.png"
        },
        {
            name: "Damian York",
            role: "Entrepreneur",
            content: "Finding a practitioner who truly understands lived experience made all the difference. Sandra provides a steady ground in turbulent times.",
            rating: 5,
            avatar: "/assets/images/meta/author_image_3-min.png"
        }
    ];

    return (
        <section className="testimonial_section section_space_lg">
            <div className="container">
                <div className="section_heading text-center">
                    <h2 className="section_heading_text">What Patients Say</h2>
                    <p className="section_heading_description">
                        Real stories of healing and transformation from those who have walked the path from pain to purpose.
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
                                            src={item.avatar}
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
