import type { ProductTestCase } from "../expected";

export const monitorTests: ProductTestCase[] = [
  {
    name: "LG UltraGear gaming monitor",
    input:
      "LG UltraGear 27GR83Q-B 27 Inch QHD IPS 240Hz Gaming Monitor",
    expected: {
      brand: "LG",
      productType: "monitor",
      model: {
        base: "27GR83Q-B",
      },
      specs: {
        screenSize: "27-inch",
        resolution: "2560x1440",
        refreshRate: "240Hz",
        panelType: "IPS",
        aspectRatio: "16:9",
      },
    },
  },
  {
    name: "Samsung Odyssey ultrawide monitor",
    input:
      "Samsung Odyssey G9 49 Inch Dual QHD OLED 240Hz Curved Gaming Monitor",
    expected: {
      brand: "Samsung",
      productType: "monitor",
      model: {
        base: "Odyssey G9",
      },
      specs: {
        screenSize: "49-inch",
        resolution: "5120x1440",
        refreshRate: "240Hz",
        panelType: "OLED",
        aspectRatio: "32:9",
      },
    },
  },
  {
    name: "Dell office monitor",
    input:
      "Dell UltraSharp U2723QE 27 Inch 4K UHD IPS Black Monitor",
    expected: {
      brand: "Dell",
      productType: "monitor",
      model: {
        base: "U2723QE",
      },
      specs: {
        screenSize: "27-inch",
        resolution: "3840x2160",
        panelType: "IPS",
        aspectRatio: "16:9",
      },
    },
  },
  {
    name: "ASUS high refresh monitor",
    input:
      "ASUS ROG Swift PG27AQDM 27 Inch 1440p OLED 240Hz Gaming Monitor",
    expected: {
      brand: "ASUS",
      productType: "monitor",
      model: {
        base: "PG27AQDM",
      },
      specs: {
        screenSize: "27-inch",
        resolution: "2560x1440",
        refreshRate: "240Hz",
        panelType: "OLED",
        aspectRatio: "16:9",
      },
    },
  },
  {
    name: "BenQ esports monitor",
    input:
      "BenQ ZOWIE XL2566K 24.5 Inch Full HD TN 360Hz Gaming Monitor",
    expected: {
      brand: "BenQ",
      productType: "monitor",
      model: {
        base: "XL2566K",
      },
      specs: {
        screenSize: "24.5-inch",
        resolution: "1920x1080",
        refreshRate: "360Hz",
        panelType: "TN",
        aspectRatio: "16:9",
      },
    },
  },
  {
    name: "AOC curved VA monitor",
    input:
      "AOC CQ32G3SU 31.5 Inch QHD VA 165Hz Curved Gaming Monitor",
    expected: {
      brand: "AOC",
      productType: "monitor",
      model: {
        base: "CQ32G3SU",
      },
      specs: {
        screenSize: "31.5-inch",
        resolution: "2560x1440",
        refreshRate: "165Hz",
        panelType: "VA",
        aspectRatio: "16:9",
      },
    },
  },
  {
    name: "Used Acer monitor condition",
    input:
      "Used Acer Nitro XV272U 27 Inch WQHD IPS 170Hz Gaming Monitor",
    expected: {
      brand: "Acer",
      productType: "monitor",
      condition: "used",
      model: {
        base: "XV272U",
      },
      specs: {
        screenSize: "27-inch",
        resolution: "2560x1440",
        refreshRate: "170Hz",
        panelType: "IPS",
        aspectRatio: "16:9",
      },
    },
  },
  {
    name: "Portable USB C monitor",
    input:
      "Lenovo ThinkVision M14 14 Inch Full HD IPS USB-C Portable Monitor",
    expected: {
      brand: "Lenovo",
      productType: "monitor",
      model: {
        base: "ThinkVision M14",
      },
      specs: {
        screenSize: "14-inch",
        resolution: "1920x1080",
        panelType: "IPS",
        aspectRatio: "16:9",
        connectivity: ["USB-C"],
      },
    },
  },
];