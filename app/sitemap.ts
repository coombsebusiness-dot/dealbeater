import type { MetadataRoute } from "next";
import { blogPosts } from "@/app/components/lib/blog-posts";

const baseUrl = "https://dealbeater.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-07-24"),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-07-24"),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-07-24"),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-07-24"),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-07-24"),
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date("2026-07-24"),
    },
    {
  url: `${baseUrl}/blog`,
  lastModified: new Date("2026-07-24"),
},
...blogPosts.map((post) => ({
  url: `${baseUrl}/blog/${post.slug}`,
  lastModified: new Date(post.updatedAt ?? post.publishedAt),
})),
  ];
}