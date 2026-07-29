import type { ProductFingerprint } from "../productFingerprint";
import type { ValidationResult } from "./types";

import {
  fail,
  optional,
  pass,
} from "./helpers";

export function validateModelBase(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.model.base) {
    return optional(
      "modelBase",
      "Model was not specified"
    );
  }

  if (!candidate.model.base) {
    return fail(
      "modelBase",
      true,
      "Model could not be verified"
    );
  }

  if (
    original.model.base !==
    candidate.model.base
  ) {
    return fail(
      "modelBase",
      true,
      `Model mismatch: expected "${original.model.base}", found "${candidate.model.base}"`
    );
  }

  return pass(
    "modelBase",
    true,
    "Model matches"
  );
}

export function validateVariant(
  original: ProductFingerprint,
  candidate: ProductFingerprint
): ValidationResult {
  if (!original.model.variant) {
    return optional(
      "variant",
      "Variant was not specified"
    );
  }

  if (!candidate.model.variant) {
    return fail(
      "variant",
      true,
      `Requested variant "${original.model.variant}" could not be verified`
    );
  }

  if (
    original.model.variant !==
    candidate.model.variant
  ) {
    return fail(
      "variant",
      true,
      `Variant mismatch: expected "${original.model.variant}", found "${candidate.model.variant}"`
    );
  }

  return pass(
    "variant",
    true,
    "Variant matches"
  );
}