import type {
  FingerprintPatch,
  ProductModelFingerprint,
} from "../types";

const LAPTOP_BRANDS = [
  "Apple",
  "ASUS",
  "Acer",
  "Dell",
  "HP",
  "Lenovo",
  "Microsoft",
  "Samsung",
  "MSI",
  "Razer",
  "LG",
  "Huawei",
  "Honor",
  "Gigabyte",
  "Medion",
  "Alienware",
] as const;

function normaliseSpaces(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function extractBrand(title: string): string | null {
  const brandAliases: Array<{
    pattern: RegExp;
    brand: string;
  }> = [
    { pattern: /\bapple\b/i, brand: "Apple" },
    { pattern: /\basus\b/i, brand: "ASUS" },
    { pattern: /\bacer\b/i, brand: "Acer" },
    { pattern: /\bdell\b/i, brand: "Dell" },
    { pattern: /\bhp\b/i, brand: "HP" },
    { pattern: /\bhewlett[\s-]?packard\b/i, brand: "HP" },
    { pattern: /\blenovo\b/i, brand: "Lenovo" },
    { pattern: /\bmicrosoft\b/i, brand: "Microsoft" },
    { pattern: /\bsamsung\b/i, brand: "Samsung" },
    { pattern: /\bmsi\b/i, brand: "MSI" },
    { pattern: /\brazer\b/i, brand: "Razer" },
    { pattern: /\blg\b/i, brand: "LG" },
    { pattern: /\bhuawei\b/i, brand: "Huawei" },
    { pattern: /\bhonor\b/i, brand: "Honor" },
    { pattern: /\bgigabyte\b/i, brand: "Gigabyte" },
    { pattern: /\bmedion\b/i, brand: "Medion" },
    { pattern: /\balienware\b/i, brand: "Alienware" },
  ];

  for (const entry of brandAliases) {
    if (entry.pattern.test(title)) {
      return entry.brand;
    }
  }

  return null;
}

function extractFamily(title: string): string | null {
  const familyPatterns: Array<{
    pattern: RegExp;
    family: string;
  }> = [
    { pattern: /\bmacbook\s+pro\b/i, family: "MacBook Pro" },
    { pattern: /\bmacbook\s+air\b/i, family: "MacBook Air" },
    { pattern: /\bmacbook\b/i, family: "MacBook" },

    { pattern: /\bvivobook\b/i, family: "Vivobook" },
    { pattern: /\bzenbook\b/i, family: "Zenbook" },
    { pattern: /\brog\s+strix\b/i, family: "ROG Strix" },
    { pattern: /\brog\s+zephyrus\b/i, family: "ROG Zephyrus" },
    { pattern: /\btuf\s+gaming\b/i, family: "TUF Gaming" },

    { pattern: /\baspire\b/i, family: "Aspire" },
    { pattern: /\bswift\b/i, family: "Swift" },
    { pattern: /\bnitro\b/i, family: "Nitro" },
    { pattern: /\bpredator\s+helios\b/i, family: "Predator Helios" },

    { pattern: /\bxps\b/i, family: "XPS" },
    { pattern: /\binspiron\b/i, family: "Inspiron" },
    { pattern: /\blatitude\b/i, family: "Latitude" },
    { pattern: /\bprecision\b/i, family: "Precision" },
    { pattern: /\bg\d{1,2}\s+gaming\b/i, family: "G Series" },

    { pattern: /\bspectre\b/i, family: "Spectre" },
    { pattern: /\benvy\b/i, family: "Envy" },
    { pattern: /\bpavilion\b/i, family: "Pavilion" },
    { pattern: /\bomen\b/i, family: "Omen" },
    { pattern: /\belitebook\b/i, family: "EliteBook" },
    { pattern: /\bprobook\b/i, family: "ProBook" },

    { pattern: /\bthinkpad\b/i, family: "ThinkPad" },
    { pattern: /\bideapad\b/i, family: "IdeaPad" },
    { pattern: /\byoga\b/i, family: "Yoga" },
    { pattern: /\blegion\b/i, family: "Legion" },
    { pattern: /\bthinkbook\b/i, family: "ThinkBook" },

    { pattern: /\bsurface\s+laptop\b/i, family: "Surface Laptop" },
    { pattern: /\bsurface\s+book\b/i, family: "Surface Book" },
    { pattern: /\bsurface\s+pro\b/i, family: "Surface Pro" },

    { pattern: /\bgalaxy\s+book(?:\d+)?\b/i, family: "Galaxy Book" },

    { pattern: /\bstealth\b/i, family: "Stealth" },
    { pattern: /\braider\b/i, family: "Raider" },
    { pattern: /\bkatana\b/i, family: "Katana" },
    { pattern: /\bcyborg\b/i, family: "Cyborg" },
    { pattern: /\bprestige\b/i, family: "Prestige" },

    { pattern: /\bblade\b/i, family: "Blade" },
    { pattern: /\bgram\b/i, family: "Gram" },
    { pattern: /\bmatebook\b/i, family: "MateBook" },
    { pattern: /\bmagicbook\b/i, family: "MagicBook" },
    { pattern: /\baorus\b/i, family: "AORUS" },
    { pattern: /\bera[z|s]er\b/i, family: "Erazer" },
    { pattern: /\balienware\b/i, family: "Alienware" },
  ];

  for (const entry of familyPatterns) {
    if (entry.pattern.test(title)) {
      return entry.family;
    }
  }

  return null;
}

function extractProcessor(title: string): string | null {
  const patterns = [
    /\bApple\s+M[1-9](?:\s+(?:Pro|Max|Ultra))?\b/i,
    /\bM[1-9]\s+(?:Pro|Max|Ultra)\b/i,
    /\bM[1-9]\b/i,

    /\\bIntel\\s+Core\\s+Ultra\\s+[3579]\\b/i,
    /\bIntel\s+Core\s+Ultra\s+[3579]\s+\d{3}[A-Z]{0,2}\b/i,
    /\bCore\s+Ultra\s+[3579]\b/i,
    /\bCore\s+Ultra\s+[3579]\s+\d{3}[A-Z]{0,2}\b/i,

    /\bIntel\s+Core\s+i[3579][-\s]?\d{4,5}[A-Z]{0,2}\b/i,
    /\bCore\s+i[3579][-\s]?\d{4,5}[A-Z]{0,2}\b/i,
    /\bi[3579][-\s]\d{4,5}[A-Z]{0,2}\b/i,

    /\bAMD\s+Ryzen\s+[3579]\s+\d{4}[A-Z]{0,2}\b/i,
    /\bRyzen\s+[3579]\s+\d{4}[A-Z]{0,2}\b/i,

    /\bSnapdragon\s+X\s+(?:Elite|Plus)\b/i,
    /\bQualcomm\s+Snapdragon\s+[A-Z0-9+\s-]+\b/i,

    /\bIntel\s+Celeron\s+[A-Z0-9-]+\b/i,
    /\bIntel\s+Pentium\s+[A-Z0-9-]+\b/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match?.[0]) {
      let processor = normaliseSpaces(match[0]);

      processor = processor
        .replace(/^Core Ultra/i, "Intel Core Ultra")
        .replace(/^Core i/i, "Intel Core i")
        .replace(/^Ryzen/i, "AMD Ryzen")
        .replace(/^M([1-9])/i, "Apple M$1");

      return processor;
    }
  }

  return null;
}

function extractGraphics(title: string): string | null {
  const patterns = [
    /\bNVIDIA\s+GeForce\s+RTX\s+\d{4}(?:\s+Ti)?\b/i,
    /\bGeForce\s+RTX\s+\d{4}(?:\s+Ti)?\b/i,
    /\bRTX\s+\d{4}(?:\s+Ti)?\b/i,

    /\bNVIDIA\s+GeForce\s+GTX\s+\d{3,4}(?:\s+Ti)?\b/i,
    /\bGeForce\s+GTX\s+\d{3,4}(?:\s+Ti)?\b/i,
    /\bGTX\s+\d{3,4}(?:\s+Ti)?\b/i,

    /\bAMD\s+Radeon\s+RX\s+\d{4}[A-Z]{0,2}\b/i,
    /\bRadeon\s+RX\s+\d{4}[A-Z]{0,2}\b/i,

    /\bIntel\s+Arc\s+[A-Z]\d{3}[A-Z]?\b/i,
    /\bIntel\s+Iris\s+Xe\b/i,
    /\bIntel\s+UHD\s+Graphics\b/i,

    /\bAMD\s+Radeon\s+\d{3,4}M?\b/i,
    /\bRadeon\s+Graphics\b/i,

    /\bApple\s+\d{1,2}-core\s+GPU\b/i,
  ];

  for (const pattern of patterns) {
    const match = title.match(pattern);

    if (match?.[0]) {
      let graphics = normaliseSpaces(match[0]);

      graphics = graphics
        .replace(/^RTX/i, "NVIDIA GeForce RTX")
        .replace(/^GTX/i, "NVIDIA GeForce GTX")
        .replace(/^GeForce/i, "NVIDIA GeForce")
        .replace(/^Radeon RX/i, "AMD Radeon RX");

      return graphics;
    }
  }

  if (/\bintegrated\s+graphics\b/i.test(title)) {
    return "Integrated Graphics";
  }

  return null;
}

function extractMemory(title: string): string | null {
  const explicitMemory = title.match(
    /\b(\d{1,3})\s*GB\s+(?:RAM|Memory)\b/i
  );

  if (explicitMemory?.[1]) {
    return `${explicitMemory[1]}GB`;
  }

  const memoryBeforeStorage = title.match(
    /\b(4|8|12|16|18|24|32|36|48|64|96|128)\s*GB\b(?=.*\b(?:256|512)\s*GB\b|.*\b[1248]\s*TB\b)/i
  );

  if (memoryBeforeStorage?.[1]) {
    return `${memoryBeforeStorage[1]}GB`;
  }

  return null;
}

function extractStorage(title: string): string | null {
  // Prefer storage that is explicitly labelled
  const labelled = title.match(
    /\b(\d+(?:\.\d+)?)\s*(TB|GB)\s*(SSD|HDD|Storage|Solid State)\b/i
  );

  if (labelled) {
    return `${labelled[1]}${labelled[2].toUpperCase()}`;
  }

  // Otherwise collect every capacity
  const matches = [...title.matchAll(/\b(\d+(?:\.\d+)?)\s*(TB|GB)\b/gi)];

  if (!matches.length) {
    return null;
  }

  // Storage is almost always the largest capacity
  let best: { value: string; size: number } | null = null;

  for (const match of matches) {
    const amount = Number(match[1]);
    const unit = match[2].toUpperCase();

    const size =
      unit === "TB"
        ? amount * 1024
        : amount;

    if (!best || size > best.size) {
      best = {
        value: `${match[1]}${unit}`,
        size,
      };
    }
  }

  return best?.value ?? null;
}

function extractScreenSize(title: string): string | null {
  const match = title.match(
    /\b(10(?:\.\d)?|11(?:\.\d)?|12(?:\.\d)?|13(?:\.\d)?|14(?:\.\d)?|15(?:\.\d)?|16(?:\.\d)?|17(?:\.\d)?|18(?:\.\d)?)\s*(?:"|inch(?:es)?|-inch)\b/i
  );

  return match?.[1] ? `${match[1]}"` : null;
}

function extractPanelType(title: string): string | null {
  const panelTypes: Array<{
    pattern: RegExp;
    value: string;
  }> = [
    { pattern: /\bmini[\s-]?led\b/i, value: "Mini-LED" },
    { pattern: /\bqled\b/i, value: "QLED" },
    { pattern: /\bamoled\b/i, value: "AMOLED" },
    { pattern: /\boled\b/i, value: "OLED" },
    { pattern: /\bips\b/i, value: "IPS" },
    { pattern: /\bva\b/i, value: "VA" },
    { pattern: /\btn\b/i, value: "TN" },
    { pattern: /\bliquid\s+retina\s+xdr\b/i, value: "Liquid Retina XDR" },
    { pattern: /\bliquid\s+retina\b/i, value: "Liquid Retina" },
    { pattern: /\bretina\b/i, value: "Retina" },
  ];

  for (const entry of panelTypes) {
    if (entry.pattern.test(title)) {
      return entry.value;
    }
  }

  return null;
}

function extractResolution(title: string): string | null {
  const explicitResolution = title.match(
    /\b(\d{3,4})\s*[x×]\s*(\d{3,4})\b/i
  );

  if (explicitResolution?.[1] && explicitResolution[2]) {
    return `${explicitResolution[1]}x${explicitResolution[2]}`;
  }

  if (/\b4K\b/i.test(title)) {
    return "4K";
  }

  if (/\b3K\b/i.test(title)) {
    return "3K";
  }

  if (/\b2\.8K\b/i.test(title)) {
    return "2.8K";
  }

  if (/\b2\.5K\b/i.test(title)) {
    return "2.5K";
  }

  if (/\b2K\b/i.test(title)) {
    return "2K";
  }

  if (/\bQHD\+\b/i.test(title)) {
    return "QHD+";
  }

  if (/\bQHD\b/i.test(title)) {
    return "QHD";
  }

  if (/\bWQXGA\b/i.test(title)) {
    return "WQXGA";
  }

  if (/\bWUXGA\b/i.test(title)) {
    return "WUXGA";
  }

  if (/\bFHD\+\b/i.test(title)) {
    return "FHD+";
  }

  if (/\bFull\s+HD\b/i.test(title) || /\bFHD\b/i.test(title)) {
    return "Full HD";
  }

  return null;
}

function extractRefreshRate(title: string): string | null {
  const match = title.match(/\b(\d{2,3})\s*Hz\b/i);

  return match?.[1] ? `${match[1]}Hz` : null;
}

function extractOperatingSystem(title: string): string | null {
  const operatingSystems: Array<{
    pattern: RegExp;
    value: string;
  }> = [
    { pattern: /\bWindows\s+11\s+Pro\b/i, value: "Windows 11 Pro" },
    { pattern: /\bWindows\s+11\s+Home\b/i, value: "Windows 11 Home" },
    { pattern: /\bWindows\s+11\b/i, value: "Windows 11" },
    { pattern: /\bWindows\s+10\s+Pro\b/i, value: "Windows 10 Pro" },
    { pattern: /\bWindows\s+10\s+Home\b/i, value: "Windows 10 Home" },
    { pattern: /\bWindows\s+10\b/i, value: "Windows 10" },
    { pattern: /\bChrome\s?OS\b/i, value: "ChromeOS" },
    { pattern: /\bmacOS\b/i, value: "macOS" },
    { pattern: /\bUbuntu\b/i, value: "Ubuntu" },
    { pattern: /\bLinux\b/i, value: "Linux" },
    { pattern: /\bFreeDOS\b/i, value: "FreeDOS" },
    { pattern: /\bNo\s+Operating\s+System\b/i, value: "No OS" },
  ];

  for (const entry of operatingSystems) {
    if (entry.pattern.test(title)) {
      return entry.value;
    }
  }

  return null;
}

function extractColour(title: string): string | null {
  const colours: Array<{
    pattern: RegExp;
    value: string;
  }> = [
    { pattern: /\bspace\s+black\b/i, value: "Space Black" },
    { pattern: /\bspace\s+grey\b/i, value: "Space Grey" },
    { pattern: /\bspace\s+gray\b/i, value: "Space Grey" },
    { pattern: /\bmidnight\b/i, value: "Midnight" },
    { pattern: /\bstarlight\b/i, value: "Starlight" },
    { pattern: /\bsilver\b/i, value: "Silver" },
    { pattern: /\bblack\b/i, value: "Black" },
    { pattern: /\bgrey\b/i, value: "Grey" },
    { pattern: /\bgray\b/i, value: "Grey" },
    { pattern: /\bwhite\b/i, value: "White" },
    { pattern: /\bblue\b/i, value: "Blue" },
    { pattern: /\bgold\b/i, value: "Gold" },
    { pattern: /\bplatinum\b/i, value: "Platinum" },
    { pattern: /\bgraphite\b/i, value: "Graphite" },
    { pattern: /\btitanium\b/i, value: "Titanium" },
  ];

  for (const entry of colours) {
    if (entry.pattern.test(title)) {
      return entry.value;
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
    { pattern: /\bWi[\s-]?Fi\s*7\b/i, value: "Wi-Fi 7" },
    { pattern: /\bWi[\s-]?Fi\s*6E\b/i, value: "Wi-Fi 6E" },
    { pattern: /\bWi[\s-]?Fi\s*6\b/i, value: "Wi-Fi 6" },
    { pattern: /\bBluetooth\s*5\.4\b/i, value: "Bluetooth 5.4" },
    { pattern: /\bBluetooth\s*5\.3\b/i, value: "Bluetooth 5.3" },
    { pattern: /\bBluetooth\s*5\.2\b/i, value: "Bluetooth 5.2" },
    { pattern: /\bThunderbolt\s*5\b/i, value: "Thunderbolt 5" },
    { pattern: /\bThunderbolt\s*4\b/i, value: "Thunderbolt 4" },
    { pattern: /\bUSB[\s-]?C\b/i, value: "USB-C" },
    { pattern: /\bHDMI\s*2\.1\b/i, value: "HDMI 2.1" },
    { pattern: /\bHDMI\b/i, value: "HDMI" },
    { pattern: /\bEthernet\b/i, value: "Ethernet" },
    { pattern: /\b5G\b/i, value: "5G" },
    { pattern: /\b4G\b/i, value: "4G" },
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

function extractLaptopModel(
  title: string,
  brand: string | null,
  family: string | null
): ProductModelFingerprint {
  let cleaned = title;

  if (brand) {
    cleaned = cleaned.replace(
      new RegExp(`^${brand}\\s+`, "i"),
      ""
    );
  }

  cleaned = cleaned
    .replace(/\b(?:laptop|notebook|gaming laptop|ultrabook)\b/gi, " ")
    .replace(
      /\b(?:Intel|AMD|Apple|Qualcomm)\b.*$/i,
      ""
    )
    .replace(
      /\b\d+(?:\.\d+)?\s*(?:GB|TB)\b.*$/i,
      ""
    )
    .replace(
      /\b\d{2}(?:\.\d)?\s*(?:"|inch(?:es)?|-inch)\b.*$/i,
      ""
    );

  cleaned = normaliseSpaces(cleaned);

const skuMatch = title.match(
  /\b[A-Z]{1,5}\d{2,6}[A-Z0-9-]{2,}\b/
);

const sku = skuMatch?.[0] ?? null;

// Apple silicon (M1/M2/M3/M4) and screen size are specs,
// not part of the model base.
if (
  family === "MacBook Air" ||
  family === "MacBook Pro" ||
  family === "MacBook"
) {
  return {
    base: family,
    revision: null,
    variant: null,
    sku,
  };
}

if (family) {
  const familyIndex = title
    .toLowerCase()
    .indexOf(family.toLowerCase());

    if (familyIndex >= 0) {
      const afterFamily = title.slice(familyIndex);

      const modelMatch = afterFamily.match(
        new RegExp(
          `^${family.replace(/\s+/g, "\\s+")}` +
            String.raw`(?:\s+[A-Z0-9][A-Z0-9+\-]{0,15}){0,3}`,
          "i"
        )
      );

      if (modelMatch?.[0]) {
        return {
          base: normaliseSpaces(modelMatch[0]),
          revision: null,
          variant: null,
          sku,
        };
      }
    }

    return {
      base: family,
      revision: null,
      variant: null,
      sku,
    };
  }

  return {
    base: cleaned || null,
    revision: null,
    variant: null,
    sku,
  };
}

export function parseLaptopFingerprint(
  title: string
): FingerprintPatch {
  const cleanedTitle = normaliseSpaces(title);

  const brand = extractBrand(cleanedTitle);
  const family = extractFamily(cleanedTitle);

  return {
    brand,
    family,
    productType: "laptop",

    model: extractLaptopModel(
      cleanedTitle,
      brand,
      family
    ),

    specs: {
      processor: extractProcessor(cleanedTitle),
      graphics: extractGraphics(cleanedTitle),
      memory: extractMemory(cleanedTitle),
      storage: extractStorage(cleanedTitle),
      screenSize: extractScreenSize(cleanedTitle),
      panelType: extractPanelType(cleanedTitle),
      resolution: extractResolution(cleanedTitle),
      refreshRate: extractRefreshRate(cleanedTitle),
      operatingSystem:
        extractOperatingSystem(cleanedTitle),
      colour: extractColour(cleanedTitle),
      connectivity: extractConnectivity(cleanedTitle),
    },
  };
}