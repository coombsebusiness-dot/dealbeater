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

export const validateFamily: ProductValidator = (
  original,
  candidate
) => {
  if (!original.family) {
    return optional(
      "family",
      "Not specified"
    );
  }

  if (!candidate.family) {
    return fail(
      "family",
      true,
      "Product family could not be verified"
    );
  }

  if (
    original.family ===
    candidate.family
  ) {
    return pass(
      "family",
      true,
      "Product family matches"
    );
  }

  if (
    candidate.family.startsWith(
      `${original.family} `
    )
  ) {
    return pass(
      "family",
      true,
      `Candidate belongs to the requested "${original.family}" family`
    );
  }

  return fail(
    "family",
    true,
    `Product family mismatch: expected "${original.family}", found "${candidate.family}"`
  );
};