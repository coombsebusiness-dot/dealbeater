import type {
  BuyingPrinciple,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingPrinciple";

import type {
  BuyingWisdom,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingWisdom";

import type {
  BuyingMistake,
} from "@/app/components/lib/matching/knowledge/engines/common/BuyingMistake";

import type {
  ValueAdjustment,
} from "./ValueAdjustment";

export interface ValueInput {
  currentPrice: number;

  fairPrice?: number;

  lowestVerifiedPrice?: number;

  productScore: number;

  adjustment?: ValueAdjustment;

  confidence: number;

  strengths?: string[];

  weaknesses?: string[];

  principles?: BuyingPrinciple[];

wisdom?: BuyingWisdom[];

mistakes?: BuyingMistake[];

  warnings?: string[];
}