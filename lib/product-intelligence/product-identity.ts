import { normalizeBrand } from "./brand-normalizer";

export type ProductIdentity = {
  category: string | null;
  brand: string | null;
  family: string | null;
  model: string | null;

  year: number | null;
  memory: string | null;
  storage: string | null;
  colour: string | null;
  screenSize: string | null;
};

export function extractProductIdentity(
  title?: string | null
): ProductIdentity {
  if (!title?.trim()) {
    return createEmptyIdentity();
  }

  const original = title.trim();
  const normalisedTitle = normaliseWhitespace(original);

  // ---------- Brand ----------

  const firstWord =
    normalisedTitle.split(/\s+/)[0] ?? "";

  const brand =
    normalizeBrand(firstWord) ??
    detectBrandFromProductFamily(normalisedTitle);

  // ---------- Clean model text ----------

  let working = normalisedTitle;

  if (brand) {
    working = removeBrandPrefix(
      working,
      brand
    );
  }

  working = working.replace(
    /^Inc\.?\s*/i,
    ""
  );

  working = normaliseWhitespace(working);

  // ---------- Structured identity ----------

  const family = detectFamily(
    normalisedTitle,
    brand
  );

  const category = detectCategory(
    normalisedTitle,
    family
  );

  const year = extractYear(normalisedTitle);

  const memory = extractMemory(
    normalisedTitle
  );

  const storage = extractStorage(
    normalisedTitle
  );

  const colour = extractColour(
    normalisedTitle
  );

  const screenSize = extractScreenSize(
    normalisedTitle
  );

  return {
    category,
    brand,
    family,

    // Keep the complete cleaned model string for
    // compatibility with the current pipeline.
    model: working || null,

    year,
    memory,
    storage,
    colour,
    screenSize,
  };
}

function createEmptyIdentity(): ProductIdentity {
  return {
    category: null,
    brand: null,
    family: null,
    model: null,
    year: null,
    memory: null,
    storage: null,
    colour: null,
    screenSize: null,
  };
}

function removeBrandPrefix(
  value: string,
  brand: string
): string {
  const escapedBrand = escapeRegExp(brand);

  let cleaned = value.replace(
    new RegExp(
      `^${escapedBrand}\\s*`,
      "i"
    ),
    ""
  );

  /*
   * Some product-family names imply the brand.
   *
   * Example:
   * "macbook pro m1"
   *
   * normalizeBrand("macbook") may correctly return
   * "Apple", but the original text does not literally
   * begin with "Apple".
   *
   * In that case, retain "MacBook" as part of the
   * model instead of removing it.
   */
  cleaned = cleaned.replace(
    /^Inc\.?\s*/i,
    ""
  );

  return normaliseWhitespace(cleaned);
}

function detectBrandFromProductFamily(
  value: string
): string | null {
  if (
    /\b(macbook|iphone|ipad|airpods|imac|mac mini|mac studio)\b/i.test(
      value
    )
  ) {
    return "Apple";
  }

  if (
    /\b(galaxy|samsung)\b/i.test(value)
  ) {
    return "Samsung";
  }

  if (
    /\b(pixel)\b/i.test(value)
  ) {
    return "Google";
  }

  if (
    /\b(surface)\b/i.test(value)
  ) {
    return "Microsoft";
  }

  if (
    /\b(playstation|ps5|ps4)\b/i.test(value)
  ) {
    return "Sony";
  }

  if (
    /\b(xbox)\b/i.test(value)
  ) {
    return "Microsoft";
  }

  return null;
}

function detectFamily(
  value: string,
  brand: string | null
): string | null {
  const familyPatterns: Array<{
    pattern: RegExp;
    family: string;
  }> = [
    {
      pattern: /\bmacbook\s+pro\b/i,
      family: "MacBook Pro",
    },
    {
      pattern: /\bmacbook\s+air\b/i,
      family: "MacBook Air",
    },
    {
      pattern: /\bmacbook\b/i,
      family: "MacBook",
    },
    {
      pattern: /\biphone\b/i,
      family: "iPhone",
    },
    {
      pattern: /\bipad\s+pro\b/i,
      family: "iPad Pro",
    },
    {
      pattern: /\bipad\s+air\b/i,
      family: "iPad Air",
    },
    {
      pattern: /\bipad\s+mini\b/i,
      family: "iPad Mini",
    },
    {
      pattern: /\bipad\b/i,
      family: "iPad",
    },
    {
      pattern: /\bairpods\s+pro\b/i,
      family: "AirPods Pro",
    },
    {
      pattern: /\bairpods\s+max\b/i,
      family: "AirPods Max",
    },
    {
      pattern: /\bairpods\b/i,
      family: "AirPods",
    },
    {
      pattern: /\bgalaxy\s+s\b/i,
      family: "Galaxy S",
    },
    {
      pattern: /\bgalaxy\s+z\s+fold\b/i,
      family: "Galaxy Z Fold",
    },
    {
      pattern: /\bgalaxy\s+z\s+flip\b/i,
      family: "Galaxy Z Flip",
    },
    {
      pattern: /\bgalaxy\s+tab\b/i,
      family: "Galaxy Tab",
    },
    {
      pattern: /\bgalaxy\s+watch\b/i,
      family: "Galaxy Watch",
    },
    {
      pattern: /\bpixel\s+fold\b/i,
      family: "Pixel Fold",
    },
    {
      pattern: /\bpixel\s+watch\b/i,
      family: "Pixel Watch",
    },
    {
      pattern: /\bpixel\b/i,
      family: "Pixel",
    },
    {
      pattern: /\bsurface\s+laptop\b/i,
      family: "Surface Laptop",
    },
    {
      pattern: /\bsurface\s+pro\b/i,
      family: "Surface Pro",
    },
    {
      pattern: /\bplaystation\s*5\b|\bps5\b/i,
      family: "PlayStation 5",
    },
    {
      pattern: /\bxbox\s+series\s+x\b/i,
      family: "Xbox Series X",
    },
    {
      pattern: /\bxbox\s+series\s+s\b/i,
      family: "Xbox Series S",
    },
  ];

  const match = familyPatterns.find(
    item => item.pattern.test(value)
  );

  if (match) {
    return match.family;
  }

  return brand;
}

function detectCategory(
  value: string,
  family: string | null
): string | null {
  const lowerValue = value.toLowerCase();
  const lowerFamily =
    family?.toLowerCase() ?? "";

  if (
    lowerValue.includes("macbook") ||
    lowerValue.includes("laptop") ||
    lowerValue.includes("notebook") ||
    lowerFamily.includes("surface laptop")
  ) {
    return "Laptop";
  }

  if (
    lowerValue.includes("iphone") ||
    lowerValue.includes("smartphone") ||
    lowerValue.includes("mobile phone") ||
    /\bgalaxy\s+[asz]\d+/i.test(value) ||
    /\bpixel\s+\d+/i.test(value)
  ) {
    return "Mobile phone";
  }

  if (
    lowerValue.includes("ipad") ||
    lowerValue.includes("tablet") ||
    lowerFamily.includes("galaxy tab") ||
    lowerFamily.includes("surface pro")
  ) {
    return "Tablet";
  }

  if (
    lowerValue.includes("headphone") ||
    lowerValue.includes("earbud") ||
    lowerValue.includes("airpods")
  ) {
    return "Headphones";
  }

  if (
    lowerValue.includes("television") ||
    /\btv\b/i.test(value) ||
    lowerValue.includes("oled") ||
    lowerValue.includes("qled")
  ) {
    return "Television";
  }

  if (
    lowerValue.includes("camera")
  ) {
    return "Camera";
  }

  if (
    lowerValue.includes("monitor")
  ) {
    return "Monitor";
  }

  if (
    lowerValue.includes("playstation") ||
    lowerValue.includes("xbox") ||
    lowerValue.includes("console") ||
    /\bps5\b/i.test(value)
  ) {
    return "Games console";
  }

  if (
    lowerValue.includes("watch")
  ) {
    return "Smartwatch";
  }

  return null;
}

function extractYear(
  value: string
): number | null {
  const match = value.match(
    /\b(19\d{2}|20\d{2})\b/
  );

  if (!match?.[1]) {
    return null;
  }

  const year = Number(match[1]);

  return Number.isInteger(year)
    ? year
    : null;
}

function extractMemory(
  value: string
): string | null {
  const labelledMemoryMatch = value.match(
    /\b(\d+(?:\.\d+)?)\s*(GB|TB)\s*(?:RAM|memory|unified memory)\b/i
  );

  if (labelledMemoryMatch) {
    return formatCapacity(
      labelledMemoryMatch[1],
      labelledMemoryMatch[2]
    );
  }

  const memoryBeforeCapacityMatch =
    value.match(
      /\b(?:RAM|memory)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(GB|TB)\b/i
    );

  if (memoryBeforeCapacityMatch) {
    return formatCapacity(
      memoryBeforeCapacityMatch[1],
      memoryBeforeCapacityMatch[2]
    );
  }

  return null;
}

function extractStorage(
  value: string
): string | null {
  const labelledStorageMatch = value.match(
    /\b(\d+(?:\.\d+)?)\s*(GB|TB)\s*(?:SSD|storage|hard drive|HDD)\b/i
  );

  if (labelledStorageMatch) {
    return formatCapacity(
      labelledStorageMatch[1],
      labelledStorageMatch[2]
    );
  }

  const storageBeforeCapacityMatch =
    value.match(
      /\b(?:SSD|storage|hard drive|HDD)\s*[:\-]?\s*(\d+(?:\.\d+)?)\s*(GB|TB)\b/i
    );

  if (storageBeforeCapacityMatch) {
    return formatCapacity(
      storageBeforeCapacityMatch[1],
      storageBeforeCapacityMatch[2]
    );
  }

  /*
   * Unlabelled capacities are normally storage,
   * provided they were not already identified as RAM.
   */
  const capacityMatches = Array.from(
    value.matchAll(
      /\b(\d+(?:\.\d+)?)\s*(GB|TB)\b/gi
    )
  );

  for (const match of capacityMatches) {
    const matchedValue = match[0];
    const matchIndex = match.index ?? 0;

    const nearbyText = value.slice(
      Math.max(0, matchIndex - 15),
      matchIndex + matchedValue.length + 20
    );

    if (
      /\b(?:RAM|memory|unified memory)\b/i.test(
        nearbyText
      )
    ) {
      continue;
    }

    return formatCapacity(
      match[1],
      match[2]
    );
  }

  return null;
}

function extractColour(
  value: string
): string | null {
  const colours = [
    "Space Black",
    "Space Grey",
    "Space Gray",
    "Midnight Green",
    "Sierra Blue",
    "Pacific Blue",
    "Rose Gold",
    "Natural Titanium",
    "Blue Titanium",
    "White Titanium",
    "Black Titanium",
    "Starlight",
    "Midnight",
    "Graphite",
    "Titanium",
    "Silver",
    "Black",
    "White",
    "Grey",
    "Gray",
    "Blue",
    "Red",
    "Green",
    "Gold",
    "Pink",
    "Purple",
    "Orange",
    "Cream",
    "Beige",
  ];

  const matchedColour = colours.find(
    colour =>
      new RegExp(
        `\\b${escapeRegExp(colour)}\\b`,
        "i"
      ).test(value)
  );

  if (!matchedColour) {
    return null;
  }

  return matchedColour
    .replace(/\bGray\b/i, "Grey")
    .replace(/\bSpace Gray\b/i, "Space Grey");
}

function extractScreenSize(
  value: string
): string | null {
  const match = value.match(
    /\b(\d{1,2}(?:\.\d+)?)\s*(?:inch|inches|in|")\b/i
  );

  if (!match?.[1]) {
    return null;
  }

  return `${match[1]}-inch`;
}

function formatCapacity(
  amount?: string,
  unit?: string
): string | null {
  if (!amount || !unit) {
    return null;
  }

  return `${amount}${unit.toUpperCase()}`;
}

function normaliseWhitespace(
  value: string
): string {
  return value
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(
  value: string
): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}