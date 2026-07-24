import { NextResponse } from "next/server";
import { getAffiliateLink } from "@/app/components/lib/affiliates/engine";

export async function GET() {
  const result = await getAffiliateLink(
    "https://www.sportsdirect.com/",
    "dealbeater-test"
  );

  return NextResponse.json(result);
}