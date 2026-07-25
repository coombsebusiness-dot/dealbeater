import type {
  FingerprintPatch,
  ProductModelFingerprint,
} from "../types";

function normaliseSpaces(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function extractBrand(title: string): string | null {
  const brands: Array<{
    pattern: RegExp;
    brand: string;
  }> = [
    { pattern: /\bapple\b/i, brand: "Apple" },
    { pattern: /\bsamsung\b/i, brand: "Samsung" },
    { pattern: /\bgoogle\b/i, brand: "Google" },
    { pattern: /\boneplus\b/i, brand: "OnePlus" },
    { pattern: /\bxiaomi\b/i, brand: "Xiaomi" },
    { pattern: /\bnothing\b/i, brand: "Nothing" },
    { pattern: /\bmotorola\b/i, brand: "Motorola" },
    { pattern: /\bsony\b/i, brand: "Sony" },
    { pattern: /\bhonor\b/i, brand: "Honor" },
    { pattern: /\boppo\b/i, brand: "Oppo" },
  ];

  for (const entry of brands) {
    if (entry.pattern.test(title)) {
      return entry.brand;
    }
  }

  return null;
}

function extractFamily(title: string): string | null {
  const families: Array<{
    pattern: RegExp;
    family: string;
  }> = [
    // Apple
    { pattern: /\biphone\b/i, family: "iPhone" },

    // Samsung — most specific first
    {
      pattern: /\bgalaxy\s+z\s*fold/i,
      family: "Galaxy Z Fold",
    },
    {
      pattern: /\bgalaxy\s+z\s*flip/i,
      family: "Galaxy Z Flip",
    },
    {
      pattern: /\bgalaxy\s+s\d+/i,
      family: "Galaxy S",
    },
    {
      pattern: /\bgalaxy\s+a\d+/i,
      family: "Galaxy A",
    },

    // Google
    {
      pattern: /\bpixel\s+fold\b/i,
      family: "Pixel Fold",
    },
    {
      pattern: /\bpixel\s+\d/i,
      family: "Pixel",
    },

    // OnePlus
    {
      pattern: /\boneplus\s+nord\b/i,
      family: "OnePlus Nord",
    },
    {
      pattern: /\boneplus\s+\d/i,
      family: "OnePlus",
    },

    // Xiaomi sub-brands before Xiaomi
    {
      pattern: /\bredmi\s+note\b/i,
      family: "Redmi Note",
    },
    {
      pattern: /\bpoco\s+x/i,
      family: "Poco X",
    },
    {
      pattern: /\bxiaomi\s+\d/i,
      family: "Xiaomi",
    },

    // Nothing
    {
      pattern: /\bnothing\s+phone\b/i,
      family: "Nothing Phone",
    },

    // Motorola
    {
      pattern: /\bmotorola\s+razr\b/i,
      family: "Motorola Razr",
    },
    {
      pattern: /\bmotorola\s+edge\b/i,
      family: "Motorola Edge",
    },

    // Sony
    {
      pattern: /\bxperia\b/i,
      family: "Xperia",
    },

    // Honor
    {
      pattern: /\bhonor\s+magic/i,
      family: "Honor Magic",
    },

    // Oppo
    {
      pattern: /\boppo\s+find\s+x/i,
      family: "Oppo Find X",
    },
  ];

  for (const entry of families) {
    if (entry.pattern.test(title)) {
      return entry.family;
    }
  }

  return null;
}

function extractSku(title: string): string | null {
  const patterns = [
    /\bSM-[A-Z0-9-]+\b/i,
    /\b[A-Z]{2,5}-[A-Z0-9]{3,12}\b/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match?.[0]) {
      return match[0].toUpperCase();
    }
  }

  return null;
}

function createModel(
  base: string | null,
  variant: string | null = null,
  revision: string | null = null,
  sku: string | null = null
): ProductModelFingerprint {
  return {
    base,
    revision,
    variant,
    sku,
  };
}

function extractPhoneModel(
  title: string,
  family: string | null
): ProductModelFingerprint {
  const sku = extractSku(title);

  // =========================================================
  // Apple iPhone
  // =========================================================

  if (family === "iPhone") {
    const seMatch = title.match(
      /\biPhone\s+SE(?:\s+(1st|2nd|3rd)\s+Generation)?\b/i
    );

    if (seMatch) {
      return createModel(
        "iPhone SE",
        null,
        seMatch[1]
          ? `${seMatch[1]} Generation`
          : null,
        sku
      );
    }

    const match = title.match(
      /\biPhone\s+(\d{1,2})(?:\s+(Pro\s+Max|Pro|Plus|Mini))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `iPhone ${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // Samsung Galaxy
  // =========================================================

  if (family === "Galaxy S") {
  const match = title.match(
  /\bGalaxy\s+S(\d{1,2})(?:\s*(\+)|\s+(Ultra|FE|Plus))?(?=\s|$)/i
);

    if (match?.[1]) {
      const variant =
        match[2] === "+"
          ? "Plus"
          : match[3]
            ? normaliseVariant(match[3])
            : null;

      return createModel(
        `Galaxy S${match[1]}`,
        variant,
        null,
        sku
      );
    }
  }

  if (family === "Galaxy A") {
    const match = title.match(
      /\bGalaxy\s+A(\d{1,3})\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Galaxy A${match[1]}`,
        null,
        null,
        sku
      );
    }
  }

  if (family === "Galaxy Z Fold") {
    const match = title.match(
      /\bGalaxy\s+Z\s*Fold\s*(\d+)\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Galaxy Z Fold${match[1]}`,
        null,
        null,
        sku
      );
    }
  }

  if (family === "Galaxy Z Flip") {
    const match = title.match(
      /\bGalaxy\s+Z\s*Flip\s*(\d+)\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Galaxy Z Flip${match[1]}`,
        null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // Google Pixel
  // =========================================================

  if (family === "Pixel Fold") {
    return createModel(
      "Pixel Fold",
      null,
      null,
      sku
    );
  }

  if (family === "Pixel") {
    const match = title.match(
      /\bPixel\s+(\d+[a-z]?)(?:\s+(Pro\s+XL|Pro|XL))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Pixel ${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // OnePlus
  // =========================================================

  if (family === "OnePlus Nord") {
    const match = title.match(
      /\bOnePlus\s+Nord\s+(\d+[A-Za-z]?)\b/i
    );

    if (match?.[1]) {
      return createModel(
        `OnePlus Nord ${match[1]}`,
        null,
        null,
        sku
      );
    }
  }

  if (family === "OnePlus") {
    const match = title.match(
      /\bOnePlus\s+(\d+[A-Za-z]?)(?:\s+(Pro|Ultra|R))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `OnePlus ${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // Xiaomi, Redmi and Poco
  // =========================================================

  if (family === "Redmi Note") {
    const match = title.match(
  /\bRedmi\s+Note\s+(\d+)(?:\s+(Pro\+|Pro\s+Plus|Pro))?(?=\s|$)/i
);

    if (match?.[1]) {
      return createModel(
        `Redmi Note ${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  if (family === "Poco X") {
    const match = title.match(
      /\bPoco\s+X(\d+)(?:\s+(Pro|Ultra))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Poco X${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  if (family === "Xiaomi") {
    const match = title.match(
      /\bXiaomi\s+(\d+[A-Za-z]?)(?:\s+(Ultra|Pro|Lite))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Xiaomi ${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // Nothing
  // =========================================================

  if (family === "Nothing Phone") {
    const match = title.match(
      /\bNothing\s+Phone\s+\(([^)]+)\)/i
    );

    if (match?.[1]) {
      return createModel(
        `Phone (${match[1]})`,
        null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // Motorola
  // =========================================================

  if (family === "Motorola Razr") {
    const match = title.match(
      /\bMotorola\s+Razr\s+(\d+)(?:\s+(Ultra|Plus))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Razr ${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  if (family === "Motorola Edge") {
    const match = title.match(
      /\bMotorola\s+Edge\s+(\d+)(?:\s+(Ultra|Pro|Fusion|Neo))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Edge ${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // Sony Xperia
  // =========================================================

  if (family === "Xperia") {
    const match = title.match(
      /\bXperia\s+(\d+)(?:\s+(I|II|III|IV|V|VI|VII))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Xperia ${match[1]}`,
        null,
        match[2]?.toUpperCase() ?? null,
        sku
      );
    }
  }

  // =========================================================
  // Honor
  // =========================================================

  if (family === "Honor Magic") {
    const match = title.match(
      /\bHonor\s+Magic\s?(\d+)(?:\s+(Pro|Lite|Ultimate))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Magic${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  // =========================================================
  // Oppo
  // =========================================================

  if (family === "Oppo Find X") {
    const match = title.match(
      /\bOppo\s+Find\s+X(\d+)(?:\s+(Pro|Ultra|Lite))?\b/i
    );

    if (match?.[1]) {
      return createModel(
        `Find X${match[1]}`,
        match[2]
          ? normaliseVariant(match[2])
          : null,
        null,
        sku
      );
    }
  }

  return createModel(
    family,
    null,
    null,
    sku
  );
}

function normaliseVariant(value: string): string {
  const normalised = normaliseSpaces(value);

  if (/^pro\s*\+$/i.test(normalised)) {
    return "Pro Plus";
  }

  if (/^pro\s+plus$/i.test(normalised)) {
    return "Pro Plus";
  }

  if (/^pro\s+max$/i.test(normalised)) {
    return "Pro Max";
  }

  if (/^pro\s+xl$/i.test(normalised)) {
    return "Pro XL";
  }

  if (/^plus$/i.test(normalised)) {
    return "Plus";
  }

  if (/^ultra$/i.test(normalised)) {
    return "Ultra";
  }

  if (/^pro$/i.test(normalised)) {
    return "Pro";
  }

  if (/^fe$/i.test(normalised)) {
    return "FE";
  }

  if (/^mini$/i.test(normalised)) {
    return "Mini";
  }

  return normalised;
}

function extractMemory(title: string): string | null {
  const explicitRam = title.match(
    /\b(\d{1,3})\s*GB\s+(?:RAM|Memory)\b/i
  );

  if (explicitRam?.[1]) {
    return `${explicitRam[1]}GB`;
  }

  return null;
}

function extractStorage(title: string): string | null {
  const labelledStorage = title.match(
    /\b(\d+(?:\.\d+)?)\s*(TB|GB)\s*(?:Storage|ROM)\b/i
  );

  if (labelledStorage?.[1] && labelledStorage[2]) {
    return `${labelledStorage[1]}${labelledStorage[2].toUpperCase()}`;
  }

  const capacities = [
    ...title.matchAll(
      /\b(\d+(?:\.\d+)?)\s*(TB|GB)\b/gi
    ),
  ];

  let best: {
    value: string;
    sizeInGb: number;
  } | null = null;

  for (const capacity of capacities) {
    const fullMatch = capacity[0];
    const amount = Number(capacity[1]);
    const unit = capacity[2].toUpperCase();

    const afterCapacity = title.slice(
      (capacity.index ?? 0) + fullMatch.length
    );

    // Do not treat explicitly labelled RAM as storage.
    if (/^\s+(?:RAM|Memory)\b/i.test(afterCapacity)) {
      continue;
    }

    const sizeInGb =
      unit === "TB"
        ? amount * 1024
        : amount;

    if (!best || sizeInGb > best.sizeInGb) {
      best = {
        value: `${capacity[1]}${unit}`,
        sizeInGb,
      };
    }
  }

  return best?.value ?? null;
}

function extractColour(title: string): string | null {
  const colours: Array<{
    pattern: RegExp;
    value: string;
  }> = [
    // Multi-word colours must come first.
    {
      pattern: /\bnatural\s+titanium\b/i,
      value: "Natural Titanium",
    },
    {
      pattern: /\bdesert\s+titanium\b/i,
      value: "Desert Titanium",
    },
    {
      pattern: /\bblue\s+titanium\b/i,
      value: "Blue Titanium",
    },
    {
      pattern: /\btitanium\s+black\b/i,
      value: "Titanium Black",
    },
    {
      pattern: /\btitanium\s+grey\b/i,
      value: "Titanium Grey",
    },
    {
      pattern: /\btitanium\s+gray\b/i,
      value: "Titanium Grey",
    },
    {
      pattern: /\bsilver\s+shadow\b/i,
      value: "Silver Shadow",
    },
    {
      pattern: /\bawesome\s+navy\b/i,
      value: "Awesome Navy",
    },
    {
      pattern: /\bmidnight\s+ocean\b/i,
      value: "Midnight Ocean",
    },
    {
      pattern: /\bsilky\s+black\b/i,
      value: "Silky Black",
    },
    {
      pattern: /\bmercurial\s+silver\b/i,
      value: "Mercurial Silver",
    },
    {
      pattern: /\bmidnight\s+black\b/i,
      value: "Midnight Black",
    },
    {
      pattern: /\bdark\s+grey\b/i,
      value: "Dark Grey",
    },
    {
      pattern: /\bdark\s+gray\b/i,
      value: "Dark Grey",
    },
    {
      pattern: /\bmidnight\s+blue\b/i,
      value: "Midnight Blue",
    },
    {
      pattern: /\bluxe\s+lavender\b/i,
      value: "Luxe Lavender",
    },
    {
      pattern: /\bkhaki\s+green\b/i,
      value: "Khaki Green",
    },
    {
      pattern: /\blunar\s+shadow\s+grey\b/i,
      value: "Lunar Shadow Grey",
    },
    {
      pattern: /\blunar\s+shadow\s+gray\b/i,
      value: "Lunar Shadow Grey",
    },
    {
      pattern: /\bspace\s+black\b/i,
      value: "Space Black",
    },
    {
      pattern: /\bphantom\s+black\b/i,
      value: "Phantom Black",
    },
    {
      pattern: /\bsierra\s+blue\b/i,
      value: "Sierra Blue",
    },

    // Manufacturer colours.
    {
      pattern: /\bporcelain\b/i,
      value: "Porcelain",
    },
    {
      pattern: /\bobsidian\b/i,
      value: "Obsidian",
    },
    {
      pattern: /\bstarlight\b/i,
      value: "Starlight",
    },
    {
      pattern: /\bgraphite\b/i,
      value: "Graphite",
    },
    {
      pattern: /\bmidnight\b/i,
      value: "Midnight",
    },
    {
      pattern: /\bhazel\b/i,
      value: "Hazel",
    },
    {
      pattern: /\bnavy\b/i,
      value: "Navy",
    },
    {
      pattern: /\bmint\b/i,
      value: "Mint",
    },
    {
      pattern: /\baloe\b/i,
      value: "Aloe",
    },
    {
      pattern: /\bmilk\b/i,
      value: "Milk",
    },
    {
      pattern: /\bbay\b/i,
      value: "Bay",
    },

    // Generic colours last.
    {
      pattern: /\bblack\b/i,
      value: "Black",
    },
    {
      pattern: /\bwhite\b/i,
      value: "White",
    },
    {
      pattern: /\bsilver\b/i,
      value: "Silver",
    },
    {
      pattern: /\bgrey\b/i,
      value: "Grey",
    },
    {
      pattern: /\bgray\b/i,
      value: "Grey",
    },
    {
      pattern: /\bblue\b/i,
      value: "Blue",
    },
    {
      pattern: /\bgreen\b/i,
      value: "Green",
    },
    {
      pattern: /\bgold\b/i,
      value: "Gold",
    },
    {
      pattern: /\btitanium\b/i,
      value: "Titanium",
    },
  ];

  for (const colour of colours) {
    if (colour.pattern.test(title)) {
      return colour.value;
    }
  }

  return null;
}

function extractConnectivity(title: string): string[] {
  const connectivity: string[] = [];

  const checks: Array<{
    pattern: RegExp;
    value: string;
  }> = [
    { pattern: /\b5G\b/i, value: "5G" },
    { pattern: /\b4G\b/i, value: "4G" },
    { pattern: /\bLTE\b/i, value: "LTE" },
    { pattern: /\bWi[\s-]?Fi\s*7\b/i, value: "Wi-Fi 7" },
    { pattern: /\bWi[\s-]?Fi\s*6E\b/i, value: "Wi-Fi 6E" },
    { pattern: /\bWi[\s-]?Fi\s*6\b/i, value: "Wi-Fi 6" },
    { pattern: /\bBluetooth\s*5\.4\b/i, value: "Bluetooth 5.4" },
    { pattern: /\bBluetooth\s*5\.3\b/i, value: "Bluetooth 5.3" },
    { pattern: /\bUSB[\s-]?C\b/i, value: "USB-C" },
  ];

  for (const check of checks) {
    if (
      check.pattern.test(title) &&
      !connectivity.includes(check.value)
    ) {
      connectivity.push(check.value);
    }
  }

  return connectivity;
}

export function parsePhoneFingerprint(
  title: string
): FingerprintPatch {
  const cleanedTitle = normaliseSpaces(title);

  const brand = extractBrand(cleanedTitle);
  const family = extractFamily(cleanedTitle);

  return {
    brand,
    family,
    productType: "phone",

    model: extractPhoneModel(
      cleanedTitle,
      family
    ),

    specs: {
      memory: extractMemory(cleanedTitle),
      storage: extractStorage(cleanedTitle),
      colour: extractColour(cleanedTitle),
      connectivity:
        extractConnectivity(cleanedTitle),
    },
  };
}