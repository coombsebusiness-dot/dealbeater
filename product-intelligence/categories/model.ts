import type {
  ProductModelFingerprint,
  ProductType,
} from "../types";

import { parseCpuModel } from "./cpu";
import {
  parseMotherboardModel,
} from "./motherboard";

export function parseCategoryModel(
  title: string,
  productType: ProductType
): Partial<ProductModelFingerprint> {
  switch (productType) {
    case "cpu":
      return parseCpuModel(title);

    case "motherboard":
      return parseMotherboardModel(title);

    default:
      return {};
  }
}