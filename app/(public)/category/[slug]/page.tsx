import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { PageHero } from "@/components/layout/PageHero";
import { BlogGrid } from "@/components/blog-grid";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = await fetchQuery(api.categories.getBySlug, { slug });
    
    if (!category) return { title: "Category Not Found | Pain2Purpose" };

    return {
        title: `${category.name} | Pain2Purpose Blog`,
        description: category.description || `Explore insights and reflections on ${category.name}.`,
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await fetchQuery(api.categories.getBySlug, { slug });

    if (!category) notFound();

    return (
        <main className="min-h-screen bg-p2p-cream">
            <PageHero 
                title={category.name} 
                breadcrumb={[
                    { label: "Blog", href: "/blog" },
                    { label: category.name, href: `/category/${slug}` }
                ]} 
            />
            
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="mb-20 max-w-3xl">
                    <div className="w-12 h-1 bg-p2p-sage rounded-full mb-8" />
                    <h2 className="text-4xl font-serif font-bold text-p2p-charcoal italic mb-6">Exploring {category.name}</h2>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed italic">
                        {category.description}
                    </p>
                </div>

                <BlogGrid categoryId={category._id} />
            </div>
        </main>
    );
}
