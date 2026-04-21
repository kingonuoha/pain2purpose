"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Mail, Heart, Loader2, Facebook, Instagram, Youtube, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const TikTokIcon = ({ size }: { size: number }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
);

export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const subscribe = useMutation(api.users.subscribeToNewsletter);
    const settings = useQuery(api.site_settings.getSiteSettings);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);
        try {
            const result = (await subscribe({ email })) as { status: string };
            setEmail("");

            if (result.status === "invited") {
                toast.success("Check your email", {
                    description: "We've sent you an invitation to create an account and join the circle.",
                });
            } else {
                toast.success("Welcome to the circle", {
                    description: "Your weekly dose of truth is on its way.",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to subscribe");
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        { icon: Facebook, url: settings?.socials?.facebook, name: "Facebook" },
        { icon: Twitter, url: settings?.socials?.twitter, name: "Twitter" },
        { icon: Instagram, url: settings?.socials?.instagram, name: "Instagram" },
        { icon: Youtube, url: settings?.socials?.youtube, name: "Youtube" },
        { icon: TikTokIcon, url: settings?.socials?.tiktok, name: "TikTok" },
        { icon: Linkedin, url: settings?.socials?.linkedin, name: "LinkedIn" },
        { icon: Github, url: settings?.socials?.github, name: "GitHub" },
    ].filter(link => link.url && link.url.trim() !== "");

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
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 max-w-xs font-medium">
                            {settings?.siteDescription || "Guided healing for those navigating life's complex journeys. From pain to purpose."}
                        </p>

                        {(socialLinks.length > 0 || settings?.email || settings?.phone) && (
                            <div className="space-y-6">
                                {socialLinks.length > 0 && (
                                    <div className="flex flex-wrap items-center gap-3">
                                        {socialLinks.map((link, idx) => (
                                            <a
                                                key={idx}
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-p2p-sage hover:border-p2p-sage transition-all duration-300 group/link"
                                                title={link.name}
                                            >
                                                <link.icon size={18} className="group-hover/link:scale-110 transition-transform" />
                                            </a>
                                        ))}
                                    </div>
                                )}

                                <div className="space-y-3">
                                    {settings?.email && (
                                        <a href={`mailto:${settings.email}`} className="flex items-center gap-3 text-gray-400 hover:text-p2p-sage transition-colors text-xs font-bold uppercase tracking-widest">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <Mail size={14} />
                                            </div>
                                            {settings.email}
                                        </a>
                                    )}
                                    {settings?.phone && (
                                        <a href={`tel:${settings.phone}`} className="flex items-center gap-3 text-gray-400 hover:text-p2p-sage transition-colors text-xs font-bold uppercase tracking-widest">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                                <Phone size={14} />
                                            </div>
                                            {settings.phone}
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Links - Explore */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-p2p-sand mb-8 pb-2 border-b border-p2p-sand/10 inline-block">Explore</h4>
                        <ul className="space-y-4 text-sm text-gray-400 font-semibold">
                            <li><Link href="/articles" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Wisdom & Stories</Link></li>
                            <li><Link href="/category" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Healing Paths</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> About Sandra</Link></li>
                        </ul>
                    </div>

                    {/* Links - Information */}
                    <div>
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-p2p-sand mb-8 pb-2 border-b border-p2p-sand/10 inline-block">Information</h4>
                        <ul className="space-y-4 text-sm text-gray-400 font-semibold">
                            <li><Link href="/privacy" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 bg-p2p-sage rounded-full opacity-0 group-hover:opacity-100 transition-opacity" /> Work with Me</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter Section */}
                    <div className="lg:col-span-1">
                        <h4 className="font-black text-[10px] uppercase tracking-[0.3em] text-p2p-sand mb-8 pb-2 border-b border-p2p-sand/10 inline-block">The Journey</h4>
                        <p className="text-gray-400 text-sm mb-8 font-medium italic">Join our community moving from pain to purpose.</p>
                        <form onSubmit={handleSubmit} className="relative group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email address"
                                required
                                disabled={isSubmitting}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-sm outline-none focus:ring-2 focus:ring-p2p-sage/50 focus:bg-white/10 transition-all disabled:opacity-50 font-medium"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="absolute right-2 top-2 bottom-2 bg-p2p-sage text-white rounded-xl px-5 text-[10px] font-black uppercase tracking-widest hover:bg-p2p-sage/80 transition-all hover:scale-105 active:scale-95 disabled:bg-gray-800 flex items-center justify-center min-w-[120px] shadow-lg shadow-p2p-sage/20"
                            >
                                {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : (
                                    <span className="flex items-center gap-2">Join Today <Send size={12} /></span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                    <p>© {new Date().getFullYear()} Pain2Purpose - Sandra Opara. {settings?.footerText || "From Pain to Purpose."}</p>
                    <div className="flex items-center gap-2">
                        <span>Guided with</span>
                        <Heart size={12} className="text-p2p-sage fill-p2p-sage animate-pulse" />
                        <span>for humanity</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

