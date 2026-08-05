export interface ComparisonDefinition {
  slug: string;

  productAId: string;

  productBId: string;

  title: string;

  description: string;

  publishedAt: string;

  updatedAt: string;

  isPublished: boolean;
}

const comparisons: ComparisonDefinition[] = [
  {
    slug:
      "sony-a6700-vs-canon-eos-r50",

    productAId:
      "sony-a6700",

    productBId:
      "canon-eos-r50",

    title:
      "Sony A6700 vs Canon EOS R50",

    description:
      "Compare the Sony A6700 and Canon EOS R50 across price, value, performance, features and buying suitability.",

    publishedAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    isPublished:
      true,
  },

  {
    slug:
      "sony-a6700-vs-nikon-z50-ii",

    productAId:
      "sony-a6700",

    productBId:
      "nikon-z50-ii",

    title:
      "Sony A6700 vs Nikon Z50 II",

    description:
      "Compare the Sony A6700 and Nikon Z50 II to see which APS-C mirrorless camera better suits your priorities.",

    publishedAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    isPublished:
      true,
  },

  {
    slug:
      "canon-eos-r10-vs-nikon-z50",

    productAId:
      "canon-eos-r10",

    productBId:
      "nikon-z50",

    title:
      "Canon EOS R10 vs Nikon Z50",

    description:
      "Compare the Canon EOS R10 and Nikon Z50 across price, features, performance, value and buying suitability.",

    publishedAt:
      "2026-08-04",

    updatedAt:
      "2026-08-04",

    isPublished:
      true,
  },
  {
  slug:
    "sony-a7-iii-vs-sony-a7-iv",

  productAId:
    "sony-a7-iii",

  productBId:
    "sony-a7-iv",

  title:
    "Sony A7 III vs Sony A7 IV",

  description:
    "Compare the Sony A7 III and Sony A7 IV across image quality, autofocus, video, features, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},
{
  slug:
    "sony-a7-iv-vs-sony-a7r-v",

  productAId:
    "sony-a7-iv",

  productBId:
    "sony-a7r-v",

  title:
    "Sony A7 IV vs Sony A7R V",

  description:
    "Compare the Sony A7 IV and Sony A7R V across resolution, autofocus, video, performance, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},
{
  slug:
    "sony-a1-ii-vs-sony-a7r-v",

  productAId:
    "sony-a1-ii",

  productBId:
    "sony-a7r-v",

  title:
    "Sony A1 II vs Sony A7R V",

  description:
    "Compare the Sony A1 II and Sony A7R V across image quality, speed, autofocus, video, professional features, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},
{
  slug:
    "canon-eos-r100-vs-canon-eos-r50",

  productAId:
    "canon-eos-r100",

  productBId:
    "canon-eos-r50",

  title:
    "Canon EOS R100 vs Canon EOS R50",

  description:
    "Compare the Canon EOS R100 and Canon EOS R50 across autofocus, screen design, video, ease of use, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r50-vs-canon-eos-r10",

  productAId:
    "canon-eos-r50",

  productBId:
    "canon-eos-r10",

  title:
    "Canon EOS R50 vs Canon EOS R10",

  description:
    "Compare the Canon EOS R50 and Canon EOS R10 across autofocus, burst performance, controls, video, portability, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r10-vs-canon-eos-r7",

  productAId:
    "canon-eos-r10",

  productBId:
    "canon-eos-r7",

  title:
    "Canon EOS R10 vs Canon EOS R7",

  description:
    "Compare the Canon EOS R10 and Canon EOS R7 across image quality, autofocus, stabilisation, speed, video, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-rp-vs-canon-eos-r8",

  productAId:
    "canon-eos-rp",

  productBId:
    "canon-eos-r8",

  title:
    "Canon EOS RP vs Canon EOS R8",

  description:
    "Compare the Canon EOS RP and Canon EOS R8 across image quality, autofocus, burst speed, video, portability, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r-vs-canon-eos-r8",

  productAId:
    "canon-eos-r",

  productBId:
    "canon-eos-r8",

  title:
    "Canon EOS R vs Canon EOS R8",

  description:
    "Compare the Canon EOS R and Canon EOS R8 across resolution, autofocus, burst performance, video, handling, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r8-vs-canon-eos-r6-mark-ii",

  productAId:
    "canon-eos-r8",

  productBId:
    "canon-eos-r6-mark-ii",

  title:
    "Canon EOS R8 vs Canon EOS R6 Mark II",

  description:
    "Compare the Canon EOS R8 and Canon EOS R6 Mark II across image quality, stabilisation, card slots, battery life, handling, video, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r6-vs-canon-eos-r6-mark-ii",

  productAId:
    "canon-eos-r6",

  productBId:
    "canon-eos-r6-mark-ii",

  title:
    "Canon EOS R6 vs Canon EOS R6 Mark II",

  description:
    "Compare the Canon EOS R6 and Canon EOS R6 Mark II across resolution, autofocus, burst speed, video, battery life, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r5-vs-canon-eos-r5-mark-ii",

  productAId:
    "canon-eos-r5",

  productBId:
    "canon-eos-r5-mark-ii",

  title:
    "Canon EOS R5 vs Canon EOS R5 Mark II",

  description:
    "Compare the Canon EOS R5 and Canon EOS R5 Mark II across image quality, sensor speed, autofocus, burst shooting, video, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r3-vs-canon-eos-r1",

  productAId:
    "canon-eos-r3",

  productBId:
    "canon-eos-r1",

  title:
    "Canon EOS R3 vs Canon EOS R1",

  description:
    "Compare the Canon EOS R3 and Canon EOS R1 across autofocus, speed, resolution, professional handling, video, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "sony-a7c-ii-vs-canon-eos-r8",

  productAId:
    "sony-a7c-ii",

  productBId:
    "canon-eos-r8",

  title:
    "Sony A7C II vs Canon EOS R8",

  description:
    "Compare the Sony A7C II and Canon EOS R8 across image quality, autofocus, stabilisation, video, portability, lens choice and value.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "sony-a7-iv-vs-canon-eos-r6-mark-ii",

  productAId:
    "sony-a7-iv",

  productBId:
    "canon-eos-r6-mark-ii",

  title:
    "Sony A7 IV vs Canon EOS R6 Mark II",

  description:
    "Compare the Sony A7 IV and Canon EOS R6 Mark II across resolution, autofocus, burst performance, video, lens choice, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "sony-a7r-v-vs-canon-eos-r5-mark-ii",

  productAId:
    "sony-a7r-v",

  productBId:
    "canon-eos-r5-mark-ii",

  title:
    "Sony A7R V vs Canon EOS R5 Mark II",

  description:
    "Compare the Sony A7R V and Canon EOS R5 Mark II across resolution, autofocus, speed, video, stabilisation, value and professional suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "sony-a1-ii-vs-canon-eos-r1",

  productAId:
    "sony-a1-ii",

  productBId:
    "canon-eos-r1",

  title:
    "Sony A1 II vs Canon EOS R1",

  description:
    "Compare the Sony A1 II and Canon EOS R1 across resolution, autofocus, burst speed, professional handling, video, value and flagship suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},
{
  slug:
    "nikon-z5-ii-vs-nikon-z6-ii",

  productAId:
    "nikon-z5-ii",

  productBId:
    "nikon-z6-ii",

  title:
    "Nikon Z5 II vs Nikon Z6 II",

  description:
    "Compare the Nikon Z5 II and Nikon Z6 II across autofocus, stabilisation, burst shooting, video, card slots, value and buying suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "nikon-z6-ii-vs-nikon-z6-iii",

  productAId:
    "nikon-z6-ii",

  productBId:
    "nikon-z6-iii",

  title:
    "Nikon Z6 II vs Nikon Z6 III",

  description:
    "Compare the Nikon Z6 II and Nikon Z6 III across autofocus, sensor readout, burst performance, video, handling, value and upgrade suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "nikon-z6-iii-vs-nikon-z8",

  productAId:
    "nikon-z6-iii",

  productBId:
    "nikon-z8",

  title:
    "Nikon Z6 III vs Nikon Z8",

  description:
    "Compare the Nikon Z6 III and Nikon Z8 across resolution, autofocus, sensor speed, video, portability, professional features and value.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "nikon-z8-vs-nikon-z9",

  productAId:
    "nikon-z8",

  productBId:
    "nikon-z9",

  title:
    "Nikon Z8 vs Nikon Z9",

  description:
    "Compare the Nikon Z8 and Nikon Z9 across image quality, autofocus, burst speed, battery life, integrated handling, video and professional value.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r6-mark-ii-vs-nikon-z6-iii",

  productAId:
    "canon-eos-r6-mark-ii",

  productBId:
    "nikon-z6-iii",

  title:
    "Canon EOS R6 Mark II vs Nikon Z6 III",

  description:
    "Compare the Canon EOS R6 Mark II and Nikon Z6 III across autofocus, burst shooting, stabilisation, video, card formats, handling and value.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r5-mark-ii-vs-nikon-z8",

  productAId:
    "canon-eos-r5-mark-ii",

  productBId:
    "nikon-z8",

  title:
    "Canon EOS R5 Mark II vs Nikon Z8",

  description:
    "Compare the Canon EOS R5 Mark II and Nikon Z8 across resolution, stacked-sensor performance, autofocus, burst shooting, video, handling and professional value.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "canon-eos-r1-vs-nikon-z9",

  productAId:
    "canon-eos-r1",

  productBId:
    "nikon-z9",

  title:
    "Canon EOS R1 vs Nikon Z9",

  description:
    "Compare the Canon EOS R1 and Nikon Z9 across resolution, autofocus, speed, integrated professional handling, video, battery life and flagship suitability.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},

{
  slug:
    "sony-a1-ii-vs-nikon-z9",

  productAId:
    "sony-a1-ii",

  productBId:
    "nikon-z9",

  title:
    "Sony A1 II vs Nikon Z9",

  description:
    "Compare the Sony A1 II and Nikon Z9 across resolution, autofocus, burst performance, body design, video, lens systems, professional workflow and value.",

  publishedAt:
    "2026-08-04",

  updatedAt:
    "2026-08-04",

  isPublished:
    true,
},
];

export function getAllComparisons():
  ComparisonDefinition[] {
  return comparisons.filter(
    (comparison) =>
      comparison.isPublished,
  );
}

export function getComparisonBySlug(
  slug: string,
): ComparisonDefinition | undefined {
  const normalisedSlug =
    slug
      .trim()
      .toLowerCase();

  return comparisons.find(
    (comparison) =>
      comparison.isPublished &&
      comparison.slug ===
        normalisedSlug,
  );
}

export function getComparisonsForProduct(
  productId: string,
): ComparisonDefinition[] {
  return comparisons.filter(
    (comparison) =>
      comparison.isPublished &&
      (
        comparison.productAId ===
          productId ||
        comparison.productBId ===
          productId
      ),
  );
}