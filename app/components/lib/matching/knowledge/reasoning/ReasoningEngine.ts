import type {
  KnowledgeGraphPath,
  KnowledgeNode,
} from "../graph/types";
import { EvidenceAnalyzer } from "./EvidenceAnalyzer";
import type { KnowledgeGraph } from "../graph/graph";

export type ReasoningRecommendation =
  | "STRONG_MATCH"
  | "GOOD_MATCH"
  | "MIXED"
  | "POOR_MATCH"
  | "UNKNOWN";

export interface ReasoningEvidence {
  title: string;
  explanation: string;
  confidence: number;
  path: KnowledgeGraphPath;
}

export interface ProductReasoningResult {
  product: KnowledgeNode;
  target: KnowledgeNode;

  recommendation: ReasoningRecommendation;

  confidence: number;

  summary: string;

  strengths: string[];

  concerns: string[];

  evidence: ReasoningEvidence[];
}

export class ReasoningEngine {
    private readonly evidenceAnalyzer = new EvidenceAnalyzer();
  constructor(private readonly graph: KnowledgeGraph) {}

  analyseSuitability(
    productNodeId: string,
    targetNodeId: string,
    maxDepth = 5,
  ): ProductReasoningResult | null {
    const product = this.graph.getNode(productNodeId);
    const target = this.graph.getNode(targetNodeId);

    if (!product || !target) {
      return null;
    }

    const paths = this.graph.findPaths(
      productNodeId,
      targetNodeId,
      maxDepth,
    );

    if (paths.length === 0) {
      return {
        product,
        target,
        recommendation: "UNKNOWN",
        confidence: 0,
        summary: `Blinlx does not yet have enough connected knowledge to determine whether ${product.name} is suitable for ${target.name}.`,
        strengths: [],
        concerns: [],
        evidence: [],
      };
    }

    const evidence = paths
      .map((path) => this.createEvidence(path))
      .sort((a, b) => b.confidence - a.confidence);

    const analysis = this.evidenceAnalyzer.analyse(paths);

    const confidence = evidence[0]?.confidence ?? 0;
    const recommendation = this.getRecommendation(confidence);

    return {
      product,
      target,
      recommendation,
      confidence,
      summary: this.createSummary(
        product,
        target,
        recommendation,
        confidence,
      ),
      strengths: analysis.strengths,
      concerns: analysis.concerns,
      evidence,
    };
  }

  private createEvidence(
    path: KnowledgeGraphPath,
  ): ReasoningEvidence {
    const confidence = this.graph.calculatePathConfidence(path);

    return {
      title: this.createEvidenceTitle(path),
      explanation: this.graph.explainPath(path),
      confidence,
      path,
    };
  }

  private createEvidenceTitle(
    path: KnowledgeGraphPath,
  ): string {
    const firstNode = path.nodes[0];
    const finalNode = path.nodes[path.nodes.length - 1];

    if (!firstNode || !finalNode) {
      return "Knowledge graph evidence";
    }

    return `${firstNode.name} → ${finalNode.name}`;
  }

  private getRecommendation(
    confidence: number,
  ): ReasoningRecommendation {
    if (confidence >= 90) {
      return "STRONG_MATCH";
    }

    if (confidence >= 75) {
      return "GOOD_MATCH";
    }

    if (confidence >= 50) {
      return "MIXED";
    }

    if (confidence > 0) {
      return "POOR_MATCH";
    }

    return "UNKNOWN";
  }

  private createSummary(
    product: KnowledgeNode,
    target: KnowledgeNode,
    recommendation: ReasoningRecommendation,
    confidence: number,
  ): string {
    switch (recommendation) {
      case "STRONG_MATCH":
        return `${product.name} is a strong match for ${target.name}, supported by the current knowledge graph with ${confidence}% confidence.`;

      case "GOOD_MATCH":
        return `${product.name} appears to be a good match for ${target.name}, with ${confidence}% reasoning confidence.`;

      case "MIXED":
        return `${product.name} may be suitable for ${target.name}, but the available evidence is mixed. Current confidence is ${confidence}%.`;

      case "POOR_MATCH":
        return `The current knowledge graph provides only weak evidence that ${product.name} is suitable for ${target.name}. Confidence is ${confidence}%.`;

      case "UNKNOWN":
      default:
        return `Blinlx does not yet have enough evidence to judge whether ${product.name} is suitable for ${target.name}.`;
    }
  }
}
