import type { ProductData } from "./productAgent";

export interface AlternativeData {
  name: string;
  reason: string;
  price?: string;
  rating?: number;
  saving?: string;
  verdict?: string;
}

export async function alternativeAgent(
  product: ProductData
): Promise<AlternativeData[]> {
  console.log(`Finding alternatives to ${product.name}`);

  // Placeholder logic until live product search is connected.
  // Later this will be replaced with real retailer/search data.

  return [
    {
      name: `${product.brand} Previous Generation`,
      reason:
        "Offers nearly the same experience while costing considerably less.",
      price: "£749",
      rating: 4.8,
      saving: "Save around £150",
      verdict: "Best Value",
    },
    {
      name: "Top Rated Competitor",
      reason:
        "Higher customer satisfaction with a longer manufacturer warranty.",
      price: "£899",
      rating: 4.9,
      saving: "Worth paying a little extra",
      verdict: "Highest Rated",
    },
    {
      name: "Budget Alternative",
      reason:
        "Excellent value for money if you don't need every premium feature.",
      price: "£599",
      rating: 4.6,
      saving: "Save around £300",
      verdict: "Budget Pick",
    },
  ];
}