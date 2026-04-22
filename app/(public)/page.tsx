import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { TestimonialSection } from "@/components/home/TestimonialSection";
import { ConsultationSection } from "@/components/home/ConsultationSection";
import { BlogSection } from "@/components/home/BlogSection";
import { FAQSection } from "@/components/home/FAQSection";
import { Newsletter } from "@/components/newsletter";
import { Metadata } from "next";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

export const metadata: Metadata = {
  title: "Pain2Purpose | From Pain to Purpose Counselling Practice",
  description: "Therapeutic counselling support for healing, growth, and finding meaning. Sandra Opara supports individuals through grief, loss, and family challenges.",
  openGraph: {
    title: "Pain2Purpose | From Pain to Purpose Counselling Practice",
    description: "Therapeutic counselling support for healing, growth, and finding meaning.",
    url: "https://counsellingp2p.com",
    siteName: "Pain2Purpose",
    images: [
      {
        url: "/p2p-og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default async function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Pain2Purpose",
    "url": "https://counsellingp2p.com",
    "description": "Therapeutic counselling support for healing, growth, and finding meaning.",
    "publisher": {
      "@type": "Organization",
      "name": "Pain2Purpose",
      "logo": {
        "@type": "ImageObject",
        "url": "https://counsellingp2p.com/p2p/logo.png",
      },
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://counsellingp2p.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <main className="page_content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      
      <ServicesGrid />

      <AboutTeaser />

      <TestimonialSection />

      <ConsultationSection />

      <BlogSection />

      <FAQSection />

      <Newsletter />
    </main>
  );
}


