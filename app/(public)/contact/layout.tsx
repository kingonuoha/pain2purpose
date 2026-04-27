import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Sandra Opara | Book a Counselling Session",
    description: "Get in touch with Pain2Purpose Counselling Practice. Schedule a consultation for grief, trauma, or life transition support in Owerri or online.",
    keywords: ["contact Sandra Opara", "book therapy session", "counselling consultation", "mental health support Owerri"],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
