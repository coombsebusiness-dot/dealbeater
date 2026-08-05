import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const panasonicLumixS5II =
  createCameraProduct({
    brand:
      "Panasonic",

    model:
      "Lumix S5 II",

    fullName:
      "Panasonic Lumix S5 II",

    description:
      "A versatile 24.2-megapixel full-frame mirrorless camera combining Panasonic's first Phase Hybrid Autofocus system with excellent in-body stabilisation, internal 6K open-gate recording and professional hybrid features. It is designed for photographers and filmmakers wanting one camera that performs equally well for stills, travel, portraits, weddings and video production.",

    status:
      "CURRENT",

    releaseYear:
      2023,

    identifiers: {
      sku:
        "DC-S5M2",
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
        true,

      batteryModel:
        "DMW-BLK22",

      bodyWeightGrams:
        740,
    },

    strengths: [
      "The 24.2-megapixel full-frame sensor provides excellent image quality with manageable RAW file sizes.",

      "Panasonic's first-generation Phase Hybrid Autofocus represents a substantial improvement over previous contrast-only Lumix autofocus systems.",

      "Human, animal and vehicle subject recognition improve autofocus reliability.",

      "Five-axis in-body image stabilisation provides exceptionally steady handheld photography and video.",

      "Active I.S. improves stabilisation further when filming while walking.",

      "The camera records internal 6K open-gate video for flexible vertical and horizontal content creation.",

      "Internal 10-bit recording provides extensive grading flexibility.",

      "V-Log is included without additional purchase.",

      "Waveform monitoring, vectorscope and professional exposure tools are built into the camera.",

      "Dual UHS-II SD card slots support professional backup workflows.",

      "The fully articulating touchscreen suits video creators and photographers equally well.",

      "Full-size HDMI provides a robust professional connection.",

      "Microphone and headphone sockets support professional audio recording.",

      "USB-C power delivery enables extended recording sessions.",

      "The weather-sealed magnesium-alloy body is suitable for demanding outdoor photography.",

      "The L-Mount Alliance provides access to Panasonic, Leica and Sigma lenses.",

      "The camera is exceptionally strong value for photographers needing both stills and professional video.",

      "Open-gate recording makes reframing for multiple social platforms much easier.",

      "The autofocus is finally competitive with Sony, Canon and Nikon for most photography.",

      "It offers one of the strongest hybrid feature sets available in its price class.",
    ],

    weaknesses: [
      "The sensor is not stacked, so rolling shutter remains visible in demanding situations.",

      "The 24.2-megapixel resolution offers less cropping flexibility than 40MP and 45MP competitors.",

      "Professional wildlife photographers may prefer faster stacked-sensor cameras.",

      "Electronic burst performance is below flagship action cameras.",

      "The body is heavier than several competing full-frame cameras.",

      "Battery life is respectable but spare batteries remain advisable for extended shooting.",

      "The autofocus, while vastly improved, still trails the very best systems in the most demanding action scenarios.",

      "Large 6K files require fast SD cards and considerable storage.",

      "The complete system cost rises once premium L-Mount lenses are added.",

      "Buyers focused entirely on still photography may not fully utilise the extensive professional video features.",

      "The Lumix S5 IIX may represent better value for dedicated filmmakers.",
    ],

    bestFor: [
      "Hybrid creators.",
      "Wedding photographers.",
      "Portrait photographers.",
      "Travel photographers.",
      "Professional video production.",
      "YouTube creators.",
      "Commercial photography.",
      "Documentary filmmaking.",
      "Small production companies.",
      "Photographers wanting one camera for both stills and video.",
    ],

    avoidIf: [
      "You require a stacked sensor.",
      "You mainly photograph professional sport.",
      "You require maximum wildlife burst performance.",
      "You need more than 24 megapixels.",
      "You primarily shoot high-resolution landscapes.",
      "You want the lightest full-frame camera available.",
      "The Lumix S5 IIX better matches your workflow.",
      "You require internal 8K recording.",
      "You have already invested heavily in another lens ecosystem.",
      "You only need a simple entry-level camera.",
    ],

    buyingAdvice:
      "The Panasonic Lumix S5 II is one of the strongest hybrid full-frame cameras available. Its Phase Hybrid Autofocus, excellent stabilisation, professional video features and access to the growing L-Mount ecosystem make it equally capable for photography and filmmaking. Buyers primarily interested in video should compare it with the Lumix S5 IIX, while photographers requiring maximum action performance should consider stacked-sensor alternatives such as the Nikon Z6 III or Sony A1 II.",
          relationships: {
      alternatives: [
        {
          productId:
            "panasonic-lumix-s5-iix",

          reason:
            "The video-focused Lumix alternative adding internal ProRes recording, RAW over USB and enhanced production workflows while sharing the same sensor and autofocus system.",

          confidence:
            0.99,
        },

        {
          productId:
            "sony-a7-iv",

          reason:
            "A popular full-frame hybrid alternative with excellent autofocus, strong lens support and competitive video features, although Panasonic offers superior stabilisation and open-gate recording.",

          confidence:
            0.98,
        },

        {
          productId:
            "canon-eos-r6-mark-ii",

          reason:
            "A fast full-frame hybrid camera with outstanding autofocus and strong burst performance, although Panasonic provides broader professional video features.",

          confidence:
            0.98,
        },

        {
          productId:
            "nikon-z6-iii",

          reason:
            "A full-frame hybrid alternative with partially stacked sensor technology, excellent autofocus and strong video capability, although Panasonic remains highly competitive for filmmakers.",

          confidence:
            0.97,
        },

        {
          productId:
            "fujifilm-x-h2",

          reason:
            "A professional APS-C hybrid alternative with higher resolution and internal 8K recording, although Panasonic offers a larger full-frame sensor and stronger low-light performance.",

          confidence:
            0.95,
        },
      ],

      upgrades: [
        {
          productId:
            "panasonic-lumix-s1r-ii",

          reason:
            "A higher-resolution professional full-frame upgrade designed for commercial, landscape and studio photographers requiring substantially greater detail.",

          confidence:
            0.94,
        },

        {
          productId:
            "panasonic-lumix-s5-iix",

          reason:
            "The natural upgrade for dedicated filmmakers needing ProRes recording, RAW workflows and enhanced production tools.",

          confidence:
            0.99,
        },
      ],

      accessories: [
        {
          productId:
            "panasonic-dmw-blk22-battery",

          reason:
            "The Lumix S5 II uses the DMW-BLK22 battery and spare genuine batteries are recommended for weddings, travel and professional video.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-20-60mm-f3-5-5-6",

          reason:
            "A lightweight L-Mount standard zoom well suited to travel, landscapes and general photography.",

          confidence:
            0.98,
        },

        {
          productId:
            "panasonic-24-70mm-f2-8-s-pro",

          reason:
            "A professional constant-aperture zoom ideal for weddings, portraits, commercial work and video production.",

          confidence:
            0.99,
        },

        {
          productId:
            "sigma-85mm-f1-4-dg-dn-art",

          reason:
            "A premium L-Mount portrait lens offering exceptional sharpness and subject separation.",

          confidence:
            0.97,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "panasonic-dmw-blk22-battery",

          reason:
            "The Panasonic Lumix S5 II uses the Panasonic DMW-BLK22 rechargeable battery.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-20-60mm-f3-5-5-6",

          reason:
            "A Panasonic L-Mount zoom fully compatible with the Lumix S5 II.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-24-70mm-f2-8-s-pro",

          reason:
            "A Panasonic L-Mount professional zoom fully compatible with the Lumix S5 II.",

          confidence:
            1,
        },

        {
          productId:
            "sigma-85mm-f1-4-dg-dn-art",

          reason:
            "A Sigma L-Mount prime fully compatible with the Lumix S5 II through the L-Mount Alliance.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.99,

    sources: [
      "Panasonic Lumix S5 II official product information",
      "Panasonic Lumix S5 II official specifications",
      "Panasonic Lumix S5 II owner manual",
      "Panasonic Lumix S5 II autofocus and video documentation",
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
          "Panasonic's first Phase Hybrid Autofocus system combines phase detection with advanced subject recognition for people, animals and vehicles, representing a major improvement over previous Lumix autofocus generations.",
      },

      video: {
        rating:
          10,

        maximumResolution:
          "6K",

        maximum4KFrameRate:
          60,

        microphoneInput:
          true,

        headphoneOutput:
          true,

        fullyArticulatingScreen:
          true,

        recordingLimitMinutes:
          240,

        logProfiles:
          true,

        notes:
          "The Lumix S5 II records internal 6K open-gate video, 4:2:2 10-bit footage and V-Log without additional purchase. Waveform monitoring, vectorscope and professional monitoring tools make it one of the strongest hybrid cameras in its class.",
      },

      stabilisation: {
        ibis:
          true,

        stabilisedLensSupport:
          true,

        notes:
          "Five-axis in-body image stabilisation combined with Active I.S. provides exceptional handheld stability for both photography and video.",
      },

      battery: {
        shots:
          370,

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
          740,

        viewfinder:
          true,

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
          7,

        travelScore:
          8,

        familyScore:
          8,

        streetScore:
          8,

        portraitScore:
          10,

        landscapeScore:
          9,

        wildlifeScore:
          8,

        sportsScore:
          8,

        videoScore:
          10,

        vloggingScore:
          9,

        valueScore:
          10,

        futureProofScore:
          9,
      },

      weatherSealed:
        true,
    },
  });