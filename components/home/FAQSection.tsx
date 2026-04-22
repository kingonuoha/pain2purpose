"use client";

import { useState } from "react";

const faqs = [
    {
        question: "What is mental health?",
        answer: "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make healthy choices.",
    },
    {
        question: "What do I do if the support doesn't help?",
        answer: "If you feel the current approach isn't meeting your needs, we encourage open dialogue. We can adjust the therapeutic strategy or help you find a specialized path that better aligns with your goals.",
    },
    {
        question: "Can you prevent mental health problems?",
        answer: "While some conditions are biological, many challenges can be mitigated through early intervention, stress management, and building robust emotional resilience tools.",
    },
    {
        question: "What are the components of mental health?",
        answer: "Key components include self-acceptance, personal growth, purpose in life, environmental mastery, autonomy, and positive relations with others.",
    }
];

export function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="faq_section section_space_lg">
            <div className="container">
                <div className="section_heading text-center">
                    <h2 className="section_heading_text">Frequently Asked Questions</h2>
                </div>
                <div className="accordion" id="faq_accordion">
                    {faqs.map((faq, index) => (
                        <div key={index} className="accordion-item">
                            <h2 className="accordion-header">
                                <button 
                                    className={`accordion-button ${activeIndex === index ? "" : "collapsed"}`} 
                                    type="button"
                                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                    aria-expanded={activeIndex === index}
                                >
                                    {faq.question}
                                </button>
                            </h2>
                            <div className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""}`}>
                                <div className="accordion-body">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FAQSection;
