import type { ProductTestCase } from "../expected";

export const gpuTests: ProductTestCase[] = [
  {
    name: "NVIDIA RTX graphics memory",
    input:
      "ASUS GeForce RTX 5070 Ti 16GB GDDR7 Graphics Card",
    expected: {
      brand: "ASUS",
      productType: "gpu",
      specs: {
        memory: "16GB",
        storage: null,
      },
    },
  },
  {
    name: "AMD Radeon graphics memory",
    input:
      "Sapphire Radeon RX 9070 XT 16GB GDDR6 Graphics Card",
    expected: {
      brand: "Sapphire",
      productType: "gpu",
      specs: {
        memory: "16GB",
        storage: null,
      },
    },
  },
  {
    name: "NVIDIA Founders Edition",
    input:
      "NVIDIA GeForce RTX 5090 Founders Edition 32GB GDDR7",
    expected: {
      brand: "Nvidia",
      productType: "gpu",
      specs: {
        memory: "32GB",
        storage: null,
      },
    },
  },
];