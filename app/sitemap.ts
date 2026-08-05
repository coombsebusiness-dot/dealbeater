import type {
  MetadataRoute,
} from "next";

import {
  getAllBrands,
} from "@/knowledge/brands/BrandRegistry";

import {
  getAllCategories,
} from "@/knowledge/categories/CategoryRegistry";

import {
  getAllComparisons,
} from "@/knowledge/comparisons/ComparisonRegistry";

import {
  blogPosts,
} from "@/app/components/lib/blog-posts";

import {
  getAllBuyingGuides,
} from "@/knowledge/guides/GuideRegistry";

import {
  defaultProductBrain,
} from "@/knowledge/products/defaultProductBrain";

export const dynamic =
  "force-dynamic";

export const revalidate =
  0;

const baseUrl =
  "https://blinlx.com";

function createUrlSlug(
  value?: string | null,
): string | null {
  if (!value?.trim()) {
    return null;
  }

  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
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

  const categoryRoutes:
    Record<string, string> = {
    phone:
      "phones",

    phones:
      "phones",

    smartphone:
      "phones",

    smartphones:
      "phones",

    "mobile phone":
      "phones",

    "mobile phones":
      "phones",

    laptop:
      "laptops",

    laptops:
      "laptops",

    tablet:
      "tablets",

    tablets:
      "tablets",

    television:
      "tvs",

    televisions:
      "tvs",

    tv:
      "tvs",

    tvs:
      "tvs",

    headphone:
      "headphones",

    headphones:
      "headphones",

    earbuds:
      "headphones",

    smartwatch:
      "smartwatches",

    smartwatches:
      "smartwatches",

    camera:
      "cameras",

    cameras:
      "cameras",

    lens:
      "lenses",

    lenses:
      "lenses",

    battery:
      "batteries",

    batteries:
      "batteries",

    monitor:
      "monitors",

    monitors:
      "monitors",

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
    createUrlSlug(
      category,
    )
  );
}

function createProductModelSlug(
  productSlug: string,
  brand: string,
): string | null {
  const normalisedProductSlug =
    createUrlSlug(
      productSlug,
    );

  const normalisedBrand =
    createUrlSlug(
      brand,
    );

  if (
    !normalisedProductSlug ||
    !normalisedBrand
  ) {
    return null;
  }

  const brandPrefix =
    `${normalisedBrand}-`;

  if (
    normalisedProductSlug.startsWith(
      brandPrefix,
    )
  ) {
    return normalisedProductSlug.slice(
      brandPrefix.length,
    );
  }

  return normalisedProductSlug;
}

function createValidDate(
  value:
    | string
    | Date
    | null
    | undefined,
  fallback: string,
): Date {
  const candidate =
    value
      ? new Date(
          value,
        )
      : new Date(
          fallback,
        );

  if (
    Number.isNaN(
      candidate.getTime(),
    )
  ) {
    return new Date(
      fallback,
    );
  }

  return candidate;
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

  for (const page of pages) {
    const existing =
      pagesByUrl.get(
        page.url,
      );

    if (!existing) {
      pagesByUrl.set(
        page.url,
        page,
      );

      continue;
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
  }

  return Array.from(
    pagesByUrl.values(),
  );
}

export default function sitemap():
  MetadataRoute.Sitemap {
  const products =
    defaultProductBrain
      .getAllKnowledge();

  const staticPages:
    MetadataRoute.Sitemap = [
    {
      url:
        baseUrl,

      lastModified:
        new Date(
          "2026-07-24",
        ),

      changeFrequency:
        "daily",

      priority:
        1,
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

      priority:
        0.6,
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

      priority:
        0.4,
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

      priority:
        0.3,
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

      priority:
        0.3,
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

      priority:
        0.3,
    },

    {
      url:
        `${baseUrl}/blog`,

      lastModified:
        new Date(
          "2026-08-04",
        ),

      changeFrequency:
        "daily",

      priority:
        0.8,
    },
  ];

  const blogPages:
    MetadataRoute.Sitemap =
    blogPosts.map(
      (post) => ({
        url:
          `${baseUrl}/blog/${post.slug}`,

        lastModified:
          createValidDate(
            post.updatedAt ??
              post.publishedAt,
            "2026-07-24",
          ),

        changeFrequency:
          "monthly",

        priority:
          0.7,
      }),
    );

  const guidePages:
    MetadataRoute.Sitemap =
    getAllBuyingGuides().map(
      (guide) => ({
        url:
          `${baseUrl}${guide.seo.canonicalPath}`,

        lastModified:
          createValidDate(
            guide.updatedAt ??
              guide.publishedAt,
            "2026-08-01",
          ),

        changeFrequency:
          "monthly",

        priority:
          0.9,
      }),
    );

    const brandPages:
  MetadataRoute.Sitemap = [
  {
    url:
      `${baseUrl}/brands`,

    lastModified:
      new Date(
        "2026-08-04",
      ),

    changeFrequency:
      "weekly",

    priority:
      0.8,
  },

  ...getAllBrands().map(
    (brand) => ({
      url:
        `${baseUrl}${brand.seo.canonicalPath}`,

      lastModified:
        createValidDate(
          brand.updatedAt,
          "2026-08-04",
        ),

      changeFrequency:
        "weekly" as const,

      priority:
        0.85,
    }),
  ),
];

const categoryPages:
  MetadataRoute.Sitemap =
  getAllCategories().map(
    (category) => ({
      url:
        `${baseUrl}${category.seo.canonicalPath}`,

      lastModified:
        createValidDate(
          category.updatedAt,
          "2026-08-04",
        ),

      changeFrequency:
        "weekly",

      priority:
        0.85,
    }),
  );

const comparisonPages:
  MetadataRoute.Sitemap =
  getAllComparisons().map(
    (comparison) => ({
      url:
        `${baseUrl}/comparisons/${comparison.slug}`,

      lastModified:
        createValidDate(
          comparison.updatedAt,
          "2026-08-04",
        ),

      changeFrequency:
        "monthly",

      priority:
        0.85,
    }),
  );

  const productPages:
    MetadataRoute.Sitemap =
    products
      .map(
        (
          product,
        ):
          | MetadataRoute.Sitemap[number]
          | null => {
          const categorySlug =
            createCategorySlug(
              product.category,
            );

          const brandSlug =
            createUrlSlug(
              product.brand,
            );

          const modelSlug =
            createProductModelSlug(
              product.slug,
              product.brand,
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
              createValidDate(
                product.updatedAt ??
                  product.createdAt,
                "2026-08-04",
              ),

            changeFrequency:
              "weekly",

            priority:
              0.9,
          };
        },
      )
      .filter(
        (
          page,
        ): page is
          MetadataRoute.Sitemap[number] =>
          page !== null,
      );

  return removeDuplicateUrls([
  ...staticPages,
  ...blogPages,
  ...guidePages,
  ...productPages,
  ...brandPages,
  ...categoryPages,
  ...comparisonPages,
]);
}