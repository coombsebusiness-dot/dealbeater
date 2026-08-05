import type {
  GuideBlueprint,
  GuideBlueprintType,
} from "@/knowledge/guides/blueprints";

import {
  EditorialBrain,
} from "@/knowledge/guides/editorial-brain";

import type {
  EditorialSectionKind,
  EditorialSectionResult,
} from "@/knowledge/guides/editorial-brain";

import {
  EditorialMemory,
} from "../editorial";

import type {
  SectionContext,
} from "../editorial";

import type {
  EditorialGoal,
} from "../editorial/EditorialGoal";

import type {
  KnowledgeContext,
} from "../knowledge/KnowledgeContext";

export interface EditorialSection {
  heading:
    string;

  introduction:
    string;

  paragraphs:
    string[];

  takeaway:
    string;

  knowledgeUsed:
    string[];

  selectedKnowledge: {
    facts:
      string[];

    tradeOffs:
      string[];
  };

  memory: {
    covered:
      string[];

    totalEntries:
      number;
  };

  rules: {
    passed:
      boolean;

    score:
      number;

    messages:
      string[];
  };
}

interface WriteEditorialSectionInput {
  context:
    KnowledgeContext;

  goal:
    EditorialGoal;

  section:
    SectionContext;

  sectionId:
    string;

  sectionKind:
    EditorialSectionKind;
}

function createSlug(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase()
    .replace(
      /&/g,
      "and",
    )
    .replace(
      /['’]/g,
      "",
    )
    .replace(
      /[^a-z0-9]+/g,
      "-",
    )
    .replace(
      /^-+|-+$/g,
      "",
    );
}

function inferBlueprintType(
  sectionKind:
    EditorialSectionKind,
): GuideBlueprintType {
  switch (sectionKind) {
    case "MISTAKES":
      return "MISTAKES";

    case "BEST_VALUE":
    case "BUDGET":
      return "BUDGET_GUIDE";

    default:
      return "BUYING_GUIDE";
  }
}

function createCompatibilityBlueprint(
  context:
    KnowledgeContext,

  goal:
    EditorialGoal,

  sectionKind:
    EditorialSectionKind,
): GuideBlueprint {
  const slug =
    createSlug(
      context.topic,
    );

  return {
    id:
      `editorial-${slug}`,

    slug,

    title:
      context.topic,

    category:
      context.category as GuideBlueprint["category"],

    topic:
      context.topic,

    type:
      inferBlueprintType(
        sectionKind,
      ),

    primaryKeyword:
      context.topic
        .trim()
        .toLowerCase(),

    secondaryKeywords:
      [],

    audience:
      goal.audience,

    searchIntent:
      "COMMERCIAL",

    recommendationTopic:
      context.topic,

    status:
      "READY",

    priority:
      3,
  };
}

function calculateRulesScore(
  result:
    EditorialSectionResult,
): number {
  if (
    result.publishable
  ) {
    return 100;
  }

  return Math.max(
    0,
    100 -
      result.qualityIssues.length *
        15,
  );
}

function getSelectedFacts(
  result:
    EditorialSectionResult,

  context:
    KnowledgeContext,
): string[] {
  const factTitles =
    new Set(
      context.keyFacts.map(
        (fact) =>
          fact.title,
      ),
    );

  return result.knowledgeUsed.filter(
    (title) =>
      factTitles.has(
        title,
      ),
  );
}

function getSelectedTradeOffs(
  result:
    EditorialSectionResult,

  context:
    KnowledgeContext,
): string[] {
  const tradeOffTitles =
    new Set(
      context.tradeOffs.map(
        (tradeOff) =>
          tradeOff.title,
      ),
    );

  return result.knowledgeUsed.filter(
    (title) =>
      tradeOffTitles.has(
        title,
      ),
  );
}

export class EditorialAuthor {
  private readonly brain =
    new EditorialBrain();

  constructor(
    private readonly memory =
      new EditorialMemory(),
  ) {}

  private rememberKnowledge(
    result:
      EditorialSectionResult,

    context: KnowledgeContext,

    sectionId:
      string,
  ): void {
    const factsByTitle =
      new Map(
        context.keyFacts.map(
          (fact) => [
            fact.title,
            fact,
          ],
        ),
      );

    const tradeOffsByTitle =
      new Map(
        context.tradeOffs.map(
          (tradeOff) => [
            tradeOff.title,
            tradeOff,
          ],
        ),
      );

    const mistakesByTitle =
      new Map(
        context.commonMistakes.map(
          (mistake) => [
            mistake.title,
            mistake,
          ],
        ),
      );

    const productsByName =
      new Map(
        context.products.map(
          (product) => [
            product.name,
            product,
          ],
        ),
      );

    result.knowledgeUsed.forEach(
      (title) => {
        const fact =
          factsByTitle.get(
            title,
          );

        if (fact) {
          this.memory
            .markFactCovered(
              fact.title,
              sectionId,
              fact.explanation,
            );

          return;
        }

        const tradeOff =
          tradeOffsByTitle.get(
            title,
          );

        if (tradeOff) {
          this.memory
            .markTradeOffCovered(
              tradeOff.title,
              sectionId,
              tradeOff.explanation,
            );

          return;
        }

        const mistake =
          mistakesByTitle.get(
            title,
          );

        if (mistake) {
          this.memory
            .markMistakeCovered(
              mistake.title,
              sectionId,
              mistake.explanation,
            );

          return;
        }

        const product =
          productsByName.get(
            title,
          );

        if (product) {
          this.memory.remember({
            kind:
              "PRODUCT",

            title:
              product.name,

            sectionId,

            detail:
              product.reason,
          });

          return;
        }

        this.memory.remember({
          kind:
            "IDEA",

          title,

          sectionId,
        });
      },
    );
  }
  private createUncoveredContext(
  context:
    KnowledgeContext,
): KnowledgeContext {
  return {
    ...context,

    keyFacts:
      context.keyFacts.filter(
        (fact) =>
          !this.memory.hasCovered(
            "FACT",
            fact.title,
          ),
      ),

    tradeOffs:
      context.tradeOffs.filter(
        (tradeOff) =>
          !this.memory.hasCovered(
            "TRADE_OFF",
            tradeOff.title,
          ),
      ),

    commonMistakes:
      context.commonMistakes.filter(
        (mistake) =>
          !this.memory.hasCovered(
            "MISTAKE",
            mistake.title,
          ),
      ),

    products:
      context.products.filter(
        (product) =>
          !this.memory.hasCovered(
            "PRODUCT",
            product.name,
          ),
      ),
  };
}

  private writeSection({
    context,
    goal,
    section,
    sectionId,
    sectionKind,
  }: WriteEditorialSectionInput):
    EditorialSection {
    const blueprint =
      createCompatibilityBlueprint(
        context,
        goal,
        sectionKind,
      );
const uncoveredContext =
  this.createUncoveredContext(
    context,
  );
    const result =
      this.brain.writeSection({
        blueprint,

        knowledge:
  uncoveredContext,

        sectionKind,

        heading:
          section.currentHeading,

        previousHeading:
          section.previousHeading,

        nextHeading:
          section.nextHeading,
      });

    this.rememberKnowledge(
      result,
      context,
      sectionId,
    );

    const facts =
      getSelectedFacts(
        result,
        context,
      );

    const tradeOffs =
      getSelectedTradeOffs(
        result,
        context,
      );

    return {
      heading:
        result.heading,

      introduction:
        result.introduction,

      paragraphs:
        result.paragraphs.map(
          (paragraph) =>
            paragraph.text,
        ),

      takeaway:
        result.takeaway,

      knowledgeUsed:
        result.knowledgeUsed,

      selectedKnowledge: {
        facts,

        tradeOffs,
      },

      memory: {
        covered:
          this.memory
            .getBySection(
              sectionId,
            )
            .map(
              (entry) =>
                entry.title,
            ),

        totalEntries:
          this.memory.size,
      },

      rules: {
        passed:
          result.publishable,

        score:
          calculateRulesScore(
            result,
          ),

        messages:
          result.qualityIssues
            .length > 0
            ? result.qualityIssues
            : [
                `${result.heading} passed the Editorial Brain quality checks.`,
              ],
      },
    };
  }

  writeIntroduction(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "introduction",

      sectionKind:
        "INTRODUCTION",
    });
  }

  writeNeed(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "do-you-need-it",

      sectionKind:
        "NEED",
    });
  }

  writeAudience(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "who-is-it-for",

      sectionKind:
        "AUDIENCE",
    });
  }

  writePriorities(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "what-to-prioritise",

      sectionKind:
        "PRIORITIES",
    });
  }

  writeBudget(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "budget",

      sectionKind:
        "BUDGET",
    });
  }

  writeCompromises(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "what-to-compromise",

      sectionKind:
        "COMPROMISES",
    });
  }

  writeBestValue(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "best-value",

      sectionKind:
        "BEST_VALUE",
    });
  }

  writeBuyingUsed(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "new-vs-used",

      sectionKind:
        "BUYING_USED",
    });
  }

  writeMistakes(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "mistakes",

      sectionKind:
        "MISTAKES",
    });
  }

  writeRecommendations(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "recommendations",

      sectionKind:
        "RECOMMENDATIONS",
    });
  }

  writeAlternatives(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "alternatives",

      sectionKind:
        "ALTERNATIVES",
    });
  }

  writeChecklist(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "before-you-buy",

      sectionKind:
        "CHECKLIST",
    });
  }

  writeVerdict(
    context:
      KnowledgeContext,

    goal:
      EditorialGoal,

    section:
      SectionContext,
  ): EditorialSection {
    return this.writeSection({
      context,
      goal,
      section,

      sectionId:
        "final-verdict",

      sectionKind:
        "VERDICT",
    });
  }
}