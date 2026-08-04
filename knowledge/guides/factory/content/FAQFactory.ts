import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

export interface GeneratedFAQBlueprint {
  id: string;
  question: string;
  purpose: string;
}

function createTopicLabel(
  blueprint: GuideBlueprint,
): string {
  return (
    blueprint.topic.trim() ||
    blueprint.title.trim()
  );
}

export function createFAQBlueprints(
  blueprint: GuideBlueprint,
): GeneratedFAQBlueprint[] {
  const topic =
    createTopicLabel(
      blueprint,
    );

  switch (blueprint.type) {
    case "BUYING_GUIDE":
      return [
        {
          id:
            "faq-best-choice",

          question:
            `What is the best ${topic} for most people?`,

          purpose:
            "Give a balanced recommendation based on needs rather than hype.",
        },

        {
          id:
            "faq-budget",

          question:
            `How much should I spend on ${topic}?`,

          purpose:
            "Explain realistic budget levels and what buyers should expect.",
        },

        {
          id:
            "faq-important-features",

          question:
            `What should I look for when buying ${topic}?`,

          purpose:
            "Summarise the specifications and features that matter most.",
        },

        {
          id:
            "faq-new-or-used",

          question:
            `Should I buy ${topic} new or used?`,

          purpose:
            "Compare value, risk, warranty and long-term ownership.",
        },

        {
          id:
            "faq-common-mistakes",

          question:
            `What mistakes should I avoid when buying ${topic}?`,

          purpose:
            "Protect the reader from common poor-value decisions.",
        },

        {
          id:
            "faq-worth-it",

          question:
            `Is spending more on ${topic} worth it?`,

          purpose:
            "Explain when paying more creates meaningful benefits.",
        },
      ];

    case "COMPARISON":
      return [
        {
          id:
            "faq-main-difference",

          question:
            `What is the main difference in ${topic}?`,

          purpose:
            "Explain the central distinction in plain English.",
        },

        {
          id:
            "faq-better-for-beginners",

          question:
            `Which option in ${topic} is better for beginners?`,

          purpose:
            "Give guidance for first-time buyers.",
        },

        {
          id:
            "faq-better-value",

          question:
            `Which option in ${topic} offers better value?`,

          purpose:
            "Compare purchase price and total ownership cost.",
        },

        {
          id:
            "faq-performance",

          question:
            `Which option in ${topic} performs better?`,

          purpose:
            "Compare real-world performance rather than headline claims.",
        },

        {
          id:
            "faq-long-term",

          question:
            `Which option in ${topic} is the better long-term choice?`,

          purpose:
            "Consider upgrade paths, compatibility and future usefulness.",
        },

        {
          id:
            "faq-final-choice",

          question:
            `How do I decide which option in ${topic} is right for me?`,

          purpose:
            "Help the reader match the decision to their own needs.",
        },
      ];

    case "BEST_FOR":
      return [
        {
          id:
            "faq-best-overall",

          question:
            `What is the best ${topic} overall?`,

          purpose:
            "Explain the strongest balanced option for most buyers.",
        },

        {
          id:
            "faq-budget-option",

          question:
            `What is the best budget ${topic}?`,

          purpose:
            "Identify where buyers can save without making a poor purchase.",
        },

        {
          id:
            "faq-premium-option",

          question:
            `Is a premium ${topic} worth the extra money?`,

          purpose:
            "Explain when higher spending is justified.",
        },

        {
          id:
            "faq-key-features",

          question:
            `Which features matter most for ${topic}?`,

          purpose:
            "Focus attention on the factors that affect real use.",
        },

        {
          id:
            "faq-avoid",

          question:
            `What should I avoid when choosing ${topic}?`,

          purpose:
            "Warn against unsuitable or poor-value options.",
        },

        {
          id:
            "faq-right-choice",

          question:
            `How do I choose the right ${topic} for my needs?`,

          purpose:
            "Turn the buying decision into a clear checklist.",
        },
      ];

    case "EXPLAINER":
      return [
        {
          id:
            "faq-definition",

          question:
            `What does ${topic} mean?`,

          purpose:
            "Provide a clear definition without unnecessary jargon.",
        },

        {
          id:
            "faq-how-it-works",

          question:
            `How does ${topic} work?`,

          purpose:
            "Explain the underlying mechanism simply.",
        },

        {
          id:
            "faq-why-it-matters",

          question:
            `Why does ${topic} matter when buying?`,

          purpose:
            "Connect the concept directly to a purchasing decision.",
        },

        {
          id:
            "faq-benefits",

          question:
            `What are the benefits of ${topic}?`,

          purpose:
            "Describe the genuine advantages.",
        },

        {
          id:
            "faq-limitations",

          question:
            `What are the limitations of ${topic}?`,

          purpose:
            "Explain trade-offs and situations where it matters less.",
        },

        {
          id:
            "faq-who-needs-it",

          question:
            `Who actually needs ${topic}?`,

          purpose:
            "Help readers decide whether the feature is relevant to them.",
        },
      ];

    case "BUDGET_GUIDE":
      return [
        {
          id:
            "faq-realistic-expectations",

          question:
            `What should I expect from ${topic}?`,

          purpose:
            "Set realistic expectations for the stated budget.",
        },

        {
          id:
            "faq-best-value",

          question:
            `Where is the best value within ${topic}?`,

          purpose:
            "Identify the strongest balance of price and capability.",
        },

        {
          id:
            "faq-compromises",

          question:
            `What compromises should I expect with ${topic}?`,

          purpose:
            "Explain the limitations buyers may need to accept.",
        },

        {
          id:
            "faq-new-used",

          question:
            `Should I buy new or used for ${topic}?`,

          purpose:
            "Compare warranty, value and risk.",
        },

        {
          id:
            "faq-spend-more",

          question:
            `Should I spend more than the budget in ${topic}?`,

          purpose:
            "Explain when stretching the budget is worthwhile.",
        },

        {
          id:
            "faq-mistakes",

          question:
            `What budget-buying mistakes should I avoid with ${topic}?`,

          purpose:
            "Warn against false savings and weak products.",
        },
      ];

    case "MISTAKES":
      return [
        {
          id:
            "faq-most-common",

          question:
            `What is the most common mistake with ${topic}?`,

          purpose:
            "Identify the mistake most likely to waste money.",
        },

        {
          id:
            "faq-why-happen",

          question:
            `Why do buyers make mistakes with ${topic}?`,

          purpose:
            "Explain the assumptions and marketing behind poor decisions.",
        },

        {
          id:
            "faq-avoid",

          question:
            `How can I avoid mistakes with ${topic}?`,

          purpose:
            "Give practical steps for safer buying.",
        },

        {
          id:
            "faq-overpaying",

          question:
            `How do I avoid overpaying for ${topic}?`,

          purpose:
            "Explain comparison, timing and total ownership cost.",
        },

        {
          id:
            "faq-warning-signs",

          question:
            `What warning signs should I watch for with ${topic}?`,

          purpose:
            "Identify signals that a product or deal may be poor value.",
        },

        {
          id:
            "faq-before-buy",

          question:
            `What should I check before buying ${topic}?`,

          purpose:
            "Provide a final pre-purchase checklist.",
        },
      ];
  }
}