import {
  createCameraProduct,
} from "@/knowledge/products/blueprints";

export const fujifilmX100VI =
  createCameraProduct({
    brand:
      "Fujifilm",

    model:
      "X100VI",

    fullName:
      "Fujifilm X100VI",

    description:
      "A premium fixed-lens compact camera combining a high-resolution 40.2-megapixel APS-C X-Trans CMOS 5 HR sensor, a built-in 23mm F2 lens, six-stop in-body image stabilisation and Fujifilm's distinctive hybrid optical and electronic viewfinder. It is designed primarily for travel, street, documentary, family and everyday photography where portability, tactile controls and excellent straight-out-of-camera colour matter more than interchangeable lenses.",

    productType:
      "COMPACT",

    status:
      "CURRENT",

    releaseYear:
      2024,

    identifiers: {
      sku:
        "FF240002",
    },

    specifications: {
      sensorFormat:
        "APS-C",

      megapixels:
        40.2,

      lensMount:
        "Fixed Fujinon 23mm F2",

      maximumBurstRateFps:
        20,

      maximumVideoResolution:
        "6.2K",

      ibis:
        true,

      /*
       * Weather resistance requires
       * Fujifilm's AR-X100 adapter ring
       * and a compatible protective filter.
       */
      weatherSealed:
        false,

      batteryModel:
        "NP-W126S",

      bodyWeightGrams:
        521,
    },

    strengths: [
      "The 40.2-megapixel X-Trans CMOS 5 HR sensor provides exceptional detail for a compact camera.",

      "Its high resolution allows useful cropping while preserving enough detail for prints and publication.",

      "The fixed 23mm F2 lens provides a classic 35mm-equivalent field of view suited to street, travel, documentary and everyday photography.",

      "The built-in lens eliminates the need to carry, change or purchase separate lenses.",

      "The compact fixed-lens design encourages photographers to concentrate on timing, composition and subject interaction.",

      "The F2 maximum aperture supports low-light photography and moderate background separation.",

      "The lens remains compact enough for the camera to fit comfortably in a small shoulder bag or coat pocket.",

      "Five-axis sensor-shift stabilisation provides a rated benefit of up to six stops.",

      "In-body stabilisation makes handheld low-light photography considerably easier than on the X100V.",

      "The hybrid viewfinder can switch between an optical view and a detailed electronic display.",

      "The optical viewfinder provides an uninterrupted view beyond the captured frame, which can be valuable for anticipating street and documentary moments.",

      "The electronic viewfinder provides accurate exposure, colour, white-balance and depth-of-field preview.",

      "Electronic Rangefinder mode can place a small electronic preview inside the optical viewfinder.",

      "Traditional shutter-speed, aperture and exposure-compensation controls create a tactile photography-focused experience.",

      "The combined ISO and shutter-speed dial keeps important exposure settings visible without entering menus.",

      "The two-way tilting touchscreen supports discreet waist-level photography while remaining aligned behind the camera.",

      "The screen can also tilt for high-angle framing without extending beside the body.",

      "Human face and eye detection support portraits, family photography and documentary work.",

      "Subject-recognition autofocus can identify animals, birds, cars, motorcycles, bicycles, aeroplanes and trains.",

      "The X-Processor 5 provides substantially newer autofocus processing than the previous X100V generation.",

      "Fujifilm Film Simulations provide distinctive colour and monochrome rendering directly from the camera.",

      "Reala Ace expands the available straight-out-of-camera colour options.",

      "Film Simulation recipes allow photographers to create and save personalised JPEG looks.",

      "The camera can produce attractive JPEG and HEIF files that require little or no editing.",

      "The built-in four-stop neutral-density filter allows wider apertures or slower shutter speeds in bright conditions.",

      "The leaf shutter enables very quiet mechanical operation.",

      "Leaf-shutter flash synchronisation works at substantially faster shutter speeds than conventional focal-plane shutters.",

      "The camera supports an electronic shutter speed as fast as 1/180000 second.",

      "Electronic shooting reaches approximately 20 frames per second with a 1.29-times crop.",

      "Full-frame-area electronic shooting is available at lower burst rates.",

      "The Digital Teleconverter provides 50mm-equivalent and 70mm-equivalent framing options by cropping the high-resolution sensor.",

      "The 50mm-equivalent crop remains useful for portraits and tighter documentary framing.",

      "The 70mm-equivalent crop offers additional reach when changing physical position is impossible.",

      "The camera records internal 6.2K video at up to 30 frames per second.",

      "Internal 10-bit recording provides greater colour flexibility than conventional eight-bit footage.",

      "F-Log and F-Log2 support more advanced colour-grading workflows.",

      "4K recording at up to 60 frames per second supports smoother movement and slow-motion editing.",

      "The built-in lens and stabilisation create a self-contained travel-video package.",

      "USB-C charging makes it easier to recharge while travelling.",

      "Wi-Fi and Bluetooth support smartphone transfer and remote control.",

      "The compact body is far less conspicuous than a large interchangeable-lens professional camera.",

      "Its quiet shutter and understated appearance are particularly valuable for candid photography.",

      "The aluminium top and bottom plates contribute to a premium physical feel.",

      "The camera is available in finishes that retain the classic rangefinder-inspired X100 appearance.",

      "Its fixed-lens simplicity can make it more enjoyable to carry every day than a larger camera system.",

      "The X100VI combines portability, stabilisation, high resolution and tactile controls in a uniquely cohesive package.",
    ],

    weaknesses: [
      "The fixed lens cannot be removed or replaced.",

      "Buyers requiring ultra-wide, telephoto, macro or specialist lenses should choose an interchangeable-lens camera instead.",

      "The 35mm-equivalent field of view does not suit every photographer or subject.",

      "Some portrait photographers may prefer a longer focal length for tighter head-and-shoulder framing.",

      "Wildlife, bird and sports photography are heavily limited by the fixed lens.",

      "The Digital Teleconverter crops the sensor rather than providing genuine optical zoom.",

      "Digital 50mm-equivalent and 70mm-equivalent modes reduce the available pixel count.",

      "The 40.2-megapixel files require more storage and editing performance than those from the X100V.",

      "High pixel density makes camera shake and focusing errors more visible.",

      "The lens is capable, but its compact design cannot match every premium interchangeable Fujifilm prime across the whole frame and focusing range.",

      "Close-range photography at F2 can produce softer results than shooting from farther away or stopping down.",

      "The sensor is not stacked, so electronic-shutter rolling distortion can appear with fast movement.",

      "Electronic-shutter banding can occur under some artificial lighting.",

      "The headline 20fps burst rate uses a 1.29-times crop.",

      "The camera is not designed for prolonged professional action bursts.",

      "The small NP-W126S battery provides more modest endurance than the NP-W235 used by Fujifilm's larger bodies.",

      "Carrying at least one spare battery is sensible for long days or frequent video recording.",

      "The single memory-card slot does not provide immediate in-camera backup.",

      "The slot supports UHS-I rather than taking full advantage of faster UHS-II performance.",

      "The memory card is located in the battery compartment, which can be inconvenient when using some tripod plates.",

      "The body is not fully weather resistant without additional accessories.",

      "Fujifilm requires the AR-X100 adapter ring and a compatible protective filter to complete its weather-resistant configuration.",

      "Adding the adapter ring and filter slightly increases the camera's size and total cost.",

      "The lens protrudes permanently and does not retract into the body.",

      "The camera is compact but is not genuinely pocketable in the way a smaller one-inch or smartphone camera may be.",

      "At approximately 521 grams, it is noticeably heavier than the X100V.",

      "The grip is shallow compared with conventional mirrorless bodies.",

      "The camera can feel less secure during prolonged one-handed use.",

      "The hybrid viewfinder requires time to understand and configure effectively.",

      "Parallax affects optical-viewfinder framing at close distances, although the camera provides correction aids.",

      "The optical viewfinder cannot show an exact representation of exposure or depth of field.",

      "The rear screen does not face forwards for conventional vlogging or self-recording.",

      "There is no fully articulating display.",

      "The body is less video-friendly than the Fujifilm X-S20.",

      "There is no dedicated headphone socket.",

      "The camera uses a small HDMI connection rather than full-size HDMI.",

      "It does not support internal ProRes or RAW video recording.",

      "Long-form professional video users will be better served by Fujifilm's X-H series.",

      "There is no built-in flash with substantial output for larger rooms or professional lighting.",

      "Its premium pricing is high for a camera with one permanently attached lens.",

      "Strong demand can result in limited availability and inflated resale pricing.",

      "The camera offers poor value when purchased substantially above its normal retail price.",

      "A Fujifilm X-T5 with a compact prime provides interchangeable lenses, dual cards and stronger system flexibility.",

      "A Fujifilm X-M5 provides a smaller and less expensive creator-focused route into Fujifilm photography.",

      "A Fujifilm X-S20 is more versatile for buyers who need interchangeable lenses, IBIS and a forward-facing screen.",

      "The X100VI rewards photographers who specifically enjoy its focal length and shooting philosophy rather than buyers simply following its popularity.",
    ],

    bestFor: [
      "Street photographers who value discretion, quiet operation and a classic 35mm-equivalent perspective.",

      "Travel photographers who want excellent image quality without carrying multiple lenses.",

      "Documentary photographers who prefer an optical or electronic hybrid viewfinder.",

      "Everyday photographers who want one premium camera that is easy to carry regularly.",

      "Family photographers capturing holidays, children and daily life.",

      "Environmental portrait photographers who include context around their subjects.",

      "Photojournalism-style photographers working close to people and events.",

      "Wedding photographers wanting a discreet secondary camera for candid moments.",

      "Event photographers using leaf-shutter flash synchronisation creatively.",

      "Photographers who enjoy traditional shutter-speed and aperture controls.",

      "Fujifilm users who value Film Simulations and JPEG recipes.",

      "Photographers who prefer producing finished images in-camera rather than editing every RAW file.",

      "Experienced photographers who find creative freedom in working with one focal length.",

      "Photography students learning to move physically and compose deliberately.",

      "Content creators producing photography-led travel and lifestyle material.",

      "Collectors and enthusiasts who appreciate the X100 series design and hybrid viewfinder.",

      "X100V owners who specifically need stabilisation, higher resolution and newer autofocus.",

      "Buyers who want a smaller alternative to carrying a full interchangeable-lens system.",

      "Photographers who need a quiet camera for ceremonies, theatres and candid environments.",

      "People who will genuinely carry the camera more often because of its compact self-contained design.",
    ],

    avoidIf: [
      "You need interchangeable lenses.",

      "You frequently photograph wildlife, birds or distant sport.",

      "You require a true optical zoom.",

      "You dislike the 35mm-equivalent field of view.",

      "You primarily shoot tightly framed headshots.",

      "You need an ultra-wide lens for interiors, architecture or dramatic landscapes.",

      "You require macro capability beyond the fixed lens's close-focus performance.",

      "You need dual memory-card slots.",

      "You require complete weather resistance without purchasing extra accessories.",

      "You need a fully articulating screen for self-recording.",

      "You primarily produce professional long-form video.",

      "You require full-size HDMI, internal ProRes or internal RAW video.",

      "You need the larger NP-W235 battery used by Fujifilm's higher-tier bodies.",

      "You regularly shoot long high-speed action bursts.",

      "You need a stacked sensor with minimal rolling shutter.",

      "You want the best value based purely on specifications.",

      "You would be frustrated by being unable to change focal length.",

      "A Fujifilm X-T5 or X-S20 with interchangeable lenses would better match your subjects.",

      "You are considering paying a large premium above the proper retail price.",

      "You are attracted mainly by online popularity rather than the camera's fixed-lens shooting experience.",
    ],

    buyingAdvice:
      "The Fujifilm X100VI is a superb premium compact for photographers who genuinely enjoy a fixed 35mm-equivalent perspective. Its 40.2-megapixel sensor, six-stop stabilisation, hybrid viewfinder, quiet leaf shutter, built-in neutral-density filter and Film Simulations make it especially compelling for street, travel, documentary and everyday photography. Its greatest strength is also its greatest limitation: the 23mm F2 lens is permanently attached. Buyers should be certain that this focal length suits their photography before paying the premium. Compare it with the Fujifilm X-T5 and a compact prime if interchangeable lenses or dual card slots matter, and with the X-M5 or X-S20 if video, flexibility or value are stronger priorities. Avoid paying inflated resale prices, budget for a spare NP-W126S battery, and remember that the adapter ring and protective filter are required to complete the weather-resistant setup.",
          relationships: {
      alternatives: [
        {
          productId:
            "fujifilm-x-t5",

          reason:
            "A high-resolution interchangeable-lens Fujifilm alternative with the same 40.2-megapixel sensor, in-body stabilisation, dual card slots and much greater lens flexibility.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-x-s20",

          reason:
            "A more versatile hybrid alternative with interchangeable lenses, a deeper grip, stronger battery life and a fully articulating screen for video and self-recording.",

          confidence:
            0.97,
        },

        {
          productId:
            "fujifilm-x-m5",

          reason:
            "A smaller and less expensive interchangeable-lens Fujifilm option aimed at travel and content creation, although it lacks a viewfinder and in-body stabilisation.",

          confidence:
            0.95,
        },

        {
          productId:
            "sony-a7c-ii",

          reason:
            "A compact full-frame interchangeable-lens alternative with strong autofocus, stabilisation and broader focal-length flexibility, although the complete system is larger.",

          confidence:
            0.94,
        },

        {
          productId:
            "ricoh-gr-iii-x",

          reason:
            "A substantially smaller fixed-lens APS-C alternative with a similar normal-wide perspective, although it lacks the Fujifilm hybrid viewfinder and traditional controls.",

          confidence:
            0.93,
        },
      ],

      upgrades: [
        {
          productId:
            "fujifilm-x-t5",

          reason:
            "The natural system upgrade for buyers who want similar high-resolution Fujifilm image quality with interchangeable lenses, dual card slots and greater photographic flexibility.",

          confidence:
            0.98,
        },

        {
          productId:
            "fujifilm-x-h2",

          reason:
            "A professional high-resolution upgrade offering interchangeable lenses, deeper handling, CFexpress support, internal 8K recording and stronger production connections.",

          confidence:
            0.95,
        },

        {
          productId:
            "fujifilm-gfx100-ii",

          reason:
            "A major professional upgrade for photographers prioritising medium-format resolution, tonal flexibility and premium commercial image quality.",

          confidence:
            0.82,
        },
      ],

      accessories: [
        {
          productId:
            "fujifilm-np-w126s-battery",

          reason:
            "The X100VI uses the NP-W126S battery, and carrying at least one genuine spare is advisable for travel and full-day photography.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-ar-x100-adapter-ring",

          reason:
            "The AR-X100 adapter ring is required with a compatible protective filter to complete the camera's weather-resistant configuration.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-wcl-x100-ii",

          reason:
            "A wide conversion lens that changes the built-in lens to approximately a 28mm-equivalent field of view for travel, interiors and environmental photography.",

          confidence:
            0.99,
        },

        {
          productId:
            "fujifilm-tcl-x100-ii",

          reason:
            "A tele conversion lens that changes the built-in lens to approximately a 50mm-equivalent field of view for portraits and tighter everyday framing.",

          confidence:
            0.99,
        },
      ],

      compatibleProducts: [
        {
          productId:
            "fujifilm-np-w126s-battery",

          reason:
            "The Fujifilm X100VI uses the Fujifilm NP-W126S rechargeable battery.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-ar-x100-adapter-ring",

          reason:
            "The Fujifilm AR-X100 adapter ring is designed for the X100-series lens and enables compatible filters to be attached.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-wcl-x100-ii",

          reason:
            "The Fujifilm WCL-X100 II wide conversion lens is compatible with the X100VI's fixed lens.",

          confidence:
            1,
        },

        {
          productId:
            "fujifilm-tcl-x100-ii",

          reason:
            "The Fujifilm TCL-X100 II tele conversion lens is compatible with the X100VI's fixed lens.",

          confidence:
            1,
        },
      ],
    },

    confidence:
      0.99,

    sources: [
      "Fujifilm X100VI official product information",
      "Fujifilm X100VI official specifications",
      "Fujifilm X100VI owner documentation",
      "Fujifilm X100VI autofocus, stabilisation and video documentation",
      "Fujifilm X100VI weather-resistance accessory information",
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
        "Fixed Fujinon 23mm F2",

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
          "The X-Processor 5 provides human face and eye detection alongside recognition for animals, birds, cars, motorcycles, bicycles, aeroplanes and trains. Autofocus is highly capable for street, travel, portraits and everyday photography, though the fixed lens limits specialist action use.",
      },

      video: {
        rating:
          8,

        maximumResolution:
          "6.2K",

        maximum4KFrameRate:
          60,

        microphoneInput:
          true,

        headphoneOutput:
          false,

        fullyArticulatingScreen:
          false,

        recordingLimitMinutes:
          45,

        logProfiles:
          true,

        notes:
          "The X100VI records 6.2K video up to 30p and 4K up to 60p with internal 10-bit colour support. F-Log and F-Log2 provide grading flexibility, but the fixed lens, tilting screen and compact connections make it better suited to occasional travel and documentary video than professional production.",
      },

      stabilisation: {
        ibis:
          true,

        stabilisedLensSupport:
          false,

        notes:
          "Five-axis sensor-shift stabilisation provides a rated benefit of up to six stops and improves handheld still photography and video with the permanently attached 23mm F2 lens.",
      },

      battery: {
        shots:
          450,

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
          521,

        viewfinder:
          true,

        builtInFlash:
          true,

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
          8,

        travelScore:
          10,

        familyScore:
          9,

        streetScore:
          10,

        portraitScore:
          8,

        landscapeScore:
          8,

        wildlifeScore:
          3,

        sportsScore:
          3,

        videoScore:
          8,

        vloggingScore:
          5,

        valueScore:
          7,

        futureProofScore:
          9,
      },

      weatherSealed:
        false,
    },
  });