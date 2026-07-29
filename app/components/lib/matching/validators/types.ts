import type {
  ProductFingerprint,
} from "../productFingerprint";

export interface ValidationResult {
  name: string;
  passed: boolean;
  required: boolean;
  confidence: number;
  reason: string;
}

export interface ProductValidation {
  accepted: boolean;
  confidence: number;
  reasons: string[];
  results: ValidationResult[];
}

export type ProductValidator = (
  original: ProductFingerprint,
  candidate: ProductFingerprint
) => ValidationResult;