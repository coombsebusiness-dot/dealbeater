import type { ProductTestCase } from "../expected";

export const cameraTests: ProductTestCase[] = [
  {
    name: "Sony camera body with SKU",
    input:
      "Sony A7 IV Mirrorless Camera Body Only ILCE-7M4",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "A7 IV",
        sku: "ILCE-7M4",
      },
     
    },
  },
  {
    name: "Sony A7R V body only",
    input:
      "Sony A7R V Full Frame Mirrorless Camera Body Only",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "A7R V",
      },
      specs: {
        sensorSize: "Full Frame",
      },
     
    },
  },
  {
    name: "Sony A7S III video camera",
    input:
      "Sony A7S III Full Frame Mirrorless Camera 4K 120fps",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "A7S III",
      },
      specs: {
        sensorSize: "Full Frame",
        videoResolution: "4K120",
      },
    },
  },
  {
    name: "Sony A6700 APS-C camera",
    input:
      "Sony A6700 APS-C Mirrorless Camera Body Only Black",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "A6700",
      },
      specs: {
        sensorSize: "APS-C",
        colour: "Black",
      },
     
    },
  },
  {
    name: "Sony ZV-E10 II vlog camera",
    input:
      "Sony ZV-E10 II APS-C Vlog Camera Black",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "ZV-E10 II",
      },
      specs: {
        sensorSize: "APS-C",
        colour: "Black",
      },
    },
  },
  {
    name: "Sony FX30 cinema camera",
    input:
      "Sony FX30 APS-C Cinema Camera Body Only",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "FX30",
      },
      specs: {
        sensorSize: "APS-C",
      },
     
    },
  },

  {
    name: "Canon EOS R6 Mark II",
    input:
      "Canon EOS R6 Mark II Full Frame Mirrorless Camera Body Only",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS R6 Mark II",
      },
      specs: {
        sensorSize: "Full Frame",
      },
     
    },
  },
  {
    name: "Canon EOS R5",
    input:
      "Canon EOS R5 Full Frame Mirrorless Camera 45MP 8K",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS R5",
      },
      specs: {
        sensorSize: "Full Frame",
        megapixels: "45MP",
        videoResolution: "8K",
      },
    },
  },
  {
    name: "Canon EOS RP",
    input:
      "Canon EOS RP Full Frame Mirrorless Camera Body Only",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS RP",
      },
      specs: {
        sensorSize: "Full Frame",
      },
     
    },
  },
  {
    name: "Canon EOS 90D DSLR",
    input:
      "Canon EOS 90D DSLR Camera Body Only 32.5MP",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS 90D",
      },
      specs: {
        megapixels: "32.5MP",
      },
    
    },
  },
  {
    name: "Canon camera kit lens",
    input:
      "Canon EOS R10 Mirrorless Camera with 18-45mm Kit Lens",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS R10",
      },
      bundle: {
        isBundle: true,
        items: ["18-45mm Kit Lens"],
      },
    },
  },

  {
    name: "Nikon Z8 camera",
    input:
      "Nikon Z8 Full Frame Mirrorless Camera Body Only",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "Z8",
      },
      specs: {
        sensorSize: "Full Frame",
      },
     
    },
  },
  {
    name: "Nikon Z6 III camera",
    input:
      "Nikon Z6 III Full Frame Mirrorless Camera Body Only",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "Z6 III",
      },
      specs: {
        sensorSize: "Full Frame",
      },
      
    },
  },
  {
    name: "Nikon Zf camera",
    input:
      "Nikon Zf Full Frame Mirrorless Camera Black",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "ZF",
      },
      specs: {
        sensorSize: "Full Frame",
        colour: "Black",
      },
    },
  },
  {
    name: "Nikon Z fc camera",
    input:
      "Nikon Z fc APS-C Mirrorless Camera Silver",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "Z FC",
      },
      specs: {
        sensorSize: "APS-C",
        colour: "Silver",
      },
    },
  },
  {
    name: "Nikon D850 DSLR",
    input:
      "Nikon D850 DSLR Camera Body Only 45.7MP",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "D850",
      },
      specs: {
        megapixels: "45.7MP",
      },
     
    },
  },

  {
    name: "Fujifilm silver camera",
    input:
      "Fujifilm X-T5 APS-C Mirrorless Camera Silver",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      model: {
        base: "X-T5",
      },
      specs: {
        sensorSize: "APS-C",
        colour: "Silver",
      },
    },
  },
  {
    name: "Fujifilm X100VI",
    input:
      "Fujifilm X100VI APS-C Digital Camera Silver 40.2MP",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      model: {
        base: "X100VI",
      },
      specs: {
        sensorSize: "APS-C",
        colour: "Silver",
        megapixels: "40.2MP",
      },
    },
  },
  {
    name: "Fujifilm X-H2S",
    input:
      "Fujifilm X-H2S APS-C Mirrorless Camera Body Only",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      model: {
        base: "X-H2S",
      },
      specs: {
        sensorSize: "APS-C",
      },
     
    },
  },
  {
    name: "Fujifilm X-S20",
    input:
      "Fujifilm X-S20 APS-C Mirrorless Camera Black",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      model: {
        base: "X-S20",
      },
      specs: {
        sensorSize: "APS-C",
        colour: "Black",
      },
    },
  },
  {
    name: "Fujifilm medium format camera",
    input:
      "Fujifilm GFX100 II Medium Format Mirrorless Camera Body Only",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      model: {
        base: "GFX100 II",
      },
      specs: {
        sensorSize: "Medium Format",
      },
    
    },
  },

  {
    name: "Panasonic Lumix S5 II",
    input:
      "Panasonic Lumix S5 II Full Frame Mirrorless Camera Body Only",
    expected: {
      brand: "Panasonic",
      productType: "camera",
      model: {
        base: "LUMIX S5 II",
      },
      specs: {
        sensorSize: "Full Frame",
      },
     
    },
  },
  {
    name: "Panasonic Lumix GH7",
    input:
      "Panasonic Lumix GH7 Micro Four Thirds Camera Body Only",
    expected: {
      brand: "Panasonic",
      productType: "camera",
      model: {
        base: "LUMIX GH7",
      },
      specs: {
        sensorSize: "Micro Four Thirds",
      },
     
    },
  },
  {
    name: "Panasonic Lumix G9 II",
    input:
      "Panasonic Lumix G9 II Micro Four Thirds Mirrorless Camera",
    expected: {
      brand: "Panasonic",
      productType: "camera",
      model: {
        base: "LUMIX G9 II",
      },
      specs: {
        sensorSize: "Micro Four Thirds",
      },
    },
  },

  {
    name: "OM System OM-1 Mark II",
    input:
      "OM System OM-1 Mark II Micro Four Thirds Camera Body Only",
    expected: {
      brand: "OM System",
      productType: "camera",
      model: {
        base: "OM-1",
      },
      specs: {
        sensorSize: "Micro Four Thirds",
      },
     
    },
  },
  {
    name: "Olympus E-M1 Mark III",
    input:
      "Olympus E-M1 Mark III Micro Four Thirds Camera Body",
    expected: {
      brand: "Olympus",
      productType: "camera",
      model: {
        base: "E-M1 Mark III",
      },
      specs: {
        sensorSize: "Micro Four Thirds",
      },
     
    },
  },

  {
    name: "Leica Q3 camera",
    input:
      "Leica Q3 Full Frame Digital Camera Black 60MP",
    expected: {
      brand: "Leica",
      productType: "camera",
      model: {
        base: "LEICA Q3",
      },
      specs: {
        sensorSize: "Full Frame",
        colour: "Black",
        megapixels: "60MP",
      },
    },
  },
  {
    name: "Leica M11 camera",
    input:
      "Leica M11 Full Frame Digital Camera Silver",
    expected: {
      brand: "Leica",
      productType: "camera",
      model: {
  base: "M11",
},
      specs: {
        sensorSize: "Full Frame",
        colour: "Silver",
      },
    },
  },

  {
    name: "Used Sony camera condition",
    input:
      "Used Sony A7 III Full Frame Mirrorless Camera Body Only",
    expected: {
      brand: "Sony",
      productType: "camera",
      condition: "used",
      model: {
        base: "A7 III",
      },
      specs: {
        sensorSize: "Full Frame",
      },
    },
  },
  {
    name: "Canon RF mount camera listing",
    input:
      "Canon EOS R8 Full Frame Mirrorless Camera Canon RF Mount",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS R8",
      },
      specs: {
        sensorSize: "Full Frame",
        mount: "Canon RF",
      },
    },
  },
  {
    name: "Sony E mount camera listing",
    input:
      "Sony A7C II Full Frame Mirrorless Camera Sony E-Mount",
    expected: {
      brand: "Sony",
      productType: "camera",
      specs: {
        sensorSize: "Full Frame",
        mount: "Sony E",
      },
    },
  },
];