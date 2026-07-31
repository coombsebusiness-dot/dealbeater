export type DisplayCapabilityLevel =
  | "EXCELLENT"
  | "GOOD"
  | "MIXED"
  | "LIMITED"
  | "POOR"
  | "UNKNOWN";

export interface DisplayCapability {
  score: number;
  level: DisplayCapabilityLevel;
  explanation: string;
}

export interface DisplayIntelligenceScores {
  overall: number;

  sharpness: number;
  brightness: number;
  colour: number;
  hdr: number;
  motion: number;
  gaming: number;
  creativeWork: number;
  mediaConsumption: number;
  outdoorVisibility: number;
  efficiency: number;
  longevity: number;
}

export interface DisplayIntelligence {
  displayName: string;

  confidence: number;

  scores: DisplayIntelligenceScores;

  capabilities: {
    officeWork: DisplayCapability;
    webBrowsing: DisplayCapability;

    photoEditing: DisplayCapability;
    videoEditing: DisplayCapability;
    graphicDesign: DisplayCapability;

    mediaConsumption: DisplayCapability;
    casualGaming: DisplayCapability;
    competitiveGaming: DisplayCapability;

    outdoorUse: DisplayCapability;
  };

  strengths: string[];
  weaknesses: string[];
  warnings: string[];
}