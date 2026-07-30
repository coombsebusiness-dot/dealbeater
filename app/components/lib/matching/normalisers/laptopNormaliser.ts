import type { ProductFingerprint } from "../productFingerprint";

import { normaliseBrand } from "./brand";
import { normaliseMemory } from "./memory";
import { normaliseStorage } from "./storage";
import { normaliseColour } from "./colour";
import { detectAppleSilicon } from "./appleSilicon";

export function normaliseLaptopFingerprint(
  fingerprint: ProductFingerprint
): ProductFingerprint {
  const brand = normaliseBrand(fingerprint.brand);

  const appleSilicon =
    brand === "apple"
      ? detectAppleSilicon(
          fingerprint.model.base,
          fingerprint.model.revision,
          fingerprint.model.variant
        )
      : null;

  return {
    ...fingerprint,

    brand,

    model: {
      ...fingerprint.model,

      // Preserve the existing variant unless an Apple chip is identified.
      variant:
        appleSilicon ??
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