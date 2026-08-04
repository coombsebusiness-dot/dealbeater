import {
  NextResponse,
} from "next/server";

import {
  createGuideDraftReport,
} from "@/knowledge/guides/factory/content";

export async function GET() {
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

  return NextResponse.json(
    createGuideDraftReport(),
  );
}