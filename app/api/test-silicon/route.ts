import { NextResponse } from "next/server";

import {
  createProductFingerprintV2,
} from "@/app/components/lib/matching/productFingerprint";

import {
  resolveProductKnowledge,
} from "@/app/components/lib/matching/knowledge";

export const runtime = "nodejs";

export async function GET() {
  try {
    const title =
      "Apple MacBook Pro 14 M1 Pro 16GB 512GB";

    const fingerprint =
      createProductFingerprintV2(title);

    const brain =
      resolveProductKnowledge(fingerprint);

    console.info(
      "PRODUCT BRAIN TEST:",
      {
        title,
        fingerprint,
        brain,
      }
    );

    return NextResponse.json({
      success: true,
      title,
      fingerprint,
      brain,
    });
  } catch (error) {
    console.error(
      "Product Brain test failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown test error",
      },
      {
        status: 500,
      }
    );
  }
}