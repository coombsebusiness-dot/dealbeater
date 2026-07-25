import type { ProductTestCase } from "../expected";

export const laptopTests: ProductTestCase[] = [
  {
    name: "MacBook Air capacity and colour",
    input:
      "Apple MacBook Air M2 13.6-inch 16GB 256GB SSD Midnight",
    expected: {
      brand: "Apple",
      productType: "laptop",
      specs: {
        memory: "16GB",
        storage: "256GB",
        colour: "Midnight",
        screenSize: '13.6"',
      },
    },
  },
  {
    name: "MacBook Pro capacity",
    input:
      "Apple MacBook Pro M4 16-inch 24GB 1TB SSD Space Black",
    expected: {
      brand: "Apple",
      productType: "laptop",
      specs: {
        memory: "24GB",
        storage: "1TB",
        screenSize: '16"',
      },
    },
  },
  {
    name: "ASUS Vivobook SKU",
    input:
      "ASUS Vivobook 16 M1607KA-MB148W 16GB 512GB SSD",
    expected: {
      brand: "ASUS",
      productType: "laptop",
      model: {
        sku: "M1607KA-MB148W",
      },
      specs: {
        memory: "16GB",
        storage: "512GB",
      },
    },
  },
  {
    name: "Dell laptop explicit RAM",
    input:
      "Dell XPS 15 Laptop 32GB RAM 1TB SSD Silver",
    expected: {
      brand: "Dell",
      productType: "laptop",
      specs: {
        memory: "32GB",
        storage: "1TB",
        colour: "Silver",
      },
    },
  },
  {
    name: "Refurbished Lenovo laptop",
    input:
      "Refurbished Lenovo ThinkPad X1 Carbon 16GB RAM 512GB SSD",
    expected: {
      brand: "Lenovo",
      productType: "laptop",
      condition: "refurbished",
      specs: {
        memory: "16GB",
        storage: "512GB",
      },
    },
  },
];