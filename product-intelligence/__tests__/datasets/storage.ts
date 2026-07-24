import type { ProductTestCase } from "../expected";

export const storageTests: ProductTestCase[] = [
  {
    name: "WD NVMe storage",
    input:
      "WD Black SN850X 2TB NVMe SSD",
    expected: {
      brand: "WD",
      productType: "storage",
      specs: {
        memory: null,
        storage: "2TB",
      },
    },
  },
  {
    name: "Samsung SSD",
    input:
      "Samsung 990 Pro 1TB NVMe SSD",
    expected: {
      brand: "Samsung",
      productType: "storage",
      specs: {
        memory: null,
        storage: "1TB",
      },
    },
  },
  {
    name: "Seagate hard drive",
    input:
      "Seagate 4TB External Hard Drive",
    expected: {
      brand: "Seagate",
      productType: "storage",
      specs: {
        memory: null,
        storage: "4TB",
      },
    },
  },
];