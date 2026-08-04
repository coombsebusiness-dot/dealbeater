import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

type BuyingGuideSeo =
  BuyingGuide["seo"];

interface CreateGuideSeoInput {
  title: string;

  subtitle?: string;

  slug: string;

  category: string;

  topic?: string;

  primaryKeyword: string;

  secondaryKeywords?: string[];

  heroImage:
    BuyingGuide["heroImage"];

  overrides?:
    Partial<BuyingGuideSeo>;
}

function createSeoTitle(
  title: string,
): string {
  const suffix =
    " | Blinlx";

  if (
    title.endsWith(suffix)
  ) {
    return title;
  }

  return `${title}${suffix}`;
}

function createMetaDescription(
  subtitle: string | undefined,
  title: string,
): string {
  const fallback =
    `Learn how to choose the right ${title.toLowerCase()} with clear, independent buying advice from Blinlx.`;

  const description =
    subtitle?.trim() ||
    fallback;

  if (
    description.length <= 160
  ) {
    return description;
  }

  return `${description
    .slice(0, 157)
    .trimEnd()}...`;
}

function normaliseKeyword(
  keyword: string,
): string {
  return keyword
    .trim()
    .toLowerCase();
}

function createKeywords(
  input: CreateGuideSeoInput,
): string[] {
  const topic =
    input.topic?.trim() ||
    input.title;

  const candidates = [
    input.primaryKeyword,
    ...(input.secondaryKeywords ??
      []),
    input.category,
    topic,
    `${input.category} buying guide`,
    `${topic} buying guide`,
  ];

  return Array.from(
    new Set(
      candidates
        .map(normaliseKeyword)
        .filter(Boolean),
    ),
  );
}

export function createGuideSeo(
  input: CreateGuideSeoInput,
): BuyingGuideSeo {
  const overrides =
    input.overrides;

  return {
    title:
      overrides?.title ??
      createSeoTitle(
        input.title,
      ),

    description:
      overrides?.description ??
      createMetaDescription(
        input.subtitle,
        input.title,
      ),

    canonicalPath:
      overrides?.canonicalPath ??
      `/blog/${input.slug}`,

    keywords:
      overrides?.keywords ??
      createKeywords(input),

    openGraphImage:
      overrides?.openGraphImage ?? {
        src:
          input.heroImage.src,

        alt:
          input.heroImage.alt,
      },
  };
}