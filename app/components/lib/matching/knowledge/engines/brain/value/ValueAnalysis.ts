import type {
  ValueAdjustment,
} from "./ValueAdjustment";

export type ValueGrade =
  | "EXCEPTIONAL"
  | "GOOD"
  | "FAIR"
  | "POOR"
  | "UNKNOWN";

export interface ValueAnalysis {
  score: number;

  confidence: number;

  grade: ValueGrade;

  goodValue: boolean;

  summary: string;

  adjustment: ValueAdjustment;

  reasons: string[];

  concerns: string[];
}