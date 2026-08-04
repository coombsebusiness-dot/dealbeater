import type {
  LensProduct,
} from ".././LensProduct";

export const nikkorZDX50250VR: LensProduct = {
  id: "nikkor-z-dx-50-250mm-f4-5-6-3-vr",

  slug: "nikkor-z-dx-50-250mm-f4-5-6-3-vr",

  category: "LENSES",

  productType: "LENS",

  brand: "NIKKOR",

  model: "Z DX 50-250mm F4.5-6.3 VR",

  fullName:
    "NIKKOR Z DX 50-250mm F4.5-6.3 VR",

  description:
    "A lightweight Nikon DX telephoto zoom designed for wildlife, travel, portraits, aviation and outdoor sport. It complements the 16-50mm kit lens to provide an affordable two-lens system.",

  status: "CURRENT",

  releaseYear: 2019,

  images: {
    gallery: [],
  },

  specifications: {
    mount: "Nikon Z",
    format: "APS_C",
    type: "ZOOM",
    focalLength: "50-250mm",
    equivalentFocalLength: "75-375mm",
    maximumAperture: "f/4.5-6.3",
    stabilised: true,
    autofocus: true,
    weatherSealed: false,
    filterThreadMm: 62,
    weightGrams: 405,
  },

  strengths: [
    "Excellent value telephoto zoom.",
    "Very sharp throughout most of the zoom range.",
    "Useful 75-375mm equivalent reach.",
    "Optical VR stabilisation.",
    "Fast, quiet stepping motor autofocus.",
    "Compact for its focal range.",
    "Excellent travel companion.",
    "Pairs perfectly with the 16-50mm kit lens.",
    "Produces attractive background compression for portraits.",
  ],

  weaknesses: [
    "Variable aperture limits low-light performance.",
    "No weather sealing.",
    "Not intended for professional wildlife work.",
    "Cannot match premium telephoto lenses for autofocus speed.",
    "Requires good light for fast action.",
  ],

  bestFor: [
    "Wildlife beginners.",
    "Bird photography.",
    "Travel.",
    "Outdoor sports.",
    "Aircraft photography.",
    "Portraits.",
    "Zoo photography.",
    "Holiday photography.",
  ],

  avoidIf: [
    "You regularly shoot indoor sport.",
    "You need professional autofocus.",
    "You photograph in very low light.",
    "You require weather sealing.",
  ],

  buyingAdvice:
    "The NIKKOR Z DX 50-250mm VR is one of the best-value telephoto lenses available for Nikon DX cameras. Combined with the 16-50mm VR it creates an affordable, lightweight system covering almost every everyday photographic situation.",

  relationships: {
    alternatives: [
      {
        productId:
          "nikkor-z-dx-18-140mm-f3-5-6-3-vr",
        reason:
          "A convenient one-lens travel solution sacrificing some telephoto reach.",
        confidence: 0.97,
      },
    ],

    upgrades: [
      {
        productId:
          "nikkor-z-100-400mm-f4-5-5-6-vr-s",
        reason:
          "A premium wildlife upgrade with significantly better reach and autofocus.",
        confidence: 0.98,
      },
    ],

    accessories: [],

    compatibleProducts: [
      {
        productId: "nikon-z30",
        confidence: 1,
        reason: "Native Nikon Z DX lens.",
      },
      {
        productId: "nikon-z50",
        confidence: 1,
        reason: "Native Nikon Z DX lens.",
      },
      {
        productId: "nikon-z50-ii",
        confidence: 1,
        reason: "Native Nikon Z DX lens.",
      },
      {
        productId: "nikon-z-fc",
        confidence: 1,
        reason: "Native Nikon Z DX lens.",
      },
    ],
  },

  confidence: 0.99,

  sources: [
    "Nikon NIKKOR Z DX 50-250mm VR specifications",
  ],

  createdAt: "2026-08-03",

  updatedAt: "2026-08-03",

  lens: {
    mount: "Nikon Z",

    format: "APS_C",

    type: "ZOOM",

    focalLength: {
      minimumMm: 50,
      maximumMm: 250,
    },

    aperture: {
      maximumWide: 4.5,
      maximumTelephoto: 6.3,
    },

    stabilised: true,

    autofocus: true,

    weatherSealed: false,

    filterThreadMm: 62,

    weightGrams: 405,
  },

  compatibleProducts: [
    "nikon-z30",
    "nikon-z50",
    "nikon-z50-ii",
    "nikon-z-fc",
  ],
};