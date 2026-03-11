import { Navbar } from "@/components/navbar";
import { BlogGrid } from "@/components/blog-grid";
import Image from "next/image";
import { Metadata } from "next";
import { getOgImageUrl } from "@/lib/utils";

export const revalidate = 60; // ISR: Revalidate every 60 seconds

interface TopicPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TopicPageProps): Promise<Metadata> {
    const { slug } = await params;
    const topicName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    return {
        title: `${topicName} | The Truth Pill`,
        description: `Explore profound insights and deep dives into the ${topicName.toLowerCase()} topic.`,
        openGraph: {
            title: `${topicName} | The Truth Pill`,
            description: `A collection of articles exploring ${topicName.toLowerCase()}.`,
            images: [
                {
                    url: getOgImageUrl(topicName),
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default async function TopicPage({ params }: TopicPageProps) {
    const { slug } = await params;
    const topicName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const fallbackImage = "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1200";

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": topicName,
        "description": `Explore profound insights and deep dives into the ${topicName.toLowerCase()} topic.`,
        "url": `https://thetruthpill.org/topic/${slug}`,
    };

    return (
        <main className="min-h-screen bg-background">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            {/* Topic Header */}
            <header className="relative w-full h-[60vh] flex items-center justify-center text-center px-6 overflow-hidden">
                <Image
                    src={fallbackImage}
                    alt={topicName}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-[2px]" />

                <div className="relative z-10 max-w-4xl">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-sky-blue text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                        Topic Focus
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-6 uppercase tracking-tight">
                        {topicName}
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                        Explore profound insights and deep dives into the {topicName.toLowerCase()} topic to uncover underlying patterns.
                    </p>
                </div>
            </header>

            {/* Main Content Sections */}
            <section className="bg-white">
                <div className="max-w-7xl mx-auto pt-24 px-6">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-1 bg-sky-blue rounded-full" />
                        <h2 className="text-2xl md:text-3xl font-serif font-bold">Insights into {topicName}</h2>
                    </div>
                </div>
                <BlogGrid topic={slug} />
            </section>
        </main>
    );
}
