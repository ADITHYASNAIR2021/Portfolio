import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JournalFooter, JournalHeader } from "@/components/JournalChrome";
import { featuredPost } from "@/content/blog";

export const metadata: Metadata = {
  title: "AI Systems Journal",
  description:
    "Field notes by Adithya S Nair on agentic AI, memory, evaluation, medical AI, RAG, and building reliable intelligent systems.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "AI Systems Journal | Adithya S Nair",
    description: "Field notes on agent memory, evaluation, medical AI, RAG, and systems that hold up.",
    url: "/blog",
    type: "website",
    images: [{ url: featuredPost.image, alt: featuredPost.imageAlt }],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://adithyasnair.vercel.app/blog#blog",
  url: "https://adithyasnair.vercel.app/blog",
  name: "AI Systems Journal by Adithya S Nair",
  description: "Field notes on agentic AI, memory, evaluation, medical AI, RAG, and reliable intelligent systems.",
  author: { "@id": "https://adithyasnair.vercel.app/#person" },
  blogPost: {
    "@type": "BlogPosting",
    headline: featuredPost.title,
    url: `https://adithyasnair.vercel.app/blog/${featuredPost.slug}`,
    datePublished: featuredPost.published,
  },
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
            Clear thinking on AI systems after the demo: memory, evaluation, medical vision, retrieval, agents, and the engineering choices that make them useful.
          </p>
        </section>

        <article className="featured-post page-grid">
          <Link className="featured-post-image" href={`/blog/${featuredPost.slug}`} aria-label={`Read ${featuredPost.title}`}>
            <Image src={featuredPost.image} alt={featuredPost.imageAlt} fill priority sizes="(max-width: 767px) 92vw, 58vw" />
            <span>Field note / 001</span>
          </Link>
          <div className="featured-post-copy">
            <div className="post-meta"><span>{featuredPost.category}</span><span>{featuredPost.publishedLabel}</span><span>{featuredPost.readingTime}</span></div>
            <h2><Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link></h2>
            <p>{featuredPost.description}</p>
            <Link className="button button-primary" href={`/blog/${featuredPost.slug}`}>Read the essay <span aria-hidden="true">↗</span></Link>
          </div>
        </article>

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
