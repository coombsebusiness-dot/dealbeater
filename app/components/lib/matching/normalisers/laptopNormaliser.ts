import type { ProductFingerprint } from "@/app/components/lib/matching/productFingerprint";

import { normaliseBrand } from "./brand";
import { normaliseMemory } from "./memory";
import { normaliseStorage } from "./storage";
import { normaliseColour } from "./colour";
import { detectAppleSilicon } from "./appleSilicon";
import { detectIntelCpu } from "./intelCpu";

export function normaliseLaptopFingerprint(
  fingerprint: ProductFingerprint
): ProductFingerprint {
  const brand = normaliseBrand(fingerprint.brand);

 const searchableValues = [
  fingerprint.model.base,
  fingerprint.model.revision,
  fingerprint.model.variant,
];

  const appleSilicon =
  brand === "apple"
    ? detectAppleSilicon(...searchableValues)
    : null;

const intelCpu =
  appleSilicon === null
    ? detectIntelCpu(...searchableValues)
    : null;

  return {
    ...fingerprint,

    brand,

    model: {
      ...fingerprint.model,

      variant:
        appleSilicon ??
        intelCpu ??
        fingerprint.model.variant,
    },

    specs: {
      ...fingerprint.specs,

      memory: normaliseMemory(
        fingerprint.specs.memory
      ),

      storage: normaliseStorage(
        fingerprint.specs.storage
      ),

      colour: normaliseColour(
        fingerprint.specs.colour
      ),
    },
  };
}