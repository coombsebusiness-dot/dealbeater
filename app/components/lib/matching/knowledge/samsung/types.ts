/**
 * Samsung phone families currently understood by Blinlx.
 */
export type SamsungPhoneFamily =
  | "Galaxy S"
  | "Galaxy Z"
  | "Galaxy A"
  | "Galaxy Note";

/**
 * The market position of a Samsung phone within its family.
 */
export type SamsungPhoneTier =
  | "Ultra"
  | "Plus"
  | "Standard"
  | "FE"
  | "Fold"
  | "Flip";

/**
 * Broad processor platform used by the phone.
 *
 * The exact processor name is stored separately because Samsung
 * models may use different processors in different markets.
 */
export type SamsungChipsetPlatform =
  | "Snapdragon"
  | "Exynos"
  | "MediaTek"
  | "Unknown";

/**
 * Structured knowledge for one Samsung phone model.
 *
 * This represents model-level knowledge rather than a specific
 * retailer listing. Storage, memory, colour and condition remain
 * part of the ProductFingerprint.
 */
export interface SamsungPhoneKnowledge {

  brand: "samsung";

  productType: "phone";

  /**
   * Canonical product name used by Blinlx.
   *
   * Example:
   * Samsung Galaxy S24 Ultra
   */
  name: string;

  /**
   * Normalised model identifier.
   *
   * Example:
   * galaxy-s24-ultra
   */
  slug: string;

  family: SamsungPhoneFamily;

  /**
   * Main generation number.
   *
   * Examples:
   * S24 → 24
   * Z Fold6 → 6
   */
  generation: number;

  tier: SamsungPhoneTier;

  releaseYear: number;

  chipsetPlatform: SamsungChipsetPlatform;

  /**
   * Human-readable processor description.
   *
   * This can mention regional variation where required.
   */
  chipset: string;

  displayTechnology: string;

  /**
   * Screen measurement in inches.
   */
  screenSize: number;

  /**
   * Storage capacities officially associated with this model.
   */
  storageOptions: string[];

  /**
   * Memory capacities associated with this model.
   */
  memoryOptions: string[];

  /**
   * Whether Samsung marketed the model with Galaxy AI support.
   */
  galaxyAi: boolean;

  /**
   * Short factual description suitable for product reasoning
   * and future product-page generation.
   */
  summary: string;
}