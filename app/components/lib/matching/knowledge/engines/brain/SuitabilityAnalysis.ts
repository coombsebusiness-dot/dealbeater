import type {
  SuitabilityAdjustment,
} from "./SuitabilityAdjustment";

import type {
  SuitabilityGrade,
} from "./SuitabilityGrade";

export interface SuitabilityAnalysis {
  score: number;

  confidence: number;

  threshold: number;

  suitable: boolean;

  summary: string;

  grade: SuitabilityGrade;

  adjustment: SuitabilityAdjustment;

  reasons: string[];

  concerns: string[];
}