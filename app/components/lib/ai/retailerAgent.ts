import type { ProductData } from "./productAgent";

export interface RetailerData {
  name: string;
  url?: string;
  price: number;
  trustScore: number;
  authorisedRetailer: boolean;
  returnsDays: number;
  warrantyYears: number;
  deliveryRating:
    | "Excellent"
    | "Good"
    | "Average"
    | "Poor";
  customerServiceRating:
    | "Excellent"
    | "Good"
    | "Average"
    | "Poor";
  paymentProtection: boolean;
  retailScore: number;
  reasons: string[];
}

export async function retailerAgent(
  product: ProductData
): Promise<RetailerData[]> {
  console.log(
    `Checking retailers for ${product.name}`
  );

  return [
    {
      name: "John Lewis",

      price: 899,

      trustScore: 98,

      authorisedRetailer: true,

      returnsDays: 35,

      warrantyYears: 2,

      deliveryRating: "Excellent",

      customerServiceRating: "Excellent",

      paymentProtection: true,

      retailScore: 97,

      reasons: [
        "Excellent customer service.",
        "Extended returns policy.",
        "Authorised retailer.",
      ],
    },

    {
      name: "Amazon",

      price: 879.99,

      trustScore: 93,

      authorisedRetailer: true,

      returnsDays: 30,

      warrantyYears: 1,

      deliveryRating: "Excellent",

      customerServiceRating: "Good",

      paymentProtection: true,

      retailScore: 91,

      reasons: [
        "Lowest current price.",
        "Fast delivery.",
      ],
    },

    {
      name: "Currys",

      price: 899,

      trustScore: 90,

      authorisedRetailer: true,

      returnsDays: 21,

      warrantyYears: 1,

      deliveryRating: "Good",

      customerServiceRating: "Good",

      paymentProtection: true,

      retailScore: 88,

      reasons: [
        "Trusted UK retailer.",
        "Click & Collect available.",
      ],
    },
  ];
}