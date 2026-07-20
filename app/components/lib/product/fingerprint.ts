import type { ProductData } from "@/app/components/lib/ai/productAgent";

export function createProductFingerprint(
  product: ProductData
): string {
  return [
    product.brand,
    product.model,
    product.colour,
    product.variant,
  ]
    .filter(Boolean)
    .map(part =>
      part!
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "")
    )
    .join("-");
}