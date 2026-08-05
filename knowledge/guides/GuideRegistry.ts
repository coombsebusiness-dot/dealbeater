import type {
  BuyingGuide,
} from "@/types/buying-guide/BuyingGuide";

import {
  createInternalLinks,
} from "./factory/internal-links";

import {
  apscVsFullFrameBuyingGuide,
} from "./photography/aps-c-vs-full-frame";

import {
  mirrorlessVsDslrBuyingGuide,
} from "./photography/mirrorless-vs-dslr";

import {
  beginnerPhotographyBuyingGuide,
} from "./photography/beginner-buying-guide";

import {
  validateBuyingGuide,
} from "./validateBuyingGuide";

import {
  bootstrapGuideBlueprints,
  getAllGuideBlueprints,
} from "./blueprints";

import {
  publishGuide,
} from "./publisher/GuidePublisher";

function createGeneratedBuyingGuides():
  BuyingGuide[] {
  bootstrapGuideBlueprints();

 const configuredGuideLimit =
  Number.parseInt(
    process.env
      .BLINLX_GENERATED_GUIDE_LIMIT ??
      "",
    10,
  );

const generatedGuideLimit =
  Number.isFinite(
    configuredGuideLimit,
  ) &&
  configuredGuideLimit > 0
    ? configuredGuideLimit
    : undefined;

const readyBlueprints =
  getAllGuideBlueprints()
    .filter(
      (blueprint) =>
        blueprint.status ===
        "READY",
    )
    .sort(
      (
        first,
        second,
      ) =>
        second.priority -
        first.priority,
    );

const selectedBlueprints =
  generatedGuideLimit
    ? readyBlueprints.slice(
        0,
        generatedGuideLimit,
      )
    : readyBlueprints;

  const generatedGuides:
    BuyingGuide[] = [];

  selectedBlueprints.forEach(
    (blueprint) => {
      try {
        const publishedGuide =
          publishGuide(
            blueprint,
            {
              subtitle:
                [
                  "Independent Blinlx buying advice for",
                  blueprint.topic.toLowerCase(),
                  "including the products, features, trade-offs and buying mistakes that matter.",
                ].join(
                  " ",
                ),

              heroImage: {
                src:
                  "/images/guides/photography/beginner-photography-buying-guide-hero.webp",

                alt:
                  `${blueprint.title} hero image.`,
              },
            },
          );

        if (
          !publishedGuide.publishable
        ) {
          if (
            process.env.NODE_ENV ===
            "development"
          ) {
            console.warn(
              [
                `Generated guide is not publishable: ${blueprint.slug}`,
                `Blueprint status: ${blueprint.status}`,
                `Publisher status: ${publishedGuide.status}`,
                `Quality status: ${publishedGuide.quality.status}`,
                ...publishedGuide.quality.errors,
              ].join(
                "\n",
              ),
            );
          }

          return;
        }

        generatedGuides.push(
          publishedGuide.buyingGuide,
        );
      } catch (error) {
        if (
          process.env.NODE_ENV ===
          "development"
        ) {
          console.warn(
            [
              `Failed to generate guide: ${blueprint.slug}`,
              error instanceof Error
                ? error.message
                : String(
                    error,
                  ),
            ].join(
              "\n",
            ),
          );
        }
      }
    },
  );

  return generatedGuides;
}

const manualGuides:
  BuyingGuide[] = [
    beginnerPhotographyBuyingGuide,
    mirrorlessVsDslrBuyingGuide,
    apscVsFullFrameBuyingGuide,
  ];

const generatedGuides =
  createGeneratedBuyingGuides();

  if (
  process.env.NODE_ENV ===
  "development"
) {
  console.info(
  [
    "Guide Registry Report",
    `Manual guides: ${manualGuides.length}`,
    `Generated guides: ${generatedGuides.length}`,
    `Total guides: ${manualGuides.length + generatedGuides.length}`,
  ].join("\n"),
);
  
}
const guidesBySlug =
  new Map<
    string,
    BuyingGuide
  >();

manualGuides.forEach(
  (guide) => {
    guidesBySlug.set(
      guide.slug,
      guide,
    );
  },
);

generatedGuides.forEach(
  (guide) => {
    if (
      !guidesBySlug.has(
        guide.slug,
      )
    ) {
      guidesBySlug.set(
        guide.slug,
        guide,
      );
    }
  },
);

const guides:
  BuyingGuide[] =
    Array.from(
      guidesBySlug.values(),
    );



function validateRegisteredGuides():
  void {
  guides.forEach(
    (guide) => {
      const validation =
        validateBuyingGuide(
          guide,
        );

      if (!validation.valid) {
        throw new Error(
          [
            `Invalid buying guide: ${guide.slug}`,
            ...validation.errors,
          ].join(
            "\n",
          ),
        );
      }

      if (
        process.env.NODE_ENV ===
          "development" &&
        validation.warnings.length >
          0
      ) {
        console.warn(
          [
            `Buying guide warnings: ${guide.slug}`,
            ...validation.warnings,
          ].join(
            "\n",
          ),
        );
      }
    },
  );
}

validateRegisteredGuides();

export function getAllBuyingGuides():
  BuyingGuide[] {
  return [
    ...guides,
  ];
}

export function getBuyingGuideBySlug(
  slug: string,
): BuyingGuide | undefined {
  return guides.find(
    (guide) =>
      guide.slug === slug,
  );
}

export function getBuyingGuidesByCategory(
  category: string,
): BuyingGuide[] {
  const normalisedCategory =
    category
      .trim()
      .toLowerCase();

  return guides.filter(
    (guide) =>
      guide.category
        .trim()
        .toLowerCase() ===
      normalisedCategory,
  );
}

export function getRelatedBuyingGuides(
  slug: string,
) {
  const currentGuide =
    getBuyingGuideBySlug(
      slug,
    );

  if (!currentGuide) {
    return [];
  }

  return createInternalLinks(
    currentGuide,
    guides,
  );
}

export function getBuyingGuideForPage(
  slug: string,
): BuyingGuide | undefined {
  const guide =
    getBuyingGuideBySlug(
      slug,
    );

  if (!guide) {
    return undefined;
  }

  const manualRelatedGuides =
    guide.relatedGuides ??
    [];

  const generatedRelatedGuides =
    getRelatedBuyingGuides(
      slug,
    ).map(
      (relatedGuide) => ({
        slug:
          relatedGuide.slug,

        title:
          relatedGuide.title,

        href:
          relatedGuide.href,

        description:
          relatedGuide.description,
      }),
    );

  const relatedGuidesBySlug =
    new Map<
      string,
      BuyingGuide[
        "relatedGuides"
      ][number]
    >();

  manualRelatedGuides.forEach(
    (relatedGuide) => {
      relatedGuidesBySlug.set(
        relatedGuide.slug,
        relatedGuide,
      );
    },
  );

  generatedRelatedGuides.forEach(
    (relatedGuide) => {
      if (
        !relatedGuidesBySlug.has(
          relatedGuide.slug,
        )
      ) {
        relatedGuidesBySlug.set(
          relatedGuide.slug,
          relatedGuide,
        );
      }
    },
  );

  return {
    ...guide,

    relatedGuides:
      Array.from(
        relatedGuidesBySlug.values(),
      ),
  };
}

export function getBuyingGuideSlugs():
  string[] {
  return guides.map(
    (guide) =>
      guide.slug,
  );
}