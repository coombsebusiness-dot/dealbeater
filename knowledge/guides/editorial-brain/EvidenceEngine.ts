import type {
  KnowledgeContext,
  KnowledgeFact,
  ProductRecommendation,
} from "@/knowledge/guides/factory/knowledge/KnowledgeContext";

import type {
  EditorialEvidence,
  EditorialEvidenceItem,
  EditorialSectionKind,
} from "./EditorialTypes";

function normalise(
  value: string,
): string {
  return value
    .trim()
    .toLowerCase();
}

function createEvidenceId(
  source: EditorialEvidenceItem["source"],
  title: string,
): string {
  return [
    source.toLowerCase(),
    normalise(
      title,
    )
      .replace(
        /[^a-z0-9]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "",
      ),
  ].join(
    "-",
  );
}

function mapFact(
  fact: KnowledgeFact,
  source:
    "FACT" |
    "TRADE_OFF",
): EditorialEvidenceItem {
  return {
    id:
      createEvidenceId(
        source,
        fact.title,
      ),

    title:
      fact.title,

    explanation:
      fact.explanation,

    confidence:
      fact.confidence,

    source,
  };
}
function productMatchesTopic(
  product: ProductRecommendation,
  context: KnowledgeContext,
): boolean {
  const topic =
    normalise(
      context.topic,
    );

  const searchableText =
    normalise(
      [
        product.name,
        product.reason,
        product.buyingAdvice,
        ...(product.bestFor ?? []),
        ...(product.strengths ?? []),
        ...(product.weaknesses ?? []),
      ]
        .filter(Boolean)
        .join(" "),
    );

  const productName =
    normalise(
      product.name,
    );

  if (topic.includes("lens")) {
    const looksLikeLens =
      /\b\d{1,3}(?:-\d{1,3})?mm\b/.test(
        productName,
      ) ||
      searchableText.includes(
        "prime lens",
      ) ||
      searchableText.includes(
        "zoom lens",
      ) ||
      searchableText.includes(
        "telephoto lens",
      ) ||
      searchableText.includes(
        "wide-angle lens",
      ) ||
      searchableText.includes(
        "macro lens",
      );

    return looksLikeLens;
  }

  if (
    topic.includes("camera")
  ) {
    const looksLikeLens =
      /\b\d{1,3}(?:-\d{1,3})?mm\b/.test(
        productName,
      );

    return !looksLikeLens;
  }

  return true;
}

function selectProducts(
  context:
    KnowledgeContext,

  sectionKind:
    EditorialSectionKind,
): ProductRecommendation[] {
  if (
    sectionKind !==
      "RECOMMENDATIONS" &&
    sectionKind !==
      "VERDICT" &&
    sectionKind !==
      "BEST_VALUE"
  ) {
    return [];
  }

  return context.products
    .filter(
      (product) =>
        productMatchesTopic(
          product,
          context,
        ),
    )
    .sort(
      (
        productA,
        productB,
      ) =>
        productB.confidence -
        productA.confidence,
    )
    .slice(
      0,
      5,
    );
}

export class EvidenceEngine {
  select(
    context:
      KnowledgeContext,

    sectionKind:
      EditorialSectionKind,
  ): EditorialEvidence {
    const facts =
      context.keyFacts
        .filter(
          (fact) =>
            fact.confidence >=
            0.65,
        )
        .map(
          (fact) =>
            mapFact(
              fact,
              "FACT",
            ),
        );

    const tradeOffs =
      context.tradeOffs
        .filter(
          (tradeOff) =>
            tradeOff.confidence >=
            0.65,
        )
        .map(
          (tradeOff) =>
            mapFact(
              tradeOff,
              "TRADE_OFF",
            ),
        );

    const warnings =
      context.commonMistakes.map(
        (warning) => ({
          id:
            createEvidenceId(
              "WARNING",
              warning.title,
            ),

          title:
            warning.title,

          explanation:
            warning.explanation,

          confidence:
            0.85,

          source:
            "WARNING" as const,
        }),
      );

    return {
      facts,

      tradeOffs,

      warnings,

      products:
        selectProducts(
          context,
          sectionKind,
        ),
    };
  }
}