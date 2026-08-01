import type {
  BuyingGuide as BuyingGuideData,
} from "@/types/buying-guide/BuyingGuide";

import {
  GuidePromotionRail,
} from "./GuidePromotionRail";

import {
  BackToTop,
} from "./BackToTop";

import {
  ReadingProgress,
} from "./ReadingProgress";

import {
  calculateBuyingGuideReadingTime,
  calculateBuyingGuideWordCount,
} from "@/app/components/buying-guide/ReadingTime";

import {
  createBuyingGuideTOC,
} from "@/app/components/buying-guide/createTOC";

import {
  BuyingGuideHero,
} from "./BuyingGuideHero";

import {
  BlinlxVerdict,
} from "./BlinlxVerdict";

import {
  BuyingGuideSummary,
} from "./BuyingGuideSummary";

import {
  TableOfContents,
} from "./TableOfContents";

import {
  BuyingGuideSection,
} from "./BuyingGuideSection";

import {
  GuideBlockRenderer,
} from "./GuideBlockRenderer";

import {
  RecommendationCard,
} from "./RecommendationCard";

import {
  FAQ,
} from "./FAQ";

import {
  RelatedGuides,
} from "./RelatedGuides";

import {
  AskBlinlxCTA,
} from "./AskBlinlxCTA";

import {
  ArticleSchema,
} from "./ArticleSchema";

import {
  FAQSchema,
} from "./FAQSchema";

import {
  BreadcrumbSchema,
} from "./BreadcrumbSchema";

interface BuyingGuideProps {
  guide: BuyingGuideData;

  siteUrl?: string;
}

export function BuyingGuide({
  guide,
  siteUrl = "https://blinlx.com",
}: BuyingGuideProps) {
  const wordCount =
    calculateBuyingGuideWordCount(
      guide,
    );

  const readingTimeMinutes =
    calculateBuyingGuideReadingTime(
      guide,
    );

  const tableOfContents =
    createBuyingGuideTOC(
      guide,
    );

  const promotions = [
  {
    id: "frame",
    label: "Creative Community",
    title: "Share your photography on Frame",
    href: "https://frameapp.uk",
    buttonLabel: "Discover Frame",
    image: "/images/promotions/frame-guide-banner.webp",
    imageAlt: "Frame creative community promotional banner",
  },
  {
    id: "imsorted",
    label: "Life Admin",
    title: "Keep life organised with I'm Sorted",
    href: "https://imsorted.co.uk",
    buttonLabel: "Explore I'm Sorted",
    image: "/images/promotions/imsorted-guide-banner.webp",
    imageAlt: "I'm Sorted promotional banner",
  },
];

  return (
   <>
  <ReadingProgress />

  <BackToTop />

  <ArticleSchema
    guide={guide}
    siteUrl={siteUrl}
  />

      <FAQSchema
        items={guide.faqs}
      />

      <BreadcrumbSchema
        siteUrl={siteUrl}
        items={[
          {
            name: "Home",
            path: "/",
          },
          {
            name:
              guide.category,
            path:
              `/category/${guide.category.toLowerCase()}`,
          },
          {
            name:
              guide.title,
            path:
              guide.seo.canonicalPath,
          },
        ]}
      />

      <article className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <BuyingGuideHero
            guide={guide}
            readingTimeMinutes={
              readingTimeMinutes
            }
            wordCount={
              wordCount
            }
          />

         <div className="grid items-start gap-8 2xl:grid-cols-[minmax(0,1fr)_460px]">
  <main className="min-w-0 space-y-12">
    <BlinlxVerdict
      verdict={guide.verdict}
    />

    <BuyingGuideSummary
      items={guide.summary}
    />
    <TableOfContents
  items={tableOfContents}
/>

    {guide.recommendations &&
      guide.recommendations.length >
        0 && (
        <section className="space-y-5">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Our recommendations
          </h2>

          <div className="grid gap-5 xl:grid-cols-2">
            {guide.recommendations.map(
              (recommendation) => (
                <RecommendationCard
                  key={
                    recommendation.id
                  }
                  recommendation={
                    recommendation
                  }
                />
              ),
            )}
          </div>
        </section>
      )}

    <div className="space-y-16">
      {guide.sections.map(
        (section) => (
          <BuyingGuideSection
            key={section.id}
            id={section.id}
            heading={section.heading}
            introduction={
              section.introduction
            }
          >
            {section.blocks.map(
              (block) => (
                <GuideBlockRenderer
                  key={block.id}
                  block={block}
                />
              ),
            )}
          </BuyingGuideSection>
        ),
      )}
    </div>

    <FAQ
      items={guide.faqs}
    />

    <RelatedGuides
      guides={guide.relatedGuides}
    />

    <AskBlinlxCTA
      prompt={guide.askBlinlxPrompt}
    />
  </main>

 
  <GuidePromotionRail
  promotions={promotions}
/>
</div>
        </div>
      </article>
    </>
  );
}