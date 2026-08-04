import type {
  GuideBlueprint,
  GuideBlueprintType,
} from "@/knowledge/guides/blueprints";

export interface GeneratedSectionBlueprint {
  id: string;
  heading: string;
  purpose: string;
}

type SectionTemplateMap = Record<
  GuideBlueprintType,
  GeneratedSectionBlueprint[]
>;

const sectionTemplates:
  SectionTemplateMap = {
  BUYING_GUIDE: [
    {
      id: "introduction",
      heading: "Introduction",
      purpose:
        "Explain the buying decision, why it matters and what the reader will learn.",
    },
    {
      id: "do-you-need-it",
      heading: "Do You Actually Need It?",
      purpose:
        "Help the reader decide whether buying this product is necessary.",
    },
    {
      id: "who-is-it-for",
      heading: "Who Is It For?",
      purpose:
        "Identify the users, needs and situations the product best suits.",
    },
    {
      id: "what-to-look-for",
      heading: "What Should You Look For?",
      purpose:
        "Explain the specifications, features and trade-offs that matter most.",
    },
    {
      id: "budget",
      heading: "How Much Should You Spend?",
      purpose:
        "Give realistic budget bands and explain what buyers should expect.",
    },
    {
      id: "common-mistakes",
      heading: "Common Buying Mistakes",
      purpose:
        "Protect the reader from overspending and poor buying decisions.",
    },
    {
      id: "recommendations",
      heading: "Our Recommended Options",
      purpose:
        "Present suitable recommendation types without relying on stale products.",
    },
    {
      id: "alternatives",
      heading: "Alternatives Worth Considering",
      purpose:
        "Explain when a different product type or buying route may be better.",
    },
    {
      id: "before-you-buy",
      heading: "Before You Spend a Penny",
      purpose:
        "Provide a final checklist before the reader makes a purchase.",
    },
    {
      id: "final-verdict",
      heading: "The Blinlx Verdict",
      purpose:
        "Summarise the decision and give a clear final recommendation.",
    },
  ],

  COMPARISON: [
    {
      id: "introduction",
      heading: "Introduction",
      purpose:
        "Explain what is being compared and why buyers struggle with the decision.",
    },
    {
      id: "key-difference",
      heading: "What Is the Main Difference?",
      purpose:
        "Explain the central difference clearly and without jargon.",
    },
    {
      id: "performance",
      heading: "Performance and Everyday Use",
      purpose:
        "Compare practical performance and real-world experience.",
    },
    {
      id: "features",
      heading: "Features and Capabilities",
      purpose:
        "Compare the features that influence the buying decision.",
    },
    {
      id: "size-and-convenience",
      heading: "Size, Convenience and Ownership",
      purpose:
        "Compare portability, maintenance, comfort and ease of use.",
    },
    {
      id: "cost",
      heading: "Price and Long-Term Cost",
      purpose:
        "Compare purchase price and the wider cost of ownership.",
    },
    {
      id: "who-should-buy-first",
      heading: "Who Should Choose the First Option?",
      purpose:
        "Describe the buyers and situations best suited to the first option.",
    },
    {
      id: "who-should-buy-second",
      heading: "Who Should Choose the Second Option?",
      purpose:
        "Describe the buyers and situations best suited to the second option.",
    },
    {
      id: "final-verdict",
      heading: "Which One Should You Buy?",
      purpose:
        "Give a clear recommendation based on needs, budget and priorities.",
    },
  ],

  BEST_FOR: [
    {
      id: "introduction",
      heading: "Introduction",
      purpose:
        "Define the audience and explain what makes a product suitable for them.",
    },
    {
      id: "what-matters",
      heading: "What Matters Most?",
      purpose:
        "Explain the features and compromises that matter for this audience.",
    },
    {
      id: "budget-options",
      heading: "Best Budget Options",
      purpose:
        "Describe the type of value buyers should expect at the lower end.",
    },
    {
      id: "best-overall",
      heading: "Best Overall Options",
      purpose:
        "Describe the strongest balanced choices for most buyers.",
    },
    {
      id: "premium-options",
      heading: "Premium Options",
      purpose:
        "Explain when spending more is genuinely worthwhile.",
    },
    {
      id: "mistakes",
      heading: "Mistakes to Avoid",
      purpose:
        "Warn against choices that appear suitable but create poor value.",
    },
    {
      id: "final-verdict",
      heading: "The Blinlx Verdict",
      purpose:
        "Summarise the most sensible route for this audience.",
    },
  ],

  EXPLAINER: [
    {
      id: "introduction",
      heading: "Introduction",
      purpose:
        "Explain the concept and why buyers need to understand it.",
    },
    {
      id: "what-it-means",
      heading: "What Does It Mean?",
      purpose:
        "Define the subject in clear language.",
    },
    {
      id: "how-it-works",
      heading: "How Does It Work?",
      purpose:
        "Explain the underlying mechanism without unnecessary complexity.",
    },
    {
      id: "why-it-matters",
      heading: "Why Does It Matter?",
      purpose:
        "Connect the concept directly to buying decisions.",
    },
    {
      id: "advantages",
      heading: "Advantages",
      purpose:
        "Explain the genuine benefits.",
    },
    {
      id: "limitations",
      heading: "Limitations",
      purpose:
        "Explain the disadvantages and trade-offs.",
    },
    {
      id: "who-needs-it",
      heading: "Who Actually Needs It?",
      purpose:
        "Help readers decide whether the feature or technology matters to them.",
    },
    {
      id: "final-verdict",
      heading: "The Blinlx Verdict",
      purpose:
        "Summarise the practical buying advice.",
    },
  ],

  BUDGET_GUIDE: [
    {
      id: "introduction",
      heading: "Introduction",
      purpose:
        "Explain the budget and what buyers can realistically expect.",
    },
    {
      id: "what-to-prioritise",
      heading: "What Should You Prioritise?",
      purpose:
        "Identify the features that matter most within the budget.",
    },
    {
      id: "what-to-compromise",
      heading: "Where Will You Need to Compromise?",
      purpose:
        "Set honest expectations about limitations.",
    },
    {
      id: "best-value",
      heading: "Where Is the Best Value?",
      purpose:
        "Explain the price range or product type offering the strongest balance.",
    },
    {
      id: "new-vs-used",
      heading: "Should You Buy New or Used?",
      purpose:
        "Compare new and second-hand buying routes.",
    },
    {
      id: "mistakes",
      heading: "Budget Buying Mistakes",
      purpose:
        "Warn against false savings and poor-value purchases.",
    },
    {
      id: "recommendations",
      heading: "Our Recommended Options",
      purpose:
        "Present suitable recommendation types for the budget.",
    },
    {
      id: "final-verdict",
      heading: "The Blinlx Verdict",
      purpose:
        "Give the clearest route to the best value.",
    },
  ],

  MISTAKES: [
    {
      id: "introduction",
      heading: "Introduction",
      purpose:
        "Explain why these mistakes are common and expensive.",
    },
    {
      id: "biggest-mistakes",
      heading: "The Biggest Mistakes",
      purpose:
        "Present the main mistakes clearly and practically.",
    },
    {
      id: "why-they-happen",
      heading: "Why Buyers Make Them",
      purpose:
        "Explain the marketing, assumptions and habits behind poor decisions.",
    },
    {
      id: "how-to-avoid-them",
      heading: "How to Avoid Them",
      purpose:
        "Give practical steps that reduce risk.",
    },
    {
      id: "before-you-buy",
      heading: "Before You Spend a Penny",
      purpose:
        "Provide a short final checklist.",
    },
    {
      id: "final-verdict",
      heading: "The Blinlx Verdict",
      purpose:
        "Summarise the safest buying approach.",
    },
  ],
};

function createSpecificHeading(
  heading: string,
  blueprint: GuideBlueprint,
): string {
  return heading
    .replace(
      "the Product",
      blueprint.topic,
    )
    .replace(
      "It",
      blueprint.topic,
    );
}

export function createSectionBlueprints(
  blueprint: GuideBlueprint,
): GeneratedSectionBlueprint[] {
  const template =
    sectionTemplates[
      blueprint.type
    ];

  return template.map(
    (section) => ({
      ...section,

      heading:
        createSpecificHeading(
          section.heading,
          blueprint,
        ),
    }),
  );
}