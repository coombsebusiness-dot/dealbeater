import type { BrainEntity } from "./entities/entity";
import type { BrainRelationship } from "./relationships/relationship";

export interface BrainGraph {
  entities: BrainEntity[];
  relationships: BrainRelationship[];
}

export function createBrainGraph(
  entities: BrainEntity[] = [],
  relationships: BrainRelationship[] = []
): BrainGraph {
  return {
    entities: deduplicateEntities(entities),
    relationships: deduplicateRelationships(
      relationships
    ),
  };
}

function deduplicateEntities(
  entities: BrainEntity[]
): BrainEntity[] {
  const entitiesById = new Map<
    string,
    BrainEntity
  >();

  for (const entity of entities) {
    if (!entity.id) {
      continue;
    }

    entitiesById.set(entity.id, entity);
  }

  return Array.from(entitiesById.values());
}

function deduplicateRelationships(
  relationships: BrainRelationship[]
): BrainRelationship[] {
  const relationshipsById = new Map<
    string,
    BrainRelationship
  >();

  for (const relationship of relationships) {
    if (!relationship.id) {
      continue;
    }

    relationshipsById.set(
      relationship.id,
      relationship
    );
  }

  return Array.from(
    relationshipsById.values()
  );
}