export type BuyingGuideSectionType =
  | "TEXT"
  | "IMAGE"
  | "QUOTE"
  | "TIP"
  | "WARNING"
  | "TABLE"
  | "COMPARISON"
  | "GALLERY"
  | "RECOMMENDATION"
  | "CTA";

export interface BuyingGuideTextBlock {
  type: "TEXT";

  id: string;

  heading?: string;

  paragraphs: string[];
}

export interface BuyingGuideImageBlock {
  type: "IMAGE";

  id: string;

  src: string;

  alt: string;

  caption?: string;

  width?: number;

  height?: number;
}

export interface BuyingGuideQuoteBlock {
  type: "QUOTE";

  id: string;

  quote: string;

  attribution?: string;
}

export interface BuyingGuideTipBlock {
  type: "TIP";

  id: string;

  title?: string;

  text: string;
}

export interface BuyingGuideWarningBlock {
  type: "WARNING";

  id: string;

  title?: string;

  text: string;
}

export interface BuyingGuideTableColumn {
  key: string;

  label: string;
}

export interface BuyingGuideTableRow {
  id: string;

  values: Record<
    string,
    string | number | boolean
  >;
}

export interface BuyingGuideTableBlock {
  type: "TABLE";

  id: string;

  heading?: string;

  columns: BuyingGuideTableColumn[];

  rows: BuyingGuideTableRow[];
}

export interface BuyingGuideComparisonItem {
  id: string;

  name: string;

  description?: string;

  image?: string;

  strengths?: string[];

  weaknesses?: string[];

  verdict?: string;
}

export interface BuyingGuideComparisonBlock {
  type: "COMPARISON";

  id: string;

  heading?: string;

  items: BuyingGuideComparisonItem[];
}

export interface BuyingGuideGalleryImage {
  id: string;

  src: string;

  alt: string;

  caption?: string;
}

export interface BuyingGuideGalleryBlock {
  type: "GALLERY";

  id: string;

  heading?: string;

  images: BuyingGuideGalleryImage[];
}

export interface BuyingGuideRecommendationBlock {
  type: "RECOMMENDATION";

  id: string;

  heading: string;

  summary: string;

  reasons: string[];

  productName?: string;

  productUrl?: string;

  image?: string;
}

export interface BuyingGuideCTABlock {
  type: "CTA";

  id: string;

  heading: string;

  text: string;

  buttonLabel: string;

  buttonHref: string;
}

export type BuyingGuideBlock =
  | BuyingGuideTextBlock
  | BuyingGuideImageBlock
  | BuyingGuideQuoteBlock
  | BuyingGuideTipBlock
  | BuyingGuideWarningBlock
  | BuyingGuideTableBlock
  | BuyingGuideComparisonBlock
  | BuyingGuideGalleryBlock
  | BuyingGuideRecommendationBlock
  | BuyingGuideCTABlock;

export interface BuyingGuideSection {
  id: string;

  heading: string;

  introduction?: string;

  blocks: BuyingGuideBlock[];
}