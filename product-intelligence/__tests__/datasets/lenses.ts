import type { ProductTestCase } from "../expected";

export const lensTests: ProductTestCase[] = [
  {
    name: "Sony zoom lens",
    input:
      "Sony FE 24-70mm F2.8 GM II Lens",
    expected: {
      brand: "Sony",
      productType: "lens",
    },
  },
  {
    name: "Canon prime lens",
    input:
      "Canon RF 50mm F1.2L USM Lens",
    expected: {
      brand: "Canon",
      productType: "lens",
    },
  },
  {
    name: "Sigma lens for Sony",
    input:
      "Sigma 85mm F1.4 DG DN Art Lens for Sony E Mount",
    expected: {
      brand: "Sigma",
      productType: "lens",
    },
  },
];