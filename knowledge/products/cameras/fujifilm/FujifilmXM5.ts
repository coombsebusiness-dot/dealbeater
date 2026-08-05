import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const fujifilmXM5 =
  createCameraProduct({
    brand:
      "Fujifilm",

    model:
      "X-M5",

    fullName:
      "Fujifilm X-M5",

    description:
      "An ultra-compact 26.1-megapixel APS-C mirrorless camera designed for travel, everyday photography and content creation. Combining the proven X-Trans CMOS 4 sensor with the newer X-Processor 5, advanced AI subject recognition, open-gate 6.2K recording and Fujifilm's renowned Film Simulations, it offers an approachable entry into the X System for creators and photographers wanting professional image quality in a very small body.",

    status:
      "CURRENT",

    releaseYear:
      2024,

    identifiers: {
      sku:
        "FF240001",
    },

    specifications: {
      sensorFormat:
        "APS-C",

      megapixels:
        26.1,

      lensMount:
        "Fujifilm X",

      maximumBurstRateFps:
        20,

      maximumVideoResolution:
        "6.2K",

      ibis:
        false,

      weatherSealed:
        false,

      batteryModel:
        "NP-W126S",

      bodyWeightGrams:
        355,
    },

    strengths: [
      "The compact body is one of the smallest interchangeable-lens cameras in Fujifilm's lineup.",

      "At approximately 355 grams it is exceptionally easy to carry throughout the day.",

      "The proven 26.1-megapixel X-Trans CMOS 4 sensor delivers excellent image quality with manageable RAW file sizes.",

      "The X-Processor 5 provides significantly improved autofocus processing and subject recognition.",

      "AI subject detection recognises people, birds, animals, aircraft, trains, motorcycles, bicycles and cars.",

      "Human eye and face detection perform well for portraits, family photography and self-recording.",

      "The fully articulating touchscreen is ideal for creators, vloggers and travel video.",

      "Open-gate 6.2K recording provides flexibility for horizontal and vertical content creation.",

      "Internal 10-bit recording provides excellent colour depth for grading.",

      "F-Log2 recording offers wide dynamic range for advanced editing workflows.",

      "The dedicated Vlog mode simplifies video production for beginners.",

      "Film Simulations provide attractive colours directly from the camera.",

      "JPEG output is excellent and often requires little editing.",

      "The compact body pairs beautifully with Fujifilm's small prime lenses.",

      "The X-mount ecosystem offers an extensive range of lenses for future upgrades.",

      "USB-C charging supports convenient travel and creator workflows.",

      "Microphone input improves audio quality for content creation.",

      "Wi-Fi and Bluetooth support simple wireless image transfer.",

      "The camera offers professional image quality in a genuinely travel-friendly package.",

      "It is an outstanding entry point into the Fujifilm X ecosystem.",
    ],

    weaknesses: [
      "The camera does not include in-body image stabilisation.",

      "Low-light handheld photography depends on lens stabilisation or faster shutter speeds.",

      "Video stabilisation is less capable than IBIS-equipped Fujifilm bodies.",

      "The body is not weather sealed.",

      "There is only one SD card slot.",

      "Professional photographers may require dual-card redundancy.",

      "The smaller NP-W126S battery provides shorter endurance than the NP-W235 used by higher-end Fujifilm cameras.",

      "The compact grip can become uncomfortable with larger telephoto lenses.",

      "There is no electronic viewfinder.",

      "Bright sunlight can make rear-screen composition more difficult.",

      "There is no mechanical control layout like the X-T series.",

      "The body lacks professional video connections such as full-size HDMI.",

      "There is no dedicated headphone socket.",

      "The camera is designed primarily for enthusiasts and creators rather than professional action photography.",

      "The X-H2S remains dramatically stronger for wildlife and sport.",

      "The X-T5 provides weather sealing, IBIS and much higher resolution.",

      "The X-S20 provides IBIS, a larger battery and a deeper grip.",

      "The complete system cost still increases as additional Fujifilm lenses are purchased.",
    ],

    bestFor: [
      "Travel photography.",

      "Everyday photography.",

      "Street photography.",

      "Family photography.",

      "Holiday photography.",

      "Vlogging.",

      "Content creation.",

      "YouTube creators.",

      "Students.",

      "First-time interchangeable-lens camera buyers.",

      "Creators moving from smartphones.",

      "Photographers wanting the smallest Fujifilm body.",
    ],

    avoidIf: [
      "You require in-body image stabilisation.",

      "You regularly photograph professional sport.",

      "You need dual memory-card slots.",

      "You require weather sealing.",

      "You often use heavy telephoto lenses.",

      "You require an electronic viewfinder.",

      "You primarily shoot wildlife.",

      "You need professional video connections.",

      "The X-S20 already fits your needs better.",

      "You require maximum APS-C resolution.",
    ],

    buyingAdvice:
      "The Fujifilm X-M5 is an excellent choice for photographers and creators wanting the smallest possible X-mount camera without sacrificing image quality. It is especially attractive for travel, holidays, family photography and YouTube creators moving beyond smartphones. Buyers should understand that it omits in-body stabilisation, weather sealing and an electronic viewfinder in order to achieve its compact size. Those features are available in the X-S20 and X-T5 for photographers with larger budgets.",
    relationships: {
      alternatives: [
        {
          productId:
            "fujifilm-xs20",

          reason:
            "A larger hybrid-oriented Fujifilm alternative with in-body image stabilisation, a bigger battery and improved handling for photography and video.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-xt5",

          reason:
            "A premium photography-focused alternative offering weather sealing, in-body stabilisation, dual card slots and a higher-resolution 40.2-megapixel sensor.",

          confidence:
            0.98,
        },

        {
          productId:
            "sony-zv-e10-ii",

          reason:
            "A compact creator-focused APS-C alternative with strong autofocus and video features, although it lacks Fujifilm's Film Simulations and broader photography-focused experience.",

          confidence:
            0.96,
        },

        {
          productId:
            "canon-eos-r50",

          reason:
            "A beginner-friendly APS-C mirrorless alternative with excellent autofocus and an intuitive interface, although Fujifilm offers a unique colour science and lens ecosystem.",

          confidence:
            0.96,
        },

        {
          productId:
            "sony-a6700",

          reason:
            "A more advanced APS-C hybrid camera with weather resistance and in-body stabilisation, aimed at enthusiasts wanting greater photographic capability.",

          confidence:
            0.95,
        },
      ],

      upgrades: [
        {
          productId:
            "fujifilm-xs20",

          reason:
            "The natural upgrade, adding in-body image stabilisation, a larger battery, deeper grip and stronger hybrid capability.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-xt5",

          reason:
            "A major photography-focused upgrade with higher resolution, weather sealing and dual card slots.",

          confidence:
            0.98,
        },

        {
          productId:
            "fujifilm-xh2",

          reason:
            "A professional hybrid upgrade offering 40.2-megapixel resolution, CFexpress support and internal 8K recording.",

          confidence:
            0.96,
        },
      ],

      accessories: [
        {
          productId:
            "fujifilm-np-w126s-battery",

          reason:
            "The X-M5 uses the NP-W126S battery, and carrying a spare is recommended for travel and content creation.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-27mm-f2-8-r-wr",

          reason:
            "A compact pancake prime that keeps the X-M5 exceptionally portable for travel and street photography.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-xf-18-55mm-f2-8-4-r-lm-ois",

          reason:
            "A versatile standard zoom well suited to holidays, everyday photography and video creation.",

          confidence:
            0.98,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "fujifilm-np-w126s-battery",

          reason:
            "The Fujifilm X-M5 uses the Fujifilm NP-W126S rechargeable battery.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-27mm-f2-8-r-wr",

          reason:
            "A compact Fujifilm X-mount prime lens fully compatible with the X-M5.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-18-55mm-f2-8-4-r-lm-ois",

          reason:
            "A standard Fujifilm X-mount zoom fully compatible with the X-M5.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.99,

    sources: [
      "Fujifilm X-M5 official product information",
      "Fujifilm X-M5 official specifications",
      "Fujifilm X-M5 owner documentation",
      "Fujifilm X-M5 autofocus and video documentation",
    ],

    createdAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    camera: {
      sensor: {
        format:
          "APS-C",

        megapixels:
          26.1,

        type:
          "X-Trans CMOS 4",

        cropFactor:
          1.5,
      },

      mount:
        "Fujifilm X",

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
          true,

        subjectTracking:
          true,

        notes:
          "AI-powered autofocus recognises people, birds, animals, aircraft, trains, motorcycles, bicycles and cars, making the X-M5 highly capable for everyday photography and creator workflows.",
      },

      video: {
        rating:
          9,

        maximumResolution:
          "6.2K",

        maximum4KFrameRate:
          60,

        microphoneInput:
          true,

        headphoneOutput:
          false,

        fullyArticulatingScreen:
          true,

        recordingLimitMinutes:
          240,

        logProfiles:
          true,

        notes:
          "Open-gate 6.2K recording, internal 10-bit colour, F-Log2 and dedicated creator features make the X-M5 an excellent compact video camera despite the lack of in-body stabilisation.",
      },

      stabilisation: {
        ibis:
          false,

        stabilisedLensSupport:
          true,

        notes:
          "The body does not include in-body image stabilisation. Optical stabilisation is available with compatible Fujifilm OIS lenses.",
      },

      battery: {
        shots:
          440,

        model:
          "NP-W126S",

        removable:
          true,

        usbCharging:
          true,

        usbPower:
          true,
      },

      body: {
        weightGrams:
          355,

        viewfinder:
          false,

        builtInFlash:
          false,

        touchscreen:
          true,
      },

      performance: {
        maximumBurstRateFps:
          20,

        silentBurstRateFps:
          20,
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
          10,

        familyScore:
          9,

        streetScore:
          9,

        portraitScore:
          8,

        landscapeScore:
          7,

        wildlifeScore:
          6,

        sportsScore:
          6,

        videoScore:
          9,

        vloggingScore:
          10,

        valueScore:
          9,

        futureProofScore:
          8,
      },

      weatherSealed:
        false,
    },
  });