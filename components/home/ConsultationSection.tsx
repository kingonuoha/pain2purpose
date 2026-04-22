"use client";

import Image from "next/image";

export function ConsultationSection() {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="bg-p2p-sage rounded-[64px] p-12 md:p-24 relative overflow-hidden">
                    {/* Decorations */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-p2p-sand/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                    
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 italic">
                                <span className="block">Get your first free</span> online consultation
                            </h2>
                        </div>

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Your Name"
                                    className="w-full bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Phone Number</label>
                                <input 
                                    type="tel" 
                                    placeholder="Mobile phone number"
                                    className="w-full bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white placeholder:text-white/40 focus:bg-white/20 focus:outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Choose Section</label>
                                <select 
                                    className="w-full bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white focus:bg-white/20 focus:outline-none transition-all appearance-none cursor-pointer"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-gray-900">Select Therapy</option>
                                    <option value="individual" className="text-gray-900">Individual Therapy</option>
                                    <option value="couples" className="text-gray-900">Couples Counseling</option>
                                    <option value="family" className="text-gray-900">Family Transitions</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Session Date</label>
                                <input 
                                    type="date" 
                                    className="w-full bg-white/10 border border-white/20 rounded-full px-8 py-5 text-white focus:bg-white/20 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="md:col-span-2 text-center mt-8">
                                <button 
                                    type="submit"
                                    className="bg-white text-p2p-sage px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-p2p-soft-green transition-all shadow-2xl active:scale-95"
                                >
                                    Get A Consultation
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Leaf Decorations */}
                    <div className="absolute top-10 right-10 w-32 h-32 opacity-20 pointer-events-none">
                        <Image src="/shapes/shape_leaf_right_top.svg" alt="" fill className="object-contain" />
                    </div>
                    <div className="absolute bottom-10 left-10 w-32 h-32 opacity-20 pointer-events-none">
                        <Image src="/shapes/shape_leaf_left_bottom.svg" alt="" fill className="object-contain" />
                    </div>
                </div>
            </div>
        </section>
    );
}
