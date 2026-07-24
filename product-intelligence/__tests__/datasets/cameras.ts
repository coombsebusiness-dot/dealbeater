import type { ProductTestCase } from "../expected";

export const cameraTests: ProductTestCase[] = [
  {
    name: "Sony camera body",
    input:
      "Sony A7 IV Mirrorless Camera Body Only ILCE-7M4",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        sku: "ILCE-7M4",
      },
    },
  },
  {
    name: "Canon camera",
    input:
      "Canon EOS R6 Mark II Mirrorless Camera Body Only",
    expected: {
      brand: "Canon",
      productType: "camera",
    },
  },
  {
    name: "Nikon camera",
    input:
      "Nikon Z8 Mirrorless Camera Body Only",
    expected: {
      brand: "Nikon",
      productType: "camera",
    },
  },
  {
    name: "Fujifilm silver camera",
    input:
      "Fujifilm X-T5 Mirrorless Camera Silver",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      specs: {
        colour: "Silver",
      },
    },
  },
];