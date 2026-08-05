import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const fujifilmXH2S =
  createCameraProduct({
    brand:
      "Fujifilm",

    model:
      "X-H2S",

    fullName:
      "Fujifilm X-H2S",

    description:
      "Fujifilm's flagship speed-focused APS-C mirrorless camera, combining a stacked 26.1-megapixel X-Trans CMOS 5 HS sensor with exceptional autofocus, blackout-free high-speed shooting, advanced subject recognition and professional internal video. It is designed for wildlife, birds, sport, action and demanding hybrid creators who prioritise speed over maximum resolution.",

    status:
      "CURRENT",

    releaseYear:
      2022,

    identifiers: {
      sku:
        "FF220003",
    },

    specifications: {
      sensorFormat:
        "APS-C",

      megapixels:
        26.1,

      lensMount:
        "Fujifilm X",

      maximumBurstRateFps:
        40,

      maximumVideoResolution:
        "6.2K",

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
      "The stacked X-Trans CMOS 5 HS sensor provides dramatically faster readout than conventional APS-C sensors.",

      "Rolling-shutter distortion is greatly reduced compared with the X-T5 and X-H2.",

      "Electronic shooting reaches up to 40 frames per second with continuous autofocus.",

      "The stacked sensor supports blackout-free high-speed shooting for fast-moving subjects.",

      "The camera is exceptionally well suited to birds in flight, wildlife and professional sport.",

      "The X-Processor 5 delivers Fujifilm's fastest autofocus performance.",

      "AI subject detection recognises people, birds, animals, aircraft, trains, motorcycles, bicycles and cars.",

      "Bird recognition performs particularly well for wildlife photographers.",

      "The deeper professional grip balances comfortably with long telephoto lenses.",

      "Seven-stop in-body image stabilisation improves handheld shooting.",

      "Dual card slots combine CFexpress Type B and UHS-II SD media.",

      "CFexpress enables sustained RAW bursts and demanding professional video recording.",

      "Internal Apple ProRes recording supports professional editing workflows.",

      "Internal 6.2K recording provides excellent hybrid-video capability.",

      "F-Log2 captures extensive dynamic range for colour grading.",

      "Full-size HDMI provides a durable connection for monitors and recorders.",

      "Microphone and headphone sockets support professional audio workflows.",

      "The optional cooling fan supports long recording sessions.",

      "Weather sealing allows dependable outdoor operation.",

      "The camera shares the NP-W235 battery with other professional Fujifilm bodies.",

      "The body combines professional stills and video performance in a relatively compact APS-C system.",

      "Fast readout makes silent electronic shooting practical for many professional situations.",

      "The autofocus system is Fujifilm's strongest option for unpredictable subjects.",

      "The X-H2S is one of the world's fastest APS-C mirrorless cameras.",

      "Its combination of speed, autofocus and professional handling makes it Fujifilm's flagship action camera.",
    ],

    weaknesses: [
      "The 26.1-megapixel sensor offers significantly less cropping flexibility than the 40.2-megapixel X-H2 and X-T5.",

      "Landscape photographers may prefer the higher-resolution X-H2.",

      "Large prints contain less fine detail than those from Fujifilm's 40MP cameras.",

      "The premium price reflects its specialist stacked-sensor design.",

      "Buyers who do not photograph action may never benefit from the extra speed.",

      "The complete system becomes expensive with premium telephoto lenses and CFexpress media.",

      "Professional wildlife bursts generate enormous numbers of images requiring careful editing.",

      "Battery life decreases during sustained bursts and intensive video recording.",

      "The body is larger than Fujifilm's photography-focused X-T series.",

      "APS-C still provides less total sensor area than full-frame systems.",

      "The camera prioritises speed over outright image resolution.",

      "Many photographers will achieve better value from the X-T5 or X-H2.",
    ],

    bestFor: [
      "Professional wildlife photographers.",
      "Bird photographers.",
      "Sports photographers.",
      "Motorsport photographers.",
      "Action photographers.",
      "Professional documentary work.",
      "Hybrid creators needing fast autofocus.",
      "Outdoor adventure photography.",
      "News photography.",
      "Experienced Fujifilm users needing maximum speed.",
    ],

    avoidIf: [
      "You mainly photograph landscapes.",
      "You primarily shoot architecture.",
      "You want maximum APS-C resolution.",
      "You rarely photograph moving subjects.",
      "You do not need stacked-sensor performance.",
      "The Fujifilm X-T5 already satisfies your needs.",
      "The Fujifilm X-H2 provides better value for your workflow.",
      "You have a limited equipment budget.",
      "You mainly produce large fine-art prints.",
      "You require a full-frame sensor.",
    ],

    buyingAdvice:
      "The Fujifilm X-H2S is the best Fujifilm camera for wildlife, birds and sport. Its stacked sensor, 40fps burst shooting and advanced autofocus place it in a different class from the X-T5 and X-H2 when speed matters. If your priority is landscapes, studio photography or maximum detail, the X-H2 is usually the better choice. If you need to capture fast action where timing is everything, the X-H2S earns its premium.",
    relationships: {
      alternatives: [
        {
          productId:
            "fujifilm-x-h2",

          reason:
            "A higher-resolution Fujifilm alternative with a 40.2-megapixel sensor and internal 8K recording, better suited to landscapes, studio work and photographers prioritising detail over speed.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-x-t5",

          reason:
            "A smaller photography-focused alternative with 40.2-megapixel resolution, traditional controls and excellent portability, although it cannot match the X-H2S for sensor readout or sustained action.",

          confidence:
            0.98,
        },

        {
          productId:
            "sony-a6700",

          reason:
            "A smaller APS-C hybrid alternative with excellent autofocus and strong video features, although it lacks the X-H2S model's stacked sensor, dual card slots and 40fps shooting.",

          confidence:
            0.98,
        },

        {
          productId:
            "canon-eos-r7",

          reason:
            "A high-resolution APS-C alternative with strong wildlife autofocus and in-body stabilisation, although its conventional sensor cannot match the X-H2S for electronic readout speed.",

          confidence:
            0.98,
        },

        {
          productId:
            "nikon-z6-iii",

          reason:
            "A full-frame hybrid alternative with excellent autofocus, internal 6K RAW video and strong low-light performance, although it offers slower full-resolution burst shooting.",

          confidence:
            0.96,
        },
      ],

      upgrades: [
        {
          productId:
            "fujifilm-gfx100-ii",

          reason:
            "A major medium-format upgrade for professionals prioritising maximum resolution, tonal flexibility and commercial image quality rather than compact action performance.",

          confidence:
            0.84,
        },
      ],

      accessories: [
        {
          productId:
            "fujifilm-np-w235-battery",

          reason:
            "The X-H2S uses the NP-W235 battery, and genuine spares are advisable for wildlife, sport, events and professional video production.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-50-140mm-f2-8-r-lm-ois-wr",

          reason:
            "A professional telephoto zoom suitable for indoor sport, events, portraits and action photography.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-xf-150-600mm-f5-6-8-r-lm-ois-wr",

          reason:
            "A long stabilised telephoto zoom that pairs naturally with the X-H2S for birds, wildlife, aviation and outdoor sport.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-fan-001",

          reason:
            "The optional cooling fan can extend recording endurance during demanding high-resolution and high-frame-rate video production.",

          confidence:
            0.97,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "fujifilm-np-w235-battery",

          reason:
            "The Fujifilm X-H2S uses the Fujifilm NP-W235 rechargeable battery.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-50-140mm-f2-8-r-lm-ois-wr",

          reason:
            "A professional Fujifilm X-mount telephoto zoom directly compatible with the X-H2S.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-xf-150-600mm-f5-6-8-r-lm-ois-wr",

          reason:
            "A Fujifilm X-mount super-telephoto zoom directly compatible with the X-H2S.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.99,

    sources: [
      "Fujifilm X-H2S official product information",
      "Fujifilm X-H2S official specifications",
      "Fujifilm X-H2S owner documentation",
      "Fujifilm X-H2S autofocus and video documentation",
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
          "Stacked X-Trans CMOS 5 HS",

        cropFactor:
          1.5,
      },

      mount:
        "Fujifilm X",

      autofocus: {
        rating:
          10,

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
          "The stacked sensor and X-Processor 5 provide Fujifilm's strongest action autofocus generation. Subject detection supports people, animals, birds, cars, motorcycles, bicycles, aeroplanes and trains, making the camera particularly capable for wildlife, motorsport and fast-moving subjects.",
      },

      video: {
        rating:
          10,

        maximumResolution:
          "6.2K",

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
          "The X-H2S records open-gate 6.2K video internally at up to 30p with 4:2:2 10-bit colour and records 4K at up to 120p. Apple ProRes, F-Log2, external RAW output, full-size HDMI and optional cooling-fan support make it a highly capable professional hybrid-video camera.",
      },

      stabilisation: {
        ibis:
          true,

        stabilisedLensSupport:
          true,

        notes:
          "Five-axis sensor-shift image stabilisation provides a rated benefit of up to seven stops and can work alongside compatible optically stabilised Fujifilm X-mount lenses.",
      },

      battery: {
        shots:
          580,

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
          40,

        silentBurstRateFps:
          40,
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
          7,

        familyScore:
          9,

        streetScore:
          7,

        portraitScore:
          9,

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
          8,

        futureProofScore:
          10,
      },

      weatherSealed:
        true,
    },
  });