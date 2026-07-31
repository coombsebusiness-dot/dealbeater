export type KnowledgeEntityType =
  | "product"
  | "chip"
  | "cpu"
  | "gpu"
  | "camera"
  | "lens"
  | "phone"
  | "tablet"
  | "watch"
  | "laptop"
  | "desktop"
  | "monitor"
  | "television"
  | "headphones"
  | "speaker"
  | "console"
  | "appliance"
  | "accessory"
  | "retailer"
  | "brand"
  | "software"
  | "capability"
  | "category";

export interface KnowledgeEntity {
  id: string;
  name: string;
  type: KnowledgeEntityType;
}

/*
 * SHARED KNOWLEDGE RELATIONSHIPS
 */

export interface KnowledgeRelationship {
  id: string;
  confidence?: number;
}

export interface AlternativeRelationship
  extends KnowledgeRelationship {
  reason?: string;
}

export interface UpgradeRelationship
  extends KnowledgeRelationship {
  worthIt?: boolean;
  reason?: string;
}

export interface CompatibilityRelationship
  extends KnowledgeRelationship {
  reason?: string;
}

export interface AccessoryRelationship
  extends KnowledgeRelationship {
  importance?:
    | "required"
    | "recommended"
    | "optional";

  reason?: string;
}

/*
 * SHARED PRODUCT KNOWLEDGE
 */

export type ProductTier =
  | "Entry-level"
  | "Enthusiast"
  | "Professional"
  | "Flagship"
  | "Specialist";

export interface ProductKnowledge
  extends KnowledgeEntity {
  type: KnowledgeEntityType;

  brand: string;
  family: string;

  aliases: string[];

  category: string;

  releaseYear?: number;
  generation?: number;

  tier?: ProductTier | string;

  summary: string;

  bestFor?: string[];
  strengths?: string[];
  limitations?: string[];

  predecessorId?: string | null;
  successorId?: string | null;

  alternatives?: AlternativeRelationship[];
  upgrades?: UpgradeRelationship[];
  compatibleProducts?: CompatibilityRelationship[];
  accessories?: AccessoryRelationship[];
}

/*
 * CAMERA KNOWLEDGE
 */

export type CameraType =
  | "Mirrorless"
  | "DSLR"
  | "Compact"
  | "Bridge"
  | "Action"
  | "Cinema"
  | "Medium format"
  | "Instant"
  | "Film";

export type CameraSensorFormat =
  | "Full-frame"
  | "APS-C"
  | "Micro Four Thirds"
  | "Medium format"
  | "1-inch"
  | "1/1.3-inch"
  | "1/2.3-inch"
  | "Unknown";

export interface CameraKnowledge
  extends ProductKnowledge {
  type: "camera";
  category: "Camera";

  cameraType: CameraType;
  sensorFormat: CameraSensorFormat;

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

/*
 * KNOWLEDGE LOOKUP RESULTS
 */

export type ProductKnowledgeCategory =
  | "camera"
  | "lens"
  | "phone"
  | "tablet"
  | "watch"
  | "laptop"
  | "desktop"
  | "cpu"
  | "gpu"
  | "monitor"
  | "television"
  | "console"
  | "headphones"
  | "speaker"
  | "accessory"
  | "appliance"
  | "unknown";

export type KnowledgeMatchMethod =
  | "exact-id"
  | "exact-name"
  | "alias"
  | "slug"
  | "family"
  | "fuzzy";

export interface ProductBrainResult {
  product?: ProductKnowledge;
  camera?: CameraKnowledge;

  confidence?: number;

  matchedBy?: KnowledgeMatchMethod;

  provider?: string;
}