import type { MetadataRoute } from "next";
import { latestPost, posts } from "@/content/blog";

const baseUrl = "https://adithyasnair.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: "2026-08-03",
      changeFrequency: "monthly",
      priority: 1,
      images: [`${baseUrl}/images/adithya-professional-v3.webp`],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPost.published,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${baseUrl}${latestPost.image}`],
    },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.published,
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [`${baseUrl}${post.image}`],
    })),
  ];
}
