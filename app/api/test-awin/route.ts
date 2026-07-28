import { NextResponse } from "next/server";
import { getAffiliateLink } from "@/app/components/lib/affiliates/engine";
import { createProductFingerprintV2 } from "@/app/components/lib/products/fingerprint";

const testFingerprint = createProductFingerprintV2(
  "Apple MacBook Pro 16-inch M2 Pro 16GB RAM 512GB SSD Space Grey Refurbished"
);

console.log(
  "FINGERPRINT V2:",
  JSON.stringify(testFingerprint, null, 2)
);