import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  blogPosts,
} from "@/app/components/lib/blog-posts";

import {
  getAllBuyingGuides,
} from "@/knowledge/guides/GuideRegistry";

export const metadata:
  Metadata = {
  title:
    "Buying Guides and Product Advice",

  description:
    "Read practical Blinlx buying guides, product comparisons and advice designed to help UK shoppers avoid bad deals.",

  alternates: {
    canonical:
      "/blog",
  },

  openGraph: {
    title:
      "Buying Guides and Product Advice | Blinlx",

    description:
      "Practical product guides and shopping advice from Blinlx.",

    url:
      "/blog",

    type:
      "website",
  },
};

type GuideCard = {
  slug:
    string;

  title:
    string;

  description:
    string;

  category:
    string;

  label:
    string;
};

function getGuideCards():
  GuideCard[] {
  const cardsBySlug =
    new Map<
      string,
      GuideCard
    >();

  blogPosts.forEach(
    (post) => {
      cardsBySlug.set(
        post.slug,
        {
          slug:
            post.slug,

          title:
            post.title,

          description:
            post.description,

          category:
            post.category,

          label:
            post.readingTime,
        },
      );
    },
  );

  getAllBuyingGuides()
    .forEach(
      (guide) => {
        if (
          cardsBySlug.has(
            guide.slug,
          )
        ) {
          return;
        }

        cardsBySlug.set(
          guide.slug,
          {
            slug:
              guide.slug,

            title:
              guide.title,

            description:
              guide.seo.description,

            category:
              guide.category,

            label:
              "Blinlx buying guide",
          },
        );
      },
    );

  return Array.from(
    cardsBySlug.values(),
  );
}

export default function BlogPage() {
  const currentYear =
    new Date()
      .getFullYear();

  const guides =
    getGuideCards();

  return (
    <main className="min-h-screen bg-[#101b26] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            aria-label="Blinlx homepage"
          >
            <div className="text-3xl font-extrabold tracking-tight">
              Blin
              <span className="text-[#2ee866]">
                lx
              </span>
            </div>

            <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-white/65">
              DON&apos;T BUY UNTIL
              WE&apos;VE CHECKED IT.
            </p>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
            <Link
              href="/"
              className="transition hover:text-[#2ee866]"
            >
              Check a Deal
            </Link>

            <Link
              href="/about"
              className="transition hover:text-[#2ee866]"
            >
              About Us
            </Link>

            <Link
              href="/contact"
              className="transition hover:text-[#2ee866]"
            >
              Contact
            </Link>
          </nav>

          <div className="rounded-lg border border-[#2ee866]/30 bg-[#2ee866]/10 px-5 py-3 text-sm font-bold text-[#68f18e]">
            Buying Guides
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/10 px-6 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-12 h-[450px] w-[760px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
            Smarter shopping
          </p>

          <h1 className="mt-5 text-5xl font-black tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Blinlx{" "}
            <span className="text-[#2ee866]">
              Guides
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/68">
            Clear, practical buying
            advice to help you compare
            products, understand
            specifications and avoid
            paying more than necessary.
          </p>

          <div className="mx-auto mt-8 inline-flex rounded-full border border-[#2ee866]/25 bg-[#2ee866]/10 px-5 py-2 text-sm font-bold text-[#68f18e]">
            {guides.length} guides
            available
          </div>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#52ee7e]">
                Buying intelligence
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Practical advice before
                you buy
              </h2>
            </div>

            <p className="max-w-xl text-white/55">
              Every guide is designed
              to explain the trade-offs,
              suitability and buying
              mistakes that genuinely
              affect your decision.
            </p>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {guides.map(
              (guide) => (
                <article
                  key={
                    guide.slug
                  }
                  className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#2ee866]/30 hover:bg-white/[0.05]"
                >
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full border border-[#2ee866]/25 bg-[#2ee866]/10 px-3 py-1 font-bold text-[#68f18e]">
                      {
                        guide.category
                      }
                    </span>

                    <span className="text-white/45">
                      {
                        guide.label
                      }
                    </span>
                  </div>

                  <h2 className="mt-6 text-2xl font-black tracking-tight">
                    <Link
                      href={
                        `/blog/${guide.slug}`
                      }
                      className="transition group-hover:text-[#68f18e]"
                    >
                      {
                        guide.title
                      }
                    </Link>
                  </h2>

                  <p className="mt-5 line-clamp-4 leading-8 text-white/65">
                    {
                      guide.description
                    }
                  </p>

                  <div className="mt-auto pt-8">
                    <Link
                      href={
                        `/blog/${guide.slug}`
                      }
                      className="inline-flex items-center gap-2 font-black text-[#2ee866] transition hover:text-[#68f18e]"
                    >
                      Read the guide

                      <span aria-hidden="true">
                        →
                      </span>
                    </Link>
                  </div>
                </article>
              ),
            )}
          </div>

          <div className="mt-16 rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] px-7 py-10 text-center sm:px-12">
            <h2 className="text-3xl font-black">
              Found a product you are
              considering?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/65">
              Enter the product or
              paste its link into
              Blinlx and let us help
              you check the offer
              before you buy.
            </p>

            <Link
              href="/"
              className="mt-7 inline-flex rounded-xl bg-[#2ee866] px-7 py-4 font-black text-[#09120d] transition hover:bg-[#68f18e]"
            >
              Check a deal
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0d1822]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Link href="/">
                <h2 className="text-2xl font-black">
                  Blin
                  <span className="text-[#2ee866]">
                    lx
                  </span>
                </h2>
              </Link>

              <p className="mt-4 max-w-md leading-7 text-white/65">
                Helping UK consumers
                compare products,
                check prices and make
                smarter buying
                decisions.
              </p>
            </div>

            <nav className="flex flex-col gap-3 md:items-end">
              <Link
                href="/about"
                className="text-white/65 hover:text-[#2ee866]"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="text-white/65 hover:text-[#2ee866]"
              >
                Contact
              </Link>

              <Link
                href="/privacy"
                className="text-white/65 hover:text-[#2ee866]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-white/65 hover:text-[#2ee866]"
              >
                Terms of Use
              </Link>

              <Link
                href="/cookies"
                className="text-white/65 hover:text-[#2ee866]"
              >
                Cookie Policy
              </Link>
            </nav>
          </div>

          <div className="my-10 h-px bg-white/10" />

          <p className="text-sm text-white/45">
            © {currentYear} Blinlx.
            All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}