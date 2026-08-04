import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

import type {
  KnowledgePack,
} from "../KnowledgePack";

export class BudgetUnder500Pack
  implements KnowledgePack {
  readonly id =
    "camera-budget-under-500";

  readonly name =
    "Cameras Under £500";

  readonly tags = [
    "budget",
    "under-500",
    "camera",
  ] as const;

  build():
    ProductBrainKnowledge {
    return {
      products: [],

      keyFacts: [
        {
          title:
            "Buying used often delivers better value under £500",

          explanation:
            "A carefully chosen used camera from a higher class can provide better autofocus, build quality and lens options than buying the newest entry-level model for the same budget.",

          confidence: 0.99,
        },

        {
          title:
            "Leave part of the budget for lenses and accessories",

          explanation:
            "Spending the entire budget on the camera body often limits image quality more than choosing a slightly cheaper body and investing in a better lens, spare battery and memory card.",

          confidence: 0.98,
        },

        {
          title:
            "Image quality differences are often smaller than buyers expect",

          explanation:
            "Most modern cameras under £500 can produce excellent photographs in good conditions. Ease of use, autofocus and the lens system usually have a greater effect on the ownership experience.",

          confidence: 0.97,
        },

        {
          title:
            "Avoid paying extra for features you are unlikely to use",

          explanation:
            "Professional video formats, extreme burst rates and specialist functions often add cost without improving the experience of a beginner photographer.",

          confidence: 0.95,
        },

        {
          title:
            "A good lens is often a better investment than a newer body",

          explanation:
            "Camera bodies are replaced regularly, but a quality lens can remain useful across multiple generations of cameras within the same system.",

          confidence: 0.98,
        },

        {
          title:
            "Choose a system you can afford to grow with",

          explanation:
            "A camera purchase is only the beginning. Future lenses, batteries and accessories should remain affordable as your photography develops.",

          confidence: 0.98,
        },
      ],

      tradeOffs: [
        {
          title:
            "New versus used",

          explanation:
            "A used enthusiast camera may offer far better performance than a brand-new entry-level model, although it usually comes with less warranty protection.",

          confidence: 0.98,
        },

        {
          title:
            "Spend more on the body or the lens",

          explanation:
            "A stronger lens often produces a more noticeable improvement in photographs than moving to a slightly newer camera body.",

          confidence: 0.97,
        },

        {
          title:
            "Features versus reliability",

          explanation:
            "An older premium camera may include more advanced features, while a newer entry-level camera may provide longer manufacturer support and lower wear.",

          confidence: 0.94,
        },

        {
          title:
            "Budget today versus upgrade costs later",

          explanation:
            "Choosing a cheaper camera system can save money initially but may become more expensive if future lenses and accessories are limited or overpriced.",

          confidence: 0.95,
        },
      ],

      commonMistakes: [
        {
          title:
            "Spending the whole budget on the camera body",

          explanation:
            "Many buyers underestimate the importance of lenses, spare batteries, memory cards and camera bags when planning their total budget.",
        },

        {
          title:
            "Ignoring the used market",

          explanation:
            "Excellent used cameras from reputable sellers can provide outstanding value and often outperform brand-new entry-level alternatives.",
        },

        {
          title:
            "Buying purely on megapixels",

          explanation:
            "Megapixels rarely determine the overall experience. Autofocus, ergonomics, lens quality and reliability usually matter much more.",
        },
      ],

      terminology: [
        "budget camera",
        "used camera",
        "refurbished",
        "entry-level",
        "enthusiast camera",
      ],

      buyerProfiles: [
        "Budget-conscious photographers",
        "First-time camera buyers",
        "Students",
      ],
    };
  }
}