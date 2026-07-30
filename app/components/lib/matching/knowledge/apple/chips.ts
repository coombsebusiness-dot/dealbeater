import type { AlternativeRelationship } from "../types";

export interface AppleChipKnowledge {

  id: string;

  displayName: string;

  generation: number;

  tier: "base" | "pro" | "max" | "ultra";

  architecture: "apple-silicon";

  released: number;

  recommendedFor: string[];

  betterThan: AlternativeRelationship[]

  notes: string[];
}

export const appleChips: Record<string, AppleChipKnowledge> = {

  "m4-pro": {

    id: "m4-pro",

    displayName: "Apple M4 Pro",

    generation: 4,

    tier: "pro",

    architecture: "apple-silicon",

    released: 2024,

    recommendedFor: [
      "Software Development",
      "Photography",
      "Video Editing",
      "Music Production",
      "3D Rendering"
    ],

  betterThan: [
  {
    id: "m3-pro",
    confidence: 100,
  },
  {
    id: "m2-pro",
    confidence: 100,
  },
  {
    id: "m1-pro",
    confidence: 100,
  },
],

    notes: [
      "Excellent multi-core performance",
      "Excellent battery life",
      "Supports Apple Intelligence"
    ]
  }

};