import type {
  KnowledgeCollection,
} from "../KnowledgeCollection";

export const beginnerPhotographyCollection:
  KnowledgeCollection = {
  id:
    "beginner-photography",

  title:
    "Beginner Photography Buying Knowledge",

  description:
    "Core buying principles, photography-specific wisdom and common mistakes for people choosing their first camera setup.",

  query: {
    articleIds: [
      "trust-before-profit",
      "buy-for-needs",
      "buy-for-longevity",
      "value-over-specifications",
      "avoid-marketing",
      "our-promise",
    ],

    categories: [
      "photography",
    ],

    minimumConfidence:
      70,

    includeRelated:
      true,

    relatedLimit:
      12,

    limit:
      50,
  },

  tags: [
    "photography",
    "beginner",
    "camera buying",
  ],

  categories: [
    "photography",
  ],

  active:
    true,
};