"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface BreadcrumbItem {
    label: string;
    href: string;
}

interface PageHeroProps {
    title: string;
    breadcrumb: BreadcrumbItem[];
}

export function PageHero({ title, breadcrumb }: PageHeroProps) {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-br from-p2p-sage/90 to-p2p-sage text-white">
            {/* Decoration Shapes */}
            <div className="absolute top-0 left-0 w-32 md:w-64 h-auto opacity-20 pointer-events-none">
                <Image
                    src="/shapes/shape_leaf_left_top.svg"
                    alt=""
                    width={256}
                    height={256}
                    className="w-full h-full object-contain -translate-x-1/4 -translate-y-1/4"
                />
            </div>
            <div className="absolute bottom-0 right-0 w-32 md:w-64 h-auto opacity-20 pointer-events-none">
                <Image
                    src="/shapes/shape_leaf_right.svg"
                    alt=""
                    width={256}
                    height={256}
                    className="w-full h-full object-contain translate-x-1/4 translate-y-1/4"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight">
                        {title}
                    </h1>

                    <nav className="flex items-center justify-center gap-2 text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-white/80">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        {breadcrumb.map((item, index) => (
                            <div key={item.href} className="flex items-center gap-2">
                                <ChevronRight size={14} className="text-white/40" />
                                <Link
                                    href={item.href}
                                    className={index === breadcrumb.length - 1 ? "text-white" : "hover:text-white transition-colors"}
                                >
                                    {item.label}
                                </Link>
                            </div>
                        ))}
                    </nav>
                </motion.div>
            </div>

            {/* Subtle bottom curve or overlay if needed */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </section>
    );
}

export default PageHero;
