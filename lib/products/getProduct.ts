import type { Product } from "@/types/product";
import { getProductBySlug } from "@/app/components/lib/products/getProductBySlug";

type GetProductParams = {
  category: string;
  brand: string;
  model: string;
};

function normaliseSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function getProduct({
     brand,
  model,
}: GetProductParams): Promise<Product | null> {
let row = await getProductBySlug(model);

/*
 * Older/current saved analyses may include the brand
 * at the beginning of the database slug.
 *
 * Example:
 * URL model: iphone-16-pro
 * Saved slug: apple-iphone-16-pro
 */
if (!row) {
  row = await getProductBySlug(
    `${normaliseSlug(brand)}-${normaliseSlug(model)}`
  );
}

if (!row) {
  return null;
}

  return {
    id: row.slug,

    slug: row.slug,

    name: row.product_name,

    brand: row.brand ?? "",

    category: row.category ?? "",

    family: row.family ?? "",

    image: row.product_image ?? undefined,

    model: {
      base: row.model ?? "",
      variant: row.variant ?? "",
    },

    specs: {},

    summary: row.summary,

    verdictLabel: row.verdict,

    ifItWasOurMoney:
      row.if_it_was_our_money,

    primaryOfferUrl:
      row.retailer_url ?? "#",

    primaryOfferRetailer:
      row.retailer_name ?? "Buy",

    currentPrice: row.current_price,

    fairPrice: row.fair_price,

    lowestPrice: row.lowest_price,

    blinlxScore: row.score,

    verdict: row.recommendation,

    highlights: row.positives ?? [],

    scoreContext: row.headline,

   priceStatus:
  typeof row.current_price === "number" &&
  typeof row.fair_price === "number"
    ? row.current_price <= row.fair_price * 0.9
      ? "Excellent"
      : row.current_price <= row.fair_price
        ? "Good"
        : row.current_price <= row.fair_price * 1.1
          ? "Fair"
          : "High"
    : undefined,

priceHistoryUrl: "#price-history",
  };
}