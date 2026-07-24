import type {
  FingerprintPatch,
  ProductFingerprint,
} from "./types";

export function normaliseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function normaliseTitle(title: string): string {
  return normaliseWhitespace(
    title
      .toLowerCase()
      .replace(/[()[\]{}|]/g, " ")
      .replace(/[–—]/g, "-")
      .replace(/,/g, " ")
  );
}

export function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

export function toTitleCase(value: string): string {
  return value
    .split(" ")
    .map(
      word =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function mergeFingerprintPatch(
  fingerprint: ProductFingerprint,
  patch: FingerprintPatch
): ProductFingerprint {
  return {
    ...fingerprint,
    ...patch,

    model: {
      ...fingerprint.model,
      ...patch.model,
    },

    specs: {
      ...fingerprint.specs,
      ...patch.specs,
    },

    bundle: {
      ...fingerprint.bundle,
      ...patch.bundle,
    },
  };
}