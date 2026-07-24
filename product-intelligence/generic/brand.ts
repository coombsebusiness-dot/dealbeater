import { KNOWN_BRANDS } from "../knowledge/brands";
import { escapeRegExp } from "../utils";

type BrandCandidate = {
  brand: string;
  index: number;
};

export function findBrand(
  title: string
): string | null {
  const candidates: BrandCandidate[] = [];

  for (const brand of KNOWN_BRANDS) {
    const pattern = new RegExp(
      `\\b${escapeRegExp(brand)}\\b`,
      "i"
    );

    const match = pattern.exec(title);

    if (!match) {
      continue;
    }

    candidates.push({
      brand,
      index: match.index,
    });
  }

  if (candidates.length === 0) {
    return null;
  }

  candidates.sort((a, b) => {
    if (a.index !== b.index) {
      return a.index - b.index;
    }

    return b.brand.length - a.brand.length;
  });

  return candidates[0].brand;
}