import type {
  GuideBlueprint,
} from "./GuideBlueprint";

const blueprints =
  new Map<
    string,
    GuideBlueprint
  >();

export function registerGuideBlueprint(
  blueprint: GuideBlueprint,
): void {
  if (
    blueprints.has(
      blueprint.slug,
    )
  ) {
    throw new Error(
      `Duplicate guide blueprint slug: "${blueprint.slug}".`,
    );
  }

  blueprints.set(
    blueprint.slug,
    {
      ...blueprint,

      secondaryKeywords: [
        ...(
          blueprint.secondaryKeywords ??
          []
        ),
      ],
    },
  );
}

export function registerGuideBlueprints(
  items: GuideBlueprint[],
): void {
  items.forEach(
    registerGuideBlueprint,
  );
}

export function getAllGuideBlueprints():
  GuideBlueprint[] {
  return Array.from(
    blueprints.values(),
  );
}

export function getGuideBlueprintBySlug(
  slug: string,
): GuideBlueprint | undefined {
  return blueprints.get(slug);
}

export function getGuideBlueprintsByCategory(
  category: GuideBlueprint["category"],
): GuideBlueprint[] {
  return getAllGuideBlueprints()
    .filter(
      (blueprint) =>
        blueprint.category ===
        category,
    )
    .sort(
      (first, second) =>
        second.priority -
        first.priority,
    );
}

export function getPublishableBlueprints():
  GuideBlueprint[] {
  return getAllGuideBlueprints()
    .filter(
      (blueprint) =>
        blueprint.status ===
          "READY" ||
        blueprint.status ===
          "PUBLISHED",
    );
}

export function getBlueprintCount():
  number {
  return blueprints.size;
}