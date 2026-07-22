export type ProductType =
  | "camera"
  | "phone"
  | "tablet"
  | "laptop"
  | "desktop-computer"
  | "television"
  | "games-console"
  | "headphones"
  | "speaker"
  | "smartwatch"
  | "vacuum-cleaner"
  | "power-tool"
  | "appliance"
  | "lens"
  | "accessory"
  | "replacement-part"
  | "unknown";

export interface ProductTypeClassification {
  type: ProductType;
  confidence: number;
  reason: string;
}

const REPLACEMENT_PART_PATTERNS: RegExp[] = [
  /\breplacement\b/i,
  /\bspare\s+part\b/i,
  /\blcd\s+(?:screen|display)\b/i,
  /\bscreen\s+replacement\b/i,
  /\breplacement\s+screen\b/i,
  /\bdisplay\s+assembly\b/i,
  /\bdigitizer\b/i,
  /\breplacement\s+battery\b/i,
  /\breplacement\s+motor\b/i,
  /\breplacement\s+filter\b/i,
  /\breplacement\s+board\b/i,
  /\bmotherboard\b/i,
  /\blogic\s+board\b/i,
  /\brepair\s+part\b/i,
  /\bparts\s+only\b/i,
  /\bfor\s+parts\b/i,
];

const ACCESSORY_PATTERNS: RegExp[] = [
  /\beyecup\b/i,
  /\bviewfinder\s+eyecup\b/i,
  /\bscreen\s+protector\b/i,
  /\bprotective\s+glass\b/i,
  /\bcamera\s+case\b/i,
  /\bphone\s+case\b/i,
  /\btablet\s+case\b/i,
  /\blaptop\s+sleeve\b/i,
  /\bcarry(?:ing)?\s+case\b/i,
  /\bcamera\s+bag\b/i,
  /\bcharger\b/i,
  /\bcharging\s+cable\b/i,
  /\busb\s+cable\b/i,
  /\bpower\s+adapter\b/i,
  /\bac\s+adapter\b/i,
  /\bbattery\s+grip\b/i,
  /\bcamera\s+grip\b/i,
  /\bcamera\s+cage\b/i,
  /\btripod\b/i,
  /\bmonopod\b/i,
  /\blens\s+cap\b/i,
  /\bbody\s+cap\b/i,
  /\bremote\s+control\b/i,
  /\bremote\s+shutter\b/i,
  /\bmounting\s+bracket\b/i,
  /\bwall\s+mount\b/i,
  /\bkeyboard\s+cover\b/i,
  /\bdocking\s+station\b/i,
  /\bcontroller\s+case\b/i,
  /\bprotective\s+cover\b/i,
  /\bstand\s+holder\b/i,
  /\bstrap\b/i,
];

const CAMERA_PATTERNS: RegExp[] = [
  /\bmirrorless\s+(?:digital\s+)?camera\b/i,
  /\bdigital\s+camera\b/i,
  /\bcamera\s+body\b/i,
  /\bbody\s+only\b/i,
  /\bfull[-\s]?frame\s+camera\b/i,
  /\bdslr\b/i,
  /\bcompact\s+camera\b/i,

  // Sony camera families
  /\bsony\s+(?:alpha\s+)?a?7[rs]?\s*(?:ii|iii|iv|v|2|3|4|5)\b/i,
  /\b(?:alpha\s+)?a7[rs]?\s*(?:ii|iii|iv|v|2|3|4|5)\b/i,
  /\bilce[-\s]?7[a-z0-9-]*\b/i,

  // Canon
  /\bcanon\s+(?:eos\s+)?r\d+\b/i,
  /\bcanon\s+(?:eos\s+)?\d+d\b/i,

  // Nikon
  /\bnikon\s+z\d+\b/i,
  /\bnikon\s+d\d{3,4}\b/i,

  // Fujifilm
  /\bfujifilm\s+x[-\s]?[a-z]\d+\b/i,
  /\bfujifilm\s+gfx\b/i,

  // Panasonic
  /\bpanasonic\s+lumix\b/i,
];

const LENS_PATTERNS: RegExp[] = [
  /\bcamera\s+lens\b/i,
  /\bzoom\s+lens\b/i,
  /\bprime\s+lens\b/i,
  /\btelephoto\s+lens\b/i,
  /\bwide[-\s]?angle\s+lens\b/i,
  /\bmacro\s+lens\b/i,
  /\b\d{1,3}(?:-\d{1,3})?mm\s+f\/?\d/i,
  /\b\d{1,3}(?:-\d{1,3})?mm\s+lens\b/i,
];

const PHONE_PATTERNS: RegExp[] = [
  /\biphone\s+\d+/i,
  /\bsamsung\s+galaxy\s+s\d+/i,
  /\bsamsung\s+galaxy\s+z\s+(?:fold|flip)\b/i,
  /\bgoogle\s+pixel\s+\d+/i,
  /\bsmartphone\b/i,
  /\bmobile\s+phone\b/i,
];

const TABLET_PATTERNS: RegExp[] = [
  /\bipad\b/i,
  /\bgalaxy\s+tab\b/i,
  /\bsurface\s+pro\b/i,
  /\btablet\b/i,
];

const LAPTOP_PATTERNS: RegExp[] = [
  /\bmacbook\b/i,
  /\blaptop\b/i,
  /\bnotebook\s+computer\b/i,
  /\bchromebook\b/i,
  /\bsurface\s+laptop\b/i,
];

const DESKTOP_PATTERNS: RegExp[] = [
  /\bdesktop\s+computer\b/i,
  /\bgaming\s+pc\b/i,
  /\ball[-\s]?in[-\s]?one\s+pc\b/i,
  /\bimac\b/i,
  /\bmac\s+mini\b/i,
];

const TELEVISION_PATTERNS: RegExp[] = [
  /\bsmart\s+tv\b/i,
  /\boled\s+tv\b/i,
  /\bqled\s+tv\b/i,
  /\btelevision\b/i,
  /\b\d{2,3}\s*inch\s+tv\b/i,
];

const CONSOLE_PATTERNS: RegExp[] = [
  /\bplaystation\s*5\b/i,
  /\bps5\b/i,
  /\bxbox\s+series\s+[xs]\b/i,
  /\bnintendo\s+switch\b/i,
  /\bsteam\s+deck\b/i,
  /\bgames?\s+console\b/i,
];

const HEADPHONE_PATTERNS: RegExp[] = [
  /\bheadphones\b/i,
  /\bearbuds\b/i,
  /\bearphones\b/i,
  /\bairpods\b/i,
  /\bwireless\s+headset\b/i,
];

const SPEAKER_PATTERNS: RegExp[] = [
  /\bbluetooth\s+speaker\b/i,
  /\bsmart\s+speaker\b/i,
  /\bsoundbar\b/i,
];

const WATCH_PATTERNS: RegExp[] = [
  /\bsmartwatch\b/i,
  /\bapple\s+watch\b/i,
  /\bgalaxy\s+watch\b/i,
  /\bpixel\s+watch\b/i,
];

const VACUUM_PATTERNS: RegExp[] = [
  /\bvacuum\s+cleaner\b/i,
  /\bcordless\s+vacuum\b/i,
  /\brobot\s+vacuum\b/i,
  /\bdyson\s+v\d+\b/i,
];

const POWER_TOOL_PATTERNS: RegExp[] = [
  /\bcordless\s+drill\b/i,
  /\bimpact\s+driver\b/i,
  /\bcircular\s+saw\b/i,
  /\bjigsaw\b/i,
  /\bangle\s+grinder\b/i,
  /\bpower\s+tool\b/i,
];

const APPLIANCE_PATTERNS: RegExp[] = [
  /\bwashing\s+machine\b/i,
  /\btumble\s+dryer\b/i,
  /\bdishwasher\b/i,
  /\bfridge\s+freezer\b/i,
  /\bmicrowave\b/i,
  /\bair\s+fryer\b/i,
];

export function classifyProductType(
  text: string
): ProductTypeClassification {
  const value = normaliseText(text);

  /*
   * Replacement parts and accessories must be
   * checked first because their titles often
   * contain the full name of the main product.
   *
   * Example:
   * "Sony A7 III LCD Screen Replacement"
   */
  if (matchesAny(value, REPLACEMENT_PART_PATTERNS)) {
    return {
      type: "replacement-part",
      confidence: 100,
      reason:
        "title contains replacement or spare-part wording",
    };
  }

  if (matchesAny(value, ACCESSORY_PATTERNS)) {
    return {
      type: "accessory",
      confidence: 100,
      reason:
        "title describes an accessory rather than the main product",
    };
  }

  /*
   * Camera body detection comes before lens
   * detection because camera-and-lens kits may
   * contain lens measurements in their title.
   */
  if (matchesAny(value, CAMERA_PATTERNS)) {
    return {
      type: "camera",
      confidence: 95,
      reason:
        "title identifies a camera or camera body",
    };
  }

  if (matchesAny(value, LENS_PATTERNS)) {
    return {
      type: "lens",
      confidence: 95,
      reason:
        "title identifies a standalone camera lens",
    };
  }

  if (matchesAny(value, PHONE_PATTERNS)) {
    return {
      type: "phone",
      confidence: 95,
      reason: "title identifies a mobile phone",
    };
  }

  if (matchesAny(value, TABLET_PATTERNS)) {
    return {
      type: "tablet",
      confidence: 95,
      reason: "title identifies a tablet",
    };
  }

  if (matchesAny(value, LAPTOP_PATTERNS)) {
    return {
      type: "laptop",
      confidence: 95,
      reason: "title identifies a laptop",
    };
  }

  if (matchesAny(value, DESKTOP_PATTERNS)) {
    return {
      type: "desktop-computer",
      confidence: 95,
      reason: "title identifies a desktop computer",
    };
  }

  if (matchesAny(value, TELEVISION_PATTERNS)) {
    return {
      type: "television",
      confidence: 95,
      reason: "title identifies a television",
    };
  }

  if (matchesAny(value, CONSOLE_PATTERNS)) {
    return {
      type: "games-console",
      confidence: 95,
      reason: "title identifies a games console",
    };
  }

  if (matchesAny(value, HEADPHONE_PATTERNS)) {
    return {
      type: "headphones",
      confidence: 95,
      reason: "title identifies headphones or earbuds",
    };
  }

  if (matchesAny(value, SPEAKER_PATTERNS)) {
    return {
      type: "speaker",
      confidence: 95,
      reason: "title identifies a speaker",
    };
  }

  if (matchesAny(value, WATCH_PATTERNS)) {
    return {
      type: "smartwatch",
      confidence: 95,
      reason: "title identifies a smartwatch",
    };
  }

  if (matchesAny(value, VACUUM_PATTERNS)) {
    return {
      type: "vacuum-cleaner",
      confidence: 95,
      reason: "title identifies a vacuum cleaner",
    };
  }

  if (matchesAny(value, POWER_TOOL_PATTERNS)) {
    return {
      type: "power-tool",
      confidence: 95,
      reason: "title identifies a power tool",
    };
  }

  if (matchesAny(value, APPLIANCE_PATTERNS)) {
    return {
      type: "appliance",
      confidence: 95,
      reason: "title identifies a household appliance",
    };
  }

  return {
    type: "unknown",
    confidence: 0,
    reason: "product type could not be determined",
  };
}

function matchesAny(
  value: string,
  patterns: RegExp[]
): boolean {
  return patterns.some((pattern) =>
    pattern.test(value)
  );
}

function normaliseText(
  value: string
): string {
  return value
    .toLowerCase()
    .replace(/[“”"'’]/g, " ")
    .replace(/[^a-z0-9./+-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}