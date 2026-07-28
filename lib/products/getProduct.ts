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
  let product = await getProductBySlug(
    normaliseSlug(model)
  );

  /*
   * Older/current saved analyses may include the brand
   * at the beginning of the database slug.
   *
   * Example:
   * URL model: iphone-16-pro
   * Saved slug: apple-iphone-16-pro
   */
  if (!product) {
    product = await getProductBySlug(
      `${normaliseSlug(brand)}-${normaliseSlug(model)}`
    );
  }

  if (!product) {
    return null;
  }

  const priceStatus: Product["priceStatus"] =
    typeof product.currentPrice === "number" &&
    typeof product.fairPrice === "number"
      ? product.currentPrice <=
        product.fairPrice * 0.9
        ? "Excellent"
        : product.currentPrice <=
            product.fairPrice
          ? "Good"
          : product.currentPrice <=
              product.fairPrice * 1.1
            ? "Fair"
            : "High"
      : product.priceStatus;

  return {
    ...product,

    priceStatus,

    priceHistoryUrl:
      product.priceHistoryUrl ??
      "#price-history",
  };
}