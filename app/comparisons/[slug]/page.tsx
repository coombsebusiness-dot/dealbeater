import type {
  Metadata,
} from "next";

import {
  notFound,
} from "next/navigation";

import ComparisonHero from "@/lib/comparison/ComparisonHero";

import {
  loadComparisonPage,
} from "@/knowledge/comparisons/loadComparisonPage";

import {
  getAllComparisons,
} from "@/knowledge/comparisons/ComparisonRegistry";

import ComparisonProductLinks from "@/lib/comparison/ComparisonProductLinks";

interface ComparisonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic =
  "force-dynamic";

export const revalidate = 0;

export function generateStaticParams() {
  return getAllComparisons().map(
    (comparison) => ({
      slug: comparison.slug,
    }),
  );
}

export async function generateMetadata({
  params,
}: ComparisonPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const page =
    await loadComparisonPage(
      slug,
    );

  if (!page) {
    return {
      title:
        "Comparison Not Found | Blinlx",
    };
  }

  return {
    title:
      `${page.productA.name} vs ${page.productB.name} | Blinlx`,

    description:
      page.definition.description,

    alternates: {
      canonical:
        `https://blinlx.com/comparisons/${page.definition.slug}`,
    },

    openGraph: {
      type:
        "article",

      title:
        `${page.productA.name} vs ${page.productB.name}`,

      description:
        page.definition.description,

      url:
        `https://blinlx.com/comparisons/${page.definition.slug}`,

      siteName:
        "Blinlx",
    },

    twitter: {
      card:
        "summary_large_image",

      title:
        `${page.productA.name} vs ${page.productB.name}`,

      description:
        page.definition.description,
    },
  };
}

export default async function ComparisonPage({
  params,
}: ComparisonPageProps) {
  const { slug } =
    await params;

  const page =
    await loadComparisonPage(
      slug,
    );

  if (!page) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        <ComparisonHero
          productA={
            page.productA
          }
          productB={
            page.productB
          }
          comparison={
            page.comparison
          }
        />
        <ComparisonProductLinks
  productA={page.productA}
  productB={page.productB}
/>

      </div>
    </main>
  );
}