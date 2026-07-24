export type ProductVariant = {
  brand?: string | null;
  product?: string | null;
  model?: string | null;
  generation?: string | null;
  year?: string | null;
  screenSize?: string | null;
  storage?: string | null;
  connectivity?: "wifi" | "cellular" | "wifi-cellular" | null;
  colour?: string | null;
  condition?: "new" | "opened" | "used" | "refurbished" | null;
};

export type MatchResult = {
  isMatch: boolean;
  confidence: number;
  reasons: string[];
  rejectedReasons: string[];
  extracted: ProductVariant;
};

function normalise(value?: string | null): string {
  return (value ?? "")
    .toLowerCase()
    .replace(/[-–—]/g, "-")
    .replace(/["']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function includesAny(text: string, values: string[]): boolean {
  return values.some((value) => text.includes(value));
}

function extractStorage(text: string): string | null {
  const match = text.match(/\b(\d{2,4})\s?(gb|tb)\b/i);

  if (!match) {
    return null;
  }

  return `${match[1]}${match[2].toUpperCase()}`;
}

function extractScreenSize(text: string): string | null {
  const match = text.match(
    /\b(\d{1,2}(?:\.\d)?)\s?(?:inch|inches|in|")\b/i
  );

  return match ? match[1] : null;
}

function extractYear(text: string): string | null {
  const match = text.match(/\b(20\d{2})\b/);

  return match?.[1] ?? null;
}

function extractGeneration(text: string): string | null {
  const normalised = normalise(text);

  const chipMatch = normalised.match(/\b(m[1-9])\b/i);

  if (chipMatch) {
    return chipMatch[1].toUpperCase();
  }

  const generationMatch = normalised.match(
    /\b(\d{1,2})(?:st|nd|rd|th)? generation\b/i
  );

  if (generationMatch) {
    return `${generationMatch[1]}th generation`;
  }

  return null;
}

function extractConnectivity(
  text: string
): ProductVariant["connectivity"] {
  const value = normalise(text);

  const hasCellular = includesAny(value, [
    "cellular",
    "5g",
    "4g",
    "lte",
    "wifi + cellular",
    "wi-fi + cellular",
  ]);

  const hasWifi = includesAny(value, [
    "wifi",
    "wi-fi",
    "wi fi",
  ]);

  if (hasCellular && hasWifi) {
    return "wifi-cellular";
  }

  if (hasCellular) {
    return "cellular";
  }

  if (hasWifi) {
    return "wifi";
  }

  return null;
}

function extractCondition(
  text: string
): ProductVariant["condition"] {
  const value = normalise(text);

  if (
    includesAny(value, [
      "refurbished",
      "renewed",
      "seller refurbished",
      "manufacturer refurbished",
    ])
  ) {
    return "refurbished";
  }

  if (
    includesAny(value, [
      "opened - never used",
      "opened never used",
      "open box",
      "opened",
    ])
  ) {
    return "opened";
  }

  if (
    includesAny(value, [
      "used",
      "pre-owned",
      "preowned",
      "second hand",
    ])
  ) {
    return "used";
  }

  if (
    includesAny(value, [
      "brand new",
      "new sealed",
      "new",
    ])
  ) {
    return "new";
  }

  return null;
}

function extractColour(text: string): string | null {
  const value = normalise(text);

  const colours = [
    "space grey",
    "space gray",
    "starlight",
    "purple",
    "blue",
    "pink",
    "silver",
    "black",
    "white",
    "green",
    "yellow",
  ];

  return colours.find((colour) => value.includes(colour)) ?? null;
}

function extractBrand(text: string): string | null {
  const value = normalise(text);

  const brands = [
    "apple",
    "samsung",
    "sony",
    "lg",
    "google",
    "microsoft",
    "lenovo",
    "asus",
    "acer",
    "dell",
    "hp",
    "canon",
    "nikon",
    "fujifilm",
    "panasonic",
  ];

  let bestBrand: string | null = null;
  let earliestIndex = Number.MAX_SAFE_INTEGER;

  for (const brand of brands) {
    const index = value.indexOf(brand);

    if (index !== -1 && index < earliestIndex) {
      earliestIndex = index;
      bestBrand = brand;
    }
  }

  return bestBrand;
}

function extractProduct(text: string): string | null {
  const value = normalise(text);

  const products = [
    "ipad air",
    "ipad pro",
    "ipad mini",
    "ipad",
    "iphone",
    "macbook air",
    "macbook pro",
    "galaxy tab",
    "galaxy s",
    "pixel",
    "playstation",
    "xbox",
  ];

  return products.find((product) => value.includes(product)) ?? null;
}

function containsAccessoryTerms(text: string): boolean {
  const value = normalise(text);

  return includesAny(value, [
    "case for",
    "cover for",
    "keyboard for",
    "screen protector",
    "stylus",
    "charger",
    "charging cable",
    "replacement",
    "spare part",
    "digitizer",
    "lcd screen",
    "bundle with case",
  ]);
}

function containsPaymentTerms(text: string): boolean {
  const value = normalise(text);

  return includesAny(value, [
    "per month",
    "/month",
    "monthly",
    "contract",
    "finance",
    "deposit",
  ]);
}

export function extractProductVariant(
  title: string,
  condition?: string | null
): ProductVariant {
  const combined = `${title} ${condition ?? ""}`;

  return {
    brand: extractBrand(title),
    product: extractProduct(title),
    model: null,
    generation: extractGeneration(title),
    year: extractYear(title),
    screenSize: extractScreenSize(title),
    storage: extractStorage(title),
    connectivity: extractConnectivity(title),
    colour: extractColour(title),
    condition: extractCondition(combined),
  };
}

function sameText(
  expected?: string | null,
  actual?: string | null
): boolean {
  if (!expected || !actual) {
    return true;
  }

  return normalise(expected) === normalise(actual);
}

export function matchProductVariant({
  target,
  listingTitle,
  listingCondition,
}: {
  target: ProductVariant;
  listingTitle: string;
  listingCondition?: string | null;
}): MatchResult {
  const extracted = extractProductVariant(
    listingTitle,
    listingCondition
  );

  const reasons: string[] = [];
  const rejectedReasons: string[] = [];

  let score = 0;
  let possibleScore = 0;

  if (containsAccessoryTerms(listingTitle)) {
    rejectedReasons.push("Listing appears to be an accessory");
  }

  if (containsPaymentTerms(listingTitle)) {
    rejectedReasons.push("Listing appears to be a monthly payment or contract");
  }

  if (target.brand) {
    possibleScore += 20;

    if (sameText(target.brand, extracted.brand)) {
      score += 20;
      reasons.push("Brand matches");
    } else {
      rejectedReasons.push(
        `Wrong brand: expected ${target.brand}, found ${
          extracted.brand ?? "unknown"
        }`
      );
    }
  }

  if (target.product) {
    possibleScore += 30;

    if (sameText(target.product, extracted.product)) {
      score += 30;
      reasons.push("Product family matches");
    } else {
      rejectedReasons.push(
        `Wrong product family: expected ${target.product}, found ${
          extracted.product ?? "unknown"
        }`
      );
    }
  }

  if (target.generation) {
    possibleScore += 30;

    if (sameText(target.generation, extracted.generation)) {
      score += 30;
      reasons.push("Generation matches");
    } else {
      rejectedReasons.push(
        `Wrong generation: expected ${target.generation}, found ${
          extracted.generation ?? "unknown"
        }`
      );
    }
  }

  if (target.year) {
    possibleScore += 15;

    if (sameText(target.year, extracted.year)) {
      score += 15;
      reasons.push("Year matches");
    } else {
      rejectedReasons.push(
        `Wrong year: expected ${target.year}, found ${
          extracted.year ?? "unknown"
        }`
      );
    }
  }

  if (target.storage) {
    possibleScore += 25;

    if (sameText(target.storage, extracted.storage)) {
      score += 25;
      reasons.push("Storage matches");
    } else {
      rejectedReasons.push(
        `Wrong storage: expected ${target.storage}, found ${
          extracted.storage ?? "unknown"
        }`
      );
    }
  }

  if (target.screenSize) {
    possibleScore += 20;

    if (sameText(target.screenSize, extracted.screenSize)) {
      score += 20;
      reasons.push("Screen size matches");
    } else {
      rejectedReasons.push(
        `Wrong screen size: expected ${target.screenSize}, found ${
          extracted.screenSize ?? "unknown"
        }`
      );
    }
  }

  if (target.connectivity) {
    possibleScore += 20;

    if (target.connectivity === extracted.connectivity) {
      score += 20;
      reasons.push("Connectivity matches");
    } else {
      rejectedReasons.push(
        `Wrong connectivity: expected ${target.connectivity}, found ${
          extracted.connectivity ?? "unknown"
        }`
      );
    }
  }

  if (target.colour) {
    possibleScore += 5;

    if (sameText(target.colour, extracted.colour)) {
      score += 5;
      reasons.push("Colour matches");
    }
  }

  if (target.condition) {
    possibleScore += 20;

    if (target.condition === extracted.condition) {
      score += 20;
      reasons.push("Condition matches");
    } else {
      rejectedReasons.push(
        `Wrong condition: expected ${target.condition}, found ${
          extracted.condition ?? "unknown"
        }`
      );
    }
  }

  const confidence =
    possibleScore === 0
      ? 0
      : Math.round((score / possibleScore) * 100);

  return {
    isMatch:
      rejectedReasons.length === 0 &&
      confidence >= 95,
    confidence,
    reasons,
    rejectedReasons,
    extracted,
  };
}