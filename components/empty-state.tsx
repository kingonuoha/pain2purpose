"use client";

import Image from "next/image";

interface EmptyStateProps {
    title: string;
    description: string;
    illustration?: string;
    action?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    illustration = "Nothing-here.svg",
    action
}: EmptyStateProps) {
    return (
        <div className="text-center py-5">
            <div className="mb-4" style={{ width: "180px", height: "180px", margin: "0 auto 1.5rem" }}>
                <Image
                    src={`/illustrations/${illustration}`}
                    alt={title}
                    width={180}
                    height={180}
                    style={{ objectFit: "contain", opacity: 0.8 }}
                />
            </div>
            <h3 className="section_heading_text" style={{ fontSize: "1.5rem" }}>{title}</h3>
            <p className="section_heading_description">{description}</p>
            {action && (
                <div className="btn_wrap">
                    {action}
                </div>
            )}
        </div>
    );
}
