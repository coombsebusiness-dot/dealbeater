import type {
  CameraProduct,
} from "../CameraProduct";

export const nikonZ30: CameraProduct = {
  id: "nikon-z30",

  slug: "nikon-z30",

  category: "CAMERAS",

  productType: "MIRRORLESS",

  brand: "Nikon",

  model: "Z30",

  fullName: "Nikon Z30",

  description:
    "Nikon's compact APS-C mirrorless camera designed for creators, vloggers and beginner photographers, combining excellent image quality, reliable autofocus and uncropped 4K video in a lightweight body.",

  status: "CURRENT",

  releaseYear: 2022,

  identifiers: {
    sku: "VOA110AE",
  },

  images: {
    gallery: [],
  },

  specifications: {
    sensorFormat: "APS-C",
    megapixels: 20.9,
    lensMount: "Nikon Z",
    maximumBurstRateFps: 11,
    maximumVideoResolution: "4K",
    ibis: false,
    weatherSealed: false,
    batteryModel: "EN-EL25",
    bodyWeightGrams: 405,
  },

  strengths: [
    "Excellent image quality from Nikon's proven 20.9MP APS-C sensor.",
    "Uncropped 4K video recording.",
    "Excellent autofocus with Eye Detection.",
    "Fully articulating touchscreen.",
    "Compact and lightweight body.",
    "Strong choice for YouTube creators and vloggers.",
    "Comfortable grip despite its small size.",
    "Very good JPEG colours straight from the camera.",
    "USB charging and USB power support.",
  ],

  weaknesses: [
    "No electronic viewfinder.",
    "No in-body image stabilisation.",
    "Single SD card slot.",
    "Limited native DX lens range compared with Sony.",
    "Not weather sealed.",
    "Mechanical controls are simpler than enthusiast cameras.",
    "Battery life is average.",
  ],

  bestFor: [
    "Beginner photographers.",
    "Content creators.",
    "YouTube.",
    "Travel.",
    "Family photography.",
    "Everyday photography.",
    "Street photography.",
    "Students.",
  ],

  avoidIf: [
    "You require an electronic viewfinder.",
    "You photograph wildlife regularly.",
    "You need dual card slots.",
    "You require weather sealing.",
    "You need in-body stabilisation.",
    "You regularly shoot professional sport.",
  ],

  buyingAdvice:
    "The Nikon Z30 is one of the strongest beginner mirrorless cameras available for creators and everyday photographers. Its compact size, excellent autofocus and high-quality uncropped 4K video make it especially appealing for travel and content creation. Buyers wanting a viewfinder should instead consider the Nikon Z50 or Z50 II.",

  relationships: {
    alternatives: [
      {
        productId: "canon-eos-r50",
        reason:
          "Canon's competing beginner mirrorless camera offers a viewfinder and excellent autofocus.",
        confidence: 0.97,
      },
      {
        productId: "sony-a6100",
        reason:
          "Sony's beginner APS-C alternative benefits from a broader native lens ecosystem.",
        confidence: 0.96,
      },
    ],

    upgrades: [
      {
        productId: "nikon-z50-ii",
        reason:
          "A more advanced Nikon APS-C camera with a viewfinder, improved controls and stronger performance.",
        confidence: 0.99,
      },
    ],

    accessories: [
      {
        productId: "nikon-en-el25-battery",
        reason:
          "A spare EN-EL25 battery is useful for travel and video recording.",
        confidence: 1,
      },
      {
        productId: "nikkor-z-dx-16-50mm-f3-5-6-3-vr",
        reason:
          "The standard compact kit zoom for the Nikon Z30.",
        confidence: 1,
      },
      {
        productId: "nikkor-z-dx-50-250mm-f4-5-6-3-vr",
        reason:
          "An affordable telephoto lens for wildlife and travel.",
        confidence: 0.98,
      },
    ],

    compatibleProducts: [
      {
        productId: "nikon-en-el25-battery",
        confidence: 1,
        reason: "The Nikon Z30 uses the EN-EL25 rechargeable battery.",
      },
    ],
  },

  confidence: 0.99,

  sources: [
    "Nikon Z30 product page",
    "Nikon Z30 specifications",
  ],

  createdAt: "2026-08-03",

  updatedAt: "2026-08-03",

  camera: {
    sensor: {
      format: "APS-C",
      megapixels: 20.9,
      type: "CMOS",
      cropFactor: 1.5,
    },

    mount: "Nikon Z",

    autofocus: {
      rating: 9,
      phaseDetectionPoints: 209,
      eyeAutofocus: true,
      animalEyeAutofocus: true,
      birdEyeAutofocus: false,
      subjectTracking: true,
      notes:
        "Reliable Eye AF and subject tracking for people and animals.",
    },

    video: {
      rating: 9,
      maximumResolution: "4K",
      maximum4KFrameRate: 30,
      microphoneInput: true,
      headphoneOutput: false,
      fullyArticulatingScreen: true,
      recordingLimitMinutes: 125,
      logProfiles: false,
      notes:
        "Designed primarily for creators and vloggers with uncropped 4K recording.",
    },

    stabilisation: {
      ibis: false,
      stabilisedLensSupport: true,
      notes:
        "Relies on Nikon VR lenses for stabilisation.",
    },

    battery: {
      shots: 330,
      model: "EN-EL25",
      removable: true,
      usbCharging: true,
      usbPower: true,
    },

    body: {
      weightGrams: 405,
      viewfinder: false,
      builtInFlash: false,
      touchscreen: true,
    },

    performance: {
      maximumBurstRateFps: 11,
      silentBurstRateFps: 11,
    },

    connectivity: {
      wifi: true,
      bluetooth: true,
      nfc: false,
    },

    intelligence: {
      beginnerScore: 10,
      travelScore: 9,
      familyScore: 9,
      streetScore: 8,
      portraitScore: 8,
      landscapeScore: 8,
      wildlifeScore: 6,
      sportsScore: 6,
      videoScore: 9,
      vloggingScore: 10,
      valueScore: 9,
      futureProofScore: 8,
    },

    weatherSealed: false,
  },

  alternatives: [
    "canon-eos-r50",
    "sony-a6100",
  ],

  upgradePath: [
    "nikon-z50-ii",
  ],
};