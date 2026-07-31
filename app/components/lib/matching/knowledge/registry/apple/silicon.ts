import type {
  ProcessorKnowledge,
} from "../types";

export const appleSiliconRegistry:
  ProcessorKnowledge[] = [
    /*
     * M1 FAMILY
     */

    {
      id: "apple-m1",

      name: "Apple M1",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M1",
        "Apple M1",
        "Apple Silicon M1",
      ],

      category: "Processor",

      releaseYear: 2020,

      generation: 1,

      tier: "Entry-level",

      architecture: "Apple Silicon",

      performanceScore: 100,

      efficiencyScore: 92,

      aiCapable: true,

      summary:
        "Apple M1 is the first-generation Apple Silicon processor for Mac computers, offering strong everyday performance and excellent power efficiency.",

      bestFor: [
        "Everyday computing",
        "Software development",
        "Photo editing",
        "Light to moderate video editing",
      ],

      strengths: [
        "Excellent power efficiency",
        "Strong everyday performance",
        "Unified memory architecture",
        "Quiet operation",
      ],

      limitations: [
        "Lower sustained performance than Pro and Max variants",
        "Limited external-display support on some M1 Macs",
      ],

      predecessorId: null,

      successorId: "apple-m2",
    },

    {
      id: "apple-m1-pro",

      name: "Apple M1 Pro",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M1 Pro",
        "M1-Pro",
        "Apple M1 Pro",
      ],

      category: "Processor",

      releaseYear: 2021,

      generation: 1,

      tier: "Professional",

      architecture: "Apple Silicon",

      performanceScore: 155,

      efficiencyScore: 90,

      aiCapable: true,

      summary:
        "Apple M1 Pro is a professional Apple Silicon processor designed for demanding creative and development workloads.",

      bestFor: [
        "Professional photo editing",
        "4K video editing",
        "Software development",
        "Music production",
      ],

      strengths: [
        "Strong multi-core performance",
        "High memory bandwidth",
        "Excellent efficiency",
        "Strong integrated graphics",
      ],

      limitations: [
        "Less graphics performance than M1 Max",
        "Available only in selected professional Mac models",
      ],

      predecessorId: null,

      successorId: "apple-m2-pro",
    },

    {
      id: "apple-m1-max",

      name: "Apple M1 Max",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M1 Max",
        "M1-Max",
        "Apple M1 Max",
      ],

      category: "Processor",

      releaseYear: 2021,

      generation: 1,

      tier: "Flagship",

      architecture: "Apple Silicon",

      performanceScore: 195,

      efficiencyScore: 87,

      aiCapable: true,

      summary:
        "Apple M1 Max is a high-performance Apple Silicon processor aimed at professional graphics, video and creative workloads.",

      bestFor: [
        "Professional video production",
        "3D graphics",
        "Large creative projects",
        "Advanced software development",
      ],

      strengths: [
        "Powerful integrated graphics",
        "High memory bandwidth",
        "Strong media engines",
        "Excellent performance per watt",
      ],

      limitations: [
        "More expensive than M1 Pro systems",
        "Unnecessary for many everyday workloads",
      ],

      predecessorId: null,

      successorId: "apple-m2-max",
    },

    {
      id: "apple-m1-ultra",

      name: "Apple M1 Ultra",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M1 Ultra",
        "M1-Ultra",
        "Apple M1 Ultra",
      ],

      category: "Processor",

      releaseYear: 2022,

      generation: 1,

      tier: "Specialist",

      architecture: "Apple Silicon",

      performanceScore: 250,

      efficiencyScore: 82,

      aiCapable: true,

      summary:
        "Apple M1 Ultra is a workstation-class Apple Silicon processor for highly demanding professional workloads.",

      bestFor: [
        "High-end video production",
        "3D rendering",
        "Large professional projects",
        "Specialist workstation workloads",
      ],

      strengths: [
        "Very high multi-core performance",
        "Powerful integrated graphics",
        "Large unified-memory capacity",
        "Multiple media engines",
      ],

      limitations: [
        "Available only in desktop-class systems",
        "Excessive for ordinary workloads",
        "High system cost",
      ],

      predecessorId: null,

      successorId: "apple-m2-ultra",
    },

    /*
     * M2 FAMILY
     */

    {
      id: "apple-m2",

      name: "Apple M2",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M2",
        "Apple M2",
        "Apple Silicon M2",
      ],

      category: "Processor",

      releaseYear: 2022,

      generation: 2,

      tier: "Entry-level",

      architecture: "Apple Silicon",

      performanceScore: 118,

      efficiencyScore: 91,

      aiCapable: true,

      summary:
        "Apple M2 is the second-generation mainstream Apple Silicon processor, improving CPU and graphics performance over M1 while retaining strong efficiency.",

      bestFor: [
        "Everyday computing",
        "Software development",
        "Photo editing",
        "Moderate video editing",
      ],

      strengths: [
        "Strong performance efficiency",
        "Improved graphics over M1",
        "Unified memory architecture",
        "Good battery-life potential",
      ],

      limitations: [
        "Less sustained performance than M2 Pro",
        "Base systems may offer limited ports and external-display support",
      ],

      predecessorId: "apple-m1",

      successorId: "apple-m3",
    },

    {
      id: "apple-m2-pro",

      name: "Apple M2 Pro",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M2 Pro",
        "M2-Pro",
        "Apple M2 Pro",
      ],

      category: "Processor",

      releaseYear: 2023,

      generation: 2,

      tier: "Professional",

      architecture: "Apple Silicon",

      performanceScore: 180,

      efficiencyScore: 89,

      aiCapable: true,

      summary:
        "Apple M2 Pro is a professional Apple Silicon processor designed for sustained creative, development and production workloads.",

      bestFor: [
        "Professional photo editing",
        "4K and 6K video editing",
        "Software development",
        "Music production",
      ],

      strengths: [
        "Strong multi-core performance",
        "High memory bandwidth",
        "Excellent efficiency",
        "Capable integrated graphics",
      ],

      limitations: [
        "Less graphics performance than M2 Max",
        "More expensive than mainstream M2 systems",
      ],

      predecessorId: "apple-m1-pro",

      successorId: "apple-m3-pro",
    },

    {
      id: "apple-m2-max",

      name: "Apple M2 Max",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M2 Max",
        "M2-Max",
        "Apple M2 Max",
      ],

      category: "Processor",

      releaseYear: 2023,

      generation: 2,

      tier: "Flagship",

      architecture: "Apple Silicon",

      performanceScore: 225,

      efficiencyScore: 86,

      aiCapable: true,

      summary:
        "Apple M2 Max is a high-end Apple Silicon processor for demanding graphics, video and professional creative workloads.",

      bestFor: [
        "Professional video production",
        "3D graphics",
        "Large creative projects",
        "Advanced development workloads",
      ],

      strengths: [
        "Powerful integrated graphics",
        "High memory bandwidth",
        "Strong media acceleration",
        "Excellent performance per watt",
      ],

      limitations: [
        "High purchase cost",
        "Often excessive for standard office and consumer use",
      ],

      predecessorId: "apple-m1-max",

      successorId: "apple-m3-max",
    },

    {
      id: "apple-m2-ultra",

      name: "Apple M2 Ultra",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M2 Ultra",
        "M2-Ultra",
        "Apple M2 Ultra",
      ],

      category: "Processor",

      releaseYear: 2023,

      generation: 2,

      tier: "Specialist",

      architecture: "Apple Silicon",

      performanceScore: 285,

      efficiencyScore: 81,

      aiCapable: true,

      summary:
        "Apple M2 Ultra is a workstation-class Apple Silicon processor built for very large professional creative and compute workloads.",

      bestFor: [
        "High-end video production",
        "3D rendering",
        "Large-scale professional workflows",
        "Specialist workstation use",
      ],

      strengths: [
        "Very high multi-core performance",
        "Large unified-memory support",
        "Powerful graphics",
        "Multiple media engines",
      ],

      limitations: [
        "Desktop-only availability",
        "Very high system cost",
        "Excessive for most users",
      ],

      predecessorId: "apple-m1-ultra",

      successorId: null,
    },

    /*
     * M3 FAMILY
     */

    {
      id: "apple-m3",

      name: "Apple M3",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M3",
        "Apple M3",
        "Apple Silicon M3",
      ],

      category: "Processor",

      releaseYear: 2023,

      generation: 3,

      tier: "Entry-level",

      architecture: "Apple Silicon",

      performanceScore: 138,

      efficiencyScore: 93,

      aiCapable: true,

      summary:
        "Apple M3 is a third-generation mainstream Apple Silicon processor with improved CPU efficiency and substantially stronger graphics features than earlier base chips.",

      bestFor: [
        "Everyday computing",
        "Software development",
        "Photo editing",
        "Moderate creative work",
      ],

      strengths: [
        "Strong single-core performance",
        "Improved graphics architecture",
        "Excellent efficiency",
        "Unified memory architecture",
      ],

      limitations: [
        "Less sustained performance than Pro and Max variants",
        "Base systems can remain limited for heavy professional workflows",
      ],

      predecessorId: "apple-m2",

      successorId: "apple-m4",
    },

    {
      id: "apple-m3-pro",

      name: "Apple M3 Pro",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M3 Pro",
        "M3-Pro",
        "Apple M3 Pro",
      ],

      category: "Processor",

      releaseYear: 2023,

      generation: 3,

      tier: "Professional",

      architecture: "Apple Silicon",

      performanceScore: 198,

      efficiencyScore: 91,

      aiCapable: true,

      summary:
        "Apple M3 Pro is a professional Apple Silicon processor aimed at demanding creative and development work with improved graphics capabilities.",

      bestFor: [
        "Professional photo editing",
        "Video editing",
        "Software development",
        "Music production",
      ],

      strengths: [
        "Strong sustained performance",
        "Improved graphics features",
        "Excellent efficiency",
        "Professional memory bandwidth",
      ],

      limitations: [
        "Less graphics performance than M3 Max",
        "May offer limited value over discounted previous-generation Pro systems",
      ],

      predecessorId: "apple-m2-pro",

      successorId: "apple-m4-pro",
    },

    {
      id: "apple-m3-max",

      name: "Apple M3 Max",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M3 Max",
        "M3-Max",
        "Apple M3 Max",
      ],

      category: "Processor",

      releaseYear: 2023,

      generation: 3,

      tier: "Flagship",

      architecture: "Apple Silicon",

      performanceScore: 255,

      efficiencyScore: 87,

      aiCapable: true,

      summary:
        "Apple M3 Max is a flagship Apple Silicon processor for advanced video, graphics, rendering and development workloads.",

      bestFor: [
        "Professional video production",
        "3D rendering",
        "Large development workloads",
        "Advanced creative production",
      ],

      strengths: [
        "Very strong CPU performance",
        "Powerful integrated graphics",
        "Large unified-memory support",
        "Strong media acceleration",
      ],

      limitations: [
        "Very high purchase cost",
        "Excessive for many users",
      ],

      predecessorId: "apple-m2-max",

      successorId: "apple-m4-max",
    },

    /*
     * M4 FAMILY
     */

    {
      id: "apple-m4",

      name: "Apple M4",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M4",
        "Apple M4",
        "Apple Silicon M4",
      ],

      category: "Processor",

      releaseYear: 2024,

      generation: 4,

      tier: "Entry-level",

      architecture: "Apple Silicon",

      performanceScore: 160,

      efficiencyScore: 94,

      aiCapable: true,

      summary:
        "Apple M4 is a fourth-generation mainstream Apple Silicon processor focused on strong CPU performance, efficiency and accelerated AI workloads.",

      bestFor: [
        "Everyday computing",
        "Software development",
        "Photo editing",
        "Creative applications",
        "AI-assisted workflows",
      ],

      strengths: [
        "Very strong single-core performance",
        "Excellent efficiency",
        "Improved Neural Engine capability",
        "Strong integrated graphics",
      ],

      limitations: [
        "Less sustained performance than M4 Pro",
        "Base systems may still be unsuitable for the heaviest professional workloads",
      ],

      predecessorId: "apple-m3",

      successorId: null,
    },

    {
      id: "apple-m4-pro",

      name: "Apple M4 Pro",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M4 Pro",
        "M4-Pro",
        "Apple M4 Pro",
      ],

      category: "Processor",

      releaseYear: 2024,

      generation: 4,

      tier: "Professional",

      architecture: "Apple Silicon",

      performanceScore: 225,

      efficiencyScore: 92,

      aiCapable: true,

      summary:
        "Apple M4 Pro is a professional Apple Silicon processor designed for demanding creative, development and AI-assisted workflows.",

      bestFor: [
        "Professional photography",
        "High-resolution video editing",
        "Software development",
        "Music production",
        "AI-assisted creative work",
      ],

      strengths: [
        "Very strong CPU performance",
        "High memory bandwidth",
        "Excellent efficiency",
        "Powerful media and AI acceleration",
      ],

      limitations: [
        "Higher system cost than standard M4",
        "Less graphics capability than M4 Max",
      ],

      predecessorId: "apple-m3-pro",

      successorId: null,
    },

    {
      id: "apple-m4-max",

      name: "Apple M4 Max",

      type: "chip",

      brand: "Apple",

      family: "Apple Silicon",

      aliases: [
        "M4 Max",
        "M4-Max",
        "Apple M4 Max",
      ],

      category: "Processor",

      releaseYear: 2024,

      generation: 4,

      tier: "Flagship",

      architecture: "Apple Silicon",

      performanceScore: 290,

      efficiencyScore: 88,

      aiCapable: true,

      summary:
        "Apple M4 Max is a flagship Apple Silicon processor intended for advanced graphics, video, rendering, AI and large professional workflows.",

      bestFor: [
        "Professional video production",
        "3D rendering",
        "Large software projects",
        "Advanced AI-assisted workflows",
        "High-end creative production",
      ],

      strengths: [
        "Extremely strong CPU performance",
        "Powerful integrated graphics",
        "Large unified-memory capability",
        "Strong media and AI acceleration",
      ],

      limitations: [
        "Very high system cost",
        "Unnecessary for most consumer workloads",
      ],

      predecessorId: "apple-m3-max",

      successorId: null,
    },
  ];