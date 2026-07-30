import type {
  PanasonicCameraKnowledge,
} from "./types";

export const PANASONIC_CAMERAS: PanasonicCameraKnowledge[] = [
  {
    id: "panasonic-lumix-s5-ii",
    name: "Panasonic Lumix S5 II",
    productType: "camera",
    slug: "panasonic-lumix-s5-ii",

    brand: "Panasonic",
    family: "Lumix S",
    aliases: [
      "Panasonic S5 II",
      "Lumix S5 II",
      "Panasonic S5II",
      "Lumix S5II",
      "S5 II",
      "S5II",
      "DC-S5M2",
    ],

    category: "Camera",
    releaseYear: 2023,
    generation: 2,
    tier: "Enthusiast",

    summary:
      "A versatile full-frame hybrid camera combining phase-detection autofocus, strong in-body stabilisation and advanced video tools at a competitive price.",

    bestFor: [
      "Hybrid photo and video work",
      "Wedding photography",
      "Content creation",
      "Independent filmmaking",
    ],

    strengths: [
      "Reliable phase-detection autofocus",
      "Strong in-body stabilisation",
      "Advanced video recording options",
      "Good image quality",
      "Strong value for a full-frame hybrid",
    ],

    limitations: [
      "Continuous burst speeds trail some sports-focused rivals",
      "Autofocus subject recognition is not class-leading",
      "Large lenses can reduce the system's portability",
    ],

    cameraType: "Mirrorless",
    sensorFormat: "Full-frame",
    megapixels: 24.2,
    lensMount: "Leica L",
    inBodyStabilisation: true,
    headlineVideo: "6K open-gate video",
    autofocusSystem:
      "Hybrid phase-detection and contrast-detection autofocus",
    burstRate: "Up to 30fps electronic shutter",
    shutterType: "Mechanical and electronic",
    viewfinder: "3.68-million-dot electronic viewfinder",
    screen: "3-inch fully articulating touchscreen",
    storageMedia: ["Dual UHS-II SD cards"],
    connectivity: [
      "Wi-Fi",
      "Bluetooth",
      "USB-C",
      "Full-size HDMI",
    ],
    battery: "DMW-BLK22",
    weightGrams: 740,
    weatherSealing: true,
    launchPriceGBP: 1999,
  },

  {
    id: "panasonic-lumix-s5-iix",
    name: "Panasonic Lumix S5 IIX",
    productType: "camera",
    slug: "panasonic-lumix-s5-iix",

    brand: "Panasonic",
    family: "Lumix S",
    aliases: [
      "Panasonic S5 IIX",
      "Lumix S5 IIX",
      "Panasonic S5IIX",
      "Lumix S5IIX",
      "S5 IIX",
      "S5IIX",
      "DC-S5M2X",
    ],

    category: "Camera",
    releaseYear: 2023,
    generation: 2,
    tier: "Professional",

    summary:
      "A video-focused version of the S5 II offering enhanced recording formats, external SSD support and professional streaming capabilities.",

    bestFor: [
      "Professional video",
      "Independent filmmaking",
      "Live streaming",
      "Hybrid content production",
    ],

    strengths: [
      "Internal ProRes recording",
      "External USB SSD recording",
      "Advanced streaming support",
      "Strong in-body stabilisation",
      "Reliable phase-detection autofocus",
    ],

    limitations: [
      "Costs more than the standard S5 II",
      "Many advantages primarily benefit video users",
      "Not designed as a specialist high-speed sports camera",
    ],

    cameraType: "Mirrorless",
    sensorFormat: "Full-frame",
    megapixels: 24.2,
    lensMount: "Leica L",
    inBodyStabilisation: true,
    headlineVideo: "6K open-gate and ProRes video",
    autofocusSystem:
      "Hybrid phase-detection and contrast-detection autofocus",
    burstRate: "Up to 30fps electronic shutter",
    shutterType: "Mechanical and electronic",
    viewfinder: "3.68-million-dot electronic viewfinder",
    screen: "3-inch fully articulating touchscreen",
    storageMedia: [
      "Dual UHS-II SD cards",
      "External USB SSD",
    ],
    connectivity: [
      "Wi-Fi",
      "Bluetooth",
      "USB-C",
      "Full-size HDMI",
      "Ethernet through USB adapter",
    ],
    battery: "DMW-BLK22",
    weightGrams: 740,
    weatherSealing: true,
    launchPriceGBP: 2299,
  },

  {
    id: "panasonic-lumix-gh7",
    name: "Panasonic Lumix GH7",
    productType: "camera",
    slug: "panasonic-lumix-gh7",

    brand: "Panasonic",
    family: "Lumix GH",
    aliases: [
      "Panasonic GH7",
      "Lumix GH7",
      "GH7",
      "DC-GH7",
    ],

    category: "Camera",
    releaseYear: 2024,
    generation: 7,
    tier: "Professional",

    summary:
      "A professional Micro Four Thirds hybrid camera designed around advanced video production, fast autofocus and strong stabilisation.",

    bestFor: [
      "Professional video",
      "Documentary filmmaking",
      "Run-and-gun production",
      "Hybrid content creation",
    ],

    strengths: [
      "Advanced internal video recording",
      "Phase-detection autofocus",
      "Strong in-body stabilisation",
      "Internal ProRes RAW recording",
      "Compact lens ecosystem",
    ],

    limitations: [
      "Smaller sensor than full-frame alternatives",
      "Large body for a Micro Four Thirds camera",
      "High-ISO image quality trails modern full-frame cameras",
    ],

    cameraType: "Mirrorless",
    sensorFormat: "Micro Four Thirds",
    megapixels: 25.2,
    lensMount: "Micro Four Thirds",
    inBodyStabilisation: true,
    headlineVideo: "5.7K video and internal ProRes RAW",
    autofocusSystem:
      "Hybrid phase-detection and contrast-detection autofocus",
    burstRate: "Up to 75fps electronic shutter",
    shutterType: "Mechanical and electronic",
    viewfinder: "3.68-million-dot electronic viewfinder",
    screen: "3-inch tilt-and-articulating touchscreen",
    storageMedia: [
      "CFexpress Type B",
      "UHS-II SD",
    ],
    connectivity: [
      "Wi-Fi",
      "Bluetooth",
      "USB-C",
      "Full-size HDMI",
    ],
    battery: "DMW-BLK22",
    weightGrams: 805,
    weatherSealing: true,
    launchPriceGBP: 1999,
  },

  {
    id: "panasonic-lumix-gh6",
    name: "Panasonic Lumix GH6",
    productType: "camera",
    slug: "panasonic-lumix-gh6",

    brand: "Panasonic",
    family: "Lumix GH",
    aliases: [
      "Panasonic GH6",
      "Lumix GH6",
      "GH6",
      "DC-GH6",
    ],

    category: "Camera",
    releaseYear: 2022,
    generation: 6,
    tier: "Professional",

    summary:
      "A video-led Micro Four Thirds camera with extensive recording formats, active cooling and strong stabilisation for serious filmmaking.",

    bestFor: [
      "Independent filmmaking",
      "Studio video production",
      "Documentary work",
      "Manual-focus video production",
    ],

    strengths: [
      "Extensive professional video formats",
      "Active cooling for long recordings",
      "Strong in-body stabilisation",
      "Internal Apple ProRes recording",
      "Good handling and physical controls",
    ],

    limitations: [
      "Contrast-detection autofocus is less dependable than phase detection",
      "Large and heavy for Micro Four Thirds",
      "High-ISO performance trails full-frame rivals",
    ],

    cameraType: "Mirrorless",
    sensorFormat: "Micro Four Thirds",
    megapixels: 25.2,
    lensMount: "Micro Four Thirds",
    inBodyStabilisation: true,
    headlineVideo: "5.7K video",
    autofocusSystem:
      "Depth From Defocus contrast-detection autofocus",
    burstRate: "Up to 75fps electronic shutter",
    shutterType: "Mechanical and electronic",
    viewfinder: "3.68-million-dot electronic viewfinder",
    screen: "3-inch tilt-and-articulating touchscreen",
    storageMedia: [
      "CFexpress Type B",
      "UHS-II SD",
    ],
    connectivity: [
      "Wi-Fi",
      "Bluetooth",
      "USB-C",
      "Full-size HDMI",
    ],
    battery: "DMW-BLK22",
    weightGrams: 823,
    weatherSealing: true,
    launchPriceGBP: 1999,
  },

  {
    id: "panasonic-lumix-g9-ii",
    name: "Panasonic Lumix G9 II",
    productType: "camera",
    slug: "panasonic-lumix-g9-ii",

    brand: "Panasonic",
    family: "Lumix G",
    aliases: [
      "Panasonic G9 II",
      "Lumix G9 II",
      "Panasonic G9II",
      "Lumix G9II",
      "G9 II",
      "G9II",
      "DC-G9M2",
    ],

    category: "Camera",
    releaseYear: 2023,
    generation: 2,
    tier: "Enthusiast",

    summary:
      "A fast Micro Four Thirds hybrid camera combining phase-detection autofocus, strong stabilisation and high burst speeds for wildlife and action.",

    bestFor: [
      "Wildlife photography",
      "Sports photography",
      "Travel photography",
      "Hybrid photo and video work",
    ],

    strengths: [
      "Fast burst shooting",
      "Reliable phase-detection autofocus",
      "Strong in-body stabilisation",
      "Compact telephoto lens options",
      "Advanced video features",
    ],

    limitations: [
      "Uses a relatively large body for Micro Four Thirds",
      "High-ISO performance trails full-frame rivals",
      "No built-in battery grip support",
    ],

    cameraType: "Mirrorless",
    sensorFormat: "Micro Four Thirds",
    megapixels: 25.2,
    lensMount: "Micro Four Thirds",
    inBodyStabilisation: true,
    headlineVideo: "5.8K open-gate video",
    autofocusSystem:
      "Hybrid phase-detection and contrast-detection autofocus",
    burstRate: "Up to 60fps electronic shutter",
    shutterType: "Mechanical and electronic",
    viewfinder: "3.68-million-dot electronic viewfinder",
    screen: "3-inch fully articulating touchscreen",
    storageMedia: ["Dual UHS-II SD cards"],
    connectivity: [
      "Wi-Fi",
      "Bluetooth",
      "USB-C",
      "Full-size HDMI",
    ],
    battery: "DMW-BLK22",
    weightGrams: 658,
    weatherSealing: true,
    launchPriceGBP: 1699,
  },
];