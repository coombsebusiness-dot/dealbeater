import type { MetadataRoute } from "next";
import { blogPosts } from "@/app/components/lib/blog-posts";
import { supabaseAdmin } from "@/app/components/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const baseUrl = "https://blinlx.com";

type SitemapProduct = {
  slug: string;
  category: string | null;
  brand: string | null;
  model: string | null;
  updated_at: string | null;
  created_at: string | null;
};

function createUrlSlug(
  value?: string | null
): string | null {
  if (!value?.trim()) {
    return null;
  }

  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createCategorySlug(
  category?: string | null
): string | null {
  const normalisedCategory =
    category?.trim().toLowerCase();

  if (!normalisedCategory) {
    return null;
  }

  const categoryRoutes: Record<
    string,
    string
  > = {
    phone: "phones",
    phones: "phones",
    smartphone: "phones",
    smartphones: "phones",
    "mobile phone": "phones",
    "mobile phones": "phones",

    laptop: "laptops",
    laptops: "laptops",

    tablet: "tablets",
    tablets: "tablets",

    television: "tvs",
    televisions: "tvs",
    tv: "tvs",
    tvs: "tvs",

    headphone: "headphones",
    headphones: "headphones",
    earbuds: "headphones",

    smartwatch: "smartwatches",
    smartwatches: "smartwatches",

    camera: "cameras",
    cameras: "cameras",

    monitor: "monitors",
    monitors: "monitors",

    "games console": "games-consoles",
    "games consoles": "games-consoles",
    console: "games-consoles",
    consoles: "games-consoles",
  };

  return (
    categoryRoutes[normalisedCategory] ??
    createUrlSlug(category)
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: products, error } =
  await supabaseAdmin
    .from("products")
    .select(
      "slug, category, brand, model, updated_at, created_at"
    )
    .not("category", "is", null)
    .not("brand", "is", null)
    .not("model", "is", null)
    .order("updated_at", {
      ascending: false,
    });

  if (error) {
    console.error(
      "SITEMAP_PRODUCTS_SUPABASE_ERROR:",
      error
    );
  }

  const staticPages: MetadataRoute.Sitemap = [
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
      lastModified: new Date("2026-07-30"),
    },
  ];

  const blogPages: MetadataRoute.Sitemap =
    blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(
        post.updatedAt ??
          post.publishedAt
      ),
    }));

  const productPages =
    ((products ?? []) as SitemapProduct[])
      .map((product) => {
        const categorySlug =
          createCategorySlug(
            product.category
          );

        const brandSlug =
          createUrlSlug(product.brand);

        const modelSlug =
          createUrlSlug(product.model);

        if (
          !categorySlug ||
          !brandSlug ||
          !modelSlug
        ) {
          return null;
        }

        return {
          url:
            `${baseUrl}/products/` +
            `${categorySlug}/` +
            `${brandSlug}/` +
            `${modelSlug}`,

          lastModified: new Date(
            product.updated_at ??
              product.created_at ??
              Date.now()
          ),
        };
      })
      .filter(Boolean) as MetadataRoute.Sitemap;

  return [
    ...staticPages,
    ...blogPages,
    ...productPages,
  ];
}