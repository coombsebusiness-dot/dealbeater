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

export const validateProductType: ProductValidator = (
  original,
  candidate
) => {
  if (
    !original.productType ||
    original.productType === "unknown"
  ) {
    return optional(
      "productType",
      "Not specified"
    );
  }

  if (
    !candidate.productType ||
    candidate.productType === "unknown"
  ) {
    return fail(
      "productType",
      true,
      "Product type could not be verified"
    );
  }

  if (
    original.productType !==
    candidate.productType
  ) {
    return fail(
      "productType",
      true,
      `Product type mismatch: expected "${original.productType}", found "${candidate.productType}"`
    );
  }

  return pass(
    "productType",
    true,
    "Product type matches"
  );
};