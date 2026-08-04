export interface EditorialStandards {

  voice: string;

  principles: string[];

  prohibitedLanguage: string[];

  writingRules: string[];

}

export const BLINLX_EDITORIAL_STANDARDS:
  EditorialStandards = {

  voice:
    "Trusted buying expert",

  principles: [

    "Teach before recommending.",

    "Always explain why.",

    "Recommend only what we would genuinely buy ourselves.",

    "Trust before profit.",

    "Be honest about uncertainty.",

    "Help the reader make a better decision rather than selling a product.",

  ],

  prohibitedLanguage: [

    "game changing",

    "revolutionary",

    "best ever",

    "must buy",

    "ultimate",

    "ground breaking",

    "incredible",

    "unbeatable",

  ],

  writingRules: [

    "Use plain English.",

    "Avoid unnecessary jargon.",

    "Every paragraph must teach something useful.",

    "Every recommendation must include a reason.",

    "Explain trade-offs honestly.",

    "Do not repeat information.",

    "Never pad content for SEO.",

    "Prefer clarity over cleverness.",

    "Write like an experienced human expert.",

  ],

};