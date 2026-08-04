import type {
  CameraProduct,
} from "../CameraProduct";

export const sonyA6300:
  CameraProduct = {
  id:
    "sony-a6300",

  slug:
    "sony-a6300",

  category:
    "CAMERAS",

  productType:
    "MIRRORLESS",

  brand:
    "Sony",

  model:
    "A6300",

  fullName:
    "Sony A6300",

  description:
    "A compact enthusiast APS-C mirrorless camera that introduced 4K video and weather sealing to Sony's APS-C range while remaining an excellent used option for photographers who prioritise image quality and durability.",

  status:
    "DISCONTINUED",

  releaseYear:
    2016,

  identifiers: {
    sku:
      "ILCE-6300",
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
      false,

    weatherSealed:
      true,

    batteryModel:
      "NP-FW50",

    bodyWeightGrams:
      404,
  },

  strengths: [
    "Excellent 24.2-megapixel APS-C image quality.",

    "Weather-sealed magnesium alloy body provides greater durability than entry-level Sony APS-C models.",

    "One of the first Sony APS-C cameras to offer detailed 4K video recording.",

    "Fast Hybrid AF with wide frame coverage remains capable for still photography.",

    "Continuous shooting at up to 11fps suits wildlife, children and moderate sports.",

    "Sony E-mount compatibility gives access to an extensive lens ecosystem.",

    "Excellent value on the used market for enthusiast photographers.",

    "Compact size makes it suitable for travel and street photography.",
  ],

  weaknesses: [
    "Autofocus is noticeably behind the A6100, A6400 and A6700 for subject tracking.",

    "No in-body image stabilisation.",

    "The NP-FW50 battery offers modest endurance.",

    "No touchscreen.",

    "Menus feel dated compared with newer Sony cameras.",

    "Rolling shutter can be noticeable during 4K video.",

    "The screen only tilts and does not face forwards.",

    "No headphone output.",
  ],

  bestFor: [
    "Enthusiast photographers.",

    "Landscape photography.",

    "Travel photography.",

    "Street photography.",

    "Buyers wanting weather sealing on a sensible budget.",

    "Used-camera buyers.",

    "Photographers with existing Sony E-mount lenses.",

    "People prioritising still photography over advanced video features.",
  ],

  avoidIf: [
    "You need in-body image stabilisation.",

    "You want modern Real-time Tracking autofocus.",

    "You regularly vlog.",

    "You need a touchscreen.",

    "You need a fully articulating screen.",

    "You need long battery life.",

    "A Sony A6400 is available for only a small increase in price.",

    "You primarily shoot professional video.",
  ],

  buyingAdvice:
    "The Sony A6300 remains one of the strongest enthusiast bargains on the used market. Buyers who value weather sealing, image quality and access to Sony's E-mount ecosystem can save significant money compared with newer bodies, provided they accept the older autofocus system and shorter battery life.",

  relationships: {
    alternatives: [
      {
        productId:
          "sony-a6100",

        reason:
          "A better beginner-focused alternative with newer autofocus and a touchscreen.",

        confidence:
          0.95,
      },

      {
        productId:
          "sony-a6400",

        reason:
          "A newer all-round option with stronger autofocus and a more refined shooting experience.",

        confidence:
          0.98,
      },

      {
        productId:
          "fujifilm-x-t30-ii",

        reason:
          "A photography-focused alternative with traditional controls and attractive JPEG colour profiles.",

        confidence:
          0.88,
      },
    ],

    upgrades: [
      {
        productId:
          "sony-a6400",

        reason:
          "Improves autofocus performance while keeping a similar compact body.",

        confidence:
          0.97,
      },

      {
        productId:
          "sony-a6600",

        reason:
          "Adds IBIS, a larger battery and a deeper grip.",

        confidence:
          0.96,
      },

      {
        productId:
          "sony-a6700",

        reason:
          "Major upgrade with AI autofocus, IBIS and significantly stronger video capability.",

        confidence:
          0.99,
      },
    ],

    accessories: [
      {
        productId:
          "sony-np-fw50-battery",

        reason:
          "A spare battery is strongly recommended.",

        confidence:
          0.99,
      },

      {
        productId:
          "sony-e-18-135mm-f3-5-5-6-oss",

        reason:
          "Excellent all-round travel zoom.",

        confidence:
          0.98,
      },
    ],

    compatibleProducts: [
      {
        productId:
          "sony-np-fw50-battery",

        reason:
          "Uses the Sony NP-FW50 battery.",

        confidence:
          1,
      },
    ],
  },

  confidence:
    0.96,

  sources: [
    "Sony UK ILCE-6300 specifications",
    "Sony ILCE-6300 product page",
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
        8,

      phaseDetectionPoints:
        425,

      contrastDetectionPoints:
        169,

      eyeAutofocus:
        true,

      animalEyeAutofocus:
        false,

      birdEyeAutofocus:
        false,

      subjectTracking:
        true,

      notes:
        "Fast Hybrid AF remains capable for enthusiast photography, although newer Sony Real-time Tracking systems are considerably more advanced.",
    },

    video: {
      rating:
        7,

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
        29,

      logProfiles:
        true,

      notes:
        "Strong 4K quality for its generation but limited by rolling shutter and the lack of IBIS.",
    },

    stabilisation: {
      ibis:
        false,

      stabilisedLensSupport:
        true,

      notes:
        "Relies on OSS lenses or external support.",
    },

    battery: {
      shots:
        400,

      model:
        "NP-FW50",

      removable:
        true,

      usbCharging:
        true,

      usbPower:
        false,
    },

    body: {
      weightGrams:
        404,

      viewfinder:
        true,

      builtInFlash:
        true,

      touchscreen:
        false,
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
        false,

      nfc:
        true,
    },

    intelligence: {
      beginnerScore:
        7,

      travelScore:
        9,

      familyScore:
        7,

      streetScore:
        9,

      portraitScore:
        8,

      landscapeScore:
        9,

      wildlifeScore:
        7,

      sportsScore:
        7,

      videoScore:
        7,

      vloggingScore:
        4,

      valueScore:
        9,

      futureProofScore:
        6,
    },

    weatherSealed:
      true,
  },

  alternatives: [
    "sony-a6100",
    "sony-a6400",
    "fujifilm-x-t30-ii",
  ],

  upgradePath: [
    "sony-a6400",
    "sony-a6600",
    "sony-a6700",
  ],
};