import type { ProductData } from "./productAgent";

export interface ReviewData {
  averageRating: number;
  reviewCount: number;

  positives: string[];
  negatives: string[];

  summary: string;

  confidence: number;
}

export async function reviewAgent(
  product: ProductData
): Promise<ReviewData> {
  console.log(`Reviewing customer feedback for ${product.name}`);

 return {
  averageRating: 4.4,

  reviewCount: 1248,

  positives: [
    "Strong build quality",
    "Easy to use",
    "Reliable performance",
  ],

  negatives: [
    "Premium price",
    "Limited accessories included",
  ],

  summary:
    "Most owners are very happy with the product. The biggest criticism is its premium price rather than its performance.",

  confidence: 91,
};
}