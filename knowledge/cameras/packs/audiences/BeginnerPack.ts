import type {
  ProductBrainKnowledge,
} from "@/knowledge/guides/factory/knowledge";

import type {
  KnowledgePack,
} from "../KnowledgePack";

export class BeginnerPack
  implements KnowledgePack {
  readonly id =
    "camera-audience-beginner";

  readonly name =
    "Beginner Camera Buyers";

  readonly tags = [
    "beginner",
    "first-camera",
    "camera",
  ] as const;

  build():
    ProductBrainKnowledge {
    return {
      products:
        [],

      keyFacts: [
        {
          title:
            "Ease of use matters more than maximum capability for a first camera",

          explanation:
            "A beginner is more likely to improve with a camera that feels clear, comfortable and predictable than with a more advanced model whose controls and menus create unnecessary friction.",

          confidence:
            0.98,
        },

        {
          title:
            "Reliable autofocus builds confidence",

          explanation:
            "Dependable face, eye and subject detection reduces missed photographs and allows a beginner to concentrate on composition, timing and light instead of constantly correcting focus.",

          confidence:
            0.97,
        },

        {
          title:
            "A clear upgrade path matters",

          explanation:
            "A first camera should provide room to grow through better lenses, accessories and more advanced techniques without forcing the buyer to replace the entire system too quickly.",

          confidence:
            0.96,
        },

        {
          title:
            "Automatic modes are useful while learning",

          explanation:
            "Good automatic and assisted modes help beginners make successful photographs immediately while gradually learning exposure, autofocus and composition at their own pace.",

          confidence:
            0.94,
        },

        {
          title:
            "Comfort encourages regular use",

          explanation:
            "A camera that is comfortable to hold and simple to carry is more likely to be taken out regularly. Frequent use usually improves photography more than buying a technically stronger camera that stays at home.",

          confidence:
            0.97,
        },

        {
          title:
            "The first lens shapes the experience",

          explanation:
            "A versatile, affordable starter lens can make learning easier by covering everyday subjects without forcing the buyer to purchase several lenses immediately.",

          confidence:
            0.96,
        },

        {
          title:
            "Beginners do not need every professional feature",

          explanation:
            "Dual card slots, advanced video codecs, very high burst rates and extensive custom controls can add cost and complexity without improving the early learning experience.",

          confidence:
            0.97,
        },

        {
          title:
            "Learning resources can affect long-term value",

          explanation:
            "A widely used camera system often has more tutorials, community advice, accessories and second-hand lenses available, which can make it easier and cheaper for a beginner to progress.",

          confidence:
            0.92,
        },
      ],

      tradeOffs: [
        {
          title:
            "Simple controls versus room to grow",

          explanation:
            "A very simple camera can make the first weeks easier, while a model with more direct controls may remain useful for longer as the buyer develops more confidence.",

          confidence:
            0.95,
        },

        {
          title:
            "Compact size versus comfortable grip",

          explanation:
            "A smaller camera is easier to carry, but a larger grip and clearer controls may be easier for a beginner to use consistently.",

          confidence:
            0.94,
        },

        {
          title:
            "Kit lens convenience versus specialist lens quality",

          explanation:
            "A kit lens is flexible and affordable for learning, while a specialist prime or zoom lens can improve low-light performance, subject separation or reach at additional cost.",

          confidence:
            0.95,
        },

        {
          title:
            "New camera certainty versus used camera capability",

          explanation:
            "Buying new provides warranty protection and fewer unknowns, while buying used can give a beginner a more capable camera for the same budget if condition and seller protection are carefully checked.",

          confidence:
            0.96,
        },

        {
          title:
            "Advanced features versus learning complexity",

          explanation:
            "More capable cameras can offer greater control and longer-term flexibility, but too many settings can distract a beginner from learning the fundamentals.",

          confidence:
            0.93,
        },
      ],

      commonMistakes: [
        {
          title:
            "Buying the most advanced camera within budget",

          explanation:
            "A more complicated camera can slow learning when the buyer would benefit more from clear controls, reliable autofocus and an affordable lens system.",
        },

        {
          title:
            "Choosing around specifications instead of real use",

          explanation:
            "Beginners often compare megapixels, burst rates and video formats before deciding what they actually want to photograph.",
        },

        {
          title:
            "Ignoring the cost of future lenses",

          explanation:
            "An affordable camera body can become an expensive system when useful lenses are limited, large or priced beyond the buyer's future budget.",
        },

        {
          title:
            "Expecting the camera to replace practice",

          explanation:
            "A more expensive camera cannot replace learning how light, composition, timing and lens choice affect a photograph.",
        },

        {
          title:
            "Buying too many accessories immediately",

          explanation:
            "Beginners often buy filters, bags, tripods and lenses before understanding which accessories genuinely suit the way they photograph.",
        },
      ],

      terminology: [
        "beginner camera",
        "automatic mode",
        "aperture priority",
        "shutter priority",
        "kit lens",
        "eye autofocus",
        "subject detection",
        "exposure compensation",
        "lens ecosystem",
        "upgrade path",
      ],

      buyerProfiles: [
        "Beginner photographers",
        "First-time interchangeable-lens camera buyers",
        "Students learning photography",
        "Family photographers",
        "Casual travel photographers",
      ],
    };
  }
}