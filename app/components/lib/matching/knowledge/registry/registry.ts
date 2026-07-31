import type {
  ProductKnowledge,
  ProductKnowledgeProvider,
} from "./provider";

import type {
  ProductFingerprint,
} from "../../productFingerprint";

import { appleProvider } from "./appleProvider";
import { samsungProvider } from "./samsungProvider";
import { sonyProvider } from "./sonyProvider";
import { canonProvider } from "./canonProvider";
import { nikonProvider } from "./nikonProvider";

import {
  appleSiliconRegistry,
} from "./apple/silicon";

import {
  appleMacBookRegistry,
} from "./apple/macbooks";

import type {
  LaptopKnowledge,
  ProcessorKnowledge,
} from "./types";

export const processorKnowledgeRegistry:
  ProcessorKnowledge[] = [
    ...appleSiliconRegistry,
  ];

  export const laptopKnowledgeRegistry:
  LaptopKnowledge[] = [
    ...appleMacBookRegistry,
  ];

const providers: ProductKnowledgeProvider[] = [
  appleProvider,
  samsungProvider,
  sonyProvider,
  canonProvider,
  nikonProvider,
];

export function getKnowledgeForProduct(
  fingerprint: ProductFingerprint
): ProductKnowledge {
  console.log(
    "🧠 PRODUCT_KNOWLEDGE_REGISTRY_CALLED",
    {
      brand: fingerprint.brand,
      model: fingerprint.model,
    }
  );

  const knowledge: ProductKnowledge = {};

  for (const provider of providers) {
    console.log(
      "CHECKING_PROVIDER",
      provider.id
    );

    if (!provider.supports(fingerprint)) {
      continue;
    }

    console.log(
      "MATCHED_PROVIDER",
      provider.id
    );

    const providerKnowledge =
      provider.getKnowledge(
        fingerprint
      );

    console.log(
      "PROVIDER_KNOWLEDGE_RESULT",
      provider.id,
      providerKnowledge
    );

    Object.assign(
      knowledge,
      providerKnowledge
    );
  }

  console.log(
    "FINAL_PRODUCT_KNOWLEDGE",
    knowledge
  );

  return knowledge;
}