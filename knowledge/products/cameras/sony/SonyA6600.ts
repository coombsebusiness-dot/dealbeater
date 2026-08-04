import type {
  CameraProduct,
} from "../CameraProduct";

export const sonyA6600:
  CameraProduct = {
  id:
    "sony-a6600",

  slug:
    "sony-a6600",

  category:
    "CAMERAS",

  productType:
    "MIRRORLESS",

  brand:
    "Sony",

  model:
    "A6600",

  fullName:
    "Sony A6600",

  description:
    "Sony's premium APS-C mirrorless camera before the A6700, combining five-axis in-body image stabilisation, outstanding battery life, Real-time Tracking autofocus and a compact weather-resistant body.",

  status:
    "DISCONTINUED",

  releaseYear:
    2019,

  identifiers: {
    sku:
      "ILCE-6600",
  },

  images: {
    gallery: [],
  },

  specifications: {
    sensorFormat:
      "APS-C",

    megapixels:
      24.2,

    lensMount:
      "Sony E",

    maximumBurstRateFps:
      11,

    maximumVideoResolution:
      "4K",

    ibis:
      true,

    weatherSealed:
      true,

    batteryModel:
      "NP-FZ100",

    bodyWeightGrams:
      503,
  },

  strengths: [
    "Excellent five-axis in-body image stabilisation.",

    "Outstanding battery life thanks to the larger NP-FZ100 battery.",

    "Sony Real-time Tracking autofocus remains excellent for people, wildlife and sport.",

    "Real-time Eye AF for humans and animals is highly dependable.",

    "Weather-resistant magnesium-alloy construction.",

    "Excellent image quality from the proven 24.2MP APS-C sensor.",

    "4K recording with picture profiles and microphone input.",

    "A deeper grip makes larger lenses much more comfortable than on earlier A6000-series bodies.",

    "Still one of the strongest used APS-C cameras available.",
  ],

  weaknesses: [
    "Uses the older sensor generation compared with the A6700.",

    "No front control dial.",

    "Menus feel dated beside newer Sony cameras.",

    "Rear screen only tilts upward.",

    "No headphone socket.",

    "Rolling shutter can appear in 4K video.",

    "The EVF resolution now feels dated.",

    "Can be poor value if priced close to the newer A6700.",
  ],

  bestFor: [
    "Enthusiast photographers.",

    "Wildlife photography.",

    "Travel photography.",

    "Portrait photography.",

    "Street photography.",

    "Existing Sony E-mount users.",

    "Buyers wanting excellent battery life.",

    "Used buyers seeking flagship APS-C performance.",
  ],

  avoidIf: [
    "You want Sony's newest AI autofocus.",

    "You regularly produce professional video.",

    "You require a fully articulating screen.",

    "You need a headphone socket.",

    "You want the latest Sony menu system.",

    "The A6700 is only slightly more expensive.",

    "You primarily shoot handheld video.",

    "You need modern video codecs.",
  ],

  buyingAdvice:
    "The Sony A6600 remains one of the strongest used APS-C cameras available. Its larger NP-FZ100 battery alone transforms the shooting experience compared with the earlier A6500, while Real-time Tracking autofocus still competes well today. It represents excellent value provided its price remains comfortably below the Sony A6700.",

  relationships: {
    alternatives: [
      {
        productId:
          "sony-a6500",

        reason:
          "A cheaper stabilised alternative with similar image quality but shorter battery life.",

        confidence:
          0.97,
      },

      {
        productId:
          "sony-a6700",

        reason:
          "A newer flagship alternative with AI autofocus and a significantly improved sensor.",

        confidence:
          0.99,
      },

      {
        productId:
          "canon-eos-r7",

        reason:
          "A premium APS-C alternative with excellent autofocus and strong stabilisation.",

        confidence:
          0.90,
      },
    ],

    upgrades: [
      {
        productId:
          "sony-a6700",

        reason:
          "A substantial upgrade offering AI subject recognition, a newer processor and significantly stronger video capability.",

        confidence:
          0.99,
      },
    ],

    accessories: [
      {
        productId:
          "sony-np-fz100-battery",

        reason:
          "A spare NP-FZ100 battery extends shooting time significantly.",

        confidence:
          1,
      },

      {
        productId:
          "sony-e-70-350mm-f4-5-6-3-g-oss",

        reason:
          "An outstanding wildlife and sports lens for Sony APS-C cameras.",

        confidence:
          0.98,
      },

      {
        productId:
          "sigma-56mm-f1-4-dc-dn-sony-e",

        reason:
          "One of the best portrait lenses available for Sony APS-C.",

        confidence:
          0.98,
      },
    ],

    compatibleProducts: [
      {
        productId:
          "sony-np-fz100-battery",

        reason:
          "The Sony A6600 uses the Sony NP-FZ100 rechargeable battery.",

        confidence:
          1,
      },
    ],
  },

  confidence:
    0.98,

  sources: [
    "Sony UK ILCE-6600 specifications",
    "Sony ILCE-6600 product page",
  ],

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

      type:
        "Exmor CMOS",

      cropFactor:
        1.5,
    },

    mount:
      "Sony E",

    autofocus: {
      rating:
        9,

      phaseDetectionPoints:
        425,

      contrastDetectionPoints:
        425,

      eyeAutofocus:
        true,

      animalEyeAutofocus:
        true,

      birdEyeAutofocus:
        false,

      subjectTracking:
        true,

      notes:
        "Sony Real-time Tracking and Real-time Eye AF remain among the strongest autofocus systems in this generation.",
    },

    video: {
      rating:
        8,

      maximumResolution:
        "4K",

      maximum4KFrameRate:
        30,

      microphoneInput:
        true,

      headphoneOutput:
        false,

      fullyArticulatingScreen:
        false,

      recordingLimitMinutes:
        0,

      logProfiles:
        true,

      notes:
        "Excellent 4K quality with strong autofocus, although it lacks the newer video tools introduced with the A6700.",
    },

    stabilisation: {
      ibis:
        true,

      stabilisedLensSupport:
        true,

      notes:
        "Five-axis IBIS significantly improves handheld photography and video stability.",
    },

    battery: {
      shots:
        810,

      model:
        "NP-FZ100",

      removable:
        true,

      usbCharging:
        true,

      usbPower:
        true,
    },

    body: {
      weightGrams:
        503,

      viewfinder:
        true,

      builtInFlash:
        false,

      touchscreen:
        true,
    },

    performance: {
      maximumBurstRateFps:
        11,

      silentBurstRateFps:
        8,
    },

    connectivity: {
      wifi:
        true,

      bluetooth:
        true,

      nfc:
        false,
    },

    intelligence: {
      beginnerScore:
        7,

      travelScore:
        9,

      familyScore:
        9,

      streetScore:
        9,

      portraitScore:
        9,

      landscapeScore:
        9,

      wildlifeScore:
        9,

      sportsScore:
        9,

      videoScore:
        8,

      vloggingScore:
        6,

      valueScore:
        9,

      futureProofScore:
        8,
    },

    weatherSealed:
      true,
  },

  alternatives: [
    "sony-a6500",
    "sony-a6700",
    "canon-eos-r7",
  ],

  upgradePath: [
    "sony-a6700",
  ],
};