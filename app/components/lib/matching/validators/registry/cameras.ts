import type {
  ProductValidator,
} from "../types";

import {
  validateProductType,
} from "../productTypeValidator";

import {
  validateBrand,
} from "../brandValidator";

import {
  validateFamily,
} from "../familyValidator";

import {
  validateVariant,
} from "../modelValidator";

import {
  validateMemory,
  validateStorage,
  validateScreenSize,
  validateColour,
  validateConnectivity,
} from "../specificationValidator";

import {
  validateCondition,
} from "../conditionValidator";

import {
  validateBundle,
} from "../bundleValidator";

import {
  validateCameraModel,
} from "../cameraModelValidator";

export const cameraValidators:
  ProductValidator[] = [
  validateProductType,
  validateBrand,
  validateFamily,

  // Replaces the generic validateModelBase
  // validator for camera products.
  validateCameraModel,

  validateVariant,
  validateMemory,
  validateStorage,
  validateScreenSize,
  validateColour,
  validateConnectivity,
  validateCondition,
  validateBundle,
];