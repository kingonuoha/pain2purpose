"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import * as LucideIcons from "lucide-react";

const ICON_MAP: Record<string, string> = {
    "grief": "/assets/images/icons/icon_head.svg",
    "couples": "/assets/images/icons/icon_head_double.svg",
    "depression": "/assets/images/icons/icon_brain.svg",
    "anxiety": "/assets/images/icons/icon_brain_plus.svg",
    "trauma": "/assets/images/icons/icon_head_plus.svg",
    "growth": "/assets/images/icons/icon_head_children.svg",
};

export function ServicesGrid() {
    const services = useQuery(api.services.list);

    return (
        <section className="service_section section_space_lg">
            <div className="container">
                <div className="section_heading text-center">
                    <h2 className="section_heading_text">How We Can Help</h2>
                    <p className="section_heading_description">
                        We provide a safe haven for individuals, couples, and families navigating life&apos;s most difficult transitions.
                    </p>
                </div>
                <div className="row">
                    {services?.map((service) => (
                        <div key={service._id} className="col-lg-4 col-md-6 col-sm-6">
                            <div className="service_item">
                                <div className="item_icon" style={{ backgroundColor: 'var(--bs-primary-bg-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {(() => {
                                        const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; className?: string }>>)[service.icon];
                                        if (Icon) {
                                            return <Icon size={40} className="text-[#7C9A7E]" />;
                                        }
                                        return (
                                            <Image
                                                src={ICON_MAP[service.slug.split('-')[0]] || "/assets/images/icons/icon_brain.svg"}
                                                alt={service.title}
                                                width={50}
                                                height={50}
                                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                                            />
                                        );
                                    })()}
                                </div>
                                <h3 className="item_title">{service.title}</h3>
                                <p>{service.shortDescription}</p>
                                <Link className="btn-link" href={`/services/${service.slug}`}>
                                    <span className="btn_text">Read More</span>
                                    <span className="btn_icon"><i className="fa-solid fa-arrow-up-right"></i></span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ServicesGrid;
