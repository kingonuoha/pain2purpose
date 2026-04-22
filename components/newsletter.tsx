"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";


export function Newsletter() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const subscribe = useMutation(api.users.subscribeToNewsletter);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const result = (await subscribe({ email })) as { status: string };
            setEmail("");

            if (result.status === "invited") {
                toast.success("Invitation sent!", {
                    description: "Check your email to confirm your subscription and create your account.",
                });
            } else {
                toast.success("Welcome to the circle of truth.", {
                    description: "You've been successfully subscribed to our newsletter.",
                });
            }
        } catch (error) {
            console.error(error);
            toast.error("Subscription failed", {
                description: "Failed to process your subscription. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="newsletter_section section_space_lg bg-primary-bg-subtle">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="section_heading mb-0">
                            <h2 className="section_heading_text">Join Our Newsletter</h2>
                            <p className="section_heading_description">
                                Deep truths, delivered. Join seekers getting weekly insights that challenge conventional perception.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-0" style={{ position: "relative" }}>
                                <input 
                                    className="form-control" 
                                    type="email" 
                                    placeholder="Enter your email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ height: "60px", paddingRight: "150px" }}
                                    required
                                />
                                <button 
                                    className="btn btn-primary" 
                                    type="submit"
                                    disabled={isSubmitting}
                                    style={{ 
                                        position: "absolute", 
                                        top: "5px", 
                                        right: "5px", 
                                        bottom: "5px",
                                        padding: "0 25px"
                                    }}
                                >
                                    <span className="btn_text" data-text={isSubmitting ? "..." : "Join Now"}>
                                        {isSubmitting ? "..." : "Join Now"}
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Newsletter;
