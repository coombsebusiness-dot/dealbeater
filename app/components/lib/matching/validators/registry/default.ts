import type { ProductValidator } from "../types";

import { validateProductType } from "../productTypeValidator";
import { validateBrand } from "../brandValidator";
import { validateFamily } from "../familyValidator";

import {
  validateModelBase,
  validateVariant,
} from "../modelValidator";

import {
  validateMemory,
  validateStorage,
  validateScreenSize,
  validateColour,
  validateConnectivity,
} from "../specificationValidator";

import { validateCondition } from "../conditionValidator";
import { validateBundle } from "../bundleValidator";

export const defaultValidators: ProductValidator[] = [
  validateProductType,
  validateBrand,
  validateFamily,
  validateModelBase,
  validateVariant,
  validateMemory,
  validateStorage,
  validateScreenSize,
  validateColour,
  validateConnectivity,
  validateCondition,
  validateBundle,
];