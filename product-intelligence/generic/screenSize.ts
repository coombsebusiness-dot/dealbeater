import type { ProductType } from "../types";

const SCREEN_BASED_PRODUCT_TYPES =
  new Set<ProductType>([
    "laptop",
    "phone",
    "tablet",
    "monitor",
    "tv",
    "watch",
  ]);

interface ScreenSizeCandidate {
  inches: number;
  index: number;
}

function normaliseScreenSize(
  inches: number
): string {
  return `${Number(inches)}"`;
}

function extractCandidates(
  title: string
): ScreenSizeCandidate[] {
  const candidates: ScreenSizeCandidate[] = [];

  const pattern =
    /\b(\d{1,3}(?:\.\d{1,2})?)\s*(?:-\s*)?(?:inch(?:es)?|["″])/gi;

  for (const match of title.matchAll(pattern)) {
    const inches = Number(match[1]);

    if (!Number.isFinite(inches)) {
      continue;
    }

    candidates.push({
      inches,
      index: match.index ?? 0,
    });
  }

  return candidates;
}

function isPlausibleScreenSize(
  inches: number,
  productType: ProductType
): boolean {
  switch (productType) {
    case "watch":
      return inches >= 1 && inches <= 3;

    case "phone":
      return inches >= 3 && inches <= 9;

    case "tablet":
      return inches >= 6 && inches <= 20;

    case "laptop":
      return inches >= 9 && inches <= 22;

    case "monitor":
      return inches >= 15 && inches <= 70;

    case "tv":
      return inches >= 20 && inches <= 120;

    default:
      return false;
  }
}

export function extractScreenSize(
  title: string,
  productType: ProductType
): string | null {
  if (!SCREEN_BASED_PRODUCT_TYPES.has(productType)) {
    return null;
  }

  const candidate = extractCandidates(title)
    .filter(item =>
      isPlausibleScreenSize(
        item.inches,
        productType
      )
    )
    .sort((a, b) => a.index - b.index)[0];

  return candidate
    ? normaliseScreenSize(candidate.inches)
    : null;
}