import type { MetadataRoute } from "next";
import { featuredPost } from "@/content/blog";

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
      lastModified: featuredPost.published,
      changeFrequency: "weekly",
      priority: 0.8,
      images: [`${baseUrl}${featuredPost.image}`],
    },
    {
      url: `${baseUrl}/blog/${featuredPost.slug}`,
      lastModified: featuredPost.published,
      changeFrequency: "monthly",
      priority: 0.9,
      images: [`${baseUrl}${featuredPost.image}`],
    },
  ];
}
