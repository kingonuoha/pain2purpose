"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
    return (
        <section className="relative pt-32 pb-32 overflow-hidden bg-p2p-cream">
            {/* Decorative background shapes */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
                <Image
                    src="/shapes/shape_leaf_right_top.svg"
                    alt=""
                    fill
                    className="object-contain translate-x-1/4 -translate-y-1/4"
                />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Content Wrap (col-lg-6) */}
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-serif font-bold text-p2p-charcoal leading-[1.1] mb-8">
                                Private Mental Health Consultation from a Professional
                            </h1>
                            
                            <p className="text-lg text-gray-500 font-medium leading-relaxed mb-12 max-w-xl">
                                We provide a safe haven for individuals, couples, and families navigating life&apos;s most difficult transitions. Support for healing, growth, and finding meaning.
                            </p>

                            <ul className="flex flex-wrap items-center gap-6 mb-16">
                                <li>
                                    <Link
                                        href="/contact"
                                        className="bg-p2p-charcoal text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-p2p-sage transition-all shadow-xl shadow-p2p-charcoal/10 active:scale-95 flex items-center gap-3"
                                    >
                                        Get A Consultation <ArrowRight size={16} />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/about"
                                        className="bg-white text-p2p-charcoal border border-p2p-soft-green px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-p2p-soft-green transition-all active:scale-95 flex items-center gap-3"
                                    >
                                        Learn More <ArrowRight size={16} />
                                    </Link>
                                </li>
                            </ul>

                            {/* Hero Counter (ul.hero_section_counter) */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-p2p-soft-green/50">
                                <CounterItem 
                                    count="20+" 
                                    description="The years of our experience" 
                                />
                                <CounterItem 
                                    count="840+" 
                                    description="Patients received help this year" 
                                />
                                <CounterItem 
                                    count="98%" 
                                    description="Client improved their condition" 
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Image Wrap (col-lg-6) */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative rounded-[64px] overflow-hidden aspect-[4/5] shadow-2xl"
                        >
                            <Image
                                src="/p2p/hero-main.jpg" 
                                alt="Pain2Purpose"
                                fill
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                        
                        {/* Leaf Decoration */}
                        <div className="absolute -bottom-12 -left-12 w-48 h-48 opacity-10 pointer-events-none">
                            <Image
                                src="/shapes/shape_leaf_left_bottom.svg"
                                alt=""
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Blur Shadow Decoration */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-p2p-sage/5 rounded-full blur-[120px] pointer-events-none" />
        </section>
    );
}

function CounterItem({ count, description }: { count: string; description: string }) {
    return (
        <div className="flex flex-col gap-2">
            <div className="text-4xl font-serif font-bold text-p2p-charcoal">{count}</div>
            <div className="w-10 h-[2px] bg-p2p-sage/30 rounded-full" />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-tight">
                {description}
            </p>
        </div>
    );
}
