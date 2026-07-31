import type {
  KnowledgeEdge,
  KnowledgeGraphData,
  KnowledgeGraphNeighbour,
  KnowledgeGraphPath,
  KnowledgeNode,
} from "./types";

import type { KnowledgeRelationshipType } from "./relationships";

export class KnowledgeGraph {
  private readonly nodes = new Map<string, KnowledgeNode>();
  private readonly edges = new Map<string, KnowledgeEdge>();

  
  constructor(initialData?: Partial<KnowledgeGraphData>) {
    initialData?.nodes?.forEach((node) => {
      this.addNode(node);
    });

    initialData?.edges?.forEach((edge) => {
      this.addEdge(edge);
    });
  }

  

  addNode(node: KnowledgeNode): KnowledgeNode {
    const existingNode = this.nodes.get(node.id);

    if (existingNode) {
      const mergedNode: KnowledgeNode = {
        ...existingNode,
        ...node,
        aliases: Array.from(
          new Set([...(existingNode.aliases ?? []), ...(node.aliases ?? [])]),
        ),
        metadata: {
          ...(existingNode.metadata ?? {}),
          ...(node.metadata ?? {}),
        },
      };

      this.nodes.set(node.id, mergedNode);

      return mergedNode;
    }

    this.nodes.set(node.id, node);

    return node;
  }
  

  addEdge(edge: KnowledgeEdge): KnowledgeEdge {
    if (!this.nodes.has(edge.from)) {
      throw new Error(
        `Cannot add graph edge "${edge.id}": source node "${edge.from}" does not exist.`,
      );
    }

    if (!this.nodes.has(edge.to)) {
      throw new Error(
        `Cannot add graph edge "${edge.id}": target node "${edge.to}" does not exist.`,
      );
    }

    this.edges.set(edge.id, edge);

    return edge;
  }

  getNode(id: string): KnowledgeNode | null {
    return this.nodes.get(id) ?? null;
  }

  getEdge(id: string): KnowledgeEdge | null {
    return this.edges.get(id) ?? null;
  }

  hasNode(id: string): boolean {
    return this.nodes.has(id);
  }

  hasEdge(id: string): boolean {
    return this.edges.has(id);
  }

  getNodes(): KnowledgeNode[] {
    return Array.from(this.nodes.values());
  }

  getEdges(): KnowledgeEdge[] {
    return Array.from(this.edges.values());
  }

  findNodesByType(type: KnowledgeNode["type"]): KnowledgeNode[] {
    return this.getNodes().filter((node) => node.type === type);
  }

  findOutgoingEdges(
    nodeId: string,
    relationship?: KnowledgeRelationshipType,
  ): KnowledgeEdge[] {
    return this.getEdges().filter((edge) => {
      const relationshipMatches =
        relationship === undefined || edge.relationship === relationship;

      return edge.from === nodeId && relationshipMatches;
    });
  }

  findIncomingEdges(
    nodeId: string,
    relationship?: KnowledgeRelationshipType,
  ): KnowledgeEdge[] {
    return this.getEdges().filter((edge) => {
      const relationshipMatches =
        relationship === undefined || edge.relationship === relationship;

      return edge.to === nodeId && relationshipMatches;
    });
  }

  getNeighbours(
    nodeId: string,
    relationship?: KnowledgeRelationshipType,
  ): KnowledgeGraphNeighbour[] {
    const outgoing = this.findOutgoingEdges(nodeId, relationship)
      .map((edge): KnowledgeGraphNeighbour | null => {
        const node = this.getNode(edge.to);

        if (!node) {
          return null;
        }

        return {
          node,
          edge,
          direction: "outgoing",
        };
      })
      .filter(
        (neighbour): neighbour is KnowledgeGraphNeighbour =>
          neighbour !== null,
      );

    const incoming = this.findIncomingEdges(nodeId, relationship)
      .map((edge): KnowledgeGraphNeighbour | null => {
        const node = this.getNode(edge.from);

        if (!node) {
          return null;
        }

        return {
          node,
          edge,
          direction: "incoming",
        };
      })
      .filter(
        (neighbour): neighbour is KnowledgeGraphNeighbour =>
          neighbour !== null,
      );

    return [...outgoing, ...incoming];
  }
  findPaths(
  startNodeId: string,
  targetNodeId: string,
  maxDepth = 5,
): KnowledgeGraphPath[] {
  if (!this.nodes.has(startNodeId) || !this.nodes.has(targetNodeId)) {
    return [];
  }

  if (startNodeId === targetNodeId) {
    const node = this.getNode(startNodeId);

    return node
      ? [
          {
            nodes: [node],
            edges: [],
          },
        ]
      : [];
  }

  const paths: KnowledgeGraphPath[] = [];

  interface QueueItem {
    currentNodeId: string;
    nodeIds: string[];
    edges: KnowledgeEdge[];
  }

  const queue: QueueItem[] = [
    {
      currentNodeId: startNodeId,
      nodeIds: [startNodeId],
      edges: [],
    },
  ];

  while (queue.length > 0) {
    const current = queue.shift();

    if (!current) {
      continue;
    }

    if (current.edges.length >= maxDepth) {
      continue;
    }

    const outgoingEdges = this.findOutgoingEdges(current.currentNodeId);

    for (const edge of outgoingEdges) {
      if (current.nodeIds.includes(edge.to)) {
        continue;
      }

      const nextNodeIds = [...current.nodeIds, edge.to];
      const nextEdges = [...current.edges, edge];

      if (edge.to === targetNodeId) {
        const pathNodes = nextNodeIds
          .map((nodeId) => this.getNode(nodeId))
          .filter((node): node is KnowledgeNode => node !== null);

        if (pathNodes.length === nextNodeIds.length) {
          paths.push({
            nodes: pathNodes,
            edges: nextEdges,
          });
        }

        continue;
      }

      queue.push({
        currentNodeId: edge.to,
        nodeIds: nextNodeIds,
        edges: nextEdges,
      });
    }
  }

  return paths;
}
calculatePathConfidence(path: KnowledgeGraphPath): number {
  if (path.edges.length === 0) {
    return 100;
  }

  const confidences = path.edges.map((edge) => edge.confidence ?? 0);

  return Math.min(...confidences);
}
explainPath(path: KnowledgeGraphPath): string {
  if (path.nodes.length === 0) {
    return "No reasoning path was found.";
  }

  if (path.edges.length === 0) {
    return `${path.nodes[0].name} is the starting point of this reasoning path.`;
  }

  const parts: string[] = [];

  for (let index = 0; index < path.edges.length; index += 1) {
    const edge = path.edges[index];
    const fromNode = path.nodes[index];
    const toNode = path.nodes[index + 1];

    if (!fromNode || !toNode) {
      continue;
    }

    const relationshipText = this.formatRelationship(edge.relationship);

    let sentence = `${fromNode.name} ${relationshipText} ${toNode.name}`;

   if (edge.reason) {
  const cleanReason = edge.reason.replace(/\.+$/, "");

  sentence += ` because ${this.lowercaseSentenceStart(cleanReason)}`;
}

parts.push(`${sentence}.`);
  }

  const confidence = this.calculatePathConfidence(path);

  return `${parts.join(" ")} Overall reasoning confidence: ${confidence}%.`;
}

private formatRelationship(
  relationship: KnowledgeEdge["relationship"],
): string {
  const relationshipLabels: Record<
    KnowledgeEdge["relationship"],
    string
  > = {
    contains: "contains",
    manufacturedBy: "is manufactured by",
    belongsToCategory: "belongs to the category",
    supports: "supports",
    runs: "runs",
    uses: "uses",
    requires: "requires",
    benefitsFrom: "benefits from",
    provides: "provides",
    recommendedFor: "is recommended for",
    suitableFor: "is suitable for",
    notRecommendedFor: "is not recommended for",
    compatibleWith: "is compatible with",
    alternativeTo: "is an alternative to",
    successorTo: "is the successor to",
    predecessorTo: "is the predecessor to",
    partOf: "is part of",
    limitedFor: "is limited for",

bottleneckFor: "becomes a bottleneck for",

notCompatibleWith: "is not compatible with",

betterThan: "is better than",

worseThan: "is worse than",

fasterThan: "is faster than",

slowerThan: "is slower than",

betterValueThan: "offers better value than",

moreExpensiveThan: "is more expensive than",
  };

  return relationshipLabels[relationship] ?? relationship;
}
private lowercaseSentenceStart(value: string): string {
  if (!value) {
    return value;
  }

  const protectedPrefixes = [
    "Adobe",
    "Apple",
    "AMD",
    "Intel",
    "NVIDIA",
    "USB",
    "HDMI",
    "OLED",
  ];

  if (protectedPrefixes.some((prefix) => value.startsWith(prefix))) {
    return value;
  }

  return value.charAt(0).toLowerCase() + value.slice(1);
}

  export(): KnowledgeGraphData {
    return {
      nodes: this.getNodes(),
      edges: this.getEdges(),
    };
  }

  clear(): void {
    this.nodes.clear();
    this.edges.clear();
  }
}


export const blinlxKnowledgeGraph = new KnowledgeGraph();