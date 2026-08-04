import type {
  CameraProduct,
} from "../CameraProduct";

export const nikonZ50: CameraProduct = {
  id: "nikon-z50",

  slug: "nikon-z50",

  category: "CAMERAS",

  productType: "MIRRORLESS",

  brand: "Nikon",

  model: "Z50",

  fullName: "Nikon Z50",

  description:
    "Nikon's enthusiast APS-C mirrorless camera combining excellent image quality, an electronic viewfinder, fast autofocus and compact handling for travel, wildlife and everyday photography.",

  status: "DISCONTINUED",

  releaseYear: 2019,

  identifiers: {
    sku: "VOA050AE",
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
    weatherSealed: true,
    batteryModel: "EN-EL25",
    bodyWeightGrams: 450,
  },

  strengths: [
    "Excellent 20.9MP APS-C sensor with superb image quality.",
    "Electronic viewfinder provides a traditional shooting experience.",
    "Reliable hybrid autofocus with Eye Detection.",
    "Comfortable grip despite compact size.",
    "Very good JPEG colours straight from the camera.",
    "Strong travel camera.",
    "Built-in flash.",
    "4K UHD video recording.",
    "Excellent ergonomics.",
    "Outstanding value on the used market.",
  ],

  weaknesses: [
    "No in-body image stabilisation.",
    "Single SD card slot.",
    "Native DX lens range remains relatively small.",
    "Screen only tilts rather than fully articulating.",
    "Older autofocus compared with the Z50 II.",
    "Average battery life.",
    "No dedicated headphone socket.",
  ],

  bestFor: [
    "Travel photography.",
    "Family photography.",
    "Street photography.",
    "Wildlife beginners.",
    "Students.",
    "Enthusiast photographers.",
    "General photography.",
    "Used-camera buyers.",
  ],

  avoidIf: [
    "You need in-body image stabilisation.",
    "You regularly vlog.",
    "You require a fully articulating screen.",
    "You need dual memory cards.",
    "You require Nikon's latest autofocus system.",
  ],

  buyingAdvice:
    "The Nikon Z50 remains one of the strongest used APS-C mirrorless cameras available. It delivers excellent image quality, dependable autofocus and a comfortable shooting experience. Buyers wanting Nikon's latest autofocus and creator-focused features should instead consider the Nikon Z50 II.",

  relationships: {
    alternatives: [
      {
        productId: "canon-eos-r10",
        reason:
          "Canon's enthusiast APS-C alternative offers newer autofocus and Canon's RF ecosystem.",
        confidence: 0.97,
      },
      {
        productId: "sony-a6400",
        reason:
          "Sony's enthusiast APS-C alternative benefits from a broader native lens ecosystem.",
        confidence: 0.97,
      },
      {
        productId: "nikon-z-fc",
        reason:
          "Shares almost identical imaging performance with retro styling and manual controls.",
        confidence: 0.99,
      },
    ],

    upgrades: [
      {
        productId: "nikon-z50-ii",
        reason:
          "Adds Nikon's latest processor, stronger autofocus and improved video capabilities.",
        confidence: 0.99,
      },
    ],

    accessories: [
      {
        productId: "nikon-en-el25-battery",
        reason:
          "A spare EN-EL25 battery extends shooting time.",
        confidence: 1,
      },
      {
        productId: "nikkor-z-dx-16-50mm-f3-5-6-3-vr",
        reason:
          "Compact everyday kit zoom.",
        confidence: 1,
      },
      {
        productId: "nikkor-z-dx-50-250mm-f4-5-6-3-vr",
        reason:
          "Affordable telephoto zoom.",
        confidence: 0.99,
      },
      {
        productId: "nikkor-z-dx-18-140mm-f3-5-6-3-vr",
        reason:
          "Excellent travel all-round lens.",
        confidence: 0.98,
      },
      {
        productId: "nikon-ftz-ii-adapter",
        reason:
          "Allows Nikon F-mount DSLR lenses to be used on the Z50.",
        confidence: 1,
      },
    ],

    compatibleProducts: [
      {
        productId: "nikon-en-el25-battery",
        reason:
          "The Nikon Z50 uses the EN-EL25 rechargeable battery.",
        confidence: 1,
      },
    ],
  },

  confidence: 0.99,

  sources: [
    "Nikon Z50 product page",
    "Nikon Z50 specifications",
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
        "Reliable hybrid autofocus with Eye AF for people and animals.",
    },

    video: {
      rating: 8,
      maximumResolution: "4K",
      maximum4KFrameRate: 30,
      microphoneInput: true,
      headphoneOutput: false,
      fullyArticulatingScreen: false,
      recordingLimitMinutes: 30,
      logProfiles: false,
      notes:
        "Very capable 4K camera for enthusiasts.",
    },

    stabilisation: {
      ibis: false,
      stabilisedLensSupport: true,
      notes:
        "Relies on Nikon VR lenses.",
    },

    battery: {
      shots: 320,
      model: "EN-EL25",
      removable: true,
      usbCharging: true,
      usbPower: false,
    },

    body: {
      weightGrams: 450,
      viewfinder: true,
      builtInFlash: true,
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
      beginnerScore: 9,
      travelScore: 9,
      familyScore: 9,
      streetScore: 9,
      portraitScore: 8,
      landscapeScore: 9,
      wildlifeScore: 8,
      sportsScore: 8,
      videoScore: 8,
      vloggingScore: 6,
      valueScore: 10,
      futureProofScore: 7,
    },

    weatherSealed: true,
  },

  alternatives: [
    "canon-eos-r10",
    "sony-a6400",
    "nikon-z-fc",
  ],

  upgradePath: [
    "nikon-z50-ii",
  ],
};