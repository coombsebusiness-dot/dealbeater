import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import type {
  GuideBlueprint,
} from "@/knowledge/guides/blueprints";

import type {
  GeneratedGuideContentDraft,
} from "@/knowledge/guides/factory/content";

import type {
  KnowledgeContext,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import type {
  EditorialSectionResult,
} from "./EditorialTypes";

export interface EditorialGuideWriterInput {
  blueprint:
    GuideBlueprint;

  content:
    GeneratedGuideContentDraft;

  knowledge:
    KnowledgeContext;
}

export interface EditorialGuideResult {
  sections:
    EditorialSectionResult[];

  recommendations:
    BuyingGuide["recommendations"];

  verdict:
    BuyingGuide["verdict"];

  opinion:
    BuyingGuide["blinlxOpinion"];

  summary:
    BuyingGuide["summary"];

  faqs:
    BuyingGuide["faqs"];

  publishable:
    boolean;

  qualityIssues:
    string[];

  knowledgeUsed:
    string[];
}