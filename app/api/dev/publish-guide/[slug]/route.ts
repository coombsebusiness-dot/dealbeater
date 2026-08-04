import {
  NextResponse,
} from "next/server";

import {
  writeGuideDraft,
} from "@/knowledge/guides/factory";

import {
  bootstrapGuideBlueprints,
  getGuideBlueprintBySlug,
} from "@/knowledge/guides/blueprints";

import {
  publishGuide,
} from "@/knowledge/guides/publisher";

interface PublishGuideRouteProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function GET(
  _request: Request,
  {
    params,
  }: PublishGuideRouteProps,
) {
  if (
    process.env.NODE_ENV ===
    "production"
  ) {
    return NextResponse.json(
      {
        error:
          "This route is only available in development.",
      },
      {
        status: 404,
      },
    );
  }

  bootstrapGuideBlueprints();

  const {
    slug,
  } = await params;

  const blueprint =
    getGuideBlueprintBySlug(
      slug,
    );

  if (!blueprint) {
    return NextResponse.json(
      {
        error:
          `Blueprint not found: "${slug}".`,
      },
      {
        status: 404,
      },
    );
  }

  const publishedGuide =
    publishGuide(
      blueprint,
      {
        subtitle:
          `Independent Blinlx buying advice for ${blueprint.topic.toLowerCase()}, including the features, trade-offs and mistakes that matter.`,

        heroImage: {
          src:
            "/images/guides/photography/beginner-photography-buying-guide-hero.webp",

          alt:
            `${blueprint.title} hero image.`,
        },
      },
    );
    const writtenDraft =
  writeGuideDraft(
    blueprint,
  );

 return NextResponse.json({
  ...publishedGuide,

  writtenDraft,
});
}