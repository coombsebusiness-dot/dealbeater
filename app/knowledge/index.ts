import {
  bootstrapKnowledge,
} from "./KnowledgeBootstrap";

bootstrapKnowledge();

export {
  knowledgeEngine,
} from "./KnowledgeEngine";

export type {
  KnowledgeArticle,
  KnowledgeArticleType,
  KnowledgeSource,
} from "./KnowledgeArticle";

export type {
  KnowledgeEngineQuery,
  KnowledgeEngineResult,
} from "./KnowledgeEngine";



import {
  bootstrapKnowledgeCollections,
} from "./KnowledgeCollectionBootstrap";

bootstrapKnowledgeCollections();