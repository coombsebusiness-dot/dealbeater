import { notFound } from "next/navigation";

import ComparisonHero from "@/lib/comparison/ComparisonHero";
import { compareProducts } from "@/lib/comparison/compareProducts";
import { getProductBySlug } from "@/app/components/lib/products/getProductBySlug";

interface ComparisonPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function parseComparisonSlug(slug: string) {
  const separator = "-vs-";
  const separatorIndex = slug.indexOf(separator);

  if (separatorIndex === -1) {
    return null;
  }

  const productASlug = slug
    .slice(0, separatorIndex)
    .trim();

  const productBSlug = slug
    .slice(
      separatorIndex + separator.length
    )
    .trim();

  if (!productASlug || !productBSlug) {
    return null;
  }

  return {
    productASlug,
    productBSlug,
  };
}

export default async function ComparisonPage({
  params,
}: ComparisonPageProps) {
  const { slug } = await params;

  const parsedSlug =
    parseComparisonSlug(slug);

  if (!parsedSlug) {
    notFound();
  }

  const { productASlug, productBSlug } =
    parsedSlug;

  const [productA, productB] =
    await Promise.all([
      getProductBySlug(productASlug),
      getProductBySlug(productBSlug),
    ]);

  if (!productA || !productB) {
    notFound();
  }

  const comparison = compareProducts(
    productA,
    productB
  );

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white sm:px-6 lg:px-8">
      <ComparisonHero
        productA={productA}
        productB={productB}
        comparison={comparison}
      />
    </main>
  );
}