import type {
  BuyingGuideBlock,
} from "@/types/buying-guide/BuyingGuideSection";

import {
  ComparisonTable,
} from "./ComparisonTable";

import {
  TextBlock,
} from "@/app/components/buying-guide/blocks/TextBlock";

import {
  ImageBlock,
} from "@/app/components/buying-guide/blocks/ImageBlock";

import {
  QuoteBlock,
} from "@/app/components/buying-guide/blocks/QuoteBlock";

import {
  TipBlock,
} from "@/app/components/buying-guide/blocks/TipBlock";

import {
  WarningBlock,
} from "@/app/components/buying-guide/blocks/WarningBlock";

import {
  TableBlock,
} from "@/app/components/buying-guide/blocks/TableBlock";

import {
  GalleryBlock,
} from "@/app/components/buying-guide/blocks/GalleryBlock";

import {
  RecommendationCard,
} from "./RecommendationCard";

import {
  AskBlinlxCTA,
} from "./AskBlinlxCTA";

interface GuideBlockRendererProps {
  block:
    BuyingGuideBlock;

  sectionHeading?:
    string;
}

function normaliseHeading(
  value?: string,
): string {
  return (
    value
      ?.trim()
      .toLowerCase()
      .replace(
        /[?!.,:;]+$/g,
        "",
      ) ??
    ""
  );
}

export function GuideBlockRenderer({
  block,
  sectionHeading,
}: GuideBlockRendererProps) {
  switch (block.type) {
    case "TEXT": {
      const isDuplicateHeading =
        normaliseHeading(
          block.heading,
        ) ===
        normaliseHeading(
          sectionHeading,
        );

      return (
        <TextBlock
          id={block.id}
          heading={
            isDuplicateHeading
              ? undefined
              : block.heading
          }
          paragraphs={
            block.paragraphs
          }
        />
      );
    }

    case "IMAGE":
      return (
        <ImageBlock
          id={block.id}
          src={block.src}
          alt={block.alt}
          caption={block.caption}
          width={block.width}
          height={block.height}
        />
      );

    case "QUOTE":
      return (
        <QuoteBlock
          id={block.id}
          quote={block.quote}
          attribution={
            block.attribution
          }
        />
      );

    case "TIP":
      return (
        <TipBlock
          id={block.id}
          title={block.title}
          text={block.text}
        />
      );

    case "WARNING":
      return (
        <WarningBlock
          id={block.id}
          title={block.title}
          text={block.text}
        />
      );

    case "TABLE":
      return (
        <TableBlock
          id={block.id}
          heading={block.heading}
          columns={block.columns}
          rows={block.rows}
        />
      );

    case "GALLERY":
      return (
        <GalleryBlock
          id={block.id}
          heading={block.heading}
          images={block.images}
        />
      );

    case "RECOMMENDATION":
      return (
        <RecommendationCard
          recommendation={{
            id:
              block.id,

            title:
              block.heading,

            description:
              block.summary,

            reasons:
              block.reasons,

            image:
              block.image,

            href:
              block.productUrl,

            badge:
              block.productName,
          }}
        />
      );

    case "CTA":
      return (
        <AskBlinlxCTA
          heading={block.heading}
          text={block.text}
          buttonLabel={
            block.buttonLabel
          }
          buttonHref={
            block.buttonHref
          }
        />
      );

    case "COMPARISON":
      return (
        <ComparisonTable
          id={block.id}
          heading={block.heading}
          items={block.items}
        />
      );

    default:
      return null;
  }
}