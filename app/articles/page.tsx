import { Navbar } from "@/components/layout/Navbar";
import { PageHero } from "@/components/layout/PageHero";
import { BlogGrid } from "@/components/blog-grid";
import { Newsletter } from "@/components/newsletter";
import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { JoinedArticle } from "@/components/blog-grid";
import { CategoryShowcase } from "@/components/category-showcase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Wisdom & Stories | Pain2Purpose",
  description: "Explore our collection of articles on healing, purpose, and navigating life's challenges.",
};

export default async function ArticlesPage() {
  const initialArticles = await fetchQuery(api.articles.list, { 
    paginationOpts: { numItems: 12, cursor: null } 
  });

  return (
    <main className="min-h-screen bg-p2p-cream">
      <Navbar solid={true} />
      <PageHero 
        title="Wisdom & Stories" 
        breadcrumb={[{ label: "Blog", href: "/articles" }]} 
      />
      
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="mb-20">
            <h2 className="text-p2p-sage text-xs font-black uppercase tracking-[0.3em] mb-4">
              Our Journal
            </h2>
            <h3 className="text-5xl md:text-6xl font-serif font-bold text-p2p-charcoal max-w-3xl leading-tight">
              Healing resources <span className="italic">for your journey.</span>
            </h3>
            <p className="mt-8 text-gray-500 italic text-lg max-w-2xl leading-relaxed">
              Explore our full collection of articles, stories, and insights designed to support your growth from pain to purpose.
            </p>
          </div>
          
          <BlogGrid initialArticles={initialArticles.page as JoinedArticle[]} />
        </div>
      </section>

      {/* Category Explorer Section */}
      <section className="py-24 bg-p2p-soft-green/20 border-y border-p2p-soft-green/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-p2p-sage text-xs font-black uppercase tracking-[0.3em] mb-4">
              Explore Topics
            </h2>
            <h3 className="text-4xl font-serif font-bold text-p2p-charcoal mb-4">
              Choose what you want to <span className="italic">explore next.</span>
            </h3>
          </div>
          <CategoryShowcase />
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <Newsletter />
      </div>
    </main>
  );
}


