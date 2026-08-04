import {
  NextResponse,
} from "next/server";

import {
  defaultProductBrain,
} from "@/knowledge/products";

interface RouteContext {
  params:
    Promise<{
      slug: string;
    }>;
}

export async function GET(
  _request: Request,
  context: RouteContext,
) {
  const {
    slug,
  } =
    await context.params;

  const product =
    await defaultProductBrain.get(
      slug,
    );

  if (!product) {
    return NextResponse.json(
      {
        success:
          false,

        error:
          `No canonical product was found for "${slug}".`,
      },
      {
        status:
          404,
      },
    );
  }

  const intelligence =
    await defaultProductBrain.analyse(
      slug,
    );

  const relationships =
    defaultProductBrain
      .relationshipsFor(
        slug,
      );

  return NextResponse.json({
    success:
      true,

    product,

    intelligence,

    relationships,
  });
}