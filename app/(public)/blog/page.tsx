import { BlogGrid } from "@/components/blog-grid";
import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { JoinedArticle } from "@/components/blog-grid";
import Link from "next/link";
import Image from "next/image";

import { Sidebar } from "@/components/blog/Sidebar";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "From Sandra's Desk | Pain2Purpose Counselling Blog",
  description: "Insights, reflections and healing resources from Sandra Opara. Explore articles on mental health, grief, relationships, and finding purpose after pain.",
  keywords: ["counselling blog", "mental health resources", "Sandra Opara", "healing after grief", "relationship advice", "Pain2Purpose"],
};

export default async function BlogPage() {
  const initialArticles = await fetchQuery(api.articles.list, { 
    paginationOpts: { numItems: 12, cursor: null } 
  });

  return (
    <main className="page_content">
      {/* Page Banner - Start */}
      <section className="page_banner decoration_wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="page_title mb-0">From Sandra&apos;s Desk</h1>
            </div>
            <div className="col-lg-6">
              <ul className="breadcrumb_nav unordered_list justify-content-md-end justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li>From Sandra&apos;s Desk</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="decoration_item shape_leaf_1">
          <Image src="/assets/images/shapes/shape_leaf_left.svg" alt="Shape Leaf" width={200} height={200} />
        </div>
        <div className="decoration_item shape_leaf_2">
          <Image src="/assets/images/shapes/shape_leaf_right.svg" alt="Shape Leaf" width={200} height={200} />
        </div>
      </section>
      {/* Page Banner - End */}

      {/* Blog Section - Start */}
      <section className="blog_section section_space_lg">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <BlogGrid initialArticles={initialArticles.page as JoinedArticle[]} />
            </div>

            <div className="col-lg-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section - End */}
    </main>
  );
}


