import type {
  ProductKnowledge,
  ProductTier,
} from "../types";

export interface ProcessorKnowledge
  extends ProductKnowledge {
  type: "chip" | "cpu";

  category: "Processor";

  architecture?: string;

  performanceScore?: number;

  efficiencyScore?: number;

  aiCapable?: boolean;

  tier?: ProductTier | string;
}
export interface LaptopProcessorSpec {
  id?: string;
  name: string;
  manufacturer?: string;

  architecture?: string;

  performanceCores?: number;
  efficiencyCores?: number;

  cores?: number;
  threads?: number;

  baseClockGHz?: number;
  boostClockGHz?: number;

  benchmarkScore?: number;

  neuralEngineTops?: number;
  aiCapability?: "NONE" | "BASIC" | "GOOD" | "STRONG" | "EXCELLENT";

  releaseYear?: number;
}

export interface LaptopGpuSpec {
  id?: string;
  name: string;
  manufacturer?: string;

  type?: "INTEGRATED" | "DEDICATED";

  vramGB?: number;

  benchmarkScore?: number;

  supportsRayTracing?: boolean;
  supportsHardwareEncoding?: boolean;

  gamingCapability?:
    | "POOR"
    | "LIMITED"
    | "GOOD"
    | "STRONG"
    | "EXCELLENT";

  creativeCapability?:
    | "POOR"
    | "LIMITED"
    | "GOOD"
    | "STRONG"
    | "EXCELLENT";
}

export interface LaptopMemorySpec {
  optionsGB: number[];

  type?:
    | "DDR3"
    | "DDR4"
    | "DDR5"
    | "LPDDR4"
    | "LPDDR4X"
    | "LPDDR5"
    | "LPDDR5X"
    | "UNIFIED"
    | string;

  speedMHz?: number;
  bandwidthGBs?: number;

  channels?: 1 | 2 | 4 | 8;

  soldered?: boolean;
  upgradeable?: boolean;

  maximumSupportedGB?: number;

  ecc?: boolean;

  sharedWithGpu?: boolean;
}

export interface LaptopStorageSpec {
  optionsGB: number[];

  type?: "HDD" | "SATA_SSD" | "NVME_SSD";

  upgradeable?: boolean;

  readSpeedMBps?: number;
  writeSpeedMBps?: number;
}

export interface LaptopDisplaySpec {
  sizeInches?: number;

  panelType?: "TN" | "IPS" | "OLED" | "MINI_LED" | "VA" | string;

  resolutionWidth?: number;
  resolutionHeight?: number;

  refreshRateHz?: number;
  brightnessNits?: number;

  colourGamutP3Percent?: number;
  colourGamutSrgbPercent?: number;

  hdr?: boolean;
  touchscreen?: boolean;

  glossy?: boolean;
  matte?: boolean;
}

export interface LaptopBatterySpec {
  capacityWh?: number;

  manufacturerClaimHours?: number;
  webBrowsingHours?: number;
  videoPlaybackHours?: number;

  fastCharging?: boolean;
}

export interface LaptopPhysicalSpec {
  weightKg?: number;

  widthMm?: number;
  depthMm?: number;
  thicknessMm?: number;

  material?: string;

  formFactor?: "Air" | "Pro" | "Ultrabook" | "Gaming" | "Convertible";
}

export interface LaptopThermalSpec {
  coolingType?: "PASSIVE" | "SINGLE_FAN" | "DUAL_FAN" | "ADVANCED";

  fanCount?: number;

  sustainedPerformanceScore?: number;

  noiseLevelDb?: number;

  thermalThrottlingRisk?: "LOW" | "MEDIUM" | "HIGH";
}

export interface LaptopConnectivitySpec {
  ports: string[];

  wifiVersion?: string;
  bluetoothVersion?: string;

  hasEthernet?: boolean;
  hasHdmi?: boolean;
  hasSdCardReader?: boolean;
  hasThunderbolt?: boolean;

  usbCPortCount?: number;
  usbAPortCount?: number;
}

export interface LaptopRepairabilitySpec {
  repairabilityScore?: number;
  upgradeabilityScore?: number;

  replaceableBattery?: boolean;
  replaceableStorage?: boolean;
  replaceableMemory?: boolean;

  partsAvailability?: "POOR" | "LIMITED" | "GOOD" | "EXCELLENT";
}

export interface LaptopCanonicalSpecs {
  processor?: LaptopProcessorSpec;
  gpu?: LaptopGpuSpec;

  memory?: LaptopMemorySpec;
  storage?: LaptopStorageSpec;

  display?: LaptopDisplaySpec;
  battery?: LaptopBatterySpec;

  physical?: LaptopPhysicalSpec;
  thermal?: LaptopThermalSpec;

  connectivity?: LaptopConnectivitySpec;
  repairability?: LaptopRepairabilitySpec;
}

export interface LaptopKnowledge
  extends ProductKnowledge {
  type: "laptop";

  category: "Laptop";

  processorIds: string[];

  screenSizeInches?: number;

  display?: string;

  memoryOptionsGB?: number[];

  storageOptionsGB?: number[];

  ports?: string[];

  batteryWebHours?: number;

  formFactor?: "Air" | "Pro";

  hasTouchBar?: boolean;

  tier?: ProductTier | string;

  canonical?: LaptopCanonicalSpecs;
}

export interface RegistryMatch<T> {
  entry: T;

  confidence: number;

  matchedAlias: string | null;

  matchedBy:
    | "exact-id"
    | "exact-name"
    | "alias";
}