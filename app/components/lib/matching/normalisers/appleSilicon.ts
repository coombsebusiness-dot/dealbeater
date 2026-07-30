export type AppleSiliconChip =
  | "m1"
  | "m1-pro"
  | "m1-max"
  | "m1-ultra"
  | "m2"
  | "m2-pro"
  | "m2-max"
  | "m2-ultra"
  | "m3"
  | "m3-pro"
  | "m3-max"
  | "m3-ultra"
  | "m4"
  | "m4-pro"
  | "m4-max"
  | "m4-ultra";

const APPLE_SILICON_PATTERNS: Array<{
  chip: AppleSiliconChip;
  pattern: RegExp;
}> = [
  { chip: "m4-ultra", pattern: /\bm4[\s-]*ultra\b/i },
  { chip: "m4-max", pattern: /\bm4[\s-]*max\b/i },
  { chip: "m4-pro", pattern: /\bm4[\s-]*pro\b/i },
  { chip: "m4", pattern: /\bm4\b/i },

  { chip: "m3-ultra", pattern: /\bm3[\s-]*ultra\b/i },
  { chip: "m3-max", pattern: /\bm3[\s-]*max\b/i },
  { chip: "m3-pro", pattern: /\bm3[\s-]*pro\b/i },
  { chip: "m3", pattern: /\bm3\b/i },

  { chip: "m2-ultra", pattern: /\bm2[\s-]*ultra\b/i },
  { chip: "m2-max", pattern: /\bm2[\s-]*max\b/i },
  { chip: "m2-pro", pattern: /\bm2[\s-]*pro\b/i },
  { chip: "m2", pattern: /\bm2\b/i },

  { chip: "m1-ultra", pattern: /\bm1[\s-]*ultra\b/i },
  { chip: "m1-max", pattern: /\bm1[\s-]*max\b/i },
  { chip: "m1-pro", pattern: /\bm1[\s-]*pro\b/i },
  { chip: "m1", pattern: /\bm1\b/i },
];

export function detectAppleSilicon(
  ...values: Array<string | null | undefined>
): AppleSiliconChip | null {
  const searchableText = values
    .filter((value): value is string => Boolean(value))
    .join(" ");

  if (!searchableText) {
    return null;
  }

  for (const { chip, pattern } of APPLE_SILICON_PATTERNS) {
    if (pattern.test(searchableText)) {
      return chip;
    }
  }

  return null;
}