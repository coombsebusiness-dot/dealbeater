import type { ProductFingerprint } from "../productFingerprint";
import type { ValidationResult } from "./types";

import {
  fail,
  optional,
  pass,
} from "./helpers";

export function validateBundle(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  const expected = original.bundle;
  const found = candidate.bundle;

  if (expected === "unknown") {
    return optional(
      "bundle",
      "Bundle type was not specified"
    );
  }

  if (found === "unknown") {
    return fail(
      "bundle",
      true,
      `Requested bundle type "${expected}" could not be verified`
    );
  }

  if (expected !== found) {
    return fail(
      "bundle",
      true,
      `Bundle mismatch: expected "${expected}", found "${found}"`
    );
  }

  return pass(
    "bundle",
    true,
    "Bundle type matches"
  );
}