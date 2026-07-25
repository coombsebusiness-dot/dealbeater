import type { ProductTestCase } from "../expected";

export const cpuTests: ProductTestCase[] = [
  {
    name: "Intel Core Ultra desktop CPU",
    input:
      "Intel Core Ultra 9 285K Desktop Processor 24 Cores LGA1851",
    expected: {
      brand: "Intel",
      productType: "cpu",
      model: {
        base: "Core Ultra 9 285K",
      },
    },
  },
  {
    name: "Intel Core i7 boxed CPU",
    input:
      "Intel Core i7-14700K 14th Gen 20 Core Desktop CPU LGA1700",
    expected: {
      brand: "Intel",
      productType: "cpu",
      model: {
        base: "Core i7-14700K",
        revision: "14th Gen",
      },
    },
  },
  {
    name: "AMD Ryzen 9 processor",
    input:
      "AMD Ryzen 9 9950X 16-Core 32-Thread Desktop Processor",
    expected: {
      brand: "AMD",
      productType: "cpu",
      model: {
        base: "Ryzen 9 9950X",
      },
    },
  },
  {
    name: "AMD Ryzen X3D processor",
    input:
      "AMD Ryzen 7 9800X3D 8 Core AM5 Desktop CPU",
    expected: {
      brand: "AMD",
      productType: "cpu",
      model: {
        base: "Ryzen 7 9800X3D",
      },
    },
  },
  {
    name: "Used Intel CPU condition",
    input:
      "Used Intel Core i5-12600K 12th Gen LGA1700 Processor",
    expected: {
      brand: "Intel",
      productType: "cpu",
      condition: "used",
      model: {
        base: "Core i5-12600K",
        revision: "12th Gen",
      },
    },
  },
  {
    name: "AMD tray processor",
    input:
      "AMD Ryzen 5 7600 6 Core AM5 Tray Processor",
    expected: {
      brand: "AMD",
      productType: "cpu",
      model: {
        base: "Ryzen 5 7600",
        variant: "Tray",
      },
    },
  },
];