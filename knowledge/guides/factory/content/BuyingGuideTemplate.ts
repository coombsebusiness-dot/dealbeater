export interface BuyingGuideTemplate {
  sectionOrder: string[];

  minimumSections: number;

  minimumFaqs: number;

  requiresVerdict: boolean;

  requiresOpinion: boolean;

  requiresSummary: boolean;

  requiresCTA: boolean;
}

export const buyingGuideTemplate: BuyingGuideTemplate =
  {
    sectionOrder: [
      "introduction",
      "what-is-it",
      "who-is-it-for",
      "what-to-look-for",
      "common-mistakes",
      "recommendations",
      "alternatives",
      "final-verdict",
    ],

    minimumSections: 8,

    minimumFaqs: 6,

    requiresVerdict: true,

    requiresOpinion: true,

    requiresSummary: true,

    requiresCTA: true,
  };