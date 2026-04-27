"use client";
// Metadata cannot be exported from a Client Component. 
// Me move to layout or server wrapper soon.

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    serviceInterest: z.string().optional(),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

interface SiteSettings {
    phone?: string;
    secondaryPhone?: string;
    email?: string;
    address?: string;
    secondaryAddress?: string;
    socials?: {
        facebook?: string;
        instagram?: string;
        twitter?: string;
    };
}

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const submitContact = useMutation(api.contact.submit);
    const settings = useQuery(api.site_settings.getSiteSettings) as SiteSettings | undefined;
    
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

    const socialLinks = [
        { icon: "fa-facebook-f", url: settings?.socials?.facebook },
        { icon: "fa-instagram", url: settings?.socials?.instagram },
        { icon: "fa-twitter", url: settings?.socials?.twitter },
        { icon: "fa-whatsapp", url: settings?.phone ? `https://wa.me/${settings.phone.replace(/[^0-9]/g, '')}` : null },
    ].filter(link => link.url);

    return (
        <main className="page_content">
            {/* Page Banner - Start */}
            <section className="page_banner decoration_wrapper">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="page_title mb-0">Clinic Contacts</h1>
                        </div>
                        <div className="col-lg-6">
                            <ul className="breadcrumb_nav unordered_list justify-content-lg-end justify-content-center">
                                <li><Link href="/">Home</Link></li>
                                <li>Contact</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="decoration_item shape_leaf_1">
                    <img src="/assets/images/shapes/shape_leaf_left.svg" alt="Shape Leaf" />
                </div>
                <div className="decoration_item shape_leaf_2">
                    <img src="/assets/images/shapes/shape_leaf_right.svg" alt="Shape Leaf" />
                </div>
            </section>
            {/* Page Banner - End */}

            {/* Contact Section - Start */}
            <section className="contact_section section_space_lg">
                <div className="container">
                    <div className="conatiner_box">
                        <div className="section_heading mb-4">
                            <div className="row justify-content-lg-between">
                                <div className="col-lg-6">
                                    <h2 className="section_heading_text mb-0">
                                        Take care of your mental health now
                                    </h2>
                                </div>
                                <div className="col-lg-6">
                                    <p className="section_heading_description mb-0 ps-lg-4">
                                        Ready to take the next step on your journey? Reach out to schedule a consultation or ask any questions about our services.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-lg-between">
                            <div className="col-lg-6 mb-lg-0 mb-4">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input_name">Name</label>
                                                <input id="input_name" className={`form-control ${errors.name ? 'border-danger' : ''}`} type="text" placeholder="Your name" {...register("name")} />
                                                {errors.name && <small className="text-danger">{errors.name.message}</small>}
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="input_email">Email</label>
                                                <input id="input_email" className={`form-control ${errors.email ? 'border-danger' : ''}`} type="email" placeholder="Email address" {...register("email")} />
                                                {errors.email && <small className="text-danger">{errors.email.message}</small>}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="form-group mb-4">
                                                <label htmlFor="input_message">Message</label>
                                                <textarea id="input_message" className={`form-control ${errors.message ? 'border-danger' : ''}`} placeholder="Your message" {...register("message")}></textarea>
                                                {errors.message && <small className="text-danger">{errors.message.message}</small>}
                                            </div>
                                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                                <span className="btn_text" data-text={isSubmitting ? "Sending..." : "Get A Consultation"}>
                                                    {isSubmitting ? "Sending..." : "Get A Consultation"}
                                                </span>
                                                <span className="btn_icon">
                                                    <i className="fa-solid fa-arrow-up-right"></i>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="col-lg-6">
                                <div className="ps-lg-4">
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <ul className="contact_info_list unordered_list_block">
                                                <li>
                                                    <div className="item_icon">
                                                        <i className="fa-solid fa-phone"></i>
                                                    </div>
                                                    <div className="item_content">
                                                        <h3 className="item_title">Phone Number</h3>
                                                        <p className="item_info mb-0">{settings?.phone || "08033444411"} (Whatspp only)</p>
                                                        {settings?.secondaryPhone && <p className="item_info mb-0">{settings.secondaryPhone}</p>}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="item_icon">
                                                        <i className="fa-solid fa-location-dot"></i>
                                                    </div>
                                                    <div className="item_content">
                                                        <h3 className="item_title">Office</h3>
                                                        <p className="item_info mb-0">{settings?.address || "10 Bishop okoye Street, Owerri, Imo State Nigeria."}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="contact_info_list unordered_list_block">
                                                <li>
                                                    <div className="item_icon">
                                                        <i className="fa-solid fa-envelope"></i>
                                                    </div>
                                                    <div className="item_content">
                                                        <h3 className="item_title">Email</h3>
                                                        <p className="item_info mb-0">{settings?.email || "info@counsellingp2p.com"}</p>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="item_icon">
                                                        <i className="fa-solid fa-location-dot"></i>
                                                    </div>
                                                    <div className="item_content">
                                                        <h3 className="item_title">Location</h3>
                                                        <p className="item_info mb-0">{settings?.secondaryAddress || "Owerri, Nigeria"}</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <h3 className="social_title">Follow Us:</h3>
                                    <ul className="social_links unordered_list">
                                        {socialLinks.map((link, idx) => (
                                            <li key={idx}>
                                                <a className="bg-primary" href={link.url || '#!'} target="_blank" rel="noopener noreferrer">
                                                    <i className={`fa-brands ${link.icon}`}></i>
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contact Section - End */}

        </main>
    );
}


