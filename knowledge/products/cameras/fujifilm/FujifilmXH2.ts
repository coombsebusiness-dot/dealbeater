import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const fujifilmXH2 =
  createCameraProduct({
    brand:
      "Fujifilm",

    model:
      "X-H2",

    fullName:
      "Fujifilm X-H2",

    description:
      "A professional 40.2-megapixel APS-C mirrorless camera designed for photographers and hybrid creators who need exceptional resolution, advanced autofocus, internal 8K recording and professional connectivity. It combines Fujifilm's highest-resolution APS-C sensor with a deeper grip, CFexpress support and advanced video tools while remaining substantially smaller than comparable full-frame systems.",

    status:
      "CURRENT",

    releaseYear:
      2022,

    identifiers: {
      sku:
        "FF220002",
    },

    specifications: {
      sensorFormat:
        "APS-C",

      megapixels:
        40.2,

      lensMount:
        "Fujifilm X",

      maximumBurstRateFps:
        20,

      maximumVideoResolution:
        "8K",

      ibis:
        true,

      weatherSealed:
        true,

      batteryModel:
        "NP-W235",

      bodyWeightGrams:
        660,
    },

    strengths: [
      "The 40.2-megapixel X-Trans CMOS 5 HR sensor delivers exceptional APS-C image quality.",

      "Its high resolution provides extensive cropping flexibility for wildlife, landscapes and commercial photography.",

      "The X-Processor 5 improves autofocus performance, processing speed and overall responsiveness.",

      "The larger body provides a deeper grip than the X-T5, making it more comfortable with heavy telephoto lenses.",

      "Professional ergonomics are well suited to long shooting sessions.",

      "Seven-stop in-body image stabilisation supports handheld photography with both stabilised and unstabilised lenses.",

      "The autofocus system recognises people, animals, birds, aircraft, trains, cars, motorcycles and bicycles.",

      "Subject tracking is noticeably improved over previous Fujifilm generations.",

      "Mechanical shooting reaches up to 15fps.",

      "Electronic shooting reaches 20fps using a 1.29x crop.",

      "Dual card slots combine CFexpress Type B with UHS-II SD support.",

      "CFexpress enables sustained RAW bursts and professional video workflows.",

      "Internal 8K recording provides exceptional detail for professional productions.",

      "Internal Apple ProRes recording supports demanding post-production workflows.",

      "F-Log2 captures more than thirteen stops of dynamic range under supported conditions.",

      "Full-size HDMI is considerably more robust than micro HDMI for professional production.",

      "Microphone and headphone sockets support professional audio monitoring.",

      "The optional cooling fan allows significantly longer recording sessions.",

      "USB-C charging and external power improve studio and production workflows.",

      "Weather sealing supports professional outdoor photography.",

      "The NP-W235 battery is shared across Fujifilm's professional range.",

      "Pixel Shift Multi-Shot can generate 160MP composite files for static subjects.",

      "Film simulations provide outstanding JPEG output with minimal editing.",

      "The camera offers one of the highest-resolution APS-C sensors currently available.",

      "Its combination of resolution, stabilisation and professional video makes it one of Fujifilm's strongest hybrid cameras.",
    ],

    weaknesses: [
      "The non-stacked sensor cannot match the X-H2S for rolling-shutter performance.",

      "Electronic shutter performance is slower than stacked-sensor competitors.",

      "The headline 20fps mode requires a crop.",

      "Large 40MP RAW files require significant storage.",

      "8K recording creates demanding editing workflows.",

      "Professional video users may require CFexpress cards, increasing system cost.",

      "The body is larger and heavier than the X-T5.",

      "Battery life decreases during intensive 8K recording.",

      "The camera is not the strongest Fujifilm option for professional wildlife or elite sports.",

      "APS-C still provides less total sensor area than full-frame systems.",

      "There is no integrated vertical grip.",

      "The complete system becomes expensive once premium XF lenses and accessories are added.",
    ],

    bestFor: [
      "Landscape photographers.",

      "Commercial photographers.",

      "Studio photographers.",

      "Architecture photographers.",

      "Travel photographers wanting high resolution.",

      "Hybrid creators needing 8K recording.",

      "Professional video production.",

      "Documentary work.",

      "Portrait photographers.",

      "Experienced Fujifilm users wanting maximum APS-C resolution.",
    ],

    avoidIf: [
      "You mainly photograph fast wildlife.",

      "You mainly shoot professional sport.",

      "You require the fastest stacked sensor.",

      "You want the lightest Fujifilm body.",

      "You only shoot casual travel photography.",

      "You do not need 40MP files.",

      "The Fujifilm X-T5 already satisfies your needs.",

      "You need maximum electronic shutter performance.",

      "You require a full-frame sensor.",

      "Your computer struggles with 8K workflows.",
    ],

    buyingAdvice:
      "The Fujifilm X-H2 is ideal for photographers who prioritise resolution while also needing serious hybrid-video capability. Compared with the X-T5 it offers a deeper grip, CFexpress support, full-size HDMI and stronger professional video workflows. Buyers focused primarily on action should compare it with the stacked-sensor X-H2S, while photographers who prefer traditional controls may still favour the X-T5.",
    relationships: {
      alternatives: [
        {
          productId:
            "fujifilm-x-t5",

          reason:
            "Shares the same 40.2-megapixel sensor in a smaller photography-focused body with traditional controls, although it lacks the X-H2's professional video workflow.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-x-h2s",

          reason:
            "The stacked-sensor Fujifilm alternative built for professional sport, wildlife and fast action, sacrificing resolution for speed.",

          confidence:
            0.99,
        },

        {
          productId:
            "sony-a6700",

          reason:
            "A compact APS-C hybrid alternative with excellent autofocus and strong video performance, although it offers lower resolution and fewer professional video connections.",

          confidence:
            0.97,
        },

        {
          productId:
            "canon-eos-r7",

          reason:
            "A fast APS-C alternative with excellent autofocus and wildlife performance, although the Fujifilm provides significantly higher resolution and stronger video features.",

          confidence:
            0.97,
        },
      ],

      upgrades: [
        {
          productId:
            "fujifilm-gfx100-ii",

          reason:
            "The natural upgrade for photographers needing substantially higher resolution and medium-format image quality.",

          confidence:
            0.91,
        },
      ],

      accessories: [
        {
          productId:
            "fujifilm-np-w235-battery",

          reason:
            "The X-H2 uses the NP-W235 battery, and spare genuine batteries are recommended for professional photography and video.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-16-55mm-f2-8-r-lm-wr",

          reason:
            "A professional standard zoom capable of resolving the 40.2-megapixel sensor while covering weddings, events, travel and commercial work.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-xf-50-140mm-f2-8-r-lm-ois-wr",

          reason:
            "A professional telephoto zoom well suited to portrait, wedding, indoor sport and event photography.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-fan-001",

          reason:
            "The optional cooling fan extends recording times during demanding professional video production.",

          confidence:
            0.96,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "fujifilm-np-w235-battery",

          reason:
            "The Fujifilm X-H2 uses the Fujifilm NP-W235 rechargeable battery.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-16-55mm-f2-8-r-lm-wr",

          reason:
            "A professional Fujifilm X-mount zoom fully compatible with the X-H2.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-50-140mm-f2-8-r-lm-ois-wr",

          reason:
            "A professional Fujifilm X-mount telephoto zoom fully compatible with the X-H2.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.99,

    sources: [
      "Fujifilm X-H2 official product information",
      "Fujifilm X-H2 official specifications",
      "Fujifilm X-H2 owner manual",
      "Fujifilm X-H2 autofocus and video documentation",
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
          40.2,

        type:
          "X-Trans CMOS 5 HR",

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
          "AI-assisted subject detection recognises people, animals, birds, aircraft, trains, cars, motorcycles and bicycles. Tracking performance is excellent for general photography, although the stacked X-H2S remains the stronger option for elite action.",
      },

      video: {
        rating:
          10,

        maximumResolution:
          "8K",

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
          "Internal 8K recording, Apple ProRes, F-Log2, CFexpress recording, optional cooling fan support and full-size HDMI make the X-H2 one of Fujifilm's strongest professional hybrid cameras.",
      },

      stabilisation: {
        ibis:
          true,

        stabilisedLensSupport:
          true,

        notes:
          "Five-axis in-body image stabilisation provides up to seven stops of compensation with compatible lenses.",
      },

      battery: {
        shots:
          680,

        model:
          "NP-W235",

        removable:
          true,

        usbCharging:
          true,

        usbPower:
          true,
      },

      body: {
        weightGrams:
          660,

        viewfinder:
          true,

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
          6,

        travelScore:
          8,

        familyScore:
          8,

        streetScore:
          7,

        portraitScore:
          10,

        landscapeScore:
          10,

        wildlifeScore:
          8,

        sportsScore:
          8,

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