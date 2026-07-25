import type { ProductTestCase } from "../expected";

export const motherboardTests: ProductTestCase[] = [
  {
    name: "ASUS ATX motherboard",
    input:
      "ASUS ROG Strix Z890-E Gaming WiFi ATX Motherboard LGA1851",
    expected: {
      brand: "Asus",
      productType: "motherboard",
      model: {
        base: "ROG Strix Z890-E Gaming WiFi",
      },
      specs: {
        connectivity: ["Wi-Fi"],
      },
    },
  },
  {
    name: "MSI AMD motherboard",
    input:
      "MSI MAG X870 Tomahawk WiFi AM5 ATX Motherboard",
    expected: {
      brand: "MSI",
      productType: "motherboard",
      model: {
        base: "MAG X870 Tomahawk WiFi",
      },
      specs: {
        connectivity: ["Wi-Fi"],
      },
    },
  },
  {
    name: "Gigabyte micro ATX motherboard",
    input:
      "Gigabyte B650M DS3H AX Micro ATX AM5 Motherboard",
    expected: {
      brand: "Gigabyte",
      productType: "motherboard",
      model: {
        base: "B650M DS3H AX",
      },
    },
  },
  {
    name: "ASRock Mini ITX motherboard",
    input:
      "ASRock B850I Lightning WiFi Mini ITX AM5 Motherboard",
    expected: {
      brand: "ASRock",
      productType: "motherboard",
      model: {
        base: "B850I Lightning WiFi",
      },
      specs: {
        connectivity: ["Wi-Fi"],
      },
    },
  },
  {
    name: "Refurbished Intel motherboard",
    input:
      "Refurbished ASUS Prime Z790-P WiFi DDR5 LGA1700 Motherboard",
    expected: {
      brand: "Asus",
      productType: "motherboard",
      condition: "refurbished",
      model: {
        base: "Prime Z790-P WiFi",
      },
      specs: {
        connectivity: ["Wi-Fi"],
      },
    },
  },
  {
    name: "Bluetooth motherboard",
    input:
      "MSI MPG B650 Edge WiFi DDR5 Bluetooth ATX Motherboard",
    expected: {
      brand: "MSI",
      productType: "motherboard",
      model: {
        base: "MPG B650 Edge WiFi",
      },
      specs: {
        connectivity: ["Wi-Fi", "Bluetooth"],
      },
    },
  },
];