import type {
  ProductModelFingerprint,
} from "../types";

const LEADING_NOISE_PATTERNS = [
  /^\s*refurbished\s+/i,
  /^\s*used\s+/i,
  /^\s*new\s+/i,
  /^\s*open\s+box\s+/i,
];

const BRAND_PATTERNS = [
  /^\s*asus\s+/i,
  /^\s*msi\s+/i,
  /^\s*gigabyte\s+/i,
  /^\s*asrock\s+/i,
];

const END_MARKERS = [
  /\s+DDR[345]\b/i,
  /\s+LGA\d+\b/i,
  /\s+AM[345]\b/i,
  /\s+ATX\b/i,
  /\s+Micro\s+ATX\b/i,
  /\s+Mini\s+ITX\b/i,
  /\s+Motherboard\b/i,
];

function stripLeadingNoise(
  title: string
): string {
  let value = title.trim();

  for (const pattern of LEADING_NOISE_PATTERNS) {
    value = value.replace(pattern, "");
  }

  for (const pattern of BRAND_PATTERNS) {
    value = value.replace(pattern, "");
  }

  return value.trim();
}

function findFirstEndMarker(
  value: string
): number {
  const indexes = END_MARKERS
    .map(pattern => pattern.exec(value)?.index)
    .filter(
      (index): index is number =>
        typeof index === "number"
    );

  if (indexes.length === 0) {
    return value.length;
  }

  return Math.min(...indexes);
}

export function extractMotherboardBase(
  title: string
): string | null {
  const cleaned = stripLeadingNoise(title);

  const endIndex =
    findFirstEndMarker(cleaned);

  const base = cleaned
    .slice(0, endIndex)
    .replace(/\s+/g, " ")
    .trim();

  return base || null;
}

export function parseMotherboardModel(
  title: string
): Partial<ProductModelFingerprint> {
  return {
    base: extractMotherboardBase(title),
  };
}