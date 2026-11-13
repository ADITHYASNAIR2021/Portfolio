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
          <h1 id="blog-title">A place to <em>think out loud.</em></h1>
          <p>
            Notes on agents, memory, evaluation, and the engineering questions I keep coming back to.
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
          <div><strong>01 / Questions</strong><h3>What am I trying to understand?</h3><p>Usually something at the intersection of models, software, and how people use them.</p></div>
          <div><strong>02 / Experiments</strong><h3>What happens when I build it?</h3><p>Implementation tends to raise questions that the first diagram missed.</p></div>
          <div><strong>03 / Notes</strong><h3>What would I explain differently?</h3><p>This journal is a place to make those ideas clearer and share what I’m learning.</p></div>
        </section>
      </main>
      <JournalFooter />
    </div>
  );
}
