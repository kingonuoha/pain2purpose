"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Image from "next/image";

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
        <section className="py-32 bg-p2p-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    
                    {/* Images Group (col-lg-6) */}
                    <div className="lg:w-1/2 relative">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 pt-12">
                                <FAQImage src="/p2p/hero-main.jpg" height="h-64" />
                                <FAQImage src="/p2p/sandra-about.jpg" height="h-48" />
                            </div>
                            <div className="space-y-4">
                                <FAQImage src="/p2p/sandra-portrait.jpg" height="h-48" />
                                <FAQImage src="/p2p/hero-main.jpg" height="h-64" />
                            </div>
                        </div>
                    </div>

                    {/* Content (col-lg-6) */}
                    <div className="lg:w-1/2">
                        <div className="mb-12">
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-p2p-charcoal mb-4 italic leading-tight">
                                The most popular questions to discuss mental health
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                                        activeIndex === index ? "border-p2p-sage bg-white shadow-xl" : "border-p2p-soft-green/30 bg-white/50"
                                    }`}
                                >
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between p-8 text-left outline-none"
                                    >
                                        <span className="text-lg font-serif font-bold text-p2p-charcoal">{faq.question}</span>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                                            activeIndex === index ? "bg-p2p-sage text-white" : "bg-p2p-soft-green text-p2p-sage"
                                        }`}>
                                            {activeIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {activeIndex === index && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-8 pb-8 text-gray-500 font-medium leading-relaxed">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function FAQImage({ src, height }: { src: string; height: string }) {
    return (
        <div className={`relative ${height} rounded-[32px] overflow-hidden shadow-xl`}>
            <Image src={src} alt="FAQ Visual" fill className="object-cover" />
        </div>
    );
}
