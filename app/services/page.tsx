"use client";

import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Heart, Activity, ShieldCheck } from "lucide-react";

export default function ServicesPage() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar solid />
            <PageHero 
                title="Our Services" 
                breadcrumb={[{ label: "Services", href: "/services" }]} 
            />
            
            <main className="pb-32">
                {/* Introduction Section */}
                <section className="py-24">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <div className="max-w-3xl">
                            <h2 className="text-p2p-sage text-[10px] font-black uppercase tracking-[0.4em] mb-4">Support & Guidance</h2>
                            <h3 className="text-5xl md:text-7xl font-serif font-bold text-p2p-charcoal mb-8 italic">Healing for <br />every season of life.</h3>
                            <p className="text-xl text-gray-400 font-medium leading-relaxed">
                                Our practice offers a range of specialized counseling services designed to meet you exactly where you are. 
                                We combine evidence-based techniques with deep compassion to help you find your purpose within the pain.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Reuse the ServicesGrid for the main listing */}
                <div className="border-t border-p2p-soft-green/30">
                    <ServicesGrid />
                </div>

                {/* Why Choose Us Section */}
                <section className="py-24 bg-p2p-cream">
                    <div className="max-w-7xl mx-auto px-6 md:px-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            <SmallFeature 
                                icon={<Heart className="text-p2p-sage" />}
                                title="Compassionate Care"
                                description="We lead with empathy, ensuring you feel seen, heard, and valued in every session."
                            />
                            <SmallFeature 
                                icon={<ShieldCheck className="text-p2p-sage" />}
                                title="Safe Space"
                                description="A completely confidential environment where you can express your deepest truths without judgment."
                            />
                            <SmallFeature 
                                icon={<Activity className="text-p2p-sage" />}
                                title="Holistic Approach"
                                description="We address the mind, body, and spirit to promote lasting healing and personal transformation."
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

function SmallFeature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-p2p-soft-green flex items-center justify-center">
                {icon}
            </div>
            <h4 className="text-2xl font-serif font-bold text-p2p-charcoal">{title}</h4>
            <p className="text-gray-400 font-medium leading-relaxed">{description}</p>
        </div>
    );
}
