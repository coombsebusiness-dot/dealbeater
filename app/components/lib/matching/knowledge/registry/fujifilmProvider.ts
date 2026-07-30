import type {
  ProductKnowledgeProvider,
} from "./provider";

import {
  findFujifilmCamera,
} from "../fujifilm/lookup";

function normaliseBrand(
  brand: string | null | undefined
): string {
  return brand?.trim().toLowerCase() ?? "";
}

export const fujifilmProvider:
  ProductKnowledgeProvider = {
  id: "fujifilm",

  supports(fingerprint) {
    const brand =
      normaliseBrand(
        fingerprint.brand
      );

    return (
      brand === "fujifilm" ||
      brand === "fuji"
    );
  },

  getKnowledge(fingerprint) {
    return {
      camera:
        findFujifilmCamera(
          fingerprint
        ),
    };
  },
};