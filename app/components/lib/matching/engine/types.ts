import type { ProductType } from "../productTypeClassifier";
import type { ProductValidator } from "../validators/types";

export interface ProductEngine {
  readonly type: ProductType | "default";

  getValidators(): ProductValidator[];
}