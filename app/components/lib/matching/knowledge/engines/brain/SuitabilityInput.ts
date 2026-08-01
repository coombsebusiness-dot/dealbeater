import type {
  BuyingPrinciple,
} from "@/app/components/lib/matching/knowledge/engines/common//BuyingPrinciple";

import type {
  BuyingWisdom,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingWisdom";

import type {
  BuyingMistake,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingMistake";

import type {
  UpgradeStrategy,
} from "@/app/components/lib/matching/knowledge/engines/common/UpgradeStrategy";

import type {
  SuitabilityAdjustment,
} from "./SuitabilityAdjustment";

export interface SuitabilityInput {
  score: number;

  confidence: number;

  category?: string;

  workload?: string;

  principles?: BuyingPrinciple[];

  wisdom?: BuyingWisdom[];

  mistakes?: BuyingMistake[];

  adjustment?: SuitabilityAdjustment;

  upgradeStrategies?: UpgradeStrategy[];

  strengths?: string[];

  weaknesses?: string[];

  warnings?: string[];

  threshold?: number;
}