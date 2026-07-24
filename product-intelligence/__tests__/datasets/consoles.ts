import type { ProductTestCase } from "../expected";

export const consoleTests: ProductTestCase[] = [
  {
    name: "PlayStation 5 Slim console",
    input:
      "Sony PlayStation 5 Slim Disc Edition 1TB Console",
    expected: {
      brand: "Sony",
      productType: "console",
      specs: {
        storage: "1TB",
      },
    },
  },
  {
    name: "Xbox Series X storage",
    input:
      "Microsoft Xbox Series X 1TB Console Black",
    expected: {
      brand: "Microsoft",
      productType: "console",
      specs: {
        storage: "1TB",
        colour: "Black",
      },
    },
  },
  {
    name: "Nintendo Switch OLED",
    input:
      "Nintendo Switch OLED Model White Console",
    expected: {
      brand: "Nintendo",
      productType: "console",
      specs: {
        colour: "White",
      },
    },
  },
];