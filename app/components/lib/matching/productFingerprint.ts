import {
  classifyProductType,
  type ProductType,
} from "./productTypeClassifier";

export type ProductCondition =
  | "new"
  | "refurbished"
  | "used"
  | "unknown";

export type ProductBundle =
  | "body-only"
  | "lens-kit"
  | "bundle"
  | "unknown";

export interface ProductFingerprint {
  brand: string | null;

  family: string | null;

  productType: ProductType;

  model: {
    base: string | null;
    revision: string | null;
    variant: string | null;
    sku: string | null;
  };

  specs: {
    storage: string | null;
    memory: string | null;
    colour: string | null;
    screenSize: string | null;
    connectivity: string | null;
  };

  year: string | null;

  condition: ProductCondition;

  bundle: ProductBundle;
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

const FAMILY_PATTERNS: Array<{
  family: string;
  patterns: RegExp[];
}> = [
  {
    family: "macbook air",
    patterns: [/\bmacbook\s+air\b/i],
  },
  {
    family: "macbook pro",
    patterns: [/\bmacbook\s+pro\b/i],
  },
  {
    family: "macbook",
    patterns: [/\bmacbook\b/i],
  },
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
    family: "sony a7r iii",
    patterns: [
      /\bsony\s+a7r\s*iii\b/i,
      /\ba7r\s*iii(?:a)?\b/i,
      /\bilce-?7rm3a?\b/i,
    ],
  },
  {
    family: "sony a7s iii",
    patterns: [
      /\bsony\s+a7s\s*iii\b/i,
      /\ba7s\s*iii\b/i,
      /\bilce-?7sm3\b/i,
    ],
  },
  {
    family: "sony a7 iii",
    patterns: [
      /\bsony\s+a7\s*iii\b/i,
      /\ba7\s*iii\b/i,
      /\bilce-?7m3\b/i,
    ],
  },
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
  ],
};

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
  "b stock",
  "b-stock",
  "shutter count",
  "battery cycles",
  "cycles",
  "grade good",
  "grade excellent",
  "grade fair",
  "tahoe grade",
];

export function createProductFingerprintV2(
  input: string
): ProductFingerprint {
  const text = normaliseText(input);

  return {
    brand: extractBrand(text),

    family: extractFamily(text),

    productType:
      classifyProductType(text).type,

    model: {
      base: extractModelBase(text),

      revision:
        extractModelRevision(text),

      variant:
        extractModelVariant(text),

      sku:
        extractSku(text),
    },

    specs: {
      storage:
        extractStorage(text),

      memory:
        extractMemory(text),

      colour:
        extractColour(text),

      screenSize:
        extractScreenSize(text),

      connectivity:
        extractConnectivity(text),
    },

    year:
      extractYear(text),

    condition:
      extractCondition(text),

    bundle:
      extractBundle(text),
  };
}

function extractBrand(
  value: string
): string | null {
  for (const brand of KNOWN_BRANDS) {
    if (containsPhrase(value, brand)) {
      return brand;
    }
  }

  /*
   * Apple product-family names are strong enough
   * to infer Apple when the manufacturer is omitted.
   */
  if (
    /\b(?:macbook|iphone|ipad|imac|mac mini)\b/.test(
      value
    )
  ) {
    return "apple";
  }

  return null;
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
  const panasonicFamily = value.match(
  /\b(lumix\s+s|lumix\s+gh|lumix\s+g)\b/i
);

if (panasonicFamily?.[1]) {
  return panasonicFamily[1]
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
const fujiFamily = value.match(
  /\b(x-h|x-t|x-pro|x-e|gfx)\b/i
);

if (fujiFamily?.[1]) {
  return fujiFamily[1].toUpperCase();
}

const nikonFamily = value.match(
  /\b(z|d)\b/i
);

if (nikonFamily?.[1]) {
  return nikonFamily[1].toUpperCase();
}

const canonFamily = value.match(
  /\b(eos\s*r)\b/i
);

if (canonFamily?.[1]) {
  return "EOS R";
}

const sonyFamily = value.match(
  /\b(a7|a1|a9|a6)\b/i
);

if (sonyFamily?.[1]) {
  return sonyFamily[1].toUpperCase();
}
  return null;
}

function extractModelBase(
  value: string
): string | null {

  /*
   * Apple chips
   */

  const appleChip = value.match(
    /\b(m[1-9])\b/
  );

  if (appleChip?.[1]) {
    return appleChip[1].toUpperCase();
  }

  /*
   * CPUs / GPUs
   */

  const processorModel = value.match(
    /\b(?:rtx|gtx|rx|ryzen|core)\s*[- ]?([a-z0-9-]+)\b/
  );

  if (processorModel?.[0]) {
    return processorModel[0]
      .replace(/\s+/g, "-")
      .toUpperCase();
  }

  /*
   * Camera models
   */

  const cameraPatterns = [

    /\b(s5\s*iix)\b/i,
 /\b(s5\s*ii)\b/i,
 /\b(gh7)\b/i,
 /\b(gh6)\b/i,
 /\b(g9\s*ii)\b/i,

    /\b(z\d(?:ii|iii|iv|v)?[a-z]?)\b/i,

    /\b(d\d{3,4})\b/i,

   /\b(a(?:1|9|7|6\d{3}|5\d{3})(?:r|s|c)?(?:\s*(?:ii|iii|iv|v|2|3|4|5))?)\b/i,

    /\b(eos\s*r\d+[a-z]?)\b/i,

    /\b(r\d+[a-z]?)\b/i,

    /\b(x-h\d+s?)\b/i,

    /\b(x-t\d+)\b/i,

    /\b(x-pro\d)\b/i,

    /\b(x-e\d)\b/i,

    /\b(gfx\s*100\s*ii)\b/i,

    /\b(gfx\s*\d+s?)\b/i,

  ];

  for (const pattern of cameraPatterns) {

    const match =
      value.match(pattern);

    if (match?.[1]) {

      return match[1]
        .toUpperCase()
        .replace(/\s+/g, " ");

    }

  }
  console.log(
  "MODEL TEST:",
  value,
  "=>",
  cameraPatterns
    .map(pattern => value.match(pattern)?.[1])
    .filter(Boolean)
);

  return null;

}

function extractModelRevision(
  value: string
): string | null {
  if (/\bmax\b/.test(value)) {
    return "max";
  }

  if (/\bultra\b/.test(value)) {
    return "ultra";
  }

  return null;
}

function extractModelVariant(
  value: string
): string | null {
  /*
   * Do not return "standard" when the query does not
   * explicitly name a variant.
   *
   * A vague "MacBook" query must remain ambiguous.
   */
  if (/\bpro\s+max\b/.test(value)) {
    return "pro-max";
  }

  if (/\bpro\b/.test(value)) {
    return "pro";
  }

  if (/\bair\b/.test(value)) {
    return "air";
  }

  if (/\bplus\b/.test(value)) {
    return "plus";
  }

  if (/\bultra\b/.test(value)) {
    return "ultra";
  }

  if (/\bmini\b/.test(value)) {
    return "mini";
  }

  return null;
}

function extractSku(
  value: string
): string | null {
  const matches = value.match(
    /\b(?=[a-z0-9-]*[a-z])(?=[a-z0-9-]*\d)[a-z0-9]{3,}(?:-[a-z0-9]+)*\b/g
  );

  if (!matches) {
    return null;
  }

  const excludedPatterns = [
    /^\d+gb$/,
    /^\d+tb$/,
    /^\d{4}$/,
    /^m[1-9]$/,
    /^\d+-core$/,
    /^\d+(?:\.\d+)?ghz$/,
  ];

  const sku = matches.find(
    (match) =>
      !excludedPatterns.some((pattern) =>
        pattern.test(match)
      )
  );

  return sku ?? null;
}

function extractYear(
  value: string
): string | null {
  return (
    value.match(/\b(20[1-3]\d)\b/)?.[1] ??
    null
  );
}

function capacityToGB(value: string): number {
  const amount = Number.parseFloat(value);

  if (!Number.isFinite(amount)) {
    return 0;
  }

  return value.endsWith("tb")
    ? amount * 1024
    : amount;
}

function extractCapacities(
  value: string
): string[] {
  return Array.from(
    value.matchAll(
      /\b(\d+(?:\.\d+)?)\s*(tb|gb)\b/g
    )
  ).map((match) =>
    normaliseCapacity(
      match[1],
      match[2]
    )
  );
}

function extractMemory(
  value: string
): string | null {
  const ramAfterCapacity = value.match(
    /\b(\d+(?:\.\d+)?)\s*gb\s*(?:ram|memory|unified memory)\b/
  );

  if (ramAfterCapacity?.[1]) {
    return normaliseCapacity(
      ramAfterCapacity[1],
      "gb"
    );
  }

  const ramBeforeCapacity = value.match(
    /\b(?:ram|memory|unified memory)\s*(?:of\s*)?(\d+(?:\.\d+)?)\s*gb\b/
  );

  if (ramBeforeCapacity?.[1]) {
    return normaliseCapacity(
      ramBeforeCapacity[1],
      "gb"
    );
  }

  const capacities =
    extractCapacities(value);

  /*
   * When two unlabelled capacities are present,
   * the smaller value is normally RAM:
   *
   * 16GB 512GB -> 16GB RAM
   * 32GB 1TB   -> 32GB RAM
   */
  if (capacities.length === 2) {
    const sorted = [...capacities].sort(
      (a, b) =>
        capacityToGB(a) -
        capacityToGB(b)
    );

    return sorted[0];
  }

  return null;
}

function extractStorage(
  value: string
): string | null {
  const explicitStorage = value.match(
    /\b(\d+(?:\.\d+)?)\s*(tb|gb)\s*(?:ssd|storage|hdd|drive)\b/
  );

  if (
    explicitStorage?.[1] &&
    explicitStorage[2]
  ) {
    return normaliseCapacity(
      explicitStorage[1],
      explicitStorage[2]
    );
  }

  const storageBeforeCapacity =
    value.match(
      /\b(?:ssd|storage|hdd|drive)\s*(\d+(?:\.\d+)?)\s*(tb|gb)\b/
    );

  if (
    storageBeforeCapacity?.[1] &&
    storageBeforeCapacity[2]
  ) {
    return normaliseCapacity(
      storageBeforeCapacity[1],
      storageBeforeCapacity[2]
    );
  }

  const capacities =
    extractCapacities(value);

  if (capacities.length === 0) {
    return null;
  }

  /*
   * A single unlabelled capacity is usually storage.
   *
   * Examples:
   * iPhone 256GB
   * SSD 1TB
   */
  if (capacities.length === 1) {
    return capacities[0];
  }

  /*
   * When multiple capacities are present,
   * use the largest one as storage.
   */
  const sorted = [...capacities].sort(
    (a, b) =>
      capacityToGB(a) -
      capacityToGB(b)
  );

  return sorted[sorted.length - 1];
}

function extractScreenSize(
  value: string
): string | null {
  const match = value.match(
    /\b(\d{1,2}(?:\.\d+)?)\s*(?:inch|inches|in)\b/
  );

  return match?.[1] ?? null;
}

function extractConnectivity(
  value: string
): string | null {
  if (
    /\b(?:cellular|4g|5g|lte)\b/.test(
      value
    )
  ) {
    return "wifi-cellular";
  }

  if (/\bwifi\b/.test(value)) {
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
        containsPhrase(value, alias)
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
      containsPhrase(value, term)
    )
  ) {
    return "refurbished";
  }

  if (
    USED_TERMS.some((term) =>
      containsPhrase(value, term)
    )
  ) {
    return "used";
  }

  if (containsPhrase(value, "new")) {
    return "new";
  }

  /*
   * A missing condition must remain unknown.
   * It must not silently become new.
   */
  return "unknown";
}

function extractBundle(
  value: string
): ProductBundle {
  if (
    /\b(?:body only|camera body)\b/.test(
      value
    )
  ) {
    return "body-only";
  }

  if (
    /\b(?:lens kit|kit lens|with \d{1,3}(?:-\d{1,3})?mm lens)\b/.test(
      value
    )
  ) {
    return "lens-kit";
  }

  if (
    /\b(?:bundle|includes|with accessories)\b/.test(
      value
    )
  ) {
    return "bundle";
  }

  return "unknown";
}

function normaliseCapacity(
  amount: string,
  unit: string
): string {
  const numericAmount =
    Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return `${amount}${unit}`;
  }

  return `${numericAmount}${unit}`;
}

function containsPhrase(
  value: string,
  phrase: string
): boolean {
  const escaped =
    escapeRegExp(
      normaliseText(phrase)
    ).replace(/\s+/g, "\\s+");

  return new RegExp(
    `(?:^|\\s)${escaped}(?:$|\\s)`
  ).test(value);
}

function normaliseText(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/\bmacdbook\b/g, "macbook")
    .replace(/(\d)\s*["”]/g, "$1 inch ")
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