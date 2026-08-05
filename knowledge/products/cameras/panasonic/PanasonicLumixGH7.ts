import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const panasonicLumixGH7 =
  createCameraProduct({
    brand:
      "Panasonic",

    model:
      "Lumix GH7",

    fullName:
      "Panasonic Lumix GH7",

    description:
      "A flagship Micro Four Thirds hybrid camera designed for professional filmmakers, wildlife photographers and content creators. It combines a fast 25.2-megapixel BSI sensor with Panasonic's latest Phase Hybrid Autofocus, powerful in-body stabilisation, internal Apple ProRes recording and advanced professional production tools while benefiting from the compact Micro Four Thirds lens ecosystem.",

    status:
      "CURRENT",

    releaseYear:
      2024,

    identifiers: {
      sku:
        "DC-GH7",
    },

    specifications: {
      sensorFormat:
        "MICRO_FOUR_THIRDS",

      megapixels:
        25.2,

      lensMount:
        "Micro Four Thirds",

      maximumBurstRateFps:
        75,

      maximumVideoResolution:
        "5.7K",

      ibis:
        true,

      weatherSealed:
        true,

      batteryModel:
        "DMW-BLK22",

      bodyWeightGrams:
        805,
    },

    strengths: [
      "The 25.2-megapixel backside-illuminated sensor provides excellent image quality and fast readout performance.",

      "Phase Hybrid Autofocus dramatically improves continuous autofocus compared with earlier GH cameras.",

      "Subject recognition supports people, animals, vehicles and motorcycles.",

      "Five-axis in-body image stabilisation provides exceptionally stable handheld photography and video.",

      "The camera records internal 5.7K open-gate video for flexible multi-platform production.",

      "Apple ProRes recording is supported internally.",

      "CFexpress Type B media supports demanding professional codecs.",

      "Internal ProRes RAW workflows provide outstanding production flexibility.",

      "ARRI LogC3 support integrates the camera into professional cinema workflows.",

      "Dynamic Range Boost improves highlight and shadow retention in demanding lighting.",

      "Waveform monitor, vectorscope and shutter-angle controls are built into the camera.",

      "The fully articulating touchscreen suits professional video production.",

      "Full-size HDMI supports reliable external recording.",

      "Microphone and headphone sockets support professional audio workflows.",

      "USB-C SSD recording enables extended recording sessions.",

      "The weather-sealed magnesium-alloy body is designed for professional field work.",

      "Micro Four Thirds lenses remain substantially smaller and lighter than equivalent full-frame telephoto lenses.",

      "The system is particularly attractive for wildlife and documentary filmmakers.",

      "Excellent stabilisation makes handheld production much easier.",

      "The GH7 represents one of the most capable hybrid video cameras available today.",
    ],

    weaknesses: [
      "The Micro Four Thirds sensor provides less shallow depth of field than full-frame systems.",

      "High-ISO noise performance cannot fully match larger full-frame sensors.",

      "Landscape photographers seeking maximum dynamic range may prefer larger sensors.",

      "Professional portrait photographers may prefer full-frame rendering.",

      "The body is relatively large for a Micro Four Thirds camera.",

      "Advanced filmmaking features may overwhelm beginners.",

      "Professional codecs require significant storage capacity.",

      "CFexpress cards increase overall ownership cost.",

      "Buyers interested only in photography may not benefit from the extensive video features.",

      "The complete system price increases when professional cine accessories are added.",

      "Micro Four Thirds is a smaller ecosystem than Canon RF or Sony E.",

      "Some buyers simply prefer full-frame regardless of practical advantages.",
    ],

    bestFor: [
      "Professional filmmakers.",
      "Documentary production.",
      "Wildlife photographers.",
      "Bird photographers.",
      "Sports photography.",
      "Content creators.",
      "Commercial production.",
      "YouTube professionals.",
      "Run-and-gun filmmaking.",
      "Travel filmmakers.",
    ],

    avoidIf: [
      "You want the shallowest possible depth of field.",
      "You mainly photograph portraits.",
      "You require a full-frame sensor.",
      "You only shoot still photographs.",
      "You have no need for advanced production codecs.",
      "You want the smallest Panasonic body.",
      "You primarily create casual family photographs.",
      "You require extremely high-resolution still images.",
      "You have a very limited storage budget.",
      "A Lumix S5 II better matches your needs.",
    ],

    buyingAdvice:
      "The Panasonic Lumix GH7 is one of the strongest hybrid filmmaking cameras currently available. It combines excellent stabilisation, advanced production codecs, open-gate recording, internal ProRes, Phase Hybrid Autofocus and a lightweight Micro Four Thirds ecosystem into an exceptionally capable production tool. Buyers should compare it with the Lumix G9 II if photography is the primary priority and with the Lumix S5 II or S5 IIX if full-frame image characteristics are more important.",
          relationships: {
      alternatives: [
        {
          productId:
            "panasonic-lumix-g9-ii",

          reason:
            "A photography-focused Micro Four Thirds alternative using the same sensor and autofocus system but tuned more towards wildlife, sport and still photography.",

          confidence:
            0.99,
        },

        {
          productId:
            "panasonic-lumix-s5-iix",

          reason:
            "A full-frame filmmaking alternative with ProRes recording, SSD workflows and improved low-light performance, although it uses larger lenses.",

          confidence:
            0.98,
        },

        {
          productId:
            "fujifilm-x-h2s",

          reason:
            "A stacked-sensor APS-C hybrid competitor offering exceptional action performance and internal ProRes recording, although Panasonic provides stronger professional monitoring tools.",

          confidence:
            0.97,
        },

        {
          productId:
            "sony-fx30",

          reason:
            "A cinema-focused APS-C alternative with excellent autofocus and professional video features, although it lacks the GH7's advanced stabilisation and still-photography versatility.",

          confidence:
            0.96,
        },

        {
          productId:
            "canon-eos-r7",

          reason:
            "A high-speed APS-C wildlife alternative with excellent autofocus, although Panasonic offers broader professional video capabilities.",

          confidence:
            0.95,
        },
      ],

      upgrades: [
        {
          productId:
            "panasonic-lumix-s5-iix",

          reason:
            "A natural upgrade for creators wanting full-frame image characteristics while retaining Panasonic's advanced video ecosystem.",

          confidence:
            0.97,
        },

        {
          productId:
            "panasonic-lumix-s1r-ii",

          reason:
            "A flagship full-frame upgrade for photographers requiring higher resolution and premium image quality.",

          confidence:
            0.91,
        },
      ],

      accessories: [
        {
          productId:
            "panasonic-dmw-blk22-battery",

          reason:
            "The GH7 uses the DMW-BLK22 battery and multiple genuine spares are recommended for professional production.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-leica-12-60mm-f2-8-4",

          reason:
            "A weather-sealed Micro Four Thirds standard zoom well suited to documentary, travel and hybrid production.",

          confidence:
            0.99,
        },

        {
          productId:
            "panasonic-leica-100-400mm-f4-6-3",

          reason:
            "A lightweight super-telephoto ideal for wildlife, birds and outdoor sport.",

          confidence:
            0.99,
        },

        {
          productId:
            "cfexpress-type-b-card",

          reason:
            "Required to unlock the GH7's highest-quality recording formats including internal ProRes workflows.",

          confidence:
            1,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "panasonic-dmw-blk22-battery",

          reason:
            "The Panasonic Lumix GH7 uses the Panasonic DMW-BLK22 rechargeable battery.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-leica-12-60mm-f2-8-4",

          reason:
            "A Micro Four Thirds lens fully compatible with the Lumix GH7.",

          confidence:
            1,
        },

        {
          productId:
            "panasonic-leica-100-400mm-f4-6-3",

          reason:
            "A Micro Four Thirds telephoto lens fully compatible with the Lumix GH7.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.99,

    sources: [
      "Panasonic Lumix GH7 official product information",
      "Panasonic Lumix GH7 official specifications",
      "Panasonic Lumix GH7 owner manual",
      "Panasonic Lumix GH7 professional video documentation",
    ],

    createdAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    camera: {
      sensor: {
        format:
          "Micro Four Thirds",

        megapixels:
          25.2,

        type:
          "BSI CMOS",

        cropFactor:
          2,
      },

      mount:
        "Micro Four Thirds",

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
          true,

        subjectTracking:
          true,

        notes:
          "Phase Hybrid Autofocus with intelligent subject recognition provides Panasonic's strongest autofocus performance in the GH series, supporting people, animals, birds and vehicles.",
      },

      video: {
        rating:
          10,

        maximumResolution:
          "5.7K",

        maximum4KFrameRate:
          120,

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
          "Professional video features include 5.7K open-gate recording, internal Apple ProRes, ProRes RAW, Dynamic Range Boost, waveform monitoring, vectorscope, shutter-angle control, SSD recording and optional ARRI LogC3 support.",
      },

      stabilisation: {
        ibis:
          true,

        stabilisedLensSupport:
          true,

        notes:
          "Five-axis in-body image stabilisation with Active I.S. delivers class-leading handheld stability for both photography and video production.",
      },

      battery: {
        shots:
          420,

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
          805,

        viewfinder:
          true,

        builtInFlash:
          false,

        touchscreen:
          true,
      },

      performance: {
        maximumBurstRateFps:
          75,

        silentBurstRateFps:
          75,
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
          5,

        travelScore:
          8,

        familyScore:
          7,

        streetScore:
          7,

        portraitScore:
          8,

        landscapeScore:
          8,

        wildlifeScore:
          10,

        sportsScore:
          10,

        videoScore:
          10,

        vloggingScore:
          9,

        valueScore:
          9,

        futureProofScore:
          10,
      },

      weatherSealed:
        true,
    },
  });