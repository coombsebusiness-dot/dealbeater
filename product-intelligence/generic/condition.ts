import type { ProductCondition } from "../types";

export function detectCondition(
  title: string
): ProductCondition {
  const value = title.toLowerCase();

  if (/\b(open box|open-box)\b/.test(value)) {
    return "open-box";
  }

  if (
    /\b(refurbished|manufacturer refurbished|seller refurbished|renewed)\b/.test(
      value
    )
  ) {
    return "refurbished";
  }

  if (
    /\b(used|pre-owned|pre owned|second hand|second-hand)\b/.test(
      value
    )
  ) {
    return "used";
  }

  if (
    /\b(brand new|factory sealed|sealed|new condition|\bnew\b)\b/.test(
      value
    )
  ) {
    return "new";
  }

  return "unknown";
}