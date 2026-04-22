import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Users, Compass, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">
            <Navbar solid />
            <PageHero 
                title="About Sandra Opara" 
                breadcrumb={[{ label: "About", href: "/about" }]} 
            />
            <main className="pb-20">
                <div className="max-w-7xl mx-auto px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mb-20"
                    >
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-p2p-sage mb-4 block">The Mission</span>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 italic text-p2p-charcoal">From Pain to Purpose.</h1>
                        <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">
                            Pain2Purpose is a counseling practice dedicated to supporting your journey to healing and growth. 
                            We provide a safe space for you to navigate life&apos;s complex transitions.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
                        <div className="space-y-12">
                            <Feature
                                icon={<BookOpen className="text-p2p-sage" />}
                                title="Lived Experience"
                                description="We understand the weight of pain because we&apos;ve walked through it. Our approach is rooted in empathy and real-world understanding."
                            />
                            <Feature
                                icon={<Users className="text-p2p-sage" />}
                                title="Compassionate Support"
                                description="Whether you&apos;re dealing with grief, loss, or family challenges, we provide dedicated support tailored to your journey."
                            />
                        </div>
                        <div className="space-y-12">
                            <Feature
                                icon={<Compass className="text-p2p-sage" />}
                                title="Healing Pathways"
                                description="We provide you with the tools and strategies needed to find your way back to peace and purpose."
                            />
                            <Feature
                                icon={<Shield className="text-p2p-sage" />}
                                title="Safe & Confidential"
                                description="Your privacy and trust are our top priorities. Every session is a safe space for open, honest reflection."
                            />
                        </div>
                    </div>

                    {/* About Sandra Bio Section */}
                    <div className="flex flex-col lg:flex-row items-center gap-20 mb-32 border-t border-p2p-soft-green/30 pt-32">
                        <div className="lg:w-1/2 relative">
                            <div className="relative rounded-[60px] overflow-hidden aspect-[4/5] shadow-2xl">
                                <Image
                                    src="/p2p/sandra-portrait.jpg" 
                                    alt="Sandra Opara"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-p2p-sand/20 rounded-full blur-3xl -z-10" />
                        </div>
                        <div className="lg:w-1/2">
                            <h2 className="text-p2p-sage text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Practitioner</h2>
                            <h3 className="text-4xl font-serif font-bold text-p2p-charcoal mb-8 leading-tight">Sandra Opara <br /><span className="italic">LPC, Family Transitions.</span></h3>
                            <div className="space-y-6 text-gray-400 font-medium leading-relaxed">
                                <p>
                                    With over 15 years in therapeutic practice, my journey has always been about one thing: guiding people back to themselves. I believe that pain is not a dead end, but a catalyst for profound personal transformation.
                                </p>
                                <p>
                                    My approach is holistic and person-centered. We don&apos;t just look at the symptoms; we look at the person in their entirety—their history, their environment, and their aspirations.
                                </p>
                                <p>
                                    Whether you are navigating the heavy fog of grief or the turbulent waters of a major life transition, my goal is to provide the steady ground and the tools you need to find your way forward.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-p2p-soft-green rounded-[64px] p-12 md:p-24 text-center text-p2p-charcoal relative overflow-hidden transition-colors duration-500">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(124,154,126,0.1),transparent)]" />
                        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 relative z-10 italic">Ready to Begin Your Journey?</h2>
                        <p className="text-p2p-charcoal/60 max-w-xl mx-auto mb-12 relative z-10 font-medium italic">
                            &quot;Take the first step from pain to purpose today.&quot;
                        </p>
                        <Link 
                            href="/contact"
                            className="bg-p2p-sage text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-p2p-sage/90 transition-all relative z-10 inline-block shadow-lg shadow-p2p-sage/20 active:scale-95"
                        >
                            Get A Consultation
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Feature({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex gap-6 group">
            <div className="w-14 h-14 rounded-2xl bg-p2p-soft-green flex items-center justify-center shrink-0 group-hover:bg-p2p-sage/10 transition-all duration-300">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-serif font-bold mb-2 text-p2p-charcoal transition-colors">{title}</h3>
                <p className="text-gray-500 font-medium leading-relaxed transition-colors">{description}</p>
            </div>
        </div>
    );
}


