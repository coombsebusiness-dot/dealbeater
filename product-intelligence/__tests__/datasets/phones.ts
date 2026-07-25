import type { ProductTestCase } from "../expected";

export const phoneTests: ProductTestCase[] = [
  // =========================================================
  // Apple iPhone
  // =========================================================

  {
    name: "Apple iPhone 16 base model",
    input:
      "Apple iPhone 16 128GB Black Unlocked Smartphone",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      model: {
        base: "iPhone 16",
      },
      specs: {
        memory: null,
        storage: "128GB",
        colour: "Black",
      },
    },
  },
  {
    name: "Apple iPhone 16 Plus",
    input:
      "Apple iPhone 16 Plus 256GB White Unlocked",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      model: {
        base: "iPhone 16",
        variant: "Plus",
      },
      specs: {
        memory: null,
        storage: "256GB",
        colour: "White",
      },
    },
  },
  {
    name: "Apple iPhone 16 Pro",
    input:
      "Apple iPhone 16 Pro 512GB Desert Titanium",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      model: {
        base: "iPhone 16",
        variant: "Pro",
      },
      specs: {
        memory: null,
        storage: "512GB",
        colour: "Desert Titanium",
      },
    },
  },
  {
    name: "Apple iPhone 16 Pro Max",
    input:
      "Apple iPhone 16 Pro Max 1TB Natural Titanium",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      model: {
        base: "iPhone 16",
        variant: "Pro Max",
      },
      specs: {
        memory: null,
        storage: "1TB",
        colour: "Natural Titanium",
      },
    },
  },
  {
    name: "Apple iPhone 15 Pro",
    input:
      "Apple iPhone 15 Pro 256GB Natural Titanium",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      model: {
        base: "iPhone 15",
        variant: "Pro",
      },
      specs: {
        memory: null,
        storage: "256GB",
        colour: "Natural Titanium",
      },
    },
  },
  {
    name: "Apple iPhone 15 Pro Max refurbished",
    input:
      "Refurbished Apple iPhone 15 Pro Max 512GB Blue Titanium",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      condition: "refurbished",
      model: {
        base: "iPhone 15",
        variant: "Pro Max",
      },
      specs: {
        memory: null,
        storage: "512GB",
        colour: "Blue Titanium",
      },
    },
  },
  {
    name: "Apple iPhone 14 Plus used",
    input:
      "Used Apple iPhone 14 Plus 128GB Midnight",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      condition: "used",
      model: {
        base: "iPhone 14",
        variant: "Plus",
      },
      specs: {
        memory: null,
        storage: "128GB",
        colour: "Midnight",
      },
    },
  },
  {
    name: "Apple iPhone SE third generation",
    input:
      "Apple iPhone SE 3rd Generation 64GB Starlight",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      model: {
        base: "iPhone SE",
        revision: "3rd Generation",
      },
      specs: {
        memory: null,
        storage: "64GB",
        colour: "Starlight",
      },
    },
  },

  // =========================================================
  // Samsung Galaxy
  // =========================================================

  {
    name: "Samsung Galaxy S24 Ultra capacity and SKU",
    input:
      "Samsung Galaxy S24 Ultra SM-S928B 12GB RAM 512GB Titanium Grey",
    expected: {
      brand: "Samsung",
      family: "Galaxy S",
      productType: "phone",
      model: {
        base: "Galaxy S24",
        variant: "Ultra",
        sku: "SM-S928B",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Titanium Grey",
      },
    },
  },
  {
    name: "Samsung Galaxy S25",
    input:
      "Samsung Galaxy S25 SM-S931B 12GB RAM 256GB Navy",
    expected: {
      brand: "Samsung",
      family: "Galaxy S",
      productType: "phone",
      model: {
        base: "Galaxy S25",
        sku: "SM-S931B",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Navy",
      },
    },
  },
  {
    name: "Samsung Galaxy S25 Plus",
    input:
      "Samsung Galaxy S25+ SM-S936B 12GB RAM 512GB Silver Shadow",
    expected: {
      brand: "Samsung",
      family: "Galaxy S",
      productType: "phone",
      model: {
        base: "Galaxy S25",
        variant: "Plus",
        sku: "SM-S936B",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Silver Shadow",
      },
    },
  },
  {
    name: "Samsung Galaxy S25 Ultra",
    input:
      "Samsung Galaxy S25 Ultra SM-S938B 12GB RAM 1TB Titanium Black",
    expected: {
      brand: "Samsung",
      family: "Galaxy S",
      productType: "phone",
      model: {
        base: "Galaxy S25",
        variant: "Ultra",
        sku: "SM-S938B",
      },
      specs: {
        memory: "12GB",
        storage: "1TB",
        colour: "Titanium Black",
      },
    },
  },
  {
    name: "Samsung Galaxy S24 FE",
    input:
      "Samsung Galaxy S24 FE SM-S721B 8GB RAM 256GB Graphite",
    expected: {
      brand: "Samsung",
      family: "Galaxy S",
      productType: "phone",
      model: {
        base: "Galaxy S24",
        variant: "FE",
        sku: "SM-S721B",
      },
      specs: {
        memory: "8GB",
        storage: "256GB",
        colour: "Graphite",
      },
    },
  },
  {
    name: "Samsung Galaxy Z Fold6",
    input:
      "Samsung Galaxy Z Fold6 SM-F956B 12GB RAM 512GB Navy",
    expected: {
      brand: "Samsung",
      family: "Galaxy Z Fold",
      productType: "phone",
      model: {
        base: "Galaxy Z Fold6",
        sku: "SM-F956B",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Navy",
      },
    },
  },
  {
    name: "Samsung Galaxy Z Flip6",
    input:
      "Samsung Galaxy Z Flip6 SM-F741B 12GB RAM 256GB Mint",
    expected: {
      brand: "Samsung",
      family: "Galaxy Z Flip",
      productType: "phone",
      model: {
        base: "Galaxy Z Flip6",
        sku: "SM-F741B",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Mint",
      },
    },
  },
  {
    name: "Samsung Galaxy A55",
    input:
      "Samsung Galaxy A55 5G SM-A556B 8GB RAM 256GB Awesome Navy",
    expected: {
      brand: "Samsung",
      family: "Galaxy A",
      productType: "phone",
      model: {
        base: "Galaxy A55",
        sku: "SM-A556B",
      },
      specs: {
        memory: "8GB",
        storage: "256GB",
        colour: "Awesome Navy",
        connectivity: ["5G"],
      },
    },
  },

  // =========================================================
  // Google Pixel
  // =========================================================

  {
    name: "Google Pixel 9",
    input:
      "Google Pixel 9 12GB RAM 128GB Obsidian",
    expected: {
      brand: "Google",
      family: "Pixel",
      productType: "phone",
      model: {
        base: "Pixel 9",
      },
      specs: {
        memory: "12GB",
        storage: "128GB",
        colour: "Obsidian",
      },
    },
  },
  {
    name: "Google Pixel 9 Pro",
    input:
      "Google Pixel 9 Pro 16GB RAM 256GB Porcelain",
    expected: {
      brand: "Google",
      family: "Pixel",
      productType: "phone",
      model: {
        base: "Pixel 9",
        variant: "Pro",
      },
      specs: {
        memory: "16GB",
        storage: "256GB",
        colour: "Porcelain",
      },
    },
  },
  {
    name: "Google Pixel 9 Pro XL",
    input:
      "Google Pixel 9 Pro XL 16GB RAM 512GB Hazel",
    expected: {
      brand: "Google",
      family: "Pixel",
      productType: "phone",
      model: {
        base: "Pixel 9",
        variant: "Pro XL",
      },
      specs: {
        memory: "16GB",
        storage: "512GB",
        colour: "Hazel",
      },
    },
  },
  {
    name: "Used Google Pixel 9 Pro",
    input:
      "Used Google Pixel 9 Pro 16GB RAM 256GB Black",
    expected: {
      brand: "Google",
      family: "Pixel",
      productType: "phone",
      condition: "used",
      model: {
        base: "Pixel 9",
        variant: "Pro",
      },
      specs: {
        memory: "16GB",
        storage: "256GB",
        colour: "Black",
      },
    },
  },
  {
    name: "Google Pixel 8a",
    input:
      "Google Pixel 8a 8GB RAM 128GB Aloe",
    expected: {
      brand: "Google",
      family: "Pixel",
      productType: "phone",
      model: {
        base: "Pixel 8a",
      },
      specs: {
        memory: "8GB",
        storage: "128GB",
        colour: "Aloe",
      },
    },
  },
  {
    name: "Google Pixel Fold",
    input:
      "Google Pixel Fold 12GB RAM 256GB Obsidian",
    expected: {
      brand: "Google",
      family: "Pixel Fold",
      productType: "phone",
      model: {
        base: "Pixel Fold",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Obsidian",
      },
    },
  },

  // =========================================================
  // OnePlus
  // =========================================================

  {
    name: "OnePlus 13",
    input:
      "OnePlus 13 16GB RAM 512GB Midnight Ocean",
    expected: {
      brand: "OnePlus",
      family: "OnePlus",
      productType: "phone",
      model: {
        base: "OnePlus 13",
      },
      specs: {
        memory: "16GB",
        storage: "512GB",
        colour: "Midnight Ocean",
      },
    },
  },
  {
    name: "OnePlus 12",
    input:
      "OnePlus 12 12GB RAM 256GB Silky Black",
    expected: {
      brand: "OnePlus",
      family: "OnePlus",
      productType: "phone",
      model: {
        base: "OnePlus 12",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Silky Black",
      },
    },
  },
  {
    name: "OnePlus Nord 4",
    input:
      "OnePlus Nord 4 5G 16GB RAM 512GB Mercurial Silver",
    expected: {
      brand: "OnePlus",
      family: "OnePlus Nord",
      productType: "phone",
      model: {
        base: "OnePlus Nord 4",
      },
      specs: {
        memory: "16GB",
        storage: "512GB",
        colour: "Mercurial Silver",
        connectivity: ["5G"],
      },
    },
  },

  // =========================================================
  // Xiaomi, Redmi and Poco
  // =========================================================

  {
    name: "Xiaomi 15",
    input:
      "Xiaomi 15 12GB RAM 512GB Black",
    expected: {
      brand: "Xiaomi",
      family: "Xiaomi",
      productType: "phone",
      model: {
        base: "Xiaomi 15",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Black",
      },
    },
  },
  {
    name: "Xiaomi 14 Ultra",
    input:
      "Xiaomi 14 Ultra 16GB RAM 512GB White",
    expected: {
      brand: "Xiaomi",
      family: "Xiaomi",
      productType: "phone",
      model: {
        base: "Xiaomi 14",
        variant: "Ultra",
      },
      specs: {
        memory: "16GB",
        storage: "512GB",
        colour: "White",
      },
    },
  },
  {
    name: "Redmi Note 14 Pro Plus",
    input:
      "Xiaomi Redmi Note 14 Pro+ 5G 12GB RAM 512GB Midnight Black",
    expected: {
      brand: "Xiaomi",
      family: "Redmi Note",
      productType: "phone",
      model: {
        base: "Redmi Note 14",
        variant: "Pro Plus",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Midnight Black",
        connectivity: ["5G"],
      },
    },
  },
  {
    name: "Poco X7 Pro",
    input:
      "Xiaomi Poco X7 Pro 5G 12GB RAM 512GB Black",
    expected: {
      brand: "Xiaomi",
      family: "Poco X",
      productType: "phone",
      model: {
        base: "Poco X7",
        variant: "Pro",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Black",
        connectivity: ["5G"],
      },
    },
  },

  // =========================================================
  // Nothing
  // =========================================================

  {
    name: "Nothing Phone 2",
    input:
      "Nothing Phone (2) 12GB RAM 256GB Dark Grey",
    expected: {
      brand: "Nothing",
      family: "Nothing Phone",
      productType: "phone",
      model: {
        base: "Phone (2)",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Dark Grey",
      },
    },
  },
  {
    name: "Nothing Phone 2a",
    input:
      "Nothing Phone (2a) 12GB RAM 256GB Milk",
    expected: {
      brand: "Nothing",
      family: "Nothing Phone",
      productType: "phone",
      model: {
        base: "Phone (2a)",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Milk",
      },
    },
  },

  // =========================================================
  // Motorola
  // =========================================================

  {
    name: "Motorola Razr 50 Ultra",
    input:
      "Motorola Razr 50 Ultra 12GB RAM 512GB Midnight Blue",
    expected: {
      brand: "Motorola",
      family: "Motorola Razr",
      productType: "phone",
      model: {
        base: "Razr 50",
        variant: "Ultra",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Midnight Blue",
      },
    },
  },
  {
    name: "Motorola Edge 50 Pro",
    input:
      "Motorola Edge 50 Pro 12GB RAM 512GB Luxe Lavender",
    expected: {
      brand: "Motorola",
      family: "Motorola Edge",
      productType: "phone",
      model: {
        base: "Edge 50",
        variant: "Pro",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Luxe Lavender",
      },
    },
  },

  // =========================================================
  // Sony, Honor and Oppo
  // =========================================================

  {
    name: "Sony Xperia 1 VI",
    input:
      "Sony Xperia 1 VI 12GB RAM 256GB Khaki Green",
    expected: {
      brand: "Sony",
      family: "Xperia",
      productType: "phone",
      model: {
        base: "Xperia 1",
        revision: "VI",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Khaki Green",
      },
    },
  },
  {
    name: "Honor Magic7 Pro",
    input:
      "Honor Magic7 Pro 12GB RAM 512GB Lunar Shadow Grey",
    expected: {
      brand: "Honor",
      family: "Honor Magic",
      productType: "phone",
      model: {
        base: "Magic7",
        variant: "Pro",
      },
      specs: {
        memory: "12GB",
        storage: "512GB",
        colour: "Lunar Shadow Grey",
      },
    },
  },
  {
    name: "Oppo Find X8 Pro",
    input:
      "Oppo Find X8 Pro 16GB RAM 512GB Space Black",
    expected: {
      brand: "Oppo",
      family: "Oppo Find X",
      productType: "phone",
      model: {
        base: "Find X8",
        variant: "Pro",
      },
      specs: {
        memory: "16GB",
        storage: "512GB",
        colour: "Space Black",
      },
    },
  },

  // =========================================================
  // Condition edge cases
  // =========================================================

  {
    name: "Refurbished Samsung Galaxy phone",
    input:
      "Refurbished Samsung Galaxy S23 Ultra 12GB RAM 256GB Phantom Black",
    expected: {
      brand: "Samsung",
      family: "Galaxy S",
      productType: "phone",
      condition: "refurbished",
      model: {
        base: "Galaxy S23",
        variant: "Ultra",
      },
      specs: {
        memory: "12GB",
        storage: "256GB",
        colour: "Phantom Black",
      },
    },
  },
  {
    name: "Open box Google Pixel phone",
    input:
      "Open Box Google Pixel 8 Pro 12GB RAM 128GB Bay",
    expected: {
      brand: "Google",
      family: "Pixel",
      productType: "phone",
      condition: "open-box",
      model: {
        base: "Pixel 8",
        variant: "Pro",
      },
      specs: {
        memory: "12GB",
        storage: "128GB",
        colour: "Bay",
      },
    },
  },
  {
    name: "Used Apple iPhone Pro Max",
    input:
      "Used Apple iPhone 13 Pro Max 256GB Sierra Blue",
    expected: {
      brand: "Apple",
      family: "iPhone",
      productType: "phone",
      condition: "used",
      model: {
        base: "iPhone 13",
        variant: "Pro Max",
      },
      specs: {
        memory: null,
        storage: "256GB",
        colour: "Sierra Blue",
      },
    },
  },
];