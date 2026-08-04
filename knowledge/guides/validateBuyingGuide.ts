import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

export interface BuyingGuideValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateBuyingGuide(
  guide: BuyingGuide,
): BuyingGuideValidationResult {
  const errors:
    string[] = [];

  const warnings:
    string[] = [];

  if (!guide.slug.trim()) {
    errors.push(
      "Guide slug is required.",
    );
  }

  if (!guide.title.trim()) {
    errors.push(
      "Guide title is required.",
    );
  }

  if (
    !guide.seo.canonicalPath.startsWith(
      "/",
    )
  ) {
    errors.push(
      "Canonical path must begin with '/'.",
    );
  }

  if (
    guide.sections.length === 0
  ) {
    errors.push(
      "Guide must contain at least one section.",
    );
  }

  if (
    guide.summary.length < 3
  ) {
    warnings.push(
      "Guide should contain at least three summary points.",
    );
  }

  if (
    guide.faqs.length < 5
  ) {
    warnings.push(
      "Guide should contain at least five FAQs before publication.",
    );
  }

  if (
  !guide.recommendations ||
  guide.recommendations.length === 0
) {
  warnings.push(
    "Guide currently has no live recommendations.",
  );
}

  const sectionIds =
    new Set<string>();

  guide.sections.forEach(
    (section) => {
      if (
        sectionIds.has(
          section.id,
        )
      ) {
        errors.push(
          `Duplicate section ID: "${section.id}".`,
        );
      }

      sectionIds.add(
        section.id,
      );

      if (
        section.blocks.length ===
        0
      ) {
        warnings.push(
          `Section "${section.heading}" has no blocks.`,
        );
      }
    },
  );

  return {
    valid:
      errors.length === 0,

    errors,

    warnings,
  };
}