import type { ProductTestCase } from "../expected";

export const phoneTests: ProductTestCase[] = [
  {
    name: "Samsung phone capacity and SKU",
    input:
      "Samsung Galaxy S24 Ultra SM-S928B 12GB RAM 512GB Titanium",
    expected: {
      brand: "Samsung",
      productType: "phone",
      model: {
        sku: "SM-S928B",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Titanium",
      },
    },
  },
  {
    name: "Apple iPhone storage and colour",
    input:
      "Apple iPhone 15 Pro 256GB Natural Titanium",
    expected: {
      brand: "Apple",
      productType: "phone",
      specs: {
        memory: null,
        storage: "256GB",
        colour: "Natural Titanium",
      },
    },
  },
  {
    name: "Used Google Pixel",
    input:
      "Used Google Pixel 9 Pro 16GB RAM 256GB Black",
    expected: {
      brand: "Google",
      productType: "phone",
      condition: "used",
      specs: {
        memory: "16GB",
        storage: "256GB",
        colour: "Black",
      },
    },
  },
];