import type {
  MetadataRoute,
} from "next";

import {
  blogPosts,
} from "@/app/components/lib/blog-posts";

import {
  supabaseAdmin,
} from "@/app/components/lib/supabase/admin";

import {
  getAllBuyingGuides,
} from "@/knowledge/guides/GuideRegistry";

export const dynamic =
  "force-dynamic";

export const revalidate = 0;

const baseUrl =
  "https://blinlx.com";

type SitemapProduct = {
  slug: string;
  category: string | null;
  brand: string | null;
  model: string | null;
  updated_at: string | null;
  created_at: string | null;
};

function createUrlSlug(
  value?: string | null,
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
  category?: string | null,
): string | null {
  const normalisedCategory =
    category
      ?.trim()
      .toLowerCase();

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

    "games console":
      "games-consoles",

    "games consoles":
      "games-consoles",

    console:
      "games-consoles",

    consoles:
      "games-consoles",
  };

  return (
    categoryRoutes[
      normalisedCategory
    ] ??
    createUrlSlug(category)
  );
}

function removeDuplicateUrls(
  pages:
    MetadataRoute.Sitemap,
): MetadataRoute.Sitemap {
  const pagesByUrl =
    new Map<
      string,
      MetadataRoute.Sitemap[number]
    >();

  pages.forEach((page) => {
    const existing =
      pagesByUrl.get(page.url);

    if (!existing) {
      pagesByUrl.set(
        page.url,
        page,
      );

      return;
    }

    const existingDate =
      existing.lastModified
        ? new Date(
            existing.lastModified,
          ).getTime()
        : 0;

    const incomingDate =
      page.lastModified
        ? new Date(
            page.lastModified,
          ).getTime()
        : 0;

    if (
      incomingDate >
      existingDate
    ) {
      pagesByUrl.set(
        page.url,
        page,
      );
    }
  });

  return Array.from(
    pagesByUrl.values(),
  );
}

export default async function sitemap():
  Promise<
    MetadataRoute.Sitemap
  > {
  const {
    data: products,
    error,
  } = await supabaseAdmin
    .from("products")
    .select(
      "slug, category, brand, model, updated_at, created_at",
    )
    .not(
      "category",
      "is",
      null,
    )
    .not(
      "brand",
      "is",
      null,
    )
    .not(
      "model",
      "is",
      null,
    )
    .order(
      "updated_at",
      {
        ascending: false,
      },
    );

  if (error) {
    console.error(
      "SITEMAP_PRODUCTS_SUPABASE_ERROR:",
      error,
    );
  }

  const staticPages:
    MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified:
        new Date(
          "2026-07-24",
        ),
      changeFrequency:
        "daily",
      priority: 1,
    },

    {
      url:
        `${baseUrl}/about`,
      lastModified:
        new Date(
          "2026-07-24",
        ),
      changeFrequency:
        "monthly",
      priority: 0.6,
    },

    {
      url:
        `${baseUrl}/contact`,
      lastModified:
        new Date(
          "2026-07-24",
        ),
      changeFrequency:
        "yearly",
      priority: 0.4,
    },

    {
      url:
        `${baseUrl}/privacy`,
      lastModified:
        new Date(
          "2026-07-24",
        ),
      changeFrequency:
        "yearly",
      priority: 0.3,
    },

    {
      url:
        `${baseUrl}/terms`,
      lastModified:
        new Date(
          "2026-07-24",
        ),
      changeFrequency:
        "yearly",
      priority: 0.3,
    },

    {
      url:
        `${baseUrl}/cookies`,
      lastModified:
        new Date(
          "2026-07-24",
        ),
      changeFrequency:
        "yearly",
      priority: 0.3,
    },

    {
      url:
        `${baseUrl}/blog`,
      lastModified:
        new Date(
          "2026-07-30",
        ),
      changeFrequency:
        "daily",
      priority: 0.8,
    },
  ];

  const blogPages:
    MetadataRoute.Sitemap =
    blogPosts.map(
      (post) => ({
        url:
          `${baseUrl}/blog/${post.slug}`,

        lastModified:
          new Date(
            post.updatedAt ??
              post.publishedAt,
          ),

        changeFrequency:
          "monthly",

        priority: 0.7,
      }),
    );

  const guidePages:
    MetadataRoute.Sitemap =
    getAllBuyingGuides().map(
      (guide) => ({
        url:
          `${baseUrl}${guide.seo.canonicalPath}`,

        lastModified:
          new Date(
            guide.updatedAt,
          ),

        changeFrequency:
          "monthly",

        priority: 0.9,
      }),
    );

  const productPages =
    (
      (products ?? []) as
        SitemapProduct[]
    )
      .map((product) => {
        const categorySlug =
          createCategorySlug(
            product.category,
          );

        const brandSlug =
          createUrlSlug(
            product.brand,
          );

        const modelSlug =
          createUrlSlug(
            product.model,
          );

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

          lastModified:
            new Date(
              product.updated_at ??
                product.created_at ??
                Date.now(),
            ),

          changeFrequency:
            "weekly" as const,

          priority: 0.8,
        };
      })
      .filter(
        (
          page,
        ): page is NonNullable<
          typeof page
        > => page !== null,
      );

  return removeDuplicateUrls([
    ...staticPages,
    ...blogPages,
    ...guidePages,
    ...productPages,
  ]);
}