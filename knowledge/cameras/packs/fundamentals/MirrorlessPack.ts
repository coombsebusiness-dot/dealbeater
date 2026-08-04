import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

import type {
  KnowledgePack,
} from "../KnowledgePack";

export class MirrorlessPack
  implements KnowledgePack {
  readonly id =
    "camera-fundamentals-mirrorless";

  readonly name =
    "Mirrorless Camera Fundamentals";

  readonly tags = [
    "camera",
    "mirrorless",
    "photography",
  ] as const;

  build():
    ProductBrainKnowledge {
    return {
      products:
        [],

      keyFacts: [
        {
          title:
            "Lens choice matters as much as the camera body",

          explanation:
            "A mirrorless camera commits the buyer to a lens mount and ecosystem. Lens price, availability, size and upgrade options can affect long-term value more than a small difference between two camera bodies.",

          confidence:
            0.98,
        },

        {
          title:
            "Autofocus reliability matters more than headline shooting speed for many buyers",

          explanation:
            "A fast burst rate is less useful when the camera struggles to identify or follow the intended subject. For everyday photography, dependable autofocus often improves the number of usable photographs more than a modest increase in frames per second.",

          confidence:
            0.96,
        },

        {
          title:
            "Electronic viewfinders show exposure before the photograph is taken",

          explanation:
            "An electronic viewfinder can preview exposure, white balance and picture settings before capture. This can make mirrorless cameras easier to learn because the buyer can see the effect of adjustments immediately.",

          confidence:
            0.94,
        },

        {
          title:
            "Handling should be judged with the intended lens attached",

          explanation:
            "A small camera body may feel convenient with a compact lens but become front-heavy with a larger zoom or telephoto lens. Buyers should judge comfort, grip and control placement using the type of lens they expect to use most often.",

          confidence:
            0.96,
        },

        {
          title:
            "Battery life is usually weaker than comparable DSLR battery life",

          explanation:
            "Mirrorless cameras continuously power displays, sensors and electronic viewfinders. A spare battery can therefore be a more useful purchase than paying extra for a minor specification improvement.",

          confidence:
            0.94,
        },

        {
          title:
            "In-body image stabilisation is useful but not essential for every buyer",

          explanation:
            "In-body image stabilisation can help with handheld photographs in lower light and with unstabilised lenses. It matters less when the buyer mainly photographs moving subjects, uses stabilised lenses or works from a tripod.",

          confidence:
            0.93,
        },

        {
          title:
            "Sensor size does not determine image quality on its own",

          explanation:
            "A larger sensor can improve low-light performance and control over depth of field, but lens quality, autofocus, technique and processing also matter. Buyers should not assume that the largest sensor automatically creates the best overall camera.",

          confidence:
            0.96,
        },

        {
          title:
            "Modern entry-level mirrorless cameras can produce excellent photographs",

          explanation:
            "Image quality is rarely the main limitation for a beginner using a recent mirrorless camera. Lens choice, lighting, composition and familiarity with the controls usually make a larger difference than moving immediately to a professional body.",

          confidence:
            0.97,
        },
      ],

      tradeOffs: [
        {
          title:
            "Small body versus comfortable handling",

          explanation:
            "A smaller camera is easier to carry, but a deeper grip and more physical controls may be more comfortable during long sessions or when using larger lenses.",

          confidence:
            0.96,
        },

        {
          title:
            "Advanced autofocus versus simplicity",

          explanation:
            "More advanced autofocus systems can improve subject tracking, but they may also introduce additional settings and complexity that some beginners do not need.",

          confidence:
            0.91,
        },

        {
          title:
            "In-body stabilisation versus price",

          explanation:
            "In-body stabilisation increases flexibility with handheld photography, but cameras without it can still offer strong value when paired with stabilised lenses or used mainly in good light.",

          confidence:
            0.93,
        },

        {
          title:
            "Electronic viewfinder quality versus budget",

          explanation:
            "A higher-resolution viewfinder can make composition more comfortable, but paying heavily for it may be unnecessary when the buyer mainly uses the rear screen or photographs occasionally.",

          confidence:
            0.88,
        },

        {
          title:
            "Newer body versus stronger lens investment",

          explanation:
            "A newer camera may add convenience and autofocus improvements, while spending the same money on a better lens can have a greater effect on the photographs the buyer can create.",

          confidence:
            0.97,
        },
      ],

      commonMistakes: [
        {
          title:
            "Choosing a camera before checking lens prices",

          explanation:
            "A body can appear affordable while suitable lenses for the buyer's photography are expensive, unavailable or much larger than expected.",
        },

        {
          title:
            "Assuming a larger sensor is always the better choice",

          explanation:
            "Larger sensors can improve some aspects of image quality, but they may also increase lens size, system cost and the difficulty of achieving greater depth of field.",
        },

        {
          title:
            "Ignoring ergonomics",

          explanation:
            "A camera that feels awkward or confusing is less likely to be carried and used regularly, even when its specifications look stronger.",
        },

        {
          title:
            "Paying for professional video features that will not be used",

          explanation:
            "Advanced recording formats, high frame rates and specialist video tools can add cost without improving the experience of a buyer who mainly takes photographs.",
        },
      ],

      terminology: [
        "mirrorless",
        "electronic viewfinder",
        "lens mount",
        "autofocus",
        "subject tracking",
        "in-body image stabilisation",
        "sensor size",
        "burst rate",
        "crop sensor",
        "full frame",
      ],

      buyerProfiles: [
        "Beginner photographers",
        "Travel photographers",
        "Family photographers",
        "Street photographers",
        "Hybrid photo and video creators",
      ],
    };
  }
}