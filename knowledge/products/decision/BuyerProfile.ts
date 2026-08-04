export type BuyerExperienceLevel =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ENTHUSIAST"
  | "PROFESSIONAL";

export type BuyerBudgetPriority =
  | "LOWEST_PRICE"
  | "BEST_VALUE"
  | "BALANCED"
  | "BEST_AVAILABLE";

export interface BuyerProfile {
  id:
    string;

  name:
    string;

  description:
    string;

  experienceLevel:
    BuyerExperienceLevel;

  budgetPriority:
    BuyerBudgetPriority;

  useCases:
    string[];

  priorities:
    string[];

  acceptableCompromises:
    string[];

  dealBreakers:
    string[];

  existingBrands?:
    string[];

  existingProductIds?:
    string[];

  notes?:
    string[];
}