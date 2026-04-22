"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { ArrowRight, Brain, Heart, Users, Shield, Zap, Sparkles } from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
    "grief": <Heart size={24} />,
    "couples": <Users size={24} />,
    "depression": <Brain size={24} />,
    "anxiety": <Zap size={24} />,
    "trauma": <Shield size={24} />,
    "growth": <Sparkles size={24} />,
};

export function ServicesGrid() {
    const services = useQuery(api.services.list);

    return (
        <section className="py-32 bg-p2p-soft-green/10">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-p2p-charcoal mb-6 italic">What I&apos;m Offering</h2>
                    <p className="text-gray-500 font-medium leading-relaxed">
                        Specialized support systems designed to help you findings meaning and healing in every season of life.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services?.map((service) => (
                        <div 
                            key={service._id} 
                            className="bg-white p-12 rounded-[48px] border border-p2p-soft-green/20 hover:border-p2p-sage hover:shadow-2xl hover:shadow-p2p-sage/5 transition-all group"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-p2p-soft-green flex items-center justify-center text-p2p-sage mb-8 group-hover:bg-p2p-sage group-hover:text-white transition-all">
                                {ICON_MAP[service.slug.split('-')[0]] || <Sparkles size={24} />}
                            </div>
                            
                            <h3 className="text-2xl font-serif font-bold text-p2p-charcoal mb-4 italic group-hover:text-p2p-sage transition-colors">
                                {service.title}
                            </h3>
                            
                            <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                                {service.shortDescription}
                            </p>
                            
                            <Link 
                                href={`/services/${service.slug}`}
                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-p2p-sage hover:gap-4 transition-all"
                            >
                                More Info <ArrowRight size={16} />
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-3 bg-p2p-charcoal text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-p2p-sage transition-all shadow-xl shadow-p2p-charcoal/10"
                    >
                        All Programs <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
