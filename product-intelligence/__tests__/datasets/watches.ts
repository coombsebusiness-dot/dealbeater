import type { ProductTestCase } from "../expected";

export const watchTests: ProductTestCase[] = [
  {
    name: "Apple Watch cellular",
    input:
      "Apple Watch Series 10 GPS + Cellular 46mm Jet Black",
    expected: {
      brand: "Apple",
      productType: "watch",
      specs: {
        connectivity: ["GPS", "Cellular"],
        colour: "Jet Black",
      },
    },
  },
  {
    name: "Samsung Galaxy Watch",
    input:
      "Samsung Galaxy Watch Ultra LTE 47mm Titanium Silver",
    expected: {
      brand: "Samsung",
      productType: "watch",
      specs: {
        connectivity: ["LTE"],
        colour: "Titanium Silver",
      },
    },
  },
  {
    name: "Google Pixel Watch",
    input:
      "Google Pixel Watch 3 Wi-Fi 45mm Matte Black",
    expected: {
      brand: "Google",
      productType: "watch",
      specs: {
        connectivity: ["Wi-Fi"],
        colour: "Matte Black",
      },
    },
  },
];