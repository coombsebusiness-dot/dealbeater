import type {
  BuyerProfile,
} from "./BuyerProfile";

export interface DecisionProfile {

  buyer:
    BuyerProfile;

  budget?: {
    minimum?:
      number;

    maximum?:
      number;
  };

  preferredBrands?:
    string[];

  avoidedBrands?:
    string[];

  preferredCondition?:
    | "NEW"
    | "USED"
    | "REFURBISHED"
    | "ANY";

  primaryUseCases:
    string[];

  secondaryUseCases?:
    string[];

  requiredFeatures:
    string[];

  preferredFeatures?:
    string[];

  unwantedFeatures?:
    string[];

  existingProducts?:
    string[];

  existingLensMounts?:
    string[];

  futureGoals?:
    string[];

  notes?:
    string[];
}