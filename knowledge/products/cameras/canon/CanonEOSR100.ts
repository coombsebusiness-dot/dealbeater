import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const canonEOSR100 =
  createCameraProduct({
    brand:
      "Canon",

    model:
      "EOS R100",

    fullName:
      "Canon EOS R100",

    description:
      "Canon's most affordable RF-mount mirrorless camera, designed as a straightforward entry point into interchangeable-lens photography. It combines a proven 24.1-megapixel APS-C sensor with Canon's Dual Pixel CMOS autofocus for still photography in a compact and lightweight body.",

    status:
      "CURRENT",

    releaseYear:
      2023,

    identifiers: {
      sku:
        "6052C",
    },

    specifications: {
      sensorFormat:
        "APS-C",

      megapixels:
        24.1,

      lensMount:
        "Canon RF",

      maximumBurstRateFps:
        6.5,

      maximumVideoResolution:
        "4K",

      ibis:
        false,

      weatherSealed:
        false,

      batteryModel:
        "LP-E17",

      bodyWeightGrams:
        356,
    },

    strengths: [
      "One of the most affordable ways to enter Canon's RF ecosystem.",
      "24.1-megapixel APS-C sensor produces detailed still photographs.",
      "Very compact and lightweight body.",
      "Excellent beginner camera.",
      "Compatible with Canon RF and RF-S lenses.",
      "Simple controls make it approachable for new photographers.",
      "Good JPEG colour straight from camera.",
      "Electronic viewfinder provides a more natural shooting experience than screen-only cameras.",
      "Dual Pixel CMOS AF performs well for still photography.",
      "Good value for families, holidays and everyday photography.",
      "USB-C charging improves convenience.",
      "Produces significantly better image quality than most smartphones in challenging lighting.",
      "Ideal stepping stone into interchangeable-lens photography.",
      "Affordable enough to invest more of the budget into lenses.",
      "Canon menus remain among the easiest to learn.",
    ],

    weaknesses: [
      "No in-body image stabilisation.",
      "Rear screen is fixed and not touch-sensitive.",
      "No fully articulating display.",
      "4K recording uses a crop.",
      "Autofocus during 4K recording is limited compared with newer Canon models.",
      "No microphone input.",
      "Modest continuous shooting speed.",
      "Small LP-E17 battery.",
      "Single SD card slot.",
      "Limited controls for advanced photographers.",
      "Not designed for demanding wildlife or sports photography.",
      "No advanced AI subject recognition found on higher-end Canon bodies.",
      "No weather sealing.",
      "Entry-level build quality.",
      "Buyers may outgrow it relatively quickly as their skills develop.",
    ],

    bestFor: [
      "First interchangeable-lens camera.",
      "Students learning photography.",
      "Family photography.",
      "Travel photography.",
      "Holiday photography.",
      "Everyday photography.",
      "Budget-conscious buyers.",
      "Parents photographing children.",
      "Beginners moving from smartphones.",
      "Users wanting affordable access to Canon RF lenses.",
    ],

    avoidIf: [
      "You need in-body image stabilisation.",
      "You shoot serious wildlife.",
      "You photograph fast professional sport.",
      "You require advanced video features.",
      "You want a fully articulating screen.",
      "You need a microphone input.",
      "You expect flagship autofocus.",
      "You already have an EOS R50 or better.",
      "You require weather sealing.",
      "You regularly photograph in difficult professional environments.",
    ],

    buyingAdvice:
      "The Canon EOS R100 is best viewed as an affordable entry into Canon's RF mirrorless system. Buyers should prioritise investing in good lenses, as they will continue to work on future Canon bodies. If your budget stretches comfortably, compare the EOS R50, which adds a much better screen, stronger autofocus and significantly improved video capabilities.",

    relationships: {
      alternatives: [
        {
          productId:
            "canon-eos-r50",

          reason:
            "A more capable beginner Canon body with better autofocus, a fully articulating touchscreen and much stronger video performance.",

          confidence:
            0.99,
        },

        {
          productId:
            "sony-a6100",

          reason:
            "A compact APS-C mirrorless alternative with stronger autofocus and broader E-mount lens support.",

          confidence:
            0.95,
        },
      ],

      upgrades: [
        {
          productId:
            "canon-eos-r50",

          reason:
            "The natural first upgrade within Canon's APS-C RF range.",

          confidence:
            1,
        },

        {
          productId:
            "canon-eos-r10",

          reason:
            "Adds faster shooting, better controls and stronger autofocus.",

          confidence:
            0.98,
        },

        {
          productId:
            "canon-eos-r7",

          reason:
            "Professional APS-C upgrade with IBIS and advanced autofocus.",

          confidence:
            0.94,
        },
      ],

      accessories: [
        {
          productId:
            "canon-lp-e17-battery",

          reason:
            "A spare battery is highly recommended for longer outings.",

          confidence:
            1,
        },

        {
          productId:
            "canon-rf-s-18-45mm-f4-5-6-3-is-stm",

          reason:
            "Compact everyday zoom ideal for beginners.",

          confidence:
            0.99,
        },

        {
          productId:
            "canon-rf-50mm-f1-8-stm",

          reason:
            "Affordable prime lens for portraits and low-light photography.",

          confidence:
            0.97,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "canon-lp-e17-battery",

          reason:
            "The EOS R100 uses the Canon LP-E17 battery.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.98,

    sources: [
      "Canon UK EOS R100 specifications",
      "Canon EOS R100 product information",
    ],

    camera: {
      sensor: {
        format:
          "APS-C",

        megapixels:
          24.1,

        type:
          "CMOS",

        cropFactor:
          1.6,
      },

      mount:
        "Canon RF",

      autofocus: {
        rating:
          6,

        eyeAutofocus:
          true,

        subjectTracking:
          true,

        notes:
          "Reliable Dual Pixel CMOS autofocus for everyday photography, though significantly behind Canon's newer subject-recognition systems.",
      },

      video: {
        rating:
          4,

        maximumResolution:
          "4K",

        microphoneInput:
          false,

        headphoneOutput:
          false,

        fullyArticulatingScreen:
          false,

        recordingLimitMinutes:
          29,

        logProfiles:
          false,

        notes:
          "Basic 4K recording is available but with compromises including sensor crop and reduced autofocus capability.",
      },

      stabilisation: {
        ibis:
          false,

        stabilisedLensSupport:
          true,

        notes:
          "Relies on optical stabilisation in compatible RF lenses.",
      },

      battery: {
        shots:
          430,

        model:
          "LP-E17",

        removable:
          true,

        usbCharging:
          true,

        usbPower:
          false,
      },

      body: {
        weightGrams:
          356,

        viewfinder:
          true,

        builtInFlash:
          true,

        touchscreen:
          false,
      },

      performance: {
        maximumBurstRateFps:
          6.5,
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
          10,

        travelScore:
          8,

        familyScore:
          8,

        streetScore:
          7,

        portraitScore:
          7,

        landscapeScore:
          7,

        wildlifeScore:
          4,

        sportsScore:
          4,

        videoScore:
          4,

        vloggingScore:
          3,

        valueScore:
          9,

        futureProofScore:
          6,
      },

      weatherSealed:
        false,
    },
  });