import type {
  Metadata,
} from "next";

import {
  BuyingGuide,
} from "@/app/components/guide/BuyingGuide";

import {
  beginnerPhotographyBuyingGuide,
} from "@/knowledge/guides/photography/beginner-buying-guide";

const guide =
  beginnerPhotographyBuyingGuide;

export const metadata:
  Metadata = {
  title:
    guide.seo.title,

  description:
    guide.seo.description,

  keywords:
    guide.seo.keywords,

  alternates: {
    canonical:
      guide.seo.canonicalPath,
  },

  openGraph: {
    type:
      "article",

    title:
      guide.seo.title,

    description:
      guide.seo.description,

    url:
      guide.seo.canonicalPath,

    images: [
      {
        url:
          guide.seo.openGraphImage?.src ??
          guide.heroImage.src,

        alt:
          guide.seo.openGraphImage?.alt ??
          guide.heroImage.alt,
      },
    ],

    publishedTime:
      guide.publishedAt,

    modifiedTime:
      guide.updatedAt,
  },

  twitter: {
    card:
      "summary_large_image",

    title:
      guide.seo.title,

    description:
      guide.seo.description,

    images: [
      guide.seo.openGraphImage?.src ??
      guide.heroImage.src,
    ],
  },

  robots:
    guide.seo.noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
};

export default function Page() {
  return (
    <BuyingGuide
      guide={guide}
    />
  );
}