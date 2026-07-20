import type { ProductData } from "./productAgent";

export interface RetailerData {
  name: string;
  price: string;
  recommended: boolean;
}

export async function retailerAgent(
  product: ProductData
): Promise<RetailerData[]> {
  console.log(`Checking retailers for ${product.name}`);

  return [
    {
      name: "John Lewis",
      price: "£899.00",
      recommended: true,
    },
    {
      name: "Amazon",
      price: "£879.99",
      recommended: false,
    },
    {
      name: "Currys",
      price: "£899.00",
      recommended: false,
    },
  ];
}