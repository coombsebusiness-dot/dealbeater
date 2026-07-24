import Link from "next/link";
import DealChecker from "./components/DealChecker";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Deal Beater",
  url: "https://dealbeater.co.uk",
  description:
    "Deal Beater helps UK consumers compare products, prices and retailers before buying.",
  inLanguage: "en-GB",
  publisher: {
    "@type": "Organization",
    name: "Frame Tech UK Ltd",
    url: "https://dealbeater.co.uk",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Deal Beater",
  legalName: "Frame Tech UK Ltd",
  url: "https://dealbeater.co.uk",
  logo: "https://dealbeater.co.uk/icon-512.png",
  description:
    "An independent UK shopping and price-comparison service helping consumers make smarter buying decisions.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Deal Beater?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deal Beater is a UK shopping comparison service that analyses products, prices and retailer offers to help consumers make more informed buying decisions.",
      },
    },
    {
      "@type": "Question",
      name: "Is Deal Beater free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can use Deal Beater to check products and compare available offers without paying a fee.",
      },
    },
    {
      "@type": "Question",
      name: "How does Deal Beater compare products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Deal Beater identifies the exact product and model, checks available retailer offers and filters out unrelated accessories, incorrect variants and unsuitable listings.",
      },
    },
    {
      "@type": "Question",
      name: "Does Deal Beater always recommend the cheapest listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Price is important, but Deal Beater can also consider the retailer, product match, condition, delivery and overall value of an offer.",
      },
    },
  ],
};

const howItWorks = [
  {
    number: "01",
    title: "Tell us what you are buying",
    description:
      "Paste a product link, enter the product name or describe what you need.",
  },
  {
    number: "02",
    title: "We check the details",
    description:
      "Deal Beater identifies the exact model and checks matching offers from UK retailers.",
  },
  {
    number: "03",
    title: "Make a smarter decision",
    description:
      "Review the available prices and buying information before spending your money.",
  },
];

const faqs = [
  {
    question: "What is Deal Beater?",
    answer:
      "Deal Beater is a UK shopping comparison service designed to help you check products, compare available offers and make a more informed buying decision.",
  },
  {
    question: "Is Deal Beater free to use?",
    answer:
      "Yes. You can check products and compare available retailer offers without paying a fee.",
  },
  {
    question: "How does Deal Beater match products?",
    answer:
      "Our technology examines details such as the brand, model number, revision, variant and product type. It also filters out unrelated accessories and incorrect listings.",
  },
  {
    question: "Do you always recommend the cheapest offer?",
    answer:
      "Not always. The cheapest listing is not automatically the best deal. We also consider whether the product is an exact match and whether the retailer and overall offer appear suitable.",
  },
];

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#101b26] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
        }}
      />

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link
            href="/"
            aria-label="Deal Beater homepage"
            className="inline-block"
          >
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

      <section
        id="deal-checker"
        aria-labelledby="homepage-heading"
        className="relative overflow-hidden px-6 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14"
      >
        <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-semibold text-[#68f18e]">
              Smart UK product and price comparison
            </div>

            <h1
              id="homepage-heading"
              className="mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-8xl"
            >
              Don&apos;t buy until
              <br />
              we&apos;ve{" "}
              <span className="text-[#2ee866]">checked it.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
              Check products and compare prices from UK retailers before you
              buy. Paste a product link or tell Deal Beater what you need, and
              we&apos;ll help you find a better deal.
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <DealChecker />
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-sm text-white/60 sm:grid-cols-3">
            <TrustItem title="Independent analysis" />
            <TrustItem title="Exact product matching" />
            <TrustItem title="Free to check" />
          </div>
        </div>
      </section>

      <section
        aria-labelledby="promise-heading"
        className="border-y border-white/10 bg-black/10 px-6 py-12 lg:px-10"
      >
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
            Our promise
          </p>

          <h2
            id="promise-heading"
            className="mt-4 text-3xl font-black sm:text-4xl"
          >
            Advice we would trust with our own money.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/68">
            We will never recommend a product simply because it earns us more.
            Every recommendation is built around one question: if it were our
            money, what would we honestly do?
          </p>
        </div>
      </section>

      <section
        id="how-it-works"
        aria-labelledby="how-it-works-heading"
        className="px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              How Deal Beater works
            </p>

            <h2
              id="how-it-works-heading"
              className="mt-4 text-3xl font-black sm:text-5xl"
            >
              A better way to check before you buy.
            </h2>

            <p className="mt-5 text-base leading-7 text-white/65 sm:text-lg">
              Deal Beater helps remove the confusion from online shopping by
              checking that offers match the product you actually want.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {howItWorks.map((item) => (
              <article
                key={item.number}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-7"
              >
                <span className="text-sm font-black tracking-[0.18em] text-[#2ee866]">
                  {item.number}
                </span>

                <h3 className="mt-5 text-xl font-black">{item.title}</h3>

                <p className="mt-3 leading-7 text-white/62">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-labelledby="comparison-heading"
        className="border-y border-white/10 bg-black/10 px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              More than the lowest price
            </p>

            <h2
              id="comparison-heading"
              className="mt-4 text-3xl font-black leading-tight sm:text-5xl"
            >
              The cheapest listing is not always the best deal.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-7 text-white/68">
            <p>
              Online marketplaces can contain accessories, upgrades, bundles
              and older product revisions that look similar to the item you
              searched for.
            </p>

            <p>
              Deal Beater checks product names, model numbers and variants to
              find genuine matching offers. This helps you compare like for
              like instead of being misled by an unrelated low price.
            </p>

            <p>
              We are building Deal Beater for UK consumers who want clearer
              product comparisons and greater confidence before buying online.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="px-6 py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              Frequently asked questions
            </p>

            <h2
              id="faq-heading"
              className="mt-4 text-3xl font-black sm:text-5xl"
            >
              Everything you need to know.
            </h2>
          </div>

          <div className="mt-12 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6"
              >
                <summary className="cursor-pointer list-none pr-8 text-lg font-bold marker:hidden">
                  {faq.question}
                </summary>

                <p className="mt-4 leading-7 text-white/65">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] px-6 py-12 text-center sm:px-10">
          <h2 className="text-3xl font-black sm:text-4xl">
            Check your next purchase before you buy.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/68">
            Enter the product you are considering and let Deal Beater check the
            available offers.
          </p>

          <a
            href="#deal-checker"
            className="mt-7 inline-flex rounded-xl bg-[#2ee866] px-7 py-4 font-black text-[#07140b] transition hover:brightness-110"
          >
            Check a Deal
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0d1822]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Link
                href="/"
                aria-label="Deal Beater homepage"
                className="inline-block"
              >
                <h2 className="text-2xl font-black">
                  Deal<span className="text-[#2ee866]">Beater</span>
                </h2>
              </Link>

              <p className="mt-4 max-w-md leading-7 text-white/65">
                Helping UK consumers compare products, check prices and make
                smarter buying decisions before spending their money.
              </p>

              <div className="mt-6 inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-medium text-[#2ee866]">
                🚀 Deal Beater is currently in beta
              </div>
            </div>

            <div className="md:text-right">
              <h2 className="text-lg font-bold">Company</h2>

              <nav
                aria-label="Footer navigation"
                className="mt-4 flex flex-col gap-3 md:items-end"
              >
                <Link
                  href="/about"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  About Us
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

                <Link
                  href="/contact"
                  className="text-white/65 transition hover:text-[#2ee866]"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </div>

          <div className="my-10 h-px bg-white/10" />

          <div className="flex flex-col gap-3 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} Deal Beater. All rights reserved.</p>

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

function TrustItem({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center gap-2">
      <span
        aria-hidden="true"
        className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2ee866]/50 text-xs font-black text-[#2ee866]"
      >
        ✓
      </span>

      <span>{title}</span>
    </div>
  );
}