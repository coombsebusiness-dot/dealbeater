import type {
  FingerprintPatch,
  ProductType,
} from "../types";

import { parseRamFingerprint } from "./ram";
import { parseCpuModel } from "./cpu";
import { parseMotherboardModel } from "./motherboard";
import { parseMonitorFingerprint } from "./monitor";
import { parseCameraFingerprint } from "./camera";
import { parseLens } from "./lens";
import { parseLaptopFingerprint } from "./laptop";

export function parseCategoryModel(
  title: string,
  productType: ProductType
): FingerprintPatch {
  switch (productType) {
    case "cpu":
      return {
        model: parseCpuModel(title),
      };

    case "motherboard":
      return {
        model: parseMotherboardModel(title),
      };
      case "monitor":
  return parseMonitorFingerprint(title);

    case "memory":
      return parseRamFingerprint(title);

       case "lens":
    return parseLens(title);

      case "camera":
  return parseCameraFingerprint(title);

  case "laptop":
  return parseLaptopFingerprint(title);

    default:
      return {};
  }
}