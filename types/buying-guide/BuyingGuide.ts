import type {
  BuyingGuideSection,
} from "./BuyingGuideSection";

import type {
  FAQ,
} from "./FAQ";

import type {
  Verdict,
} from "./Verdict";

import type {
  Recommendation,
} from "./Recommendation";

export interface BuyingGuideImage {
  src: string;

  alt: string;

  width?: number;

  height?: number;

  caption?: string;
}

export interface BuyingGuideAuthor {
  name: string;

  role?: string;

  profileUrl?: string;
}

export interface BuyingGuideSEO {
  title: string;

  description: string;

  canonicalPath: string;

  keywords?: string[];

  openGraphImage?: BuyingGuideImage;

  noIndex?: boolean;
}

export interface RelatedGuide {
  slug: string;

  title: string;

  description?: string;

  image?: BuyingGuideImage;

  category?: string;
}

export interface BuyingGuide {
  slug: string;

  title: string;

  subtitle?: string;

  category: string;

  topic?: string;

  publishedAt: string;

  updatedAt: string;

  author: BuyingGuideAuthor;

  heroImage: BuyingGuideImage;

  seo: BuyingGuideSEO;

  verdict: Verdict;

  summary: string[];

  recommendations?: Recommendation[];

  sections: BuyingGuideSection[];

  faqs: FAQ[];

  relatedGuides: RelatedGuide[];

  askBlinlxPrompt?: string;

  featured?: boolean;
}