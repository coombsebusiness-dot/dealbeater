export type KnowledgeArticleType =
  | "PRINCIPLE"
  | "WISDOM"
  | "MISTAKE"
  | "METHODOLOGY"
  | "TRUST"
  | "GLOSSARY"
  | "FAQ"
  | "CATEGORY"
  | "BUYING_GUIDE";

export interface KnowledgeSource {
  name: string;

  url?: string;

  publishedAt?: string;

  accessedAt?: string;
}

export interface KnowledgeArticle {
  id: string;

  type: KnowledgeArticleType;

  title: string;

  summary: string;

  content: string[];

  tags: string[];

  categories: string[];

  relatedKnowledge?: string[];

  confidence: number;

  author?: string;

  publishedAt: string;

  lastReviewed: string;

  sources?: KnowledgeSource[];

  active?: boolean;
}