import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const panasonicLumixS9 =
  createCameraProduct({
    brand:
      "Panasonic",

    model:
      "Lumix S9",

    fullName:
      "Panasonic Lumix S9",

    description:
      "A compact full-frame mirrorless camera designed for creators, travel photographers and social-first video production. Combining Panasonic's 24.2-megapixel full-frame sensor with Phase Hybrid Autofocus, five-axis image stabilisation, Real Time LUT support and internal 6K open-gate recording, it delivers high-end image quality in one of Panasonic's smallest interchangeable-lens cameras.",

    status:
      "CURRENT",

    releaseYear:
      2024,

    identifiers: {
      sku:
        "DC-S9",
    },

    specifications: {
      sensorFormat:
        "FULL_FRAME",

      megapixels:
        24.2,

      lensMount:
        "L-Mount",

      maximumBurstRateFps:
        30,

      maximumVideoResolution:
        "6K",

      ibis:
        true,

      weatherSealed:
        false,

      batteryModel:
        "DMW-BLK22",

      bodyWeightGrams:
        486,
    },

    strengths: [
      "The 24.2-megapixel full-frame sensor delivers excellent image quality with attractive low-light performance.",

      "Phase Hybrid Autofocus provides reliable subject tracking for both photography and video.",

      "Five-axis in-body image stabilisation allows highly stable handheld photography and video.",

      "The compact body is substantially smaller than the Lumix S5 II.",

      "At approximately 486 grams it is highly portable for travel and everyday use.",

      "Internal 6K open-gate recording provides flexible reframing for multiple platforms.",

      "Real Time LUT allows creators to apply customised colour looks directly in-camera.",

      "Internal 10-bit recording supports professional colour grading.",

      "V-Log is included without additional purchase.",

      "The fully articulating touchscreen is ideal for self-recording and vlogging.",

      "USB-C charging and power delivery support travel and livestreaming workflows.",

      "The L-Mount Alliance provides access to Panasonic, Leica and Sigma lenses.",

      "The camera produces excellent JPEG and video colour directly from the camera.",

      "Its compact size encourages photographers to carry it more often than larger systems.",

      "It is one of the smallest full-frame hybrid cameras currently available.",

      "The combination of portability and image quality makes it exceptionally attractive for travel creators.",

      "The dedicated LUT workflow simplifies content creation for social media.",

      "The camera offers outstanding value for creators wanting full-frame quality without carrying a large professional body.",

      "It performs well for both photography and short-form video creation.",

      "Its straightforward controls make it approachable for photographers upgrading from smartphones.",
    ],

    weaknesses: [
      "The body does not include an electronic viewfinder.",

      "Bright sunlight can make rear-screen composition more difficult.",

      "There is only one SD card slot.",

      "Professional photographers may require dual-card redundancy.",

      "The body is not weather sealed.",

      "The compact grip becomes less comfortable with heavy telephoto lenses.",

      "The camera omits several professional monitoring features found on the S5 IIX.",

      "Full-size HDMI is not available.",

      "The camera is less suitable for demanding commercial filmmaking than the Lumix S5 IIX.",

      "Large L-Mount lenses reduce the benefit of the compact body.",

      "The 24.2-megapixel sensor offers less cropping flexibility than higher-resolution competitors.",

      "Professional wildlife photographers should consider larger specialist bodies.",

      "Electronic rolling shutter remains visible during rapid movement.",

      "Battery life is respectable but spare batteries remain advisable during travel.",

      "The complete system cost increases as premium L-Mount lenses are added.",

      "The lack of an EVF will discourage some traditional photographers.",
    ],

    bestFor: [
      "Travel creators.",
      "Content creators.",
      "YouTubers.",
      "Travel photographers.",
      "Lifestyle photography.",
      "Family photography.",
      "Street photography.",
      "Creators moving beyond smartphones.",
      "Hybrid creators.",
      "Photographers wanting the smallest Panasonic full-frame camera.",
    ],

    avoidIf: [
      "You require an electronic viewfinder.",
      "You need dual memory-card slots.",
      "You regularly use heavy telephoto lenses.",
      "You require weather sealing.",
      "You mainly photograph wildlife.",
      "You require full-size HDMI.",
      "You need professional cinema workflows.",
      "The Lumix S5 II better suits your needs.",
      "The Lumix S5 IIX better suits your production workflow.",
      "You only shoot high-speed professional sport.",
    ],

    buyingAdvice:
      "The Panasonic Lumix S9 is one of the most interesting compact full-frame cameras available. It combines excellent image quality, Phase Hybrid Autofocus, in-body stabilisation and open-gate recording in a body that is significantly smaller than traditional hybrid cameras. Buyers should understand that portability comes with compromises including the lack of an electronic viewfinder, a single card slot and fewer professional video connections than the Lumix S5 II or S5 IIX. For travel, social content and everyday photography, however, it offers an outstanding balance of size, capability and value.",
          relationships: {
      alternatives: [
        {
          productId:
            "panasonic-lumix-s5-ii",

          reason:
            "A larger full-frame hybrid alternative with an electronic viewfinder, dual card slots, weather sealing and stronger professional handling.",

          confidence:
            0.99,
        },

        {
          productId:
            "panasonic-lumix-s5-iix",

          reason:
            "A filmmaking-focused alternative offering ProRes recording, SSD workflows and advanced production features.",

          confidence:
            0.98,
        },

        {
          productId:
            "sony-a7c-ii",

          reason:
            "A compact full-frame hybrid competitor with excellent autofocus and an electronic viewfinder, although Panasonic offers Real Time LUT workflows and stronger in-camera colour tools.",

          confidence:
            0.98,
        },

        {
          productId:
            "fujifilm-xs20",

          reason:
            "A compact APS-C hybrid alternative with excellent stabilisation and creator features, although Panasonic provides the benefits of a full-frame sensor.",

          confidence:
            0.96,
        },

        {
          productId:
            "canon-eos-r8",

          reason:
            "A lightweight full-frame hybrid alternative with excellent autofocus and image quality, although Panasonic offers in-body stabilisation and more advanced video tools.",

          confidence:
            0.96,
        },
      ],

      upgrades: [
        {
          productId:
            "panasonic-lumix-s5-ii",

          reason:
            "The natural upgrade for photographers wanting an electronic viewfinder, dual memory-card slots and a more robust body.",

          confidence:
            0.99,
        },

        {
          productId:
            "panasonic-lumix-s5-iix",

          reason:
            "The filmmaking upgrade, adding professional codecs, SSD recording and advanced production workflows.",

          confidence:
            0.99,
        },

        {
          productId:
            "panasonic-lumix-s1r-ii",

          reason:
            "A premium full-frame upgrade for professionals needing higher resolution and flagship photographic capability.",

          confidence:
            0.91,
        },
      ],

      accessories: [
        {
          productId:
            "panasonic-dmw-blk22-battery",

          reason:
            "The Lumix S9 uses the DMW-BLK22 battery and carrying a spare is recommended for travel and content creation.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-20-60mm-f3-5-5-6",

          reason:
            "A lightweight L-Mount zoom that complements the compact design of the Lumix S9.",

          confidence:
            0.99,
        },

        {
          productId:
            "sigma-45mm-f2-8-dg-dn",

          reason:
            "A compact full-frame prime that maintains the S9's portability while delivering excellent image quality.",

          confidence:
            0.98,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "panasonic-dmw-blk22-battery",

          reason:
            "The Panasonic Lumix S9 uses the Panasonic DMW-BLK22 rechargeable battery.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-20-60mm-f3-5-5-6",

          reason:
            "A Panasonic L-Mount zoom fully compatible with the Lumix S9.",

          confidence:
            1,
        },

        {
          productId:
            "sigma-45mm-f2-8-dg-dn",

          reason:
            "A Sigma L-Mount compact prime fully compatible with the Lumix S9 through the L-Mount Alliance.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.99,

    sources: [
      "Panasonic Lumix S9 official product information",
      "Panasonic Lumix S9 official specifications",
      "Panasonic Lumix S9 owner manual",
      "Panasonic Lumix S9 Real Time LUT documentation",
    ],

    createdAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    camera: {
      sensor: {
        format:
          "Full Frame",

        megapixels:
          24.2,

        type:
          "CMOS",

        cropFactor:
          1,
      },

      mount:
        "L-Mount",

      autofocus: {
        rating:
          9,

        phaseDetectionPoints:
          779,

        eyeAutofocus:
          true,

        animalEyeAutofocus:
          true,

        birdEyeAutofocus:
          false,

        subjectTracking:
          true,

        notes:
          "Panasonic's Phase Hybrid Autofocus provides dependable recognition for people, animals and vehicles, making the S9 highly capable for travel, lifestyle and creator photography.",
      },

      video: {
        rating:
          9,

        maximumResolution:
          "6K",

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
          "Internal 6K open-gate recording, Real Time LUT support, V-Log and internal 10-bit colour make the Lumix S9 one of the strongest compact creator cameras available.",
      },

      stabilisation: {
        ibis:
          true,

        stabilisedLensSupport:
          true,

        notes:
          "Five-axis in-body image stabilisation delivers excellent handheld performance for both stills and video.",
      },

      battery: {
        shots:
          470,

        model:
          "DMW-BLK22",

        removable:
          true,

        usbCharging:
          true,

        usbPower:
          true,
      },

      body: {
        weightGrams:
          486,

        viewfinder:
          false,

        builtInFlash:
          false,

        touchscreen:
          true,
      },

      performance: {
        maximumBurstRateFps:
          30,

        silentBurstRateFps:
          30,
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
          9,

        travelScore:
          10,

        familyScore:
          9,

        streetScore:
          9,

        portraitScore:
          8,

        landscapeScore:
          8,

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
          9,
      },

      weatherSealed:
        false,
    },
  });