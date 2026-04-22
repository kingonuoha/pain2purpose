import { PageHero } from "@/components/layout/PageHero";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Navbar } from "@/components/layout/Navbar";
import { FilteredBlogGrid } from "@/components/filtered-blog-grid";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = await fetchQuery(api.categories.getBySlug, { slug });

    if (!category) {
        return {
            title: "Category Not Found | Pain2Purpose",
        };
    }

    return {
        title: `${category.name} | Pain2Purpose`,
        description: category.description || `Explore our resources on ${category.name.toLowerCase()} and healing pathways.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = await fetchQuery(api.categories.getBySlug, { slug });

    if (!category) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": category.name,
        "description": category.description,
        "url": `https://counsellingp2p.com/category/${category.slug}`,
    };

    return (
        <main className="min-h-screen bg-p2p-cream">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar solid />
            <PageHero 
                title={category.name} 
                breadcrumb={[
                    { label: "Blog", href: "/articles" },
                    { label: category.name, href: `/category/${category.slug}` }
                ]} 
            />

            {/* Main Content Sections */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="max-w-3xl mb-16">
                        <p className="text-xl text-gray-500 font-medium leading-relaxed italic">
                            {category.description || `Exploring insights into ${category.name.toLowerCase()} and support for your journey.`}
                        </p>
                    </div>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-p2p-sage rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-p2p-charcoal italic">Resources in {category.name}</h2>
                    </div>
                    <FilteredBlogGrid categoryId={category._id} />
                </div>
            </section>
        </main>
    );
}
