"use client";

import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { Mail, Send, Phone } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    serviceInterest: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const submitContact = useMutation(api.contact.submit);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        try {
            await submitContact(data);
            toast.success("Message Sent", {
                description: "Your message has been received. Sandra will respond shortly.",
            });
            reset();
        } catch (error) {
            toast.error("Submission Failed", {
                description: "Something went wrong. Please try again or call us directly.",
            });
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar solid />
            <PageHero 
                title="Contact Us" 
                breadcrumb={[{ label: "Contact", href: "/contact" }]} 
            />
            
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row gap-20">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-p2p-sage mb-4">Get in Touch</h4>
                            <h1 className="text-6xl font-serif font-black text-p2p-charcoal mb-8 italic tracking-tight">
                                Book Your <span className="text-p2p-sage">Session</span>.
                            </h1>
                            <p className="text-xl text-zinc-500 mb-12 leading-relaxed font-serif italic max-w-lg">
                                Ready to take the next step on your journey? Reach out to schedule a consultation or ask any questions about our services.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-p2p-soft-green flex items-center justify-center group-hover:bg-p2p-sage group-hover:text-white transition-all duration-500">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Email Address</p>
                                        <p className="text-lg font-bold text-p2p-charcoal">sandra@counsellingp2p.com</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-14 h-14 rounded-2xl bg-p2p-soft-green flex items-center justify-center group-hover:bg-p2p-sage group-hover:text-white transition-all duration-500">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Phone Number</p>
                                        <p className="text-lg font-bold text-p2p-charcoal">08033444411 (NG)</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-p2p-soft-green/30 p-10 rounded-[40px] border border-p2p-soft-green/50 backdrop-blur-sm"
                        >
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-p2p-charcoal/40 ml-4">Full Name</label>
                                    <input
                                        {...register("name")}
                                        placeholder="Enter your name"
                                        className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-p2p-soft-green'} rounded-2xl p-5 outline-none focus:ring-2 focus:ring-p2p-sage/50 transition-all font-medium text-p2p-charcoal`}
                                    />
                                    {errors.name && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{errors.name.message}</p>}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-p2p-charcoal/40 ml-4">Email Address</label>
                                        <input
                                            {...register("email")}
                                            placeholder="Enter your email"
                                            className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-p2p-soft-green'} rounded-2xl p-5 outline-none focus:ring-2 focus:ring-p2p-sage/50 transition-all font-medium text-p2p-charcoal`}
                                        />
                                        {errors.email && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-p2p-charcoal/40 ml-4">Service Interest</label>
                                        <select
                                            {...register("serviceInterest")}
                                            className="w-full bg-white border border-p2p-soft-green rounded-2xl p-5 outline-none focus:ring-2 focus:ring-p2p-sage/50 transition-all font-medium text-p2p-charcoal appearance-none cursor-pointer"
                                        >
                                            <option value="">Select a service</option>
                                            <option value="grief">Grief & Loss</option>
                                            <option value="transitions">Life Transitions</option>
                                            <option value="relationships">Relationships</option>
                                            <option value="trauma">Trauma Recovery</option>
                                            <option value="emotions">Emotional Regulation</option>
                                            <option value="growth">Personal Growth</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-p2p-charcoal/40 ml-4">Your Message</label>
                                    <textarea
                                        {...register("message")}
                                        placeholder="How can Sandra support you today?"
                                        rows={6}
                                        className={`w-full bg-white border ${errors.message ? 'border-red-400' : 'border-p2p-soft-green'} rounded-3xl p-6 outline-none focus:ring-2 focus:ring-p2p-sage/50 transition-all font-medium text-p2p-charcoal resize-none`}
                                    />
                                    {errors.message && <p className="text-[10px] text-red-500 font-bold ml-4 uppercase">{errors.message.message}</p>}
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-p2p-charcoal text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-p2p-sage transition-all duration-500 shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Sending..." : (
                                        <>Send Message <Send size={14} /></>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}


