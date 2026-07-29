import type {
  ProductFingerprint,
} from "../productFingerprint";

import type {
  ProductValidation,
  ProductValidator,
  ValidationResult,
} from "./types";

export interface ValidatorRunnerOptions {
  minimumConfidence?: number;
}

export function runValidators(
  original: ProductFingerprint,
  candidate: ProductFingerprint,
  validators: ProductValidator[],
  options: ValidatorRunnerOptions = {}
): ProductValidation {
  const {
    minimumConfidence = 70,
  } = options;

  const results: ValidationResult[] =
    validators.map((validator) =>
      validator(original, candidate)
    );

  const requiredFailures = results.filter(
    (result) =>
      result.required &&
      !result.passed
  );

  const applicableResults = results.filter(
    (result) =>
      result.reason !== "Not specified"
  );

  const confidence =
    applicableResults.length > 0
      ? Math.round(
          applicableResults.reduce(
            (total, result) =>
              total + result.confidence,
            0
          ) / applicableResults.length
        )
      : 0;

  return {
    accepted:
      requiredFailures.length === 0 &&
      confidence >= minimumConfidence,

    confidence,

    reasons: results.map(
      (result) => result.reason
    ),

    results,
  };
}