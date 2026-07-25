import type { ProductTestCase } from "../expected";

export const lensTests: ProductTestCase[] = [
  {
    name: "Sony FE 24-70mm GM II lens",
    input: "Sony FE 24-70mm F2.8 GM II Lens",
    expected: {
      productType: "lens",
      model: {
        base: "FE 24-70mm F2.8 GM II",
      },
      specs: {
        mount: "Sony E",
        focalLength: "24-70mm",
        maximumAperture: "f/2.8",
      },
    },
  },

  {
    name: "Canon RF 70-200mm lens",
    input: "Canon RF 70-200mm F2.8L IS USM",
    expected: {
      productType: "lens",
      specs: {
        mount: "Canon RF",
        focalLength: "70-200mm",
        maximumAperture: "f/2.8",
      },
    },
  },

  {
    name: "Canon EF 50mm lens",
    input: "Canon EF 50mm F1.8 STM",
    expected: {
      productType: "lens",
      specs: {
        mount: "Canon EF",
        focalLength: "50mm",
        maximumAperture: "f/1.8",
      },
    },
  },

  {
    name: "Canon EF-S kit zoom lens",
    input: "Canon EF-S 18-55mm F4-5.6 IS STM",
    expected: {
      productType: "lens",
      specs: {
        mount: "Canon EF-S",
        focalLength: "18-55mm",
        maximumAperture: "f/4-5.6",
      },
    },
  },

  {
    name: "Nikon NIKKOR Z 24-120mm lens",
    input: "NIKKOR Z 24-120mm f/4 S",
    expected: {
      productType: "lens",
      specs: {
        mount: "Nikon Z",
        focalLength: "24-120mm",
        maximumAperture: "f/4",
      },
    },
  },

  {
    name: "Fujifilm XF 33mm lens",
    input: "Fujifilm XF 33mm F1.4 R LM WR",
    expected: {
      productType: "lens",
      specs: {
        mount: "Fujifilm X",
        focalLength: "33mm",
        maximumAperture: "f/1.4",
      },
    },
  },

  {
    name: "Sigma Art Sony E lens",
    input: "Sigma 85mm F1.4 DG DN Art Sony E",
    expected: {
      productType: "lens",
      specs: {
        mount: "Sony E",
        focalLength: "85mm",
        maximumAperture: "f/1.4",
      },
    },
  },

  {
    name: "Tamron Sony E zoom lens",
    input: "Tamron 28-75mm F2.8 Di III VXD G2 Sony E",
    expected: {
      productType: "lens",
      specs: {
        mount: "Sony E",
        focalLength: "28-75mm",
        maximumAperture: "f/2.8",
      },
    },
  },

  {
    name: "Leica Summilux-M lens",
    input: "Leica Summilux-M 35mm F1.4",
    expected: {
      productType: "lens",
      specs: {
        mount: "Leica M",
        focalLength: "35mm",
        maximumAperture: "f/1.4",
      },
    },
  },

  {
    name: "Olympus M.Zuiko Pro lens",
    input: "Olympus M.Zuiko 12-40mm F2.8 PRO",
    expected: {
      productType: "lens",
      specs: {
        focalLength: "12-40mm",
        maximumAperture: "f/2.8",
      },
    },
  },
];