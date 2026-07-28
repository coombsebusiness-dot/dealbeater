import type { Product } from "@/types/product";

import { supabaseAdmin } from "@/app/components/lib/supabase/admin";

function parseNumericValue(
  value: unknown,
  fallback = 0
): number {
  if (
    typeof value === "number" &&
    Number.isFinite(value)
  ) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseFloat(
      value.replace(/[^\d.-]/g, "")
    );

    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return fallback;
}

function parseOptionalNumber(
  value: unknown
): number | undefined {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return undefined;
  }

  const parsed = parseNumericValue(
    value,
    Number.NaN
  );

  return Number.isFinite(parsed)
    ? parsed
    : undefined;
}

function parseJsonValue<T>(
  value: unknown,
  fallback: T
): T {
  if (
    value === null ||
    value === undefined
  ) {
    return fallback;
  }

  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }

  if (typeof value === "object") {
    return value as T;
  }

  return fallback;
}

function normaliseOffers(
  value: unknown
): NonNullable<Product["topOffers"]> {
  const rawOffers = parseJsonValue<
    Array<Record<string, unknown>>
  >(value, []);

  const offers: NonNullable<
    Product["topOffers"]
  > = [];

  for (const offer of rawOffers) {
    const retailer =
      typeof offer.retailer === "string"
        ? offer.retailer
        : typeof offer.retailerName === "string"
          ? offer.retailerName
          : "";

    const title =
      typeof offer.title === "string"
        ? offer.title
        : typeof offer.productName === "string"
          ? offer.productName
          : "";

    const url =
      typeof offer.url === "string"
        ? offer.url
        : typeof offer.retailerUrl === "string"
          ? offer.retailerUrl
          : "";

    const price = parseOptionalNumber(
      offer.price
    );

    if (
      !retailer ||
      !title ||
      !url ||
      price === undefined
    ) {
      continue;
    }

    const normalisedOffer: NonNullable<
      Product["topOffers"]
    >[number] = {
      retailer,
      title,
      price,
      url,
    };

    if (
      typeof offer.image === "string" &&
      offer.image.trim()
    ) {
      normalisedOffer.image =
        offer.image;
    }

    offers.push(normalisedOffer);
  }

  return offers;
}

function normaliseAlternatives(
  value: unknown
): NonNullable<Product["alternatives"]> {
  const rawAlternatives =
    parseJsonValue<
      Array<Record<string, unknown>>
    >(value, []);

  const alternatives: NonNullable<
    Product["alternatives"]
  > = [];

  for (const item of rawAlternatives) {
    const name =
      typeof item.name === "string"
        ? item.name.trim()
        : "";

    if (!name) {
      continue;
    }

    const alternative: NonNullable<
      Product["alternatives"]
    >[number] = {
      name,
    };

    if (typeof item.slug === "string") {
      alternative.slug = item.slug;
    }

    if (
      typeof item.category === "string"
    ) {
      alternative.category =
        item.category;
    }

    if (typeof item.brand === "string") {
      alternative.brand = item.brand;
    }

    if (
      typeof item.reason === "string"
    ) {
      alternative.reason =
        item.reason;
    }

    const price = parseOptionalNumber(
      item.price
    );

    if (price !== undefined) {
      alternative.price = price;
    }

    if (typeof item.image === "string") {
      alternative.image = item.image;
    }

    if (typeof item.url === "string") {
      alternative.url = item.url;
    }

    const score = parseOptionalNumber(
      item.score ?? item.rating
    );

    if (score !== undefined) {
      alternative.score = score;
    }

    alternatives.push(alternative);
  }

  return alternatives;
}

export async function getProductBySlug(
  rawSlug: string
): Promise<Product | null> {
  const slug = rawSlug
    .trim()
    .toLowerCase();

  console.log(
    "GET_PRODUCT_BY_SLUG_INPUT:",
    {
      rawSlug,
      normalisedSlug: slug,
    }
  );

  const { data, error } =
    await supabaseAdmin
      .from("products")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

  console.log(
    "GET_PRODUCT_BY_SLUG_RESULT:",
    {
      slug,
      found: Boolean(data),
      dataSlug: data?.slug ?? null,
      errorCode: error?.code ?? null,
      errorMessage: error?.message ?? null,
      errorDetails: error?.details ?? null,
      errorHint: error?.hint ?? null,
    }
  );

  if (error) {
    console.error(
      "GET_PRODUCT_BY_SLUG_ERROR:",
      error
    );

    return null;
  }

  if (!data) {
    console.warn(
      `No product found with slug: ${slug}`
    );

    return null;
  }

  const breakdown = parseJsonValue<
    Record<string, unknown>
  >(data.score_breakdown, {});

  const analysis = parseJsonValue<
    Record<string, unknown>
  >(data.analysis, {});

  const specs = parseJsonValue<
    Product["specs"]
  >(data.specs, {});

  const positives = parseJsonValue<
    string[]
  >(data.positives, []);

  const warnings = parseJsonValue<
    string[]
  >(data.warnings, []);

  const currentPrice =
    parseOptionalNumber(
      data.current_price
    ) ??
    parseOptionalNumber(
      analysis.currentPrice
    );

  const fairPrice =
    parseOptionalNumber(
      data.fair_price
    ) ??
    parseOptionalNumber(
      analysis.fairPrice
    );

  const lowestPrice =
    parseOptionalNumber(
      data.lowest_price
    ) ??
    parseOptionalNumber(
      analysis.lowestPrice
    );

  const name =
    data.product_name ??
    analysis.productName ??
    slug
      .split("-")
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");

  const product: Product = {
    id: String(data.id),

    slug: String(data.slug),

    name: String(name),

    brand:
      typeof data.brand === "string" &&
      data.brand.trim()
        ? data.brand
        : "Unknown brand",

    category:
      typeof data.category === "string" &&
      data.category.trim()
        ? data.category
        : "Uncategorised",

    family:
      typeof data.family === "string"
        ? data.family
        : undefined,

    model: {
      base:
        typeof data.model === "string" &&
        data.model.trim()
          ? data.model
          : String(name),

      variant:
        typeof data.variant === "string"
          ? data.variant
          : undefined,
    },

    specs,

    image:
      typeof data.product_image ===
        "string" &&
      data.product_image.trim()
        ? data.product_image
        : undefined,

    imageAlt: `${name} product image`,

    summary:
      typeof data.summary === "string" &&
      data.summary.trim()
        ? data.summary
        : typeof analysis.summary ===
            "string"
          ? analysis.summary
          : `Blinlx comparison data for ${name}.`,

    currentPrice,
    fairPrice,
    lowestPrice,

    blinlxScore: parseOptionalNumber(
      data.score
    ),

    dealScore: parseOptionalNumber(
      data.score
    ),

    confidence: parseOptionalNumber(
      data.confidence
    ),

    verdict:
      typeof data.verdict === "string"
        ? data.verdict
        : undefined,

    verdictLabel:
      typeof data.headline === "string"
        ? data.headline
        : undefined,

    ifItWasOurMoney:
      typeof data.if_it_was_our_money ===
        "string"
        ? data.if_it_was_our_money
        : undefined,

    primaryOfferUrl:
      typeof data.retailer_url === "string"
        ? data.retailer_url
        : undefined,

    primaryOfferRetailer:
      typeof data.retailer_name ===
        "string"
        ? data.retailer_name
        : undefined,

    scoreBreakdown: {
      price: parseNumericValue(
        breakdown.price ??
          breakdown.priceValue
      ),

      reviews: parseNumericValue(
        breakdown.reviews ??
          breakdown.reviewQuality
      ),

      retailer: parseNumericValue(
        breakdown.retailer ??
          breakdown.retailerTrust
      ),

      warranty: parseNumericValue(
        breakdown.warranty ??
          breakdown.warrantySupport
      ),

      value: parseNumericValue(
        breakdown.value ??
          breakdown.productQuality
      ),
    },

    scoreExplanation:
      typeof data.score_explanation ===
      "string"
        ? data.score_explanation
        : undefined,

    topOffers: normaliseOffers(
      data.top_offers
    ),

    alternatives:
      normaliseAlternatives(
        data.better_alternatives
      ),

    highlights: positives,

    scoreContext: {
      confidence: parseOptionalNumber(
        data.confidence
      ),
      concerns: warnings,
    },
  };

  return product;
}