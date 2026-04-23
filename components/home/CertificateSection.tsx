"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

const CERTIFICATES = [
    {
        title: "Marriage and Family Affairs USA",
        image: "/assets/images/new_pics/marriage and falimily affairs usa.jpg",
        description: "Professional certification in family dynamics and marriage counselling."
    },
    {
        title: "Marriage Mentor",
        image: "/assets/images/new_pics/marriage mentor.jpg",
        description: "Specialized training for mentoring couples through life transitions."
    },
    {
        title: "Public Relations Certification",
        image: "/assets/images/new_pics/public relations cert.jpg",
        description: "Advanced certification in professional communication and public relations."
    }
];

export function CertificateSection() {
    const [selectedImage, setSelectedId] = useState<number | null>(null);

    const handleNext = () => {
        if (selectedImage !== null) {
            setSelectedId((selectedImage + 1) % CERTIFICATES.length);
        }
    };

    const handlePrev = () => {
        if (selectedImage !== null) {
            setSelectedId((selectedImage - 1 + CERTIFICATES.length) % CERTIFICATES.length);
        }
    };

    return (
        <section className="certificate_section section_space_lg bg-zinc-50/50">
            <div className="container">
                <div className="section_heading">
                    <div className="row align-items-end">
                        <div className="col-lg-6">
                            <h2 className="section_heading_text italic">
                                Professional <span className="text-[#7C9A7E]">Qualifications</span>
                            </h2>
                            <p className="section_heading_description mb-0">
                                Dedicated to continuous growth and professional excellence in therapeutic practice.
                            </p>
                        </div>
                        <div className="col-lg-6 d-none d-lg-block">
                            <div className="text-lg-end">
                                <p className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 italic mb-0">
                                    Scroll to explore →
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Horizontal Scroll Container */}
                <div className="relative group">
                    <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {CERTIFICATES.map((cert, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ y: -5 }}
                                className="flex-shrink-0 w-[300px] md:w-[450px] snap-center"
                            >
                                <div 
                                    className="certificate_card group/card cursor-pointer relative bg-white rounded-[2rem] border border-zinc-100 shadow-sm overflow-hidden p-3"
                                    onClick={() => setSelectedId(index)}
                                >
                                    <div className="relative aspect-[1.4/1] overflow-hidden rounded-[1.5rem] bg-zinc-100">
                                        <Image 
                                            src={cert.image} 
                                            alt={cert.title} 
                                            fill
                                            className="object-contain p-2 transition-transform duration-700 group-hover/card:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-zinc-950/0 group-hover/card:bg-zinc-950/20 transition-colors duration-300 flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center opacity-0 group-hover/card:opacity-100 scale-90 group-hover/card:scale-100 transition-all duration-300">
                                                <Maximize2 size={20} className="text-[#7C9A7E]" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 px-3 pb-2">
                                        <h3 className="text-lg font-bold text-zinc-900 mb-1 font-serif">{cert.title}</h3>
                                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-black leading-relaxed">
                                            Certified Professional
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Premium Lightbox Modal */}
            <AnimatePresence>
                {selectedImage !== null && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-zinc-950/95 backdrop-blur-sm p-4 md:p-10"
                    >
                        {/* Close UI */}
                        <button 
                            onClick={() => setSelectedId(null)}
                            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/10"
                        >
                            <X size={24} />
                        </button>

                        {/* Navigation */}
                        <button 
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all border border-white/5 hidden md:flex"
                        >
                            <ChevronLeft size={32} />
                        </button>
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-all border border-white/5 hidden md:flex"
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* Certificate Image Container */}
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full h-[70vh] flex items-center justify-center">
                                <Image 
                                    src={CERTIFICATES[selectedImage].image} 
                                    alt={CERTIFICATES[selectedImage].title}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            
                            <div className="text-center space-y-2 max-w-2xl px-4">
                                <motion.h3 
                                    key={`title-${selectedImage}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-2xl md:text-3xl font-serif font-black text-white italic"
                                >
                                    {CERTIFICATES[selectedImage].title}
                                </motion.h3>
                                <motion.p 
                                    key={`desc-${selectedImage}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-zinc-400 text-sm md:text-base leading-relaxed"
                                >
                                    {CERTIFICATES[selectedImage].description}
                                </motion.p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default CertificateSection;
