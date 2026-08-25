import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JournalFooter, JournalHeader } from "@/components/JournalChrome";
import { featuredPost, latestPost, posts } from "@/content/blog";

export const metadata: Metadata = {
  title: "AI Systems Journal",
  description:
    "Field notes by Adithya S Nair on agentic AI, memory, evaluation, RAG, and building reliable intelligent systems.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AI Systems Journal | Adithya S Nair",
    description: "Field notes on agent memory, evaluation, RAG, and systems that hold up.",
    url: "/blog",
    type: "website",
    images: [{ url: latestPost.image, alt: latestPost.imageAlt }],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://adithyasnair.vercel.app/blog#blog",
  url: "https://adithyasnair.vercel.app/blog",
  name: "AI Systems Journal by Adithya S Nair",
  description: "Field notes on agentic AI, memory, evaluation, RAG, and reliable intelligent systems.",
  author: { "@id": "https://adithyasnair.vercel.app/#person" },
  blogPost: posts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    url: `https://adithyasnair.vercel.app/blog/${post.slug}`,
    datePublished: post.published,
  })),
};

export default function BlogPage() {
  return (
    <div className="editorial-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema).replace(/</g, "\\u003c") }}
      />
      <JournalHeader />
      <main className="blog-main" id="main">
        <section className="blog-hero page-grid" aria-labelledby="blog-title">
          <span className="eyebrow">Adithya&apos;s field journal / 2026</span>
          <h1 id="blog-title">Notes from the <em>hard part.</em></h1>
          <p>
            Clear thinking on AI systems after the demo: memory, evaluation, retrieval, agents, and the engineering choices that make them useful.
          </p>
        </section>

        <article className="featured-post page-grid">
          <Link className="featured-post-image" href={`/blog/${latestPost.slug}`} aria-label={`Read ${latestPost.title}`}>
            <Image src={latestPost.image} alt={latestPost.imageAlt} fill priority sizes="(max-width: 767px) 92vw, 58vw" />
            <span>Field note / 002</span>
          </Link>
          <div className="featured-post-copy">
            <div className="post-meta"><span>{latestPost.category}</span><span>{latestPost.publishedLabel}</span><span>{latestPost.readingTime}</span></div>
            <h2><Link href={`/blog/${latestPost.slug}`}>{latestPost.title}</Link></h2>
            <p>{latestPost.description}</p>
            <Link className="button button-primary" href={`/blog/${latestPost.slug}`}>Read the essay <span aria-hidden="true">↗</span></Link>
          </div>
        </article>

        <section className="post-archive page-grid" aria-labelledby="archive-title">
          <div className="post-archive-heading">
            <span className="eyebrow">Earlier field note / 001</span>
            <h2 id="archive-title">The journal so far.</h2>
          </div>
          <Link className="post-archive-card" href={`/blog/${featuredPost.slug}`}>
            <div className="post-meta"><span>{featuredPost.category}</span><span>{featuredPost.publishedLabel}</span><span>{featuredPost.readingTime}</span></div>
            <h3>{featuredPost.title}</h3>
            <p>{featuredPost.description}</p>
            <span className="text-link">Read field note <span aria-hidden="true">↗</span></span>
          </Link>
        </section>

        <section className="journal-principles page-grid" aria-label="Editorial principles">
          <div><strong>01 / Evidence</strong><h3>Claims need a trace.</h3><p>Architecture, constraints, and evaluation matter more than impressive vocabulary.</p></div>
          <div><strong>02 / Practice</strong><h3>Build before certainty.</h3><p>Useful ideas get stronger when they meet real data, tools, latency, and users.</p></div>
          <div><strong>03 / Clarity</strong><h3>Short words. Deep work.</h3><p>Complex systems deserve precise explanations, not longer headings.</p></div>
        </section>
      </main>
      <JournalFooter />
    </div>
  );
}
