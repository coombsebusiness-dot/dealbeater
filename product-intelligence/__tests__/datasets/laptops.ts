import type { ProductTestCase } from "../expected";

export const laptopTests: ProductTestCase[] = [
  {
    name: "MacBook Air M2",
    input: "Apple MacBook Air M2 13.6-inch 16GB 256GB SSD Midnight",
    expected: {
      brand: "Apple",
      family: "MacBook Air",
      productType: "laptop",
      model: { base: "MacBook Air" },
      specs: {
        processor: "Apple M2",
        memory: "16GB",
        storage: "256GB",
        screenSize: '13.6"',
        colour: "Midnight",
      },
    },
  },

  {
    name: "MacBook Pro M4",
    input: "Apple MacBook Pro M4 16-inch 24GB 1TB SSD Space Black",
    expected: {
      brand: "Apple",
      family: "MacBook Pro",
      productType: "laptop",
      specs: {
        processor: "Apple M4",
        memory: "24GB",
        storage: "1TB",
        screenSize: '16"',
        colour: "Space Black",
      },
    },
  },

  {
    name: "ASUS Vivobook",
    input: "ASUS Vivobook 16 M1607KA-MB148W 16GB 512GB SSD",
    expected: {
      brand: "ASUS",
      family: "Vivobook",
      productType: "laptop",
      specs: {
        memory: "16GB",
        storage: "512GB",
      },
    },
  },

  {
    name: "ASUS Zenbook OLED",
    input: "ASUS Zenbook 14 OLED Ryzen 7 8840HS 32GB 1TB SSD",
    expected: {
      brand: "ASUS",
      family: "Zenbook",
      productType: "laptop",
      specs: {
        processor: "AMD Ryzen 7 8840HS",
        memory: "32GB",
        storage: "1TB",
        panelType: "OLED",
      },
    },
  },

  {
    name: "ASUS ROG Strix",
    input: "ASUS ROG Strix G18 Intel Core i9-14900HX RTX 4090 32GB 2TB SSD",
    expected: {
      brand: "ASUS",
      family: "ROG Strix",
      productType: "laptop",
      specs: {
        processor: "Intel Core i9-14900HX",
        graphics: "NVIDIA GeForce RTX 4090",
        memory: "32GB",
        storage: "2TB",
      },
    },
  },

  {
    name: "Dell XPS",
    input: "Dell XPS 15 Laptop 32GB RAM 1TB SSD Silver",
    expected: {
      brand: "Dell",
      family: "XPS",
      specs: {
        memory: "32GB",
        storage: "1TB",
        colour: "Silver",
      },
    },
  },

  {
    name: "Dell Latitude",
    input: "Dell Latitude 7450 Intel Core Ultra 7 165U 16GB 512GB SSD",
    expected: {
      brand: "Dell",
      family: "Latitude",
      specs: {
        processor: "Intel Core Ultra 7 165U",
        memory: "16GB",
        storage: "512GB",
      },
    },
  },

  {
    name: "Lenovo ThinkPad",
    input: "Lenovo ThinkPad X1 Carbon Gen 12 32GB 1TB SSD",
    expected: {
      brand: "Lenovo",
      family: "ThinkPad",
      specs: {
        memory: "32GB",
        storage: "1TB",
      },
    },
  },

  {
    name: "Lenovo Legion",
    input: "Lenovo Legion Pro 7 Ryzen 9 7945HX RTX 4080 32GB 2TB SSD",
    expected: {
      brand: "Lenovo",
      family: "Legion",
      specs: {
        processor: "AMD Ryzen 9 7945HX",
        graphics: "NVIDIA GeForce RTX 4080",
        memory: "32GB",
        storage: "2TB",
      },
    },
  },

  {
    name: "HP Spectre",
    input: "HP Spectre x360 Intel Core Ultra 7 155H OLED 16GB 1TB SSD",
    expected: {
      brand: "HP",
      family: "Spectre",
      specs: {
        processor: "Intel Core Ultra 7 155H",
        panelType: "OLED",
        memory: "16GB",
        storage: "1TB",
      },
    },
  },

  {
    name: "Acer Predator",
    input: "Acer Predator Helios 16 Core i9-14900HX RTX 4080 32GB 2TB SSD",
    expected: {
      brand: "Acer",
      family: "Predator Helios",
      specs: {
        processor: "Intel Core i9-14900HX",
        graphics: "NVIDIA GeForce RTX 4080",
        memory: "32GB",
        storage: "2TB",
      },
    },
  },

  {
    name: "Microsoft Surface",
    input: "Microsoft Surface Laptop Snapdragon X Elite 16GB 512GB SSD",
    expected: {
      brand: "Microsoft",
      family: "Surface Laptop",
      specs: {
        processor: "Snapdragon X Elite",
        memory: "16GB",
        storage: "512GB",
      },
    },
  },

  {
    name: "Samsung Galaxy Book",
    input: "Samsung Galaxy Book5 Pro Intel Core Ultra 7 32GB 1TB SSD",
    expected: {
      brand: "Samsung",
      family: "Galaxy Book",
      specs: {
        processor: "Intel Core Ultra 7",
        memory: "32GB",
        storage: "1TB",
      },
    },
  },

  {
    name: "Refurbished Lenovo",
    input: "Refurbished Lenovo ThinkPad X1 Carbon 16GB RAM 512GB SSD",
    expected: {
      brand: "Lenovo",
      family: "ThinkPad",
      condition: "refurbished",
      specs: {
        memory: "16GB",
        storage: "512GB",
      },
    },
  },

  {
    name: "Open Box ASUS",
    input: "Open Box ASUS Zenbook 14 OLED 16GB 512GB SSD",
    expected: {
      brand: "ASUS",
      family: "Zenbook",
      condition: "open-box",
      specs: {
        memory: "16GB",
        storage: "512GB",
      },
    },
  },
];