import { NextResponse } from "next/server";

import { blinlxKnowledgeGraph } from "@/app/components/lib/matching/knowledge/graph/graph";
import { registerTestKnowledgeGraph } from "@/app/components/lib/matching/knowledge/graph/testData";
import { ReasoningEngine } from "@/app/components/lib/matching/knowledge/reasoning/ReasoningEngine";

export async function GET() {
  blinlxKnowledgeGraph.clear();
  registerTestKnowledgeGraph();

  const reasoningEngine = new ReasoningEngine(
    blinlxKnowledgeGraph,
  );

  const macbook = blinlxKnowledgeGraph.getNode(
    "macbook-pro-14-2021-m1-pro",
  );

  const neighbours = blinlxKnowledgeGraph.getNeighbours(
    "macbook-pro-14-2021-m1-pro",
  );

  const reasoningPaths = blinlxKnowledgeGraph.findPaths(
    "macbook-pro-14-2021-m1-pro",
   "photo-editing",
    5,
  );

  const scoredReasoningPaths = reasoningPaths.map((path) => ({
    ...path,
    confidence:
      blinlxKnowledgeGraph.calculatePathConfidence(path),
    explanation:
      blinlxKnowledgeGraph.explainPath(path),
  }));

const reasoningResult = reasoningEngine.analyseSuitability(
  "macbook-pro-14-2021-m1-pro",
  "photo-editing",
  5,
);

  return NextResponse.json({
    success: true,
    nodeCount: blinlxKnowledgeGraph.getNodes().length,
    edgeCount: blinlxKnowledgeGraph.getEdges().length,
    macbook,
    neighbours,
    reasoningPaths: scoredReasoningPaths,
    reasoningResult,
    graph: blinlxKnowledgeGraph.export(),
  });
}