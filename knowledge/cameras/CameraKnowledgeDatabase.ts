import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

import {
  cameraBuyerProfiles,
} from "./CameraBuyerProfiles";

import {
  cameraBuyingMistakes,
} from "./CameraMistakes";

import {
  cameraTerminology,
} from "./CameraTerminology";

import {
  sonyA6400,
  toProductRecommendation,
} from "@/knowledge/products";
import {
  cameraTradeOffs,
} from "./CameraTradeOffs";

const cameraKeyFacts:
  ProductBrainKnowledge["keyFacts"] = [
  {
    title:
      "The lens system matters as much as the camera body",

    explanation:
      "A camera purchase is also a commitment to a lens mount. Buyers should consider the price, availability and suitability of lenses before choosing a body.",

    confidence:
      0.95,
  },

  {
    title:
      "Handling can matter more than small specification differences",

    explanation:
      "A camera that is comfortable, understandable and enjoyable to carry is more likely to be used regularly than a technically stronger camera that feels awkward.",

    confidence:
      0.95,
  },

  {
    title:
      "Beginners rarely need a professional body",

    explanation:
      "Most modern entry-level and mid-range cameras can produce excellent photographs. Professional bodies mainly justify their cost through durability, speed, controls and specialist capabilities.",

    confidence:
      0.9,
  },

  {
    title:
      "Budget for the complete photography setup",

    explanation:
      "The useful cost includes the body, lens, memory card, battery, storage and any accessories required for the intended photography.",

    confidence:
      0.95,
  },
];

export interface CameraKnowledgeDatabase {
  knowledge:
    ProductBrainKnowledge;
}

export function getCameraKnowledgeDatabase():
  CameraKnowledgeDatabase {
  return {
    knowledge: {
      products: [
  toProductRecommendation(
    sonyA6400,
  ),
],

      keyFacts:
        [...cameraKeyFacts],

      tradeOffs:
        [...cameraTradeOffs],

      commonMistakes:
        [...cameraBuyingMistakes],

      terminology:
        [...cameraTerminology],

      buyerProfiles:
        [...cameraBuyerProfiles],
    },
  };
}