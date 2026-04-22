"use client";

import { Star } from "lucide-react";
import Image from "next/image";

export function TestimonialSection() {
    const testimonials = [
        {
            name: "Kerry Banks",
            role: "Housewife",
            content: "Pain2Purpose gave me the strength to navigate my family transitions with grace. The compassionate support I received was life-changing.",
            rating: 5
        },
        {
            name: "Damian York",
            role: "Entrepreneur",
            content: "Finding a practitioner who truly understands lived experience made all the difference. Sandra provides a steady ground in turbulent times.",
            rating: 5
        }
    ];

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="max-w-xl mx-auto text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-p2p-charcoal mb-6 italic">What Patients Say</h2>
                    <p className="text-gray-500 font-medium italic">
                        Real stories of healing and transformation from those who have walked the path from pain to purpose.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((item, idx) => (
                        <div 
                            key={idx}
                            className="bg-p2p-cream p-12 rounded-[48px] border border-p2p-soft-green/20"
                        >
                            <div className="flex gap-1 text-p2p-sand mb-8">
                                {[...Array(item.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>
                            
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-16 h-16 rounded-full overflow-hidden relative border-4 border-white shadow-lg">
                                    <Image 
                                        src={`/p2p/logo.png`} 
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-serif font-bold text-p2p-charcoal italic">{item.name}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-p2p-sage">{item.role}</p>
                                </div>
                            </div>

                            <p className="text-gray-500 font-medium leading-relaxed italic">
                                &quot;{item.content}&quot;
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
