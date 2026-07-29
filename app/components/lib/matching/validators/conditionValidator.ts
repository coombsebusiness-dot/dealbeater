import type { ProductFingerprint } from "../productFingerprint";
import type { ValidationResult } from "./types";

import {
  fail,
  optional,
  pass,
} from "./helpers";

export function validateCondition(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (
    !original.condition ||
    original.condition === "unknown"
  ) {
    return optional(
      "condition",
      "Condition was not specified"
    );
  }

  if (
    !candidate.condition ||
    candidate.condition === "unknown"
  ) {
    return fail(
      "condition",
      true,
      `Requested condition "${original.condition}" could not be verified`
    );
  }

  if (
    original.condition !==
    candidate.condition
  ) {
    return fail(
      "condition",
      true,
      `Condition mismatch: expected "${original.condition}", found "${candidate.condition}"`
    );
  }

  return pass(
    "condition",
    true,
    "Condition matches"
  );
}