import type {
  RecommendationDataset,
} from "@/knowledge/guides/factory/recommendations";

export const beginnerCameraRecommendations:
  RecommendationDataset = {
  id:
    "photography-beginner-cameras",

  category:
    "Photography",

  topic:
    "Beginner cameras",

  recommendations: [
    {
      id:
        "budget-beginner-camera",

      title:
        "The Budget Beginner Setup",

      description:
        "A reliable used DSLR or affordable entry-level mirrorless camera with its standard kit lens. This is the sensible starting point when learning photography without overspending.",

      reasons: [
        "Keeps the initial cost under control.",
        "Provides everything needed to learn exposure, focus and composition.",
        "Leaves money available for a spare battery, memory card and camera bag.",
        "Can be upgraded gradually once you understand what you enjoy photographing.",
      ],

      badge:
        "Best on a tight budget",
    },

    {
      id:
        "balanced-mirrorless-camera",

      title:
        "The Balanced Mirrorless Setup",

      description:
        "A modern APS-C mirrorless camera with dependable autofocus and a versatile everyday zoom lens. This is the strongest all-round choice for most beginners.",

      reasons: [
        "Balances image quality, portability and price.",
        "Modern autofocus makes it easier to photograph people, pets and movement.",
        "A versatile zoom lens supports family, travel and everyday photography.",
        "Offers a clear upgrade path through additional lenses.",
      ],

      badge:
        "Best for most beginners",
    },

    {
      id:
        "travel-everyday-camera",

      title:
        "The Travel and Everyday Setup",

      description:
        "A lightweight mirrorless camera paired with a compact zoom or small prime lens. This setup prioritises portability and makes it easier to carry the camera regularly.",

      reasons: [
        "Small enough to carry on holidays and everyday outings.",
        "Produces excellent image quality without requiring a heavy bag.",
        "Suitable for family, travel, street and documentary photography.",
        "Encourages regular use because the complete setup remains manageable.",
      ],

      badge:
        "Best for portability",
    },

    {
      id:
        "enthusiast-beginner-camera",

      title:
        "The Long-Term Enthusiast Setup",

      description:
        "A higher-tier APS-C mirrorless camera with stronger controls, improved autofocus and room to grow. This suits beginners who expect photography to become a serious long-term hobby.",

      reasons: [
        "Provides controls and performance that remain useful as skills develop.",
        "Reduces the need to replace the camera body quickly.",
        "Supports more demanding subjects such as wildlife, sport and action.",
        "Makes sense when the budget still allows for a useful lens and accessories.",
      ],

      badge:
        "Best for long-term growth",
    },
  ],
};