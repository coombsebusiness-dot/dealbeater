import type {
  CpuIntelligence,
} from "../components/cpu/CpuIntelligence";

import type { MemoryIntelligence }
from "../components/memory/MemoryIntelligence";

import type {
  StorageIntelligence,
} from "../components/storage/StorageIntelligence";

import type {
  GpuIntelligence,
} from "../components/gpu/GpuIntelligence";

import type {
  DisplayIntelligence,
} from "../components/display/DisplayIntelligence";

import type {
  BatteryIntelligence,
} from "../components/battery/BatteryIntelligence";
export type LaptopCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "POOR"
  | "UNKNOWN";

export interface LaptopCapability {
  score: number;
  level: LaptopCapabilityLevel;
  confidence: number;
  explanation: string;
}

export interface LaptopCapabilities {
  everydayUse: LaptopCapability;
  officeWork: LaptopCapability;
  webBrowsing: LaptopCapability;
  multitasking: LaptopCapability;

  photoEditing: LaptopCapability;
  videoEditing: LaptopCapability;
  graphicDesign: LaptopCapability;
  musicProduction: LaptopCapability;

  softwareDevelopment: LaptopCapability;
  aiWorkloads: LaptopCapability;

  casualGaming: LaptopCapability;
  competitiveGaming: LaptopCapability;
  aaaGaming: LaptopCapability;

  portability: LaptopCapability;
  batteryLife: LaptopCapability;
  displayQuality: LaptopCapability;
  connectivity: LaptopCapability;
  upgradeability: LaptopCapability;
  repairability: LaptopCapability;
  longevity: LaptopCapability;
}
export interface LaptopIntelligenceScores {
  performance: number;
  battery: number;
  display: number;
  portability: number;

  buildQuality: number;
  connectivity: number;

  repairability: number;
  upgradeability: number;

  longevity: number;
  value: number;
}
export interface LaptopIntelligence {
  productId: string;
  productName: string;

  overallScore: number;
  confidence: number;

  scores: LaptopIntelligenceScores;
  storage: StorageIntelligence;

  cpu: CpuIntelligence;
  gpu: GpuIntelligence;

  display: DisplayIntelligence;
  battery: BatteryIntelligence;
  memory: MemoryIntelligence;

  capabilities: LaptopCapabilities;

  strengths: string[];
  weaknesses: string[];
  warnings: string[];

  bestFor: string[];
  avoidIf: string[];
}