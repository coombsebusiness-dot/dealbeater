import type { ChipEntity } from "../entities/chip";
import type { getAppleChipKnowledge } from "../apple/lookup";

export type AppleChipKnowledge = ReturnType<
  typeof getAppleChipKnowledge
>;

export function buildChipEntity(
  chipKnowledge: AppleChipKnowledge
): ChipEntity | null {
  if (!chipKnowledge) {
    return null;
  }

  return {
    id: chipKnowledge.id,
    name: chipKnowledge.displayName,
    type: "chip",
    generation: chipKnowledge.generation,
    manufacturer: "Apple",
  };
}