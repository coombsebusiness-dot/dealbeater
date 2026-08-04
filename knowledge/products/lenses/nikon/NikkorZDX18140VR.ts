import type {
  LensProduct,
} from ".././LensProduct";

export const nikkorZDX18140VR: LensProduct = {
  id: "nikkor-z-dx-18-140mm-f3-5-6-3-vr",

  slug: "nikkor-z-dx-18-140mm-f3-5-6-3-vr",

  category: "LENSES",

  productType: "LENS",

  brand: "NIKKOR",

  model: "Z DX 18-140mm F3.5-6.3 VR",

  fullName:
    "NIKKOR Z DX 18-140mm F3.5-6.3 VR",

  description:
    "Nikon's premium all-in-one DX travel zoom covering wide-angle through telephoto photography while remaining compact, lightweight and highly versatile.",

  status: "CURRENT",

  releaseYear: 2021,

  images: {
    gallery: [],
  },

  specifications: {
    mount: "Nikon Z",
    format: "APS_C",
    type: "ZOOM",
    focalLength: "18-140mm",
    equivalentFocalLength: "27-210mm",
    maximumAperture: "f/3.5-6.3",
    stabilised: true,
    autofocus: true,
    weatherSealed: false,
    filterThreadMm: 62,
    weightGrams: 315,
  },

  strengths: [
    "Excellent all-in-one travel zoom.",
    "Very broad 27-210mm equivalent focal range.",
    "Outstanding image quality throughout much of the zoom range.",
    "Optical VR stabilisation.",
    "Compact and lightweight.",
    "Excellent autofocus performance.",
    "Perfect one-lens travel solution.",
    "Very sharp for a superzoom.",
    "Excellent close-focus capability.",
    "Strong value compared with carrying multiple lenses.",
  ],

  weaknesses: [
    "Variable maximum aperture.",
    "Cannot match bright prime lenses in low light.",
    "Less telephoto reach than dedicated wildlife lenses.",
    "No professional weather sealing.",
    "Larger than the compact 16-50mm.",
  ],

  bestFor: [
    "Travel.",
    "Holiday photography.",
    "Family photography.",
    "Landscape photography.",
    "Street photography.",
    "Walkaround photography.",
    "Everyday use.",
    "Photographers wanting one lens.",
  ],

  avoidIf: [
    "You require a constant f/2.8 aperture.",
    "You specialise in wildlife.",
    "You shoot professionally in poor weather.",
    "You need maximum background blur.",
  ],

  buyingAdvice:
    "The NIKKOR Z DX 18-140mm VR is arguably the best single-lens solution for Nikon DX photographers. It delivers excellent versatility, strong image quality and optical stabilisation while avoiding the size and weight of carrying multiple lenses.",

  relationships: {
    alternatives: [
      {
        productId:
          "nikkor-z-dx-16-50mm-f3-5-6-3-vr",

        reason:
          "A smaller and lighter alternative for photographers prioritising portability.",

        confidence: 0.98,
      },

      {
        productId:
          "nikkor-z-dx-50-250mm-f4-5-6-3-vr",

        reason:
          "A dedicated telephoto option offering substantially more reach.",

        confidence: 0.97,
      },
    ],

    upgrades: [
      {
        productId:
          "nikkor-z-24-120mm-f4-s",

        reason:
          "A premium constant-aperture full-frame zoom offering superior optics and weather sealing.",

        confidence: 0.97,
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
    "Nikon NIKKOR Z DX 18-140mm VR specifications",
  ],

  createdAt: "2026-08-03",

  updatedAt: "2026-08-03",

  lens: {
    mount: "Nikon Z",

    format: "APS_C",

    type: "ZOOM",

    focalLength: {
      minimumMm: 18,
      maximumMm: 140,
    },

    aperture: {
      maximumWide: 3.5,
      maximumTelephoto: 6.3,
    },

    stabilised: true,

    autofocus: true,

    weatherSealed: false,

    filterThreadMm: 62,

    weightGrams: 315,
  },

  compatibleProducts: [
    "nikon-z30",
    "nikon-z50",
    "nikon-z50-ii",
    "nikon-z-fc",
  ],
};