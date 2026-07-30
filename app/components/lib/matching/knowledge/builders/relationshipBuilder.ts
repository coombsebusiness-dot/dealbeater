import type { BrandEntity } from "../entities/brand";
import type { ChipEntity } from "../entities/chip";
import type { ProductEntity } from "../entities/product";
import type { BrainRelationship } from "../relationships/relationship";

export interface RelationshipBuilderInput {
  brand: BrandEntity | null;
  product: ProductEntity | null;
  chip: ChipEntity | null;
}

export function buildRelationships(
  input: RelationshipBuilderInput
): BrainRelationship[] {
  const relationships: BrainRelationship[] = [];

  const {
    brand,
    product,
    chip,
  } = input;

  if (brand && product) {
    relationships.push({
      id: `${product.id}>made-by>${brand.id}`,
      from: product.id,
      to: brand.id,
      type: "made-by",
      confidence: 100,
      reason: `${product.name} is manufactured by ${brand.name}.`,
    });
  }

  if (product && chip) {
    relationships.push({
      id: `${product.id}>powered-by>${chip.id}`,
      from: product.id,
      to: chip.id,
      type: "powered-by",
      confidence: 100,
      reason: `${product.name} is powered by ${chip.name}.`,
    });
  }

  return relationships;
}