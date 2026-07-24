import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn why Deal Beater was created and how we help UK consumers compare products, check prices and make smarter buying decisions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Deal Beater",
    description:
      "Deal Beater helps UK consumers check products, compare offers and make smarter buying decisions before spending their money.",
    url: "/about",
    type: "website",
  },
};

export default function AboutPage() {
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

          <nav
  aria-label="Main navigation"
  className="hidden items-center gap-9 text-sm font-semibold md:flex"
>
  <a
    href="#deal-checker"
    className="transition hover:text-[#2ee866]"
  >
    Check a Deal
  </a>

  <a
    href="#how-it-works"
    className="transition hover:text-[#2ee866]"
  >
    How It Works
  </a>

  <Link
    href="/blog"
    className="transition hover:text-[#2ee866]"
  >
    Blog
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
            Beta
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
            About Deal Beater
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Built to help people make
            <span className="text-[#2ee866]"> better buying decisions.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/68">
            Deal Beater was created to make online shopping clearer, more
            honest and less confusing for UK consumers.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10 px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              Why we built it
            </p>

            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              Buying online should not feel like guesswork.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-8 text-white/68">
            <p>
              Online shopping gives people more choice than ever, but it also
              creates more confusion. Similar-looking products can have
              different model numbers, revisions, specifications and
              conditions.
            </p>

            <p>
              Search results can also include accessories, upgrades, bundles
              and unrelated listings that appear cheaper than the product
              someone actually wants.
            </p>

            <p>
              Deal Beater is being built to cut through that noise. Our aim is
              to help people identify the correct product, compare genuine
              matching offers and understand whether a deal is really worth
              their money.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              What matters to us
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              Clear information. Honest guidance. Better value.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <ValueCard
              title="Accuracy first"
              text="We work to match the exact product, model and variant rather than treating every similar-looking listing as the same item."
            />

            <ValueCard
              title="Independent thinking"
              text="A higher commission should never decide what we recommend. The quality and suitability of the deal come first."
            />

            <ValueCard
              title="Built for real people"
              text="Deal Beater is designed to make shopping simpler for everyday consumers, not to overwhelm them with technical language."
            />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10 px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
            Our promise
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl">
            We ask the same question you would.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/68">
            If this were our money, would we buy it? That principle sits at the
            heart of Deal Beater. We want every result to help people feel more
            confident before they spend.
          </p>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] px-6 py-12 text-center sm:px-10">
          <h2 className="text-3xl font-black sm:text-4xl">
            Check before you buy.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/68">
            Use Deal Beater to check a product, compare available offers and
            make a more informed decision.
          </p>

          <Link
            href="/#deal-checker"
            className="mt-7 inline-flex rounded-xl bg-[#2ee866] px-7 py-4 font-black text-[#07140b] transition hover:brightness-110"
          >
            Check a Deal
          </Link>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0d1822]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Link href="/" aria-label="Deal Beater homepage">
                <h2 className="text-2xl font-black">
                  Deal<span className="text-[#2ee866]">Beater</span>
                </h2>
              </Link>

              <p className="mt-4 max-w-md leading-7 text-white/65">
                Helping UK consumers compare products, check prices and make
                smarter buying decisions.
              </p>
            </div>

            <div className="md:text-right">
              <h2 className="text-lg font-bold">Company</h2>

              <nav
                aria-label="Footer navigation"
                className="mt-4 flex flex-col gap-3 md:items-end"
              >
                <Link
                  href="/contact"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Contact
                </Link>

                <Link
                  href="/privacy"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Privacy Policy
                </Link>

                <Link
                  href="/terms"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Terms of Use
                </Link>

                <Link
                  href="/cookies"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Cookie Policy
                </Link>
              </nav>
            </div>
          </div>

          <div className="my-10 h-px bg-white/10" />

          <div className="flex flex-col gap-3 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} Deal Beater. All rights reserved.</p>

            <p>
              Operated by{" "}
              <span className="font-semibold text-white/65">
                Frame Tech UK Ltd
              </span>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ValueCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-7">
      <div
        aria-hidden="true"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[#2ee866]/40 bg-[#2ee866]/10 font-black text-[#2ee866]"
      >
        ✓
      </div>

      <h3 className="mt-5 text-xl font-black">{title}</h3>

      <p className="mt-3 leading-7 text-white/62">{text}</p>
    </article>
  );
}