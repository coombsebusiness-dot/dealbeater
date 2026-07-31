export type IntelCpu =
  | `core-i3-${string}`
  | `core-i5-${string}`
  | `core-i7-${string}`
  | `core-i9-${string}`
  | `core-ultra-5-${string}`
  | `core-ultra-7-${string}`
  | `core-ultra-9-${string}`;

const INTEL_CPU_PATTERNS: Array<{
  pattern: RegExp;
  build: (match: RegExpMatchArray) => IntelCpu;
}> = [
  {
    pattern:
      /\bcore\s+ultra\s+([579])\s+([0-9]{3}[a-z]{0,2})\b/i,
    build: (match) =>
      `core-ultra-${match[1]}-${match[2].toLowerCase()}` as IntelCpu,
  },
  {
    pattern:
      /\b(?:intel\s+)?core\s+i([3579])[-\s]?([0-9]{4,5}[a-z]{0,2})\b/i,
    build: (match) =>
      `core-i${match[1]}-${match[2].toLowerCase()}` as IntelCpu,
  },
];

export function detectIntelCpu(
  ...values: Array<string | null | undefined>
): IntelCpu | null {
  const searchableText = values
    .filter((value): value is string => Boolean(value))
    .join(" ");

  if (!searchableText) {
    return null;
  }

  for (const { pattern, build } of INTEL_CPU_PATTERNS) {
    const match = searchableText.match(pattern);

    if (match) {
      return build(match);
    }
  }

  return null;
}