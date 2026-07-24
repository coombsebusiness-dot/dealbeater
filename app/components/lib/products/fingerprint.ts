export type ProductType =
  | "laptop"
  | "phone"
  | "tablet"
  | "camera"
  | "lens"
  | "monitor"
  | "tv"
  | "gpu"
  | "cpu"
  | "motherboard"
  | "memory"
  | "storage"
  | "console"
  | "watch"
  | "headphones"
  | "accessory"
  | "unknown";

export type ProductCondition =
  | "new"
  | "used"
  | "refurbished"
  | "open-box"
  | "unknown";

export interface ProductModelFingerprint {
  base: string | null;
  revision: string | null;
  variant: string | null;
  sku: string | null;
}

export interface ProductSpecsFingerprint {
  storage: string | null;
  memory: string | null;
  colour: string | null;
  screenSize: string | null;
  connectivity: string[];
}

export interface ProductBundleFingerprint {
  isBundle: boolean;
  items: string[];
}

export interface ProductFingerprint {
  originalTitle: string;
  normalisedTitle: string;

  brand: string | null;
  family: string | null;
  productType: ProductType;

  model: ProductModelFingerprint;
  specs: ProductSpecsFingerprint;

  condition: ProductCondition;
  bundle: ProductBundleFingerprint;

  tokens: string[];
}

const KNOWN_BRANDS = [
  "Apple",
  "Samsung",
  "Sony",
  "Canon",
  "Nikon",
  "Fujifilm",
  "Panasonic",
  "Olympus",
  "OM System",
  "Leica",
  "GoPro",
  "DJI",
  "Google",
  "Microsoft",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "MSI",
  "Razer",
  "LG",
  "Philips",
  "Hisense",
  "TCL",
  "Huawei",
  "Honor",
  "OnePlus",
  "Xiaomi",
  "Motorola",
  "Nothing",
  "Nvidia",
  "AMD",
  "Intel",
  "Corsair",
  "Kingston",
  "Crucial",
  "Western Digital",
  "WD",
  "Seagate",
  "SanDisk",
  "Logitech",
  "Bose",
  "JBL",
  "Sennheiser",
  "Beats",
  "Nintendo",
  "Meta",
];

const COLOURS = [
  "black",
  "white",
  "silver",
  "grey",
  "gray",
  "space grey",
  "space gray",
  "gold",
  "rose gold",
  "blue",
  "green",
  "red",
  "pink",
  "purple",
  "yellow",
  "orange",
  "graphite",
  "starlight",
  "midnight",
  "natural titanium",
  "black titanium",
  "white titanium",
  "blue titanium",
  "titanium",
];

const BUNDLE_TERMS = [
  "bundle",
  "kit",
  "with case",
  "with bag",
  "with charger",
  "with lens",
  "with controller",
  "with keyboard",
  "with mouse",
  "starter pack",
];

const ACCESSORY_TERMS = [
  "case",
  "cover",
  "screen protector",
  "charger",
  "charging cable",
  "adapter",
  "stand",
  "mount",
  "replacement",
  "battery",
  "strap",
  "bag",
  "remote",
  "keyboard",
  "mouse",
];

const CONNECTIVITY_TERMS = [
  "wifi",
  "wi-fi",
  "5g",
  "4g",
  "lte",
  "bluetooth",
  "cellular",
  "ethernet",
  "thunderbolt",
  "usb-c",
  "usb c",
  "hdmi",
];

function normaliseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function normaliseTitle(title: string): string {
  return normaliseWhitespace(
    title
      .toLowerCase()
      .replace(/[()[\]{}|]/g, " ")
      .replace(/[–—]/g, "-")
      .replace(/,/g, " ")
  );
}

function unique(values: string[]): string[] {
  return [...new Set(values)];
}

function findBrand(title: string): string | null {
  const normalised = title.toLowerCase();

  const sortedBrands = [...KNOWN_BRANDS].sort(
    (a, b) => b.length - a.length
  );

  const brand = sortedBrands.find((candidate) =>
    new RegExp(`\\b${escapeRegExp(candidate.toLowerCase())}\\b`, "i").test(
      normalised
    )
  );

  return brand ?? null;
}

function detectProductType(title: string): ProductType {
  const value = title.toLowerCase();

  if (
    /\b(macbook|laptop|notebook|chromebook|vivobook|thinkpad|surface laptop)\b/.test(
      value
    )
  ) {
    return "laptop";
  }

  if (
    /\b(iphone|smartphone|mobile phone|galaxy s\d|pixel \d|phone)\b/.test(
      value
    )
  ) {
    return "phone";
  }

  if (/\b(ipad|tablet|galaxy tab|surface pro)\b/.test(value)) {
    return "tablet";
  }

  if (
    /\b(camera|mirrorless|dslr|camcorder|body only)\b/.test(value)
  ) {
    return "camera";
  }

  if (
    /\b(lens|mm f\/?\d|mm f\d|zoom lens|prime lens)\b/.test(value)
  ) {
    return "lens";
  }

  if (/\b(monitor|display)\b/.test(value)) {
    return "monitor";
  }

  if (/\b(television|smart tv|\btv\b|oled tv|qled tv)\b/.test(value)) {
    return "tv";
  }

  if (
    /\b(rtx\s?\d{4}|gtx\s?\d{3,4}|radeon rx|graphics card|\bgpu\b)\b/.test(
      value
    )
  ) {
    return "gpu";
  }

  if (
    /\b(ryzen\s?\d|intel core|core i[3579]|processor|\bcpu\b)\b/.test(
      value
    )
  ) {
    return "cpu";
  }

  if (/\b(motherboard|mainboard)\b/.test(value)) {
    return "motherboard";
  }

  if (/\b(ddr[345]|ram kit|memory kit)\b/.test(value)) {
    return "memory";
  }

  if (/\b(ssd|hard drive|hdd|nvme|solid state drive)\b/.test(value)) {
    return "storage";
  }

  if (
    /\b(playstation|ps5|ps4|xbox|nintendo switch|games console|console)\b/.test(
      value
    )
  ) {
    return "console";
  }

  if (
    /\b(apple watch|galaxy watch|smartwatch|fitness watch)\b/.test(value)
  ) {
    return "watch";
  }

  if (
    /\b(headphones|earphones|earbuds|airpods|headset)\b/.test(value)
  ) {
    return "headphones";
  }

  if (ACCESSORY_TERMS.some((term) => value.includes(term))) {
    return "accessory";
  }

  return "unknown";
}

function detectCondition(title: string): ProductCondition {
  const value = title.toLowerCase();

  if (/\b(open box|open-box)\b/.test(value)) {
    return "open-box";
  }

  if (
    /\b(refurbished|manufacturer refurbished|seller refurbished|renewed)\b/.test(
      value
    )
  ) {
    return "refurbished";
  }

  if (
    /\b(used|pre-owned|pre owned|second hand|second-hand)\b/.test(
      value
    )
  ) {
    return "used";
  }

  if (
    /\b(brand new|factory sealed|sealed|new condition|\bnew\b)\b/.test(
      value
    )
  ) {
    return "new";
  }

  return "unknown";
}

function extractStorage(title: string): string | null {
  const matches = [
    ...title.matchAll(/\b(\d+(?:\.\d+)?)\s?(tb|gb)\b/gi),
  ];

  if (matches.length === 0) {
    return null;
  }

  const candidates = matches
    .map((match) => ({
      amount: Number(match[1]),
      unit: match[2].toUpperCase(),
      raw: `${match[1]}${match[2].toUpperCase()}`,
    }))
    .filter((candidate) => {
      if (candidate.unit === "TB") {
        return true;
      }

      return candidate.amount >= 64;
    });

  if (candidates.length === 0) {
    return null;
  }

  const storage = candidates.sort((a, b) => {
    const aGb = a.unit === "TB" ? a.amount * 1024 : a.amount;
    const bGb = b.unit === "TB" ? b.amount * 1024 : b.amount;

    return bGb - aGb;
  })[0];

  return storage.raw;
}

function extractMemory(title: string): string | null {
  const patterns = [
    /\b(\d+)\s?gb\s+(?:ram|memory)\b/i,
    /\b(?:ram|memory)\s*[:\-]?\s*(\d+)\s?gb\b/i,
    /\b(\d+)\s?gb\s+ddr[345]\b/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match) {
      return `${match[1]}GB`;
    }
  }

  return null;
}

function extractScreenSize(title: string): string | null {
  const match = title.match(
    /\b(\d{1,2}(?:\.\d)?)\s?(?:"|inch|inches|in)\b/i
  );

  if (!match) {
    return null;
  }

  return `${match[1]}-inch`;
}

function extractColour(title: string): string | null {
  const value = title.toLowerCase();

  const sortedColours = [...COLOURS].sort(
    (a, b) => b.length - a.length
  );

  const colour = sortedColours.find((candidate) =>
    new RegExp(`\\b${escapeRegExp(candidate)}\\b`, "i").test(value)
  );

  if (!colour) {
    return null;
  }

  return colour
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}

function extractConnectivity(title: string): string[] {
  const value = title.toLowerCase();

  return unique(
    CONNECTIVITY_TERMS.filter((term) => value.includes(term)).map(
      normaliseConnectivity
    )
  );
}

function normaliseConnectivity(value: string): string {
  switch (value) {
    case "wi-fi":
      return "Wi-Fi";

    case "wifi":
      return "Wi-Fi";

    case "usb c":
    case "usb-c":
      return "USB-C";

    case "5g":
      return "5G";

    case "4g":
      return "4G";

    case "lte":
      return "LTE";

    case "hdmi":
      return "HDMI";

    default:
      return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

function extractSku(title: string): string | null {
  const patterns = [
    /\bsku\s*[:#-]?\s*([a-z0-9-]{4,})\b/i,
    /\bmodel\s*(?:number|no\.?|#)?\s*[:#-]?\s*([a-z0-9-]{4,})\b/i,
    /\b([a-z]{1,5}\d{2,}[a-z0-9-]*)\b/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match) {
      return match[1].toUpperCase();
    }
  }

  return null;
}

function extractModelBase(
  title: string,
  productType: ProductType
): string | null {
  const patternsByType: Partial<Record<ProductType, RegExp[]>> = {
    laptop: [
      /\b(macbook\s+(?:air|pro)(?:\s+m[1-9](?:\s+(?:pro|max|ultra))?)?)\b/i,
      /\b(vivobook\s+\w+(?:-\w+)*)\b/i,
      /\b(thinkpad\s+\w+(?:\s+\w+)*)\b/i,
      /\b(surface\s+laptop\s+\d+)\b/i,
    ],

    phone: [
      /\b(iphone\s+\d+(?:\s+(?:pro|max|plus|mini|e))*)\b/i,
      /\b(galaxy\s+s\d+(?:\s+(?:ultra|plus|\+|fe))*)\b/i,
      /\b(pixel\s+\d+(?:\s+(?:pro|a|xl))*)\b/i,
    ],

    tablet: [
      /\b(ipad\s+(?:pro|air|mini)?\s*\d*)\b/i,
      /\b(galaxy\s+tab\s+\w+(?:\s+\w+)*)\b/i,
    ],

    camera: [
      /\b(eos\s+[a-z0-9-]+)\b/i,
      /\b(alpha\s+[a-z0-9-]+)\b/i,
      /\b(a7[rcs]?\s*(?:ii|iii|iv|v)?)\b/i,
      /\b(x-t\d+|x-h\d+|x-s\d+|gfx\s*\d+[a-z]*)\b/i,
      /\b(z\s?\d+[a-z]*)\b/i,
    ],

    gpu: [
      /\b(rtx\s?\d{4}(?:\s?ti|\s?super)?)\b/i,
      /\b(gtx\s?\d{3,4}(?:\s?ti|\s?super)?)\b/i,
      /\b(rx\s?\d{4}(?:\s?xt|\s?xtx)?)\b/i,
    ],

    cpu: [
      /\b(ryzen\s+[3579]\s+\d{4,5}[a-z0-9]*)\b/i,
      /\b(core\s+i[3579][-\s]?\d{4,5}[a-z0-9]*)\b/i,
    ],

    console: [
      /\b(playstation\s*5(?:\s+slim|\s+pro|\s+digital)?)\b/i,
      /\b(ps5(?:\s+slim|\s+pro|\s+digital)?)\b/i,
      /\b(xbox\s+series\s+[sx])\b/i,
      /\b(nintendo\s+switch(?:\s+oled|\s+lite)?)\b/i,
    ],

    headphones: [
      /\b(airpods\s+(?:pro|max|\d+)(?:\s+\d+(?:st|nd|rd|th)\s+generation)?)\b/i,
      /\b(wh-\d+xm\d)\b/i,
      /\b(wf-\d+xm\d)\b/i,
    ],
  };

  const patterns = patternsByType[productType] ?? [];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match) {
      return normaliseWhitespace(match[1]);
    }
  }

  return null;
}

function extractRevision(title: string): string | null {
  const patterns = [
    /\b(mark\s+(?:ii|iii|iv|v|vi))\b/i,
    /\b(mk\s?(?:ii|iii|iv|v|vi|2|3|4|5|6))\b/i,
    /\b(gen(?:eration)?\s*\d+)\b/i,
    /\b(\d+(?:st|nd|rd|th)\s+generation)\b/i,
    /\b(202[0-9]\s+model)\b/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match) {
      return normaliseWhitespace(match[1]);
    }
  }

  return null;
}

function extractVariant(title: string): string | null {
  const variants = [
    "ultra",
    "pro max",
    "pro",
    "plus",
    "mini",
    "max",
    "slim",
    "digital edition",
    "digital",
    "oled",
    "lite",
    "super",
    "xtx",
    "xt",
    "ti",
  ];

  const value = title.toLowerCase();

  const variant = variants
    .sort((a, b) => b.length - a.length)
    .find((candidate) =>
      new RegExp(`\\b${escapeRegExp(candidate)}\\b`, "i").test(value)
    );

  if (!variant) {
    return null;
  }

  return variant
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}

function extractFamily(
  title: string,
  brand: string | null,
  productType: ProductType
): string | null {
  const value = title.toLowerCase();

  const familyPatterns: Array<[RegExp, string]> = [
    [/\bmacbook air\b/i, "MacBook Air"],
    [/\bmacbook pro\b/i, "MacBook Pro"],
    [/\biphone\b/i, "iPhone"],
    [/\bipad pro\b/i, "iPad Pro"],
    [/\bipad air\b/i, "iPad Air"],
    [/\bipad mini\b/i, "iPad Mini"],
    [/\bgalaxy s\b/i, "Galaxy S"],
    [/\bgalaxy tab\b/i, "Galaxy Tab"],
    [/\bpixel\b/i, "Pixel"],
    [/\bplaystation\b|\bps5\b/i, "PlayStation"],
    [/\bxbox series\b/i, "Xbox Series"],
    [/\bnintendo switch\b/i, "Nintendo Switch"],
    [/\bairpods\b/i, "AirPods"],
    [/\bthinkpad\b/i, "ThinkPad"],
    [/\bvivobook\b/i, "Vivobook"],
    [/\bsurface laptop\b/i, "Surface Laptop"],
  ];

  for (const [pattern, family] of familyPatterns) {
    if (pattern.test(value)) {
      return family;
    }
  }

  if (brand && productType !== "unknown") {
    return `${brand} ${toTitleCase(productType)}`;
  }

  return null;
}

function extractBundle(title: string): ProductBundleFingerprint {
  const value = title.toLowerCase();

  const items = BUNDLE_TERMS.filter((term) => value.includes(term));

  return {
    isBundle: items.length > 0,
    items: unique(items.map(toTitleCase)),
  };
}

function createTokens(title: string): string[] {
  return unique(
    normaliseTitle(title)
      .split(" ")
      .map((token) => token.trim())
      .filter((token) => token.length > 1)
  );
}

function toTitleCase(value: string): string {
  return value
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function createProductFingerprintV2(
  title: string
): ProductFingerprint {
  const cleanTitle = normaliseWhitespace(title);
  const normalisedTitle = normaliseTitle(cleanTitle);

  const brand = findBrand(cleanTitle);
  const productType = detectProductType(cleanTitle);

  return {
    originalTitle: cleanTitle,
    normalisedTitle,

    brand,
    family: extractFamily(cleanTitle, brand, productType),
    productType,

    model: {
      base: extractModelBase(cleanTitle, productType),
      revision: extractRevision(cleanTitle),
      variant: extractVariant(cleanTitle),
      sku: extractSku(cleanTitle),
    },

    specs: {
      storage: extractStorage(cleanTitle),
      memory: extractMemory(cleanTitle),
      colour: extractColour(cleanTitle),
      screenSize: extractScreenSize(cleanTitle),
      connectivity: extractConnectivity(cleanTitle),
    },

    condition: detectCondition(cleanTitle),
    bundle: extractBundle(cleanTitle),

    tokens: createTokens(cleanTitle),
  };
}