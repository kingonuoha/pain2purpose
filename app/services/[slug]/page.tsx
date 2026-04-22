import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Heart } from "lucide-react";

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = await fetchQuery(api.services.getBySlug, { slug });

    if (!service) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            <Navbar solid />
            <PageHero 
                title={service.title} 
                breadcrumb={[
                    { label: "Services", href: "/services" },
                    { label: service.title, href: `/services/${slug}` }
                ]} 
            />
            
            <main className="pb-32">
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-24">
                    <div className="flex flex-col lg:flex-row gap-20">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <Link 
                                href="/services"
                                className="inline-flex items-center gap-2 text-p2p-sage text-xs font-black uppercase tracking-widest mb-12 hover:gap-4 transition-all"
                            >
                                <ArrowLeft size={16} /> Back to Services
                            </Link>
                            
                            <div className="prose prose-lg max-w-none prose-p:text-gray-500 prose-p:font-medium prose-headings:font-serif prose-headings:text-p2p-charcoal prose-headings:italic">
                                <div dangerouslySetInnerHTML={{ __html: service.fullDescription }} />
                            </div>

                            <div className="mt-20 p-10 bg-p2p-soft-green/20 rounded-[40px] border border-p2p-soft-green/30">
                                <div className="flex items-start gap-8">
                                    <div className="w-16 h-16 rounded-2xl bg-p2p-sage text-white flex items-center justify-center shrink-0">
                                        <Heart size={32} />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-serif font-bold text-p2p-charcoal mb-4 italic">Ready to begin?</h4>
                                        <p className="text-gray-500 font-medium leading-relaxed mb-8">
                                            Healing takes courage, and you&apos;ve already taken the first step. Let&apos;s talk about how we can support you through this {service.title} journey.
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="inline-block bg-p2p-charcoal text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-p2p-sage transition-all"
                                        >
                                            Book A Consultation
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar / Meta info */}
                        <div className="lg:w-1/3">
                            <div className="sticky top-32 space-y-8">
                                <div className="p-10 bg-p2p-cream rounded-[40px] border border-p2p-soft-green/10">
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-p2p-sage mb-8">Service Overview</h5>
                                    <div className="space-y-6">
                                        <SidebarItem 
                                            icon={<Clock size={16} />}
                                            label="Session Length"
                                            value="50-60 Minutes"
                                        />
                                        <SidebarItem 
                                            icon={<BookOpen size={16} />}
                                            label="Approach"
                                            value="Holistic, Person-Centered"
                                        />
                                    </div>
                                </div>

                                {/* Newsletter teaser */}
                                <div className="p-10 bg-p2p-charcoal text-white rounded-[40px] overflow-hidden relative">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-p2p-sage/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-p2p-sage mb-4 relative z-10">Monthly Wisdom</h5>
                                    <p className="font-serif italic text-lg mb-8 relative z-10">Get healing resources directly to your inbox.</p>
                                    <Link
                                        href="#newsletter"
                                        className="inline-block bg-white text-p2p-charcoal px-6 py-3 rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-p2p-sage hover:text-white transition-all relative z-10"
                                    >
                                        Subscribe
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-lg bg-p2p-soft-green flex items-center justify-center text-p2p-sage">
                {icon}
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{label}</p>
                <p className="text-p2p-charcoal font-bold">{value}</p>
            </div>
        </div>
    );
}
