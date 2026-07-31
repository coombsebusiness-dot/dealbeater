export type BatteryCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "POOR"
  | "UNKNOWN";

export interface BatteryCapability {
  score: number;
  level: BatteryCapabilityLevel;
  explanation: string;
}

export interface BatteryIntelligenceScores {
  overall: number;
  capacity: number;
  webEndurance: number;
  videoEndurance: number;
  generalEndurance: number;
  charging: number;
  mobility: number;
  professionalUse: number;
  longevity: number;
}

export interface BatteryIntelligence {
  batteryName: string;
  confidence: number;

  scores: BatteryIntelligenceScores;

  capabilities: {
    everydayUse: BatteryCapability;
    officeWork: BatteryCapability;
    webBrowsing: BatteryCapability;
    mediaPlayback: BatteryCapability;
    travel: BatteryCapability;
    professionalUse: BatteryCapability;
    heavyWorkloads: BatteryCapability;
  };

  strengths: string[];
  weaknesses: string[];
  warnings: string[];
}