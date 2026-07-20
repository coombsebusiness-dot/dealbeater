export interface ProductFingerprint {
  brand: string | null;
  family: string | null;
  modelNumbers: string[];
  year: string | null;
  storage: string | null;
  memory: string | null;
  screenSize: string | null;
  connectivity: string | null;
  colour: string | null;
  condition: ProductCondition;
}

export type ProductCondition =
  | "new"
  | "refurbished"
  | "used"
  | "unknown";

export interface ProductMatchResult {
  accepted: boolean;
  confidence: number;
  reasons: string[];
  original: ProductFingerprint;
  candidate: ProductFingerprint;
}

const KNOWN_BRANDS = [
  "apple",
  "samsung",
  "sony",
  "lg",
  "microsoft",
  "google",
  "amazon",
  "lenovo",
  "dell",
  "hp",
  "asus",
  "acer",
  "huawei",
  "xiaomi",
  "motorola",
  "nintendo",
  "dyson",
  "shark",
  "canon",
  "nikon",
  "fujifilm",
  "panasonic",
  "bosch",
  "makita",
  "dewalt",
  "karcher",
  "beko",
  "hotpoint",
  "hoover",
  "miele",
];

const COLOUR_GROUPS: Record<string, string[]> = {
  black: [
    "black",
    "midnight",
    "obsidian",
    "graphite",
    "jet black",
  ],
  white: [
    "white",
    "starlight",
    "pearl white",
  ],
  grey: [
    "grey",
    "gray",
    "space grey",
    "space gray",
    "silver grey",
    "silver gray",
  ],
  silver: [
    "silver",
    "platinum",
  ],
  blue: [
    "blue",
    "navy",
    "sky blue",
    "ocean blue",
  ],
  green: [
    "green",
    "mint",
    "sage",
  ],
  red: [
    "red",
    "product red",
  ],
  pink: [
    "pink",
    "rose",
    "rose gold",
  ],
  purple: [
    "purple",
    "violet",
    "lilac",
  ],
  gold: [
    "gold",
    "champagne",
    "champagne gold",
  ],
  yellow: [
    "yellow",
  ],
  orange: [
    "orange",
  ],
  beige: [
    "beige",
    "cream",
  ],
};

const FAMILY_PATTERNS: Array<{
  family: string;
  patterns: RegExp[];
}> = [
  {
    family: "ipad air",
    patterns: [/\bipad\s+air\b/i],
  },
  {
    family: "ipad pro",
    patterns: [/\bipad\s+pro\b/i],
  },
  {
    family: "ipad mini",
    patterns: [/\bipad\s+mini\b/i],
  },
  {
    family: "ipad",
    patterns: [/\bipad\b/i],
  },
  {
    family: "iphone",
    patterns: [/\biphone\b/i],
  },
  {
    family: "macbook air",
    patterns: [/\bmacbook\s+air\b/i],
  },
  {
    family: "macbook pro",
    patterns: [/\bmacbook\s+pro\b/i],
  },
  {
    family: "galaxy tab",
    patterns: [/\bgalaxy\s+tab\b/i],
  },
  {
    family: "galaxy s",
    patterns: [/\bgalaxy\s+s\d+/i],
  },
  {
    family: "galaxy z fold",
    patterns: [/\bgalaxy\s+z\s+fold\b/i],
  },
  {
    family: "galaxy z flip",
    patterns: [/\bgalaxy\s+z\s+flip\b/i],
  },
  {
    family: "surface laptop",
    patterns: [/\bsurface\s+laptop\b/i],
  },
  {
    family: "surface pro",
    patterns: [/\bsurface\s+pro\b/i],
  },
  {
    family: "playstation 5",
    patterns: [
      /\bplaystation\s*5\b/i,
      /\bps5\b/i,
    ],
  },
  {
    family: "xbox series x",
    patterns: [/\bxbox\s+series\s+x\b/i],
  },
  {
    family: "xbox series s",
    patterns: [/\bxbox\s+series\s+s\b/i],
  },
  {
    family: "nintendo switch",
    patterns: [/\bnintendo\s+switch\b/i],
  },
];

const REFURBISHED_TERMS = [
  "refurbished",
  "renewed",
  "remanufactured",
  "reconditioned",
  "grade a",
  "grade b",
  "grade c",
];

const USED_TERMS = [
  "used",
  "pre owned",
  "pre-owned",
  "second hand",
  "open box",
  "open-box",
];

const WIFI_TERMS = [
  "wifi",
  "wi fi",
  "wi-fi",
];

const CELLULAR_TERMS = [
  "cellular",
  "5g",
  "4g",
  "lte",
  "wifi cellular",
  "wi fi cellular",
  "wi-fi cellular",
];

export function compareExactProductVariant(
  originalText: string,
  candidateText: string
): ProductMatchResult {
  const original =
    createProductFingerprint(originalText);

  const candidate =
    createProductFingerprint(candidateText);

  const reasons: string[] = [];
  let earnedScore = 0;
  let possibleScore = 0;

  const reject = (reason: string) => {
    reasons.push(reason);
  };

  const checkRequiredField = (
    label: string,
    originalValue: string | null,
    candidateValue: string | null,
    points: number
  ) => {
    if (!originalValue) {
      
      return;
    }

    possibleScore += points;

    if (!candidateValue) {
      reject(
        `${label} could not be verified`
      );
      return;
    }

    if (originalValue !== candidateValue) {
      reject(
        `${label} mismatch: expected "${originalValue}", found "${candidateValue}"`
      );
      return;
    }

    earnedScore += points;
  };

  checkRequiredField(
    "brand",
    original.brand,
    candidate.brand,
    15
  );

  checkRequiredField(
    "product family",
    original.family,
    candidate.family,
    25
  );

  checkRequiredField(
    "year or generation",
    original.year,
    candidate.year,
    15
  );

  checkRequiredField(
    "storage",
    original.storage,
    candidate.storage,
    15
  );

  checkRequiredField(
    "memory",
    original.memory,
    candidate.memory,
    10
  );

  checkRequiredField(
    "screen size",
    original.screenSize,
    candidate.screenSize,
    10
  );

  checkRequiredField(
    "connectivity",
    original.connectivity,
    candidate.connectivity,
    5
  );

  checkRequiredField(
    "colour",
    original.colour,
    candidate.colour,
    5
  );

  if (original.modelNumbers.length > 0) {
    possibleScore += 30;

    const hasMatchingModelNumber =
      original.modelNumbers.some(
        (modelNumber) =>
          candidate.modelNumbers.includes(
            modelNumber
          )
      );

    if (!hasMatchingModelNumber) {
      reject(
        "manufacturer model number does not match"
      );
    } else {
      earnedScore += 30;
    }
  }

  if (
    original.condition === "new" &&
    candidate.condition !== "new" &&
    candidate.condition !== "unknown"
  ) {
    reject(
      `condition mismatch: expected new, found ${candidate.condition}`
    );
  }

  if (
    original.condition !== "unknown" &&
    candidate.condition !== "unknown" &&
    original.condition !== candidate.condition
  ) {
    reject(
      `condition mismatch: expected ${original.condition}, found ${candidate.condition}`
    );
  }

  const confidence =
    possibleScore > 0
      ? Math.round(
          (earnedScore / possibleScore) * 100
        )
      : 0;

  /*
   * Strict, fail-closed behaviour:
   *
   * Any mismatched or unverifiable required
   * attribute rejects the listing.
   */
  const accepted =
    reasons.length === 0 &&
    confidence >= 85;

  return {
    accepted,
    confidence,
    reasons:
      reasons.length > 0
        ? reasons
        : [
            `exact variant verified at ${confidence}% confidence`,
          ],
    original,
    candidate,
  };
}

export function createProductFingerprint(
  text: string
): ProductFingerprint {
  const normalised = normaliseText(text);

  return {
    brand: extractBrand(normalised),
    family: extractFamily(normalised),
    modelNumbers:
      extractModelNumbers(normalised),
    year: extractYear(normalised),
    storage: extractStorage(normalised),
    memory: extractMemory(normalised),
    screenSize:
      extractScreenSize(normalised),
    connectivity:
      extractConnectivity(normalised),
    colour: extractColour(normalised),
    condition: extractCondition(normalised),
  };
}

function extractBrand(
  value: string
): string | null {
  return (
    KNOWN_BRANDS.find((brand) =>
      containsWholePhrase(value, brand)
    ) ?? null
  );
}

function extractFamily(
  value: string
): string | null {
  for (const item of FAMILY_PATTERNS) {
    if (
      item.patterns.some((pattern) =>
        pattern.test(value)
      )
    ) {
      return item.family;
    }
  }

  return null;
}

function extractYear(
  value: string
): string | null {
  const match = value.match(
    /\b(20[1-3]\d)\b/
  );

  return match?.[1] ?? null;
}

function extractStorage(
  value: string
): string | null {
  const matches = Array.from(
    value.matchAll(
      /\b(\d+(?:\.\d+)?)\s*(tb|gb)\b/g
    )
  );

  if (matches.length === 0) {
    return null;
  }

  const capacities = matches
    .map((match) => {
      const amount = Number(match[1]);
      const unit = match[2];

      if (!Number.isFinite(amount)) {
        return null;
      }

      const gigabytes =
        unit === "tb"
          ? amount * 1024
          : amount;

      return {
        original: `${amount}${unit}`,
        gigabytes,
      };
    })
    .filter(
      (
        item
      ): item is {
        original: string;
        gigabytes: number;
      } => item !== null
    )
    .sort(
      (a, b) =>
        b.gigabytes - a.gigabytes
    );

  /*
   * Storage is normally the largest capacity
   * written in a product title.
   *
   * Example:
   * "16GB RAM 512GB SSD" → 512GB storage.
   */
  return capacities[0]?.original ?? null;
}

function extractMemory(
  value: string
): string | null {
  const explicitRamMatch = value.match(
    /\b(\d+)\s*gb\s*(?:ram|memory)\b/
  );

  if (explicitRamMatch?.[1]) {
    return `${explicitRamMatch[1]}gb`;
  }

  const ramBeforeCapacityMatch =
    value.match(
      /\b(?:ram|memory)\s*(\d+)\s*gb\b/
    );

  if (ramBeforeCapacityMatch?.[1]) {
    return `${ramBeforeCapacityMatch[1]}gb`;
  }

  return null;
}

function extractScreenSize(
  value: string
): string | null {
  const match = value.match(
    /\b(\d{1,2}(?:\.\d+)?)\s*(?:inch|inches|in|")\b/
  );

  if (!match?.[1]) {
    return null;
  }

  return normaliseNumber(match[1]);
}

function extractConnectivity(
  value: string
): string | null {
  const hasCellular =
    CELLULAR_TERMS.some((term) =>
      containsWholePhrase(value, term)
    );

  if (hasCellular) {
    return "wifi-cellular";
  }

  const hasWifi =
    WIFI_TERMS.some((term) =>
      containsWholePhrase(value, term)
    );

  if (hasWifi) {
    return "wifi";
  }

  return null;
}

function extractColour(
  value: string
): string | null {
  for (
    const [
      canonicalColour,
      aliases,
    ] of Object.entries(COLOUR_GROUPS)
  ) {
    if (
      aliases.some((alias) =>
        containsWholePhrase(value, alias)
      )
    ) {
      return canonicalColour;
    }
  }

  return null;
}

function extractCondition(
  value: string
): ProductCondition {
  if (
    REFURBISHED_TERMS.some((term) =>
      containsWholePhrase(value, term)
    )
  ) {
    return "refurbished";
  }

  if (
    USED_TERMS.some((term) =>
      containsWholePhrase(value, term)
    )
  ) {
    return "used";
  }

  if (
    containsWholePhrase(value, "new")
  ) {
    return "new";
  }

  /*
   * Retail shopping listings normally represent
   * new products unless explicitly labelled
   * refurbished or used.
   */
  return "new";
}

function extractModelNumbers(
  value: string
): string[] {
  const matches = value.match(
    /\b(?=[a-z0-9-]*[a-z])(?=[a-z0-9-]*\d)[a-z0-9]{2,}(?:-[a-z0-9]+)*\b/g
  );

  if (!matches) {
    return [];
  }

  const excluded = new Set([
    "128gb",
    "256gb",
    "512gb",
    "1tb",
    "2tb",
    "4g",
    "5g",
    "wifi",
    "wi-fi",
    "2024",
    "2025",
    "2026",
    "2027",
  ]);

  return Array.from(
    new Set(
      matches.filter(
        (match) =>
          !excluded.has(match) &&
          match.length >= 4
      )
    )
  );
}

function containsWholePhrase(
  value: string,
  phrase: string
): boolean {
  const escapedPhrase =
    escapeRegExp(normaliseText(phrase))
      .replace(/\s+/g, "\\s+");

  return new RegExp(
    `(?:^|\\s)${escapedPhrase}(?:$|\\s)`
  ).test(value);
}

function normaliseNumber(
  value: string
): string {
  const parsed = Number(value);

  if (!Number.isFinite(parsed)) {
    return value;
  }

  return Number.isInteger(parsed)
    ? String(parsed)
    : String(parsed);
}

function normaliseText(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/(\d)\s*["”]/g, "$1 inch ")
    .replace(/(\d)\s*'/g, "$1 feet ")
    .replace(/\bspace\s+gray\b/g, "space grey")
    .replace(/\bwi[\s-]?fi\b/g, "wifi")
    .replace(/(\d+)\s*(gb|tb)\b/g, "$1$2")
    .replace(/[“”"'’]/g, " ")
    .replace(/[^a-z0-9.-]+/g, " ")
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