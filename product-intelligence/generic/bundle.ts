import type { ProductBundleFingerprint } from "../types";
import { BUNDLE_TERMS } from "../knowledge/bundles";
import { toTitleCase, unique } from "../utils";

export function extractBundle(
  title: string
): ProductBundleFingerprint {
  const value = title.toLowerCase();

  const items = BUNDLE_TERMS.filter(term =>
    value.includes(term)
  );

  return {
    isBundle: items.length > 0,
    items: unique(items.map(toTitleCase)),
  };
}