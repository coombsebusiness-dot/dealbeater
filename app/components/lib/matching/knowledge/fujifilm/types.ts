export interface FujifilmCameraKnowledge {
  id: string;

  name: string;

  productType: "camera";

  slug: string;

  brand: "Fujifilm";

  family: string;

  aliases: string[];

  category: "Camera";

  releaseYear?: number;

  generation?: number;

  tier?: string;

  summary: string;

  bestFor?: string[];

  strengths?: string[];

  limitations?: string[];

  cameraType:
    | "Mirrorless"
    | "Compact"
    | "Medium format";

  sensorFormat:
    | "APS-C"
    | "Medium format";

  megapixels?: number;

  lensMount?: string;

  inBodyStabilisation?: boolean;

  headlineVideo?: string;

  autofocusSystem?: string;

  burstRate?: string;

  shutterType?: string;

  viewfinder?: string;

  screen?: string;

  storageMedia?: string[];

  connectivity?: string[];

  battery?: string;

  weightGrams?: number;

  weatherSealing?: boolean;

  launchPriceGBP?: number;
}