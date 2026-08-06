import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  KnowledgeContext,
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

export type EditorialSectionKind =
  | "INTRODUCTION"
  | "EXPLANATION"
  | "NEED"
  | "AUDIENCE"
  | "PRIORITIES"
  | "BUDGET"
  | "COMPROMISES"
  | "BEST_VALUE"
  | "BUYING_USED"
  | "MISTAKES"
  | "PREVENTION"
  | "RECOMMENDATIONS"
  | "ALTERNATIVES"
  | "CHECKLIST"
  | "VERDICT";

export interface ReaderQuestion {
  question:
    string;

  buyerDecision:
    string;

  desiredOutcome:
    string;
}

export type EditorialEvidenceRole =
  | "GENERAL"
  | "AUDIENCE"
  | "COMPATIBILITY"
  | "UPGRADE"
  | "ACCESSORY"
  | "ALTERNATIVE"
  | "VALUE"
  | "RECOMMENDATION"
  | "BUYING_ADVICE";

export interface EditorialEvidenceItem {
  id:
    string;

  title:
    string;

  explanation:
    string;

  confidence:
    number;

  source:
    | "FACT"
    | "TRADE_OFF"
    | "WARNING"
    | "PRODUCT";

    role:
    EditorialEvidenceRole;
}

export interface EditorialEvidence {
  facts:
    EditorialEvidenceItem[];

  tradeOffs:
    EditorialEvidenceItem[];

  warnings:
    EditorialEvidenceItem[];

  products:
    ProductRecommendation[];
}

export interface EditorialParagraph {
  id:
    string;

  text:
    string;

  role:
    | "OPENING"
    | "EVIDENCE"
    | "TRADE_OFF"
    | "WARNING"
    | "RECOMMENDATION"
    | "NEXT_STEP"
    | "VERDICT";

  knowledgeUsed:
    string[];
}

export interface EditorialSectionResult {
  sectionKind:
    EditorialSectionKind;

  heading:
    string;

  introduction:
    string;

  paragraphs:
    EditorialParagraph[];

  takeaway:
    string;

  knowledgeUsed:
    string[];

  confidence:
    number;

  publishable:
    boolean;

  qualityIssues:
    string[];
}

export interface EditorialBrainInput {
  blueprint:
    GuideBlueprint;

  knowledge:
    KnowledgeContext;

  sectionKind:
    EditorialSectionKind;

  heading:
    string;

  previousHeading?:
    string;

  nextHeading?:
    string;
}