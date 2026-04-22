"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";

export function AboutTeaser() {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
                    
                    {/* Content Wrap (col-lg-6) */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-p2p-charcoal mb-8 leading-tight italic">
                                <span className="bg-p2p-sage/10 text-p2p-sage px-2 rounded-lg">Sandra Opara</span> — Licensed Mental Health Counselor, Psychotherapist  
                            </h2>
                            
                            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                                My mission is to help you move beyond your current struggles and find the purpose buried within your pain. With over 15 years of experience, I specialize in supporting families through their most difficult moments.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 mb-12">
                                <InfoList 
                                    items={[
                                        "Personal Consultations",
                                        "Group Therapy",
                                        "Online Therapy"
                                    ]} 
                                />
                                <InfoList 
                                    items={[
                                        "Unique technique",
                                        "Couple Problem"
                                    ]} 
                                />
                            </div>

                            <Link
                                href="/about"
                                className="inline-flex items-center gap-3 bg-p2p-charcoal text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-p2p-sage transition-all shadow-xl active:scale-95"
                            >
                                Learn More
                            </Link>
                        </motion.div>
                    </div>

                    {/* Image Wrap (col-lg-6 order-lg-last) */}
                    <div className="lg:w-1/2 relative lg:order-last">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            <div className="relative rounded-[64px] overflow-hidden aspect-[4/5] shadow-2xl z-10 border-8 border-white">
                                <Image
                                    src="/p2p/sandra-portrait.jpg" 
                                    alt="Sandra Opara"
                                    fill
                                    className="object-cover"
                                />
                                
                                {/* Video Play Button Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="w-20 h-20 bg-p2p-sage text-white rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110 active:scale-95">
                                        <Play size={32} fill="white" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Decorative background shape */}
                            <div className="absolute -top-10 -right-10 w-full h-full bg-p2p-soft-green/50 rounded-[64px] -z-0" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

function InfoList({ items }: { items: string[] }) {
    return (
        <ul className="space-y-4">
            {items.map((item) => (
                <li key={item} className="flex items-center gap-3 text-p2p-charcoal font-bold text-sm">
                    <div className="w-5 h-5 rounded-full border border-p2p-sage flex items-center justify-center text-p2p-sage">
                        <Check size={12} />
                    </div>
                    {item}
                </li>
            ))}
        </ul>
    );
}
