import type {
  LensProduct,
} from ".././LensProduct";

export const nikkorZDX1650VR: LensProduct = {
  id:
    "nikkor-z-dx-16-50mm-f3-5-6-3-vr",

  slug:
    "nikkor-z-dx-16-50mm-f3-5-6-3-vr",

  category:
    "LENSES",

  productType:
    "LENS",

  brand:
    "Nikon",

  model:
    "NIKKOR Z DX 16-50mm F3.5-6.3 VR",

  fullName:
    "NIKKOR Z DX 16-50mm F3.5-6.3 VR",

  description:
    "Nikon's compact retractable APS-C kit zoom offering an excellent balance of portability, image quality and optical stabilisation for travel, everyday photography and video.",

  status:
    "CURRENT",

  releaseYear:
    2019,

  images: {
    gallery: [],
  },

  specifications: {
    mount: "Nikon Z",
    format: "APS_C",
    type: "ZOOM",
    focalLength: "16-50mm",
    equivalentFocalLength: "24-75mm",
    maximumAperture: "f/3.5-6.3",
    stabilised: true,
    autofocus: true,
    weatherSealed: false,
    filterThreadMm: 46,
    weightGrams: 135,
  },

  strengths: [
    "Extremely compact and lightweight.",
    "Excellent image quality for a kit lens.",
    "Very sharp throughout much of the zoom range.",
    "Optical VR image stabilisation.",
    "Ideal travel lens.",
    "Excellent companion to the Nikon Z30, Z50, Z50 II and Z fc.",
    "Quiet autofocus suitable for video.",
    "Retractable design makes it highly portable.",
    "Excellent value when purchased in a camera kit.",
  ],

  weaknesses: [
    "Variable maximum aperture.",
    "Limited background blur.",
    "No weather sealing.",
    "Limited telephoto reach.",
    "Not intended for professional use.",
    "Less suitable for indoor sports.",
  ],

  bestFor: [
    "Travel.",
    "Family photography.",
    "Everyday photography.",
    "Street photography.",
    "Students.",
    "Beginner photographers.",
    "Holiday photography.",
  ],

  avoidIf: [
    "You need stronger low-light performance.",
    "You photograph wildlife.",
    "You require professional optics.",
    "You want a constant aperture zoom.",
  ],

  buyingAdvice:
    "The NIKKOR Z DX 16-50mm VR is one of the best kit lenses currently available. Its tiny size, excellent sharpness and optical stabilisation make it a superb everyday companion for Nikon DX cameras.",

  relationships: {
    alternatives: [
      {
        productId:
          "nikkor-z-dx-18-140mm-f3-5-6-3-vr",
        reason:
          "A more versatile travel zoom with considerably greater reach.",
        confidence: 0.98,
      },
      {
        productId:
          "nikkor-z-dx-24mm-f1-7",
        reason:
          "A brighter prime for low-light photography and stronger background blur.",
        confidence: 0.96,
      },
    ],

    upgrades: [
      {
        productId:
          "nikkor-z-dx-18-140mm-f3-5-6-3-vr",
        reason:
          "Adds substantially more zoom range while remaining compact.",
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
    "Nikon NIKKOR Z DX 16-50mm VR specifications",
  ],

  createdAt: "2026-08-03",

  updatedAt: "2026-08-03",

  lens: {
    mount: "Nikon Z",
    format: "APS_C",
    type: "ZOOM",

    focalLength: {
      minimumMm: 16,
      maximumMm: 50,
    },

    aperture: {
      maximumWide: 3.5,
      maximumTelephoto: 6.3,
    },

    stabilised: true,
    autofocus: true,
    weatherSealed: false,
    filterThreadMm: 46,
    weightGrams: 135,
  },

  compatibleProducts: [
    "nikon-z30",
    "nikon-z50",
    "nikon-z50-ii",
    "nikon-z-fc",
  ],
};