import type { ProductTestCase } from "../expected";

export const ramTests: ProductTestCase[] = [
  {
    name: "Corsair DDR5 desktop memory kit",
    input:
      "Corsair Vengeance 32GB 2x16GB DDR5 6000MHz CL36 Desktop Memory",
    expected: {
      brand: "Corsair",
      productType: "memory",
      specs: {
        memory: "32GB",
        ddrGeneration: "DDR5",
        memorySpeed: "6000MHz",
        moduleCount: 2,
        memoryFormFactor: "DIMM",
        latency: "CL36",
      },
    },
  },
  {
    name: "Kingston DDR4 desktop RAM",
    input:
      "Kingston FURY Beast 16GB 2x8GB DDR4 3200MHz CL16 DIMM",
    expected: {
      brand: "Kingston",
      productType: "memory",
      specs: {
        memory: "16GB",
        ddrGeneration: "DDR4",
        memorySpeed: "3200MHz",
        moduleCount: 2,
        memoryFormFactor: "DIMM",
        latency: "CL16",
      },
    },
  },
  {
    name: "Crucial laptop memory",
    input:
      "Crucial 32GB 2x16GB DDR5 5600MHz SODIMM Laptop Memory",
    expected: {
      brand: "Crucial",
      productType: "memory",
      specs: {
        memory: "32GB",
        ddrGeneration: "DDR5",
        memorySpeed: "5600MHz",
        moduleCount: 2,
        memoryFormFactor: "SODIMM",
      },
    },
  },
  {
    name: "G Skill gaming memory kit",
    input:
      "G.Skill Trident Z5 RGB 64GB 2x32GB DDR5 6400MHz CL32 RAM Kit",
    expected: {
      brand: "G.Skill",
      productType: "memory",
      specs: {
        memory: "64GB",
        ddrGeneration: "DDR5",
        memorySpeed: "6400MHz",
        moduleCount: 2,
        memoryFormFactor: "DIMM",
        latency: "CL32",
      },
    },
  },
  {
    name: "Single stick DDR4 memory",
    input:
      "Samsung 16GB DDR4 2666MHz PC4 Desktop RAM Memory Module",
    expected: {
      brand: "Samsung",
      productType: "memory",
      specs: {
        memory: "16GB",
        ddrGeneration: "DDR4",
        memorySpeed: "2666MHz",
        moduleCount: 1,
        memoryFormFactor: "DIMM",
      },
    },
  },
  {
    name: "Used laptop RAM condition",
    input:
      "Used SK Hynix 8GB DDR4 3200MHz SODIMM Laptop RAM",
    expected: {
      brand: "SK Hynix",
      productType: "memory",
      condition: "used",
      specs: {
        memory: "8GB",
        ddrGeneration: "DDR4",
        memorySpeed: "3200MHz",
        moduleCount: 1,
        memoryFormFactor: "SODIMM",
      },
    },
  },
  {
    name: "ECC server memory",
    input:
      "Micron 32GB DDR4 2933MHz ECC Registered Server Memory RDIMM",
    expected: {
      brand: "Micron",
      productType: "memory",
      specs: {
        memory: "32GB",
        ddrGeneration: "DDR4",
        memorySpeed: "2933MHz",
        moduleCount: 1,
        memoryFormFactor: "RDIMM",
      },
    },
  },
  {
    name: "Four module DDR5 kit",
    input:
      "Corsair Dominator Titanium 64GB 4x16GB DDR5 6600MHz CL32",
    expected: {
      brand: "Corsair",
      productType: "memory",
      specs: {
        memory: "64GB",
        ddrGeneration: "DDR5",
        memorySpeed: "6600MHz",
        moduleCount: 4,
        memoryFormFactor: "DIMM",
        latency: "CL32",
      },
    },
  },
];