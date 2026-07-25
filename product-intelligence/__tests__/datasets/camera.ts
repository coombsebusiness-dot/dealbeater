import type { ProductTestCase } from "../expected";

export const cameraTests: ProductTestCase[] = [
  {
    name: "Sony A7 IV body only",
    input:
      "Sony Alpha A7 IV Mirrorless Camera Body Only Black",
    expected: {
      brand: "Sony",
      productType: "camera",
      bundle: {
        isBundle: true,
        items: ["Body Only"],
      },
      model: {
        base: "A7 IV",
      },
    },
  },

  {
    name: "Sony A7R V",
    input:
      "Sony A7R V Mirrorless Camera Body Only",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "A7R V",
      },
    },
  },

  {
    name: "Sony ZV-E10 II",
    input:
      "Sony ZV-E10 II Vlog Camera",
    expected: {
      brand: "Sony",
      productType: "camera",
      model: {
        base: "ZV-E10 II",
      },
    },
  },

  {
    name: "Canon EOS R6 Mark II",
    input:
      "Canon EOS R6 Mark II Body Only",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS R6 MARK II",
      },
    },
  },

  {
    name: "Canon EOS R5",
    input:
      "Canon EOS R5 Mirrorless Camera",
    expected: {
      brand: "Canon",
      productType: "camera",
      model: {
        base: "EOS R5",
      },
    },
  },

  {
    name: "Canon PowerShot G7 X Mark III",
    input:
      "Canon PowerShot G7 X Mark III Digital Camera",
    expected: {
      brand: "Canon",
      productType: "camera",
    },
  },

  {
    name: "Nikon Z8",
    input:
      "Nikon Z8 Mirrorless Camera Body",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "Z8",
      },
    },
  },

  {
    name: "Nikon Zf",
    input:
      "Nikon Zf Mirrorless Camera",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "ZF",
      },
    },
  },

  {
    name: "Nikon D850",
    input:
      "Nikon D850 DSLR Camera",
    expected: {
      brand: "Nikon",
      productType: "camera",
      model: {
        base: "D850",
      },
    },
  },

  {
    name: "Fujifilm X100VI",
    input:
      "Fujifilm X100VI Digital Camera Silver",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      model: {
        base: "X100VI",
      },
    },
  },

  {
    name: "Fujifilm X-T5",
    input:
      "Fujifilm X-T5 Body Only",
    expected: {
      brand: "Fujifilm",
      productType: "camera",
      model: {
        base: "X-T5",
      },
    },
  },

  {
    name: "Panasonic Lumix S5 II",
    input:
      "Panasonic Lumix S5 II Mirrorless Camera",
    expected: {
      brand: "Panasonic",
      productType: "camera",
    },
  },

  {
    name: "Panasonic GH7",
    input:
      "Panasonic Lumix GH7 Body",
    expected: {
      brand: "Panasonic",
      productType: "camera",
    },
  },

  {
    name: "OM System OM-1 Mark II",
    input:
      "OM System OM-1 Mark II Camera",
    expected: {
      brand: "OM System",
      productType: "camera",
    },
  },

  {
    name: "Leica Q3",
    input:
      "Leica Q3 Digital Camera",
    expected: {
      brand: "Leica",
      productType: "camera",
    },
  },
];