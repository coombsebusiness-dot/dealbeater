import type { ProductTestCase } from "../expected";

export const headphoneTests: ProductTestCase[] = [
  {
    name: "Apple AirPods",
    input:
      "Apple AirPods Pro 2nd Generation USB-C White",
    expected: {
      brand: "Apple",
      productType: "headphones",
      specs: {
        colour: "White",
        connectivity: ["USB-C"],
      },
    },
  },
  {
    name: "Sony wireless headphones",
    input:
      "Sony WH-1000XM5 Wireless Noise Cancelling Headphones Black",
    expected: {
      brand: "Sony",
      productType: "headphones",
      specs: {
        colour: "Black",
      },
    },
  },
  {
    name: "Samsung earbuds",
    input:
      "Samsung Galaxy Buds3 Pro Bluetooth Earbuds Silver",
    expected: {
      brand: "Samsung",
      productType: "headphones",
      specs: {
        colour: "Silver",
        connectivity: ["Bluetooth"],
      },
    },
  },
];