import { createKnowledgeEdge, createKnowledgeNode } from "./builder";
import { blinlxKnowledgeGraph } from "./graph";

const nodes = [
    createKnowledgeNode({
  id: "photo-editing",
  name: "Photo Editing",
  type: "category",
  description:
    "The process of organising, correcting and enhancing digital photographs.",
}),

createKnowledgeNode({
  id: "adobe-lightroom",
  name: "Adobe Lightroom",
  type: "software" as any,
  description:
    "Photo organisation and editing software widely used in photography workflows.",
}),

createKnowledgeNode({
  id: "memory-16gb",
  name: "16GB Memory",
  type: "capability" as any,
  description:
    "A memory capacity suitable for many professional photography and creative workflows.",
}),
  createKnowledgeNode({
    id: "apple",
    name: "Apple",
    type: "brand",
  }),

  

  createKnowledgeNode({
    id: "apple-m1-pro",
    name: "Apple M1 Pro",
    type: "chip",
    aliases: ["M1 Pro", "Apple Silicon M1 Pro"],
    description:
      "A professional-tier Apple Silicon processor designed for demanding creative and technical workloads.",
  }),

  createKnowledgeNode({
    id: "macbook-pro-14-2021-m1-pro",
    name: "MacBook Pro 14-inch (2021, M1 Pro)",
    type: "laptop",
    description:
      "A professional Apple laptop built around the M1 Pro processor.",
  }),

  createKnowledgeNode({
    id: "photography",
    name: "Photography",
    type: "category",
  }),
  
];

const edges = [

    createKnowledgeEdge({
  from: "macbook-pro-14-2021-m1-pro",
  to: "photo-editing",
  relationship: "suitableFor",
  confidence: 96,
  reason:
    "Its processor, display and memory capacity make it suitable for demanding photo-editing workflows.",
}),

createKnowledgeEdge({
  from: "photo-editing",
  to: "adobe-lightroom",
  relationship: "uses",
  confidence: 100,
  reason:
    "Adobe Lightroom is commonly used as part of a professional photo-editing workflow.",
}),

createKnowledgeEdge({
  from: "adobe-lightroom",
  to: "memory-16gb",
  relationship: "benefitsFrom",
  confidence: 90,
  reason:
    "Additional memory helps Lightroom handle larger catalogues, previews and multitasking more smoothly.",
}),
  createKnowledgeEdge({
    from: "macbook-pro-14-2021-m1-pro",
    to: "apple",
    relationship: "manufacturedBy",
    confidence: 100,
  }),

  createKnowledgeEdge({
    from: "macbook-pro-14-2021-m1-pro",
    to: "apple-m1-pro",
    relationship: "contains",
    confidence: 100,
  }),

  createKnowledgeEdge({
    from: "macbook-pro-14-2021-m1-pro",
    to: "photography",
    relationship: "suitableFor",
    confidence: 95,
    reason:
      "The M1 Pro processor, high-quality display and strong creative software support make it well suited to photography workflows.",
  }),
];

export function registerTestKnowledgeGraph(): void {
  nodes.forEach((node) => {
    blinlxKnowledgeGraph.addNode(node);
  });

  edges.forEach((edge) => {
    blinlxKnowledgeGraph.addEdge(edge);
  });
}