"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Heart, Phone, Send } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-p2p-charcoal text-white py-24 px-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-p2p-sage/5 blur-[120px] rounded-full -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-p2p-sand/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 border-b border-white/5 pb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-8 group">
                           <Image
                                src="/p2p/logo.png"
                                alt="Pain2Purpose"
                                width={160}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 font-medium italic">
                            &quot;Supporting your journey to healing and purpose&quot;
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Social Placeholders if needed, otherwise removed as per Phase 1 */}
                        </div>
                    </div>

                    {/* Links - Quick Navigation */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-p2p-sand mb-8 pb-2 border-b border-p2p-sand/10 inline-block">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-gray-400 font-semibold">
                            <li><Link href="/" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> About</Link></li>
                            <li><Link href="/services" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Services</Link></li>
                            <li><Link href="/articles" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Contact</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-1">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-p2p-sand mb-8 pb-2 border-b border-p2p-sand/10 inline-block">Contact Info</h4>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-p2p-sage">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Email Us</p>
                                    <a href="mailto:sandra@counsellingp2p.com" className="text-sm font-bold text-gray-300 hover:text-p2p-sage transition-colors">sandra@counsellingp2p.com</a>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-p2p-sage">
                                    <Phone size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Call Us</p>
                                    <div className="flex flex-col gap-1">
                                        <a href="tel:08033444411" className="text-sm font-bold text-gray-300 hover:text-p2p-sage transition-colors">08033444411 (NG)</a>
                                        <a href="tel:+12233648160" className="text-sm font-bold text-gray-300 hover:text-p2p-sage transition-colors">+1-223-364-8160 (US)</a>
                                    </div>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-p2p-sage">
                                    <Send size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">WhatsApp</p>
                                    <a href="https://wa.me/2348033444411" target="_blank" className="text-sm font-bold text-gray-300 hover:text-p2p-sage transition-colors">Chat with Sandra</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Address / Location */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-p2p-sand mb-8 pb-2 border-b border-p2p-sand/10 inline-block">Location</h4>
                        <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">
                            10 Bishop Okoye Street,<br />
                            Owerri, Imo State,<br />
                            Nigeria
                        </p>
                        <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] font-black uppercase tracking-widest text-p2p-sand">Working Hours</p>
                            <p className="text-xs text-gray-500 mt-2">Mon - Fri: 9:00 AM - 5:00 PM</p>
                        </div>
                    </div>
                </div>

                <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-center md:text-left">
                    <p>© 2025 Pain2Purpose Counselling Practice. All rights reserved.</p>
                    <div className="flex items-center gap-2">
                        <span>Supporting your journey</span>
                        <Heart size={12} className="text-p2p-sage fill-p2p-sage animate-pulse" />
                        <span>to healing</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

