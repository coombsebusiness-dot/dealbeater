import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/app/components/lib/blog-posts";

export const metadata: Metadata = {
  title: "Buying Guides and Product Advice",
  description:
    "Read practical Deal Beater buying guides, product comparisons and advice designed to help UK shoppers avoid bad deals.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Buying Guides and Product Advice | Deal Beater",
    description:
      "Practical product guides and shopping advice from Deal Beater.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#101b26] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" aria-label="Deal Beater homepage">
            <div className="text-3xl font-extrabold tracking-tight">
              Deal<span className="text-[#2ee866]">Beater</span>
            </div>

            <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-white/65">
              DON&apos;T BUY UNTIL WE&apos;VE CHECKED IT.
            </p>
          </Link>

          <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
            <Link href="/" className="transition hover:text-[#2ee866]">
              Check a Deal
            </Link>

            <Link href="/about" className="transition hover:text-[#2ee866]">
              About Us
            </Link>

            <Link href="/contact" className="transition hover:text-[#2ee866]">
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
            Deal Beater <span className="text-[#2ee866]">Guides</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/68">
            Clear, practical buying advice to help you compare products,
            understand specifications and avoid paying more than necessary.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#52ee7e]">
                Latest articles
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Practical advice before you buy
              </h2>
            </div>

            <p className="max-w-xl text-white/55">
              We focus on the details that genuinely affect value, suitability
              and your final buying decision.
            </p>
          </div>

          <div className="mt-10 grid gap-7 lg:grid-cols-2">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#2ee866]/30 hover:bg-white/[0.05] sm:p-9"
              >
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded-full border border-[#2ee866]/25 bg-[#2ee866]/10 px-3 py-1 font-bold text-[#68f18e]">
                    {post.category}
                  </span>

                  <span className="text-white/45">{post.readingTime}</span>
                </div>

                <h2 className="mt-6 text-3xl font-black tracking-tight">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition group-hover:text-[#68f18e]"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="mt-5 leading-8 text-white/65">
                  {post.description}
                </p>

                <div className="mt-7 rounded-2xl border border-white/8 bg-black/10 p-5 text-white/55">
                  {post.featuredText}
                </div>

                <div className="mt-auto pt-8">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 font-black text-[#2ee866] transition hover:text-[#68f18e]"
                  >
                    Read the guide
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] px-7 py-10 text-center sm:px-12">
            <h2 className="text-3xl font-black">
              Found a product you are considering?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-8 text-white/65">
              Enter the product or paste its link into Deal Beater and let us
              help you check the offer before you buy.
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
                  Deal<span className="text-[#2ee866]">Beater</span>
                </h2>
              </Link>

              <p className="mt-4 max-w-md leading-7 text-white/65">
                Helping UK consumers compare products, check prices and make
                smarter buying decisions.
              </p>
            </div>

            <nav className="flex flex-col gap-3 md:items-end">
              <Link href="/about" className="text-white/65 hover:text-[#2ee866]">
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
            © {currentYear} Deal Beater. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}