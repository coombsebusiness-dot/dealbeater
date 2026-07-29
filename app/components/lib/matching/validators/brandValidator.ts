import type {
  ProductFingerprint,
} from "../productFingerprint";

import type {
  ProductValidator,
} from "./types";

import {
  pass,
  fail,
  optional,
} from "./helpers";

export const validateBrand: ProductValidator = (
  original: ProductFingerprint,
  candidate: ProductFingerprint
) => {
  if (!original.brand) {
    return optional(
      "brand",
      "Not specified"
    );
  }

  if (!candidate.brand) {
    return fail(
      "brand",
      true,
      "Brand could not be verified"
    );
  }

  if (original.brand !== candidate.brand) {
    return fail(
      "brand",
      true,
      `Brand mismatch: expected "${original.brand}", found "${candidate.brand}"`
    );
  }

  return pass(
    "brand",
    true,
    "Brand matches"
  );
};