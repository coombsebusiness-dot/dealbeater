import { supabaseAdmin } from "@/app/components/lib/supabase/admin";

type TopOffer = {
  retailer: string;
  title: string;
  price: number;

  url?: string;
  finalUrl?: string;
  retailerUrl?: string;
  affiliateUrl?: string;

  image?: string;
  imageUrl?: string;
};

type BetterAlternative = {
  name: string;
  reason: string;
  price: string;
  rating: number;
  saving: string;
  verdict: string;
};

export type ProductAnalysisReport = {
  productName?: string;
  productImage?: string | null;

  retailerName?: string | null;
  retailerUrl?: string | null;

  verdict?: string;
  recommendation: string;

  score?: number;
  dealScore?: number;

  confidence: number;

  currentPrice?: number | null;
  fairPrice?: number | null;
  lowestPrice?: number | null;

  headline?: string;
  summary: string;

  positives?: string[];
  strengths?: string[];

  warnings?: string[];
  concerns?: string[];

scoreBreakdown: {
  price: number;
  reviews: number;
  retailer: number;
  warranty: number;
  value: number;
};

  topOffers?: TopOffer[];
  betterAlternatives?: BetterAlternative[];

  priceAnalysis?: string;
  reviewAnalysis?: string;
  retailerAnalysis?: string;

  ifItWasOurMoney?: string;

  /*
   * These optional fields allow the save function to work with
   * slightly different report shapes while the engine evolves.
   */
  cheapestOffer?: TopOffer | null;

  product?: {
    name?: string;
    imageUrl?: string | null;
    ctaUrl?: string | null;
  };

  pricing?: {
    currentPrice?: number | null;
    fairPrice?: number | null;
    lowestPrice?: number | null;
  };
};

export async function saveProductAnalysis(
  report: ProductAnalysisReport
) {
    console.log("🔥 saveProductAnalysis() CALLED");
  const productName =
    cleanText(report.productName) ||
    cleanText(report.product?.name);

  if (!productName) {
    throw new Error(
      "Unable to save product analysis because the product name is missing."
    );
  }

  const slug = createProductSlug(productName);

  const topOffers = Array.isArray(report.topOffers)
    ? report.topOffers
    : [];

  const cheapestOffer =
    report.cheapestOffer ?? findCheapestOffer(topOffers);

  const currentPrice = firstValidPrice(
    report.currentPrice,
    report.pricing?.currentPrice,
    cheapestOffer?.price
  );

  const lowestPrice = firstValidPrice(
    report.lowestPrice,
    report.pricing?.lowestPrice,
    cheapestOffer?.price,
    findLowestOfferPrice(topOffers)
  );

  const fairPrice = firstValidPrice(
    report.fairPrice,
    report.pricing?.fairPrice,
    calculateFallbackFairPrice(topOffers)
  );

 const productImage = firstValidImage(
  report.productImage,
  report.product?.imageUrl,
  cheapestOffer?.imageUrl,
  cheapestOffer?.image,
  findFirstOfferImage(topOffers)
);

  const retailerName =
    cleanText(report.retailerName) ||
    cleanText(cheapestOffer?.retailer) ||
    null;

 const retailerUrl =
  cleanText(cheapestOffer?.affiliateUrl) ||
  cleanText(cheapestOffer?.finalUrl) ||
  cleanText(cheapestOffer?.retailerUrl) ||
  cleanText(cheapestOffer?.url) ||
  cleanText(report.retailerUrl) ||
  cleanText(report.product?.ctaUrl) ||
  null;

console.log("====================================");
console.log("🚀 FINAL REPORT BEING SAVED");
console.dir(
  {
    productName,
    productImage,
    retailerName,
    retailerUrl,
    currentPrice,
    fairPrice,
    lowestPrice,
    topOffers,
  },
  { depth: null }
);
console.log("====================================");
  const { data, error } = await supabaseAdmin
    .from("products")
    .upsert(
      {
        slug,

        product_name: productName,
        product_image: productImage,

       verdict:
  cleanText(report.verdict) ||
  cleanText(report.recommendation),

score: normaliseScore(
  report.score ??
  report.dealScore ??
  0
),

confidence: normaliseScore(
  report.confidence ??
  report.score ??
  report.dealScore ??
  0
),

headline:
  cleanText(report.headline) ||
  `${productName}: ${report.recommendation}`,

positives:
  report.positives ??
  report.strengths ??
  [],

warnings:
  report.warnings ??
  report.concerns ??
  [],

        score_breakdown: report.scoreBreakdown ?? {},
        top_offers: topOffers,
        better_alternatives: report.betterAlternatives ?? [],

        price_analysis: report.priceAnalysis ?? null,
        review_analysis: report.reviewAnalysis ?? null,
        retailer_analysis: report.retailerAnalysis ?? null,

        if_it_was_our_money:
          report.ifItWasOurMoney ?? null,

        analysis: report,

        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "slug",
      }
    )
    .select("id, slug")
    .single();

  if (error) {
    throw new Error(
      `Unable to save product analysis: ${error.message}`
    );
  }

  return data;
}

function createProductSlug(productName: string) {
  const slug = productName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);

  if (!slug) {
    throw new Error(
      "Unable to create a product slug from the product name."
    );
  }

  return slug;
}

function cleanText(value?: string | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function firstValidPrice(
  ...values: Array<number | null | undefined>
): number | null {
  for (const value of values) {
    if (
      typeof value === "number" &&
      Number.isFinite(value) &&
      value > 0
    ) {
      return value;
    }
  }

  return null;
}

function normaliseScore(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

function findCheapestOffer(
  offers: TopOffer[]
): TopOffer | null {
  const validOffers = offers.filter(
    (offer) =>
      typeof offer.price === "number" &&
      Number.isFinite(offer.price) &&
      offer.price > 0
  );

  if (validOffers.length === 0) {
    return null;
  }

  return validOffers.reduce((cheapest, offer) =>
    offer.price < cheapest.price ? offer : cheapest
  );
}

function findLowestOfferPrice(
  offers: TopOffer[]
): number | null {
  return findCheapestOffer(offers)?.price ?? null;
}

function calculateFallbackFairPrice(
  offers: TopOffer[]
): number | null {
  const prices = offers
    .map((offer) => offer.price)
    .filter(
      (price) =>
        typeof price === "number" &&
        Number.isFinite(price) &&
        price > 0
    )
    .sort((a, b) => a - b);

  if (prices.length === 0) {
    return null;
  }

  const middle = Math.floor(prices.length / 2);

  if (prices.length % 2 === 0) {
    return (prices[middle - 1] + prices[middle]) / 2;
  }

  return prices[middle];
}

function findFirstOfferImage(
  offers: TopOffer[]
): string | null {
  for (const offer of offers) {
    const image = firstValidImage(
      offer.imageUrl,
      offer.image
    );

    if (image) {
      return image;
    }
  }

  return null;
}

function firstValidImage(
  ...values: Array<string | null | undefined>
): string | null {
  for (const value of values) {
    const image = validateImageUrl(value);

    if (image) {
      return image;
    }
  }

  return null;
}

function validateImageUrl(
  value?: string | null
): string | null {
  if (!value || typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();

  try {
    const url = new URL(trimmed);

    if (
      url.protocol !== "http:" &&
      url.protocol !== "https:"
    ) {
      return null;
    }

    return trimmed;
  } catch {
    return null;
  }
}