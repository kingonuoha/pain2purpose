"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export function ConsultationSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        therapy: "",
        date: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const submitConsultation = useMutation(api.contact.submit);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (!formData.name || !formData.email || !formData.therapy) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            await submitConsultation({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                serviceInterest: formData.therapy,
                sessionDate: formData.date,
                message: `Requesting a first free online consultation for ${formData.therapy} on ${formData.date || "unspecified date"}.`,
            });
            toast.success("Request submitted successfully!", {
                description: "We've received your request and will get back to you shortly.",
            });
            setFormData({
                name: "",
                email: "",
                phone: "",
                therapy: "",
                date: "",
            });
        } catch (error) {
            console.error(error);
            toast.error("Submission failed", {
                description: "Something went wrong. Please try again later.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="consultation_section section_space_lg">
            <div className="container">
                <div className="consultation_form_wrap" style={{ backgroundColor: 'var(--bs-primary-bg-subtle)', borderRadius: 'var(--bs-border-radius)', padding: '60px', position: 'relative', overflow: 'hidden' }}>
                    <div className="section_heading text-center">
                        <h2 className="section_heading_text italic">
                            Get your first free <span style={{ color: 'var(--bs-primary)' }}>online consultation</span>
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_name">Full Name</label>
                                    <input 
                                        className="form-control" 
                                        id="input_name" 
                                        type="text" 
                                        placeholder="Your Name" 
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_email">Email Address</label>
                                    <input 
                                        className="form-control" 
                                        id="input_email" 
                                        type="email" 
                                        placeholder="Your Email" 
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_phone">Phone Number</label>
                                    <input 
                                        className="form-control" 
                                        id="input_phone" 
                                        type="tel" 
                                        placeholder="Mobile phone number" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_therapy">Choose Section</label>
                                    <select 
                                        className="form-select" 
                                        id="input_therapy" 
                                        value={formData.therapy}
                                        onChange={(e) => setFormData({ ...formData, therapy: e.target.value })}
                                        required
                                    >
                                        <option value="" disabled>Select Therapy</option>
                                        <option value="individual">Individual Therapy</option>
                                        <option value="couples">Couples Counseling</option>
                                        <option value="family">Family Transitions</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="input_date">Session Date</label>
                                    <input 
                                        className="form-control" 
                                        id="input_date" 
                                        type="date" 
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="col-12 text-center mt-4">
                                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    <span className="btn_text" data-text={isSubmitting ? "Submitting..." : "Get A Consultation"}>
                                        {isSubmitting ? "Submitting..." : "Get A Consultation"}
                                    </span>
                                    {!isSubmitting && <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ConsultationSection;
