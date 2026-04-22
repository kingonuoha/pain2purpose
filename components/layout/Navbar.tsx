"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
    solid?: boolean;
    theme?: "light" | "dark";
}

export function Navbar({ solid = false, theme }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Services", href: "/services" },
        { label: "Blog", href: "/articles" },
        { label: "Contact", href: "/contact" },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-24 flex items-center",
                isScrolled || solid
                    ? "bg-white shadow-xl shadow-p2p-charcoal/5 h-20"
                    : "bg-transparent",
                theme === "dark" && "dark" // Minimal hook for future-proofing
            )}
        >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex items-center justify-between">
                {/* Logo (col-lg-3) */}
                <div className="w-1/4">
                    <Link href="/" className="flex items-center group">
                        <div className="relative h-10 w-40">
                            <Image
                                src="/p2p/logo.png" 
                                alt="Pain2Purpose"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Main Menu (col-lg-6 center) */}
                <nav className="hidden lg:flex items-center justify-center flex-1 gap-10">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.label} 
                            href={link.href} 
                            className={cn(
                                "text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group/link",
                                pathname === link.href ? "text-p2p-sage" : "text-p2p-charcoal hover:text-p2p-sage"
                            )}
                        >
                            {link.label}
                            <span className={cn(
                                "absolute -bottom-1 left-0 h-0.5 bg-p2p-sage transition-all",
                                pathname === link.href ? "w-full" : "w-0 group-hover/link:w-full"
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* Hotline (col-lg-3 right) */}
                <div className="w-1/4 flex justify-end items-center gap-6">
                    <a 
                        href="tel:08033444411" 
                        className="hidden md:flex items-center gap-3 group"
                    >
                        <div className="w-12 h-12 rounded-full bg-p2p-soft-green flex items-center justify-center text-p2p-sage group-hover:bg-p2p-sage group-hover:text-white transition-all shadow-lg shadow-p2p-sage/10">
                            <Phone size={16} />
                        </div>
                        <span className="text-sm font-black text-p2p-charcoal tracking-tight group-hover:text-p2p-sage transition-colors">
                            08033444411
                        </span>
                    </a>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="lg:hidden p-3 rounded-2xl bg-p2p-soft-green text-p2p-sage hover:bg-p2p-sage hover:text-white transition-all active:scale-90"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 z-[110] bg-p2p-charcoal/60 backdrop-blur-sm lg:hidden"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 z-[120] w-[85%] max-w-sm bg-white lg:hidden overflow-y-auto"
                        >
                            <div className="p-10 flex flex-col h-full">
                                <div className="flex justify-between items-center mb-16">
                                    <div className="relative h-8 w-32">
                                        <Image src="/p2p/logo.png" alt="Logo" fill className="object-contain" />
                                    </div>
                                    <button
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-2 bg-p2p-soft-green text-p2p-sage rounded-full active:scale-90"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div className="space-y-4 mb-20">
                                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300 mb-8 px-4">Navigation</p>
                                    {navLinks.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="flex items-center justify-between p-5 rounded-3xl text-p2p-charcoal hover:bg-p2p-soft-green/50 hover:text-p2p-sage transition-all group"
                                        >
                                            <span className="text-2xl font-serif font-bold italic">{item.label}</span>
                                            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <a 
                                        href="tel:08033444411" 
                                        className="flex items-center gap-4 p-6 bg-p2p-sage text-white rounded-[32px] shadow-2xl shadow-p2p-sage/30"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white">
                                            <Phone size={18} />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Need Help?</span>
                                            <span className="text-xl font-serif font-bold">08033444411</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

export default Navbar;


