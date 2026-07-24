import type { ProductTestCase } from "../expected";

export const tabletTests: ProductTestCase[] = [
  {
    name: "iPad Pro storage and screen size",
    input:
      "Apple iPad Pro 13-inch M4 Wi-Fi 256GB Space Black",
    expected: {
      brand: "Apple",
      productType: "tablet",
      specs: {
        storage: "256GB",
        screenSize: '13"',
        connectivity: ["Wi-Fi"],
        colour: "Space Black",
      },
    },
  },
  {
    name: "Samsung Galaxy Tab capacity",
    input:
      "Samsung Galaxy Tab S10 Ultra 12GB RAM 512GB Wi-Fi Grey",
    expected: {
      brand: "Samsung",
      productType: "tablet",
      specs: {
        memory: "12GB",
        storage: "512GB",
        connectivity: ["Wi-Fi"],
        colour: "Grey",
      },
    },
  },
  {
    name: "Cellular iPad",
    input:
      "Apple iPad Air 11-inch M3 Wi-Fi + Cellular 128GB Blue",
    expected: {
      brand: "Apple",
      productType: "tablet",
      specs: {
        storage: "128GB",
        screenSize: '11"',
        connectivity: ["Wi-Fi", "Cellular"],
        colour: "Blue",
      },
    },
  },
];