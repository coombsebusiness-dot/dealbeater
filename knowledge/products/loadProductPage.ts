import type {
  Product,
} from "@/types/product";

import {
  extractProductIdentity,
} from "@/lib/product-intelligence/product-identity";

import {
  getProductBySlug,
} from "@/app/components/lib/products/getProductBySlug";

import {
  media,
} from "@/knowledge/media/ProductMediaRegistry";

import {
  defaultProductBrain,
} from "./defaultProductBrain";

import {
  toProduct,
} from "./toProduct";

function normaliseSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function titleCase(
  value: string,
): string {
  return value
    .replace(
      /[-_]+/g,
      " ",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}

function cleanProductName(
  value: string,
  fallback: string,
): string {
  const productName =
    value.trim().length > 0
      ? value
      : titleCase(
          fallback,
        );

  return productName
    .replace(
      /\bsony a1\b/i,
      "Sony Alpha 1",
    )
    .replace(
      /\bcamera body only\b/i,
      "Mirrorless Camera Body",
    )
    .replace(
      /\s+/g,
      " ",
    )
    .trim();
}

function createVerdictLabel(
  product: Product,
): string | undefined {
  if (
    typeof product.verdictLabel ===
      "string" &&
    product.verdictLabel
      .trim()
      .length > 0
  ) {
    return product.verdictLabel
      .trim();
  }

  if (
    typeof product.verdict !==
      "string" ||
    product.verdict
      .trim()
      .length === 0
  ) {
    return undefined;
  }

  return product.verdict
    .replace(
      /_/g,
      " ",
    )
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}

function createPriceStatus(
  product: Product,
): Product["priceStatus"] {
  if (product.priceStatus) {
    return product.priceStatus;
  }

  if (
    typeof product.currentPrice !==
      "number" ||
    typeof product.fairPrice !==
      "number"
  ) {
    return undefined;
  }

  if (
    product.currentPrice <=
    product.fairPrice * 0.9
  ) {
    return "Excellent";
  }

  if (
    product.currentPrice <=
    product.fairPrice
  ) {
    return "Good";
  }

  if (
    product.currentPrice <=
    product.fairPrice * 1.1
  ) {
    return "Fair";
  }

  return "High";
}

function prepareStoredProduct(
  storedProduct: Product,
  fallbackSlug: string,
): Product {
  const cleanedProductName =
    cleanProductName(
      storedProduct.name,
      fallbackSlug,
    );

  const identity =
    extractProductIdentity(
      cleanedProductName,
    );

  return {
    ...storedProduct,

    id:
      storedProduct.id ||
      storedProduct.slug,

    slug:
      storedProduct.slug ||
      normaliseSlug(
        fallbackSlug,
      ),

    name:
      cleanedProductName,

    brand:
      storedProduct.brand ||
      identity.brand ||
      "",

    category:
      storedProduct.category ||
      identity.category ||
      "Products",

    model: {
      ...storedProduct.model,

      base:
        storedProduct.model?.base ||
        identity.model ||
        titleCase(
          fallbackSlug,
        ),
    },

    specs:
      storedProduct.specs ??
      {},

    image:
      storedProduct.image ||
      undefined,

    imageAlt:
      storedProduct.imageAlt ||
      `${cleanedProductName} product image`,

    summary:
      storedProduct.summary ||
      `Blinlx analysis for ${cleanedProductName}.`,

    verdictLabel:
      createVerdictLabel(
        storedProduct,
      ),

    priceStatus:
      createPriceStatus(
        storedProduct,
      ),

    priceHistoryUrl:
      storedProduct
        .priceHistoryUrl ??
      "#price-history",

    highlights:
      storedProduct.highlights ??
      [],

    topOffers:
      storedProduct.topOffers ??
      [],

    alternatives:
      storedProduct.alternatives ??
      [],

    faqs:
      storedProduct.faqs ??
      [],
  };
}

async function addMediaImage(
  product: Product,
  productIds: string[],
): Promise<Product> {
  const uniqueProductIds =
    Array.from(
      new Set(
        productIds
          .filter(
            Boolean,
          )
          .map(
            normaliseSlug,
          ),
      ),
    );

  try {
    for (
      const productId of
      uniqueProductIds
    ) {
      const heroImage =
        await media.getHero(
          productId,
        );

      if (!heroImage) {
        continue;
      }

      return {
        ...product,

        image:
          heroImage.publicUrl,

        imageAlt:
          heroImage.alt,
      };
    }
  } catch (error) {
    console.error(
      `Unable to load media for ${product.slug}:`,
      error,
    );
  }

  return product;
}

export async function loadProductPage(
  canonicalSlug: string,
  fallbackSlug?: string,
): Promise<Product | null> {
  const normalisedCanonicalSlug =
    normaliseSlug(
      canonicalSlug,
    );

  const normalisedFallbackSlug =
    fallbackSlug
      ? normaliseSlug(
          fallbackSlug,
        )
      : undefined;

  /*
   * Canonical Product Brain products are the
   * preferred source for researched products.
   */
  const canonicalProduct =
    await defaultProductBrain.get(
      normalisedCanonicalSlug,
    );

  const canonicalIntelligence =
    canonicalProduct
      ? await defaultProductBrain
          .analyse(
            normalisedCanonicalSlug,
          )
      : null;

  if (
    canonicalProduct &&
    canonicalIntelligence
  ) {
    const product =
      toProduct(
        canonicalProduct,
        canonicalIntelligence,
      );

    return addMediaImage(
      product,
      [
        normalisedCanonicalSlug,
        product.id,
        product.slug,
      ],
    );
  }

  /*
   * Dynamically saved and older products continue
   * to use Supabase product data as a fallback.
   */
  const storedProduct =
    (
      await getProductBySlug(
        normalisedCanonicalSlug,
      )
    ) ??
    (
      normalisedFallbackSlug
        ? await getProductBySlug(
            normalisedFallbackSlug,
          )
        : null
    );

  if (!storedProduct) {
    return null;
  }

  const preparedProduct =
    prepareStoredProduct(
      storedProduct,
      normalisedFallbackSlug ??
        normalisedCanonicalSlug,
    );

  return addMediaImage(
    preparedProduct,
    [
      normalisedCanonicalSlug,
      normalisedFallbackSlug ??
        "",
      preparedProduct.slug,
      preparedProduct.id,
    ],
  );
}