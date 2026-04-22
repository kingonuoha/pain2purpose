import { BlogGrid } from "@/components/blog-grid";
import { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { JoinedArticle } from "@/components/blog-grid";
import Link from "next/link";
import Image from "next/image";

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
    <main className="page_content">
      {/* Page Banner - Start */}
      <section className="page_banner decoration_wrapper">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="page_title mb-0">Blog Grid</h1>
            </div>
            <div className="col-lg-6">
              <ul className="breadcrumb_nav unordered_list justify-content-md-end justify-content-center">
                <li><Link href="/">Home</Link></li>
                <li>Blog Grid</li>
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
              <aside className="sidebar ps-lg-4">
                <div className="form-group">
                  <input id="sidebar_search" className="form-control" type="search" name="search" placeholder="Search" />
                  <button type="submit" className="input_icon">
                    <i className="fa-regular fa-magnifying-glass"></i>
                  </button>
                </div>
                <div className="sidebar_widget">
                  <h3 className="sidebar_widget_title">
                    <span className="title_icon">
                      <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                    </span>
                    <span className="title_text">Categories</span>
                  </h3>
                  <ul className="post_category_list unordered_list_block">
                    <li>
                      <Link href="#!">
                        <span className="category_name">Relationship</span>
                        <span className="category_counter">12</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!">
                        <span className="category_name">Family Problem</span>
                        <span className="category_counter">23</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!">
                        <span className="category_name">Couple Problem</span>
                        <span className="category_counter">36</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!">
                        <span className="category_name">Parenting</span>
                        <span className="category_counter">16</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="#!">
                        <span className="category_name">Depression</span>
                        <span className="category_counter">17</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="sidebar_widget">
                  <h3 className="sidebar_widget_title">
                    <span className="title_icon">
                      <Image src="/assets/images/site_logo/favourite_icon.svg" alt="Icon" width={20} height={20} />
                    </span>
                    <span className="title_text">Popular Tags</span>
                  </h3>
                  <ul className="post_tags unordered_list">
                    <li><Link href="#!">Family Problem</Link></li>
                    <li><Link href="#!">Therapy</Link></li>
                    <li><Link href="#!">Teenagers</Link></li>
                    <li><Link href="#!">Depression</Link></li>
                    <li><Link href="#!">Life Balance</Link></li>
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Section - End */}
    </main>
  );
}


