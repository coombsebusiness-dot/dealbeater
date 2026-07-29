import { validateProductType } from "./productTypeValidator";
import { validateBrand } from "./brandValidator";
import { validateFamily } from "./familyValidator";

export const validators = [
  validateProductType,
  validateBrand,
  validateFamily,
];