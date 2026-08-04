import type {
  CameraProduct,
} from "../CameraProduct";

export const canonEOSR50:
  CameraProduct = {
  id:
    "canon-eos-r50",

  slug:
    "canon-eos-r50",

  category:
    "CAMERAS",

  productType:
    "MIRRORLESS",

  brand:
    "Canon",

  model:
    "EOS R50",

  fullName:
    "Canon EOS R50",

  description:
    "A compact APS-C mirrorless camera aimed at beginners and family photographers, with straightforward controls, dependable autofocus and access to Canon's RF mount system.",

  status:
    "CURRENT",

  releaseYear:
    2023,

  images: {
    gallery:
      [],
  },

  specifications: {
    sensorFormat:
      "APS-C",

    megapixels:
      24.2,

    lensMount:
      "Canon RF",

    ibis:
      false,

    weatherSealed:
      false,
  },

  strengths: [
    "Beginner-friendly controls and menus.",
    "Reliable face, eye and subject autofocus.",
    "Compact and lightweight body.",
    "Useful option for family, travel and everyday photography.",
  ],

  weaknesses: [
    "No in-body image stabilisation.",
    "Small grip may feel cramped with larger lenses.",
    "Limited physical controls compared with more advanced bodies.",
    "The APS-C RF lens range is less developed than some rival systems.",
  ],

  bestFor: [
    "First-time mirrorless camera buyers.",
    "Family and everyday photography.",
    "Travel photographers who value low weight.",
    "Beginners who want dependable autofocus without a steep learning curve.",
  ],

  avoidIf: [
    "You need in-body image stabilisation.",
    "You want extensive direct controls.",
    "You expect to use large lenses regularly.",
    "You want the widest possible choice of affordable APS-C lenses.",
  ],

  buyingAdvice:
    "The Canon EOS R50 is strongest for beginners who want a simple, dependable camera with good autofocus. It makes less sense for buyers who need in-body stabilisation, extensive controls or a broader affordable APS-C lens ecosystem.",

  relationships: {
    alternatives: [
      {
        productId:
          "sony-a6400",

        reason:
          "A strong alternative for buyers who value a broader APS-C lens ecosystem and more established used-market options.",

        confidence:
          0.94,
      },
    ],

    upgrades: [
      {
        productId:
          "canon-eos-r10",

        reason:
          "Offers stronger controls, faster handling and more room to grow within the Canon RF system.",

        confidence:
          0.92,
      },
    ],

    accessories:
      [],

    compatibleProducts:
      [],
  },

  confidence:
    0.92,

  sources:
    [],

  createdAt:
    "2026-08-03",

  updatedAt:
    "2026-08-03",

  camera: {
    sensor: {
      format:
        "APS-C",

      megapixels:
        24.2,
    },

    mount:
      "Canon RF",

    autofocus: {
      rating:
        9,

      notes:
        "Strong face, eye and subject detection designed to be approachable for newer photographers.",
    },

    video: {
      rating:
        8,

      notes:
        "Useful modern video features for casual creators, although it is not aimed at specialist professional video work.",
    },

    stabilisation: {
      ibis:
        false,

      notes:
        "Relies on lens stabilisation or external support.",
    },

    battery: {
      shots:
        370,
    },

    weatherSealed:
      false,
  },

  alternatives: [
    "sony-a6400",
    "nikon-z50",
    "fujifilm-x-s10",
  ],

  upgradePath: [
    "canon-eos-r10",
    "canon-eos-r7",
  ],
};