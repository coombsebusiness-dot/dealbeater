import Link from "next/link";
import ProductAnalyzer from "@/app/components/ProductAnalyzer";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Blinlx",
  url: "https://blinlx.com",
  description:
    "Blinlx helps consumers make smarter buying decisions with fast product analysis, price comparison and retailer checks.",
  inLanguage: "en-GB",
  publisher: {
    "@type": "Organization",
    name: "Frame Tech UK Ltd",
    url: "https://blinlx.com",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Blinlx",
  legalName: "Frame Tech UK Ltd",
  url: "https://blinlx.com",
  logo: "https://blinlx.com/icon-512.png",
  description:
    "An independent shopping intelligence platform helping consumers make smarter buying decisions.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Blinlx?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Blinlx is a shopping intelligence platform that analyses products, prices and retailer offers to help consumers make more informed buying decisions.",
      },
    },
    {
      "@type": "Question",
      name: "Is Blinlx free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. You can use Blinlx to check products and compare available offers without paying a fee.",
      },
    },
    {
      "@type": "Question",
      name: "How does Blinlx compare products?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Blinlx identifies the exact product and model, checks available retailer offers and filters out unrelated accessories, incorrect variants and unsuitable listings.",
      },
    },
    {
      "@type": "Question",
      name: "Does Blinlx always recommend the cheapest listing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Not necessarily. Price is important, but Blinlx can also consider the retailer, product match, condition, delivery and overall value of an offer.",
      },
    },
  ],
};
const howItWorks = [
  {
    number: "01",
    title: "Paste a product",
    description:
      "Paste a product link from any supported retailer or simply describe what you're looking for.",
  },
  {
    number: "02",
    title: "Blinlx analyses it",
    description:
      "Our AI checks product details, compares offers and identifies the exact item across retailers.",
  },
  {
    number: "03",
    title: "Buy with confidence",
    description:
      "See smarter recommendations, compare prices and make a more informed buying decision.",
  },
];

const faqs = [
  {
    question: "What is Blinlx?",
    answer:
      "Blinlx is an AI-powered shopping intelligence platform designed to help you analyse products, compare available offers and make a more informed buying decision.",
  },
  {
    question: "Is Blinlx free to use?",
    answer:
      "Yes. You can analyse products and compare available retailer offers without paying a fee.",
  },
  {
    question: "How does Blinlx match products?",
    answer:
      "Blinlx examines details such as the brand, model number, revision, variant, condition and product type. It also filters out unrelated accessories and incorrect listings.",
  },
  {
    question: "Does Blinlx always recommend the cheapest offer?",
    answer:
      "No. The cheapest listing is not automatically the best buying decision. Blinlx also considers whether the product is an exact match and whether the retailer, condition, delivery and overall value appear suitable.",
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
  aria-label="Blinlx homepage"
  className="inline-block"
>
  <div className="text-3xl font-black tracking-[-0.04em]">
    BLINLX
  </div>

  <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-white/65">
    BUY SMARTER IN THE BLINK OF AN EYE.
  </p>
</Link>

         <nav
  aria-label="Main navigation"
  className="hidden items-center gap-9 text-sm font-semibold md:flex"
>
 <a
  href="#product-analyzer"
  className="transition hover:text-[#2ee866]"
>
  Analyse a Product
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
  id="product-analyzer"
        aria-labelledby="homepage-heading"
        className="relative overflow-hidden px-6 pb-16 pt-10 sm:pb-20 sm:pt-12 lg:px-10 lg:pb-24 lg:pt-14"
      >
        <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-semibold text-[#68f18e]">
  ⚡ AI Shopping Intelligence
</div>

            <h1
  id="homepage-heading"
  className="mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-8xl"
>
  Buy smarter
  <br />
  in the{" "}
  <span className="text-[#2ee866]">blink of an eye.</span>
</h1>

            <p className="mx-auto mt-7 max-w-3xl text-base leading-7 text-white/70 sm:text-lg">
  Paste any product link or tell Blinlx what you are looking for.
  We analyse prices, retailers, product details and overall value to help
  you make a smarter buying decision in seconds.
</p>
          </div>

          <div className="mt-8 sm:mt-10">
            <ProductAnalyzer  />
          </div>

         <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-sm text-white/60 sm:grid-cols-3">
  <TrustItem title="AI-powered analysis" />
  <TrustItem title="Independent recommendations" />
  <TrustItem title="Exact product matching" />
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
  Every recommendation starts with one question.
</h2>

         <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/68">
  If this were our money, what would we honestly do? Blinlx is built to put
  the buying decision first, not commissions, promoted listings or retailer
  pressure.
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
  How Blinlx works
</p>

<h2
  id="how-it-works-heading"
  className="mt-4 text-3xl font-black sm:text-5xl"
>
  AI-powered shopping intelligence in seconds.
</h2>

<p className="mt-5 text-base leading-7 text-white/65 sm:text-lg">
  Paste a product link or tell Blinlx what you're looking for. Our AI analyses
  product details, compares retailers and helps you decide whether it's the
  right time and place to buy.
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
          
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              More than the lowest price
            </p>

           <h2
  id="comparison-heading"
  className="mt-4 text-3xl font-black leading-tight sm:text-5xl"
>
  Price is only part of the buying decision.
</h2>

          <div className="space-y-5 text-base leading-7 text-white/68">
          <div className="space-y-5 text-base leading-7 text-white/68">
  <p>
    Similar-looking listings can hide different models, revisions,
    conditions, bundles and accessories.
  </p>

  <p>
    Blinlx analyses the product itself, checks whether each offer is a genuine
    match and helps you compare like for like.
  </p>

  <p>
    The goal is not simply to show the lowest number. It is to help you
    understand which offer represents the best overall buying decision.
  </p>
</div>
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
  Ready to buy smarter?
</h2>

<p className="mx-auto mt-4 max-w-2xl leading-7 text-white/68">
  Analyse your next purchase with Blinlx AI and make a more confident buying
  decision in seconds.
</p>

<a
  href="#product-analyzer"
  className="mt-7 inline-flex rounded-xl bg-[#2ee866] px-7 py-4 font-black text-[#07140b] transition hover:brightness-110"
>
  Analyse a Product
</a>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0d1822]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <Link
                href="/"
                aria-label="Blinlx homepage"
                className="inline-block"
              >
                <h2 className="text-2xl font-black">
                  Bli<span className="text-[#2ee866]">nlx</span>
                </h2>
              </Link>

              <p className="mt-4 max-w-md leading-7 text-white/65">
                Helping UK consumers compare products, check prices and make
                smarter buying decisions before spending their money.
              </p>

              <div className="mt-6 inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-medium text-[#2ee866]">
                🚀 Blinlx is currently in beta
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
            <p>© {currentYear} Blinlx. All rights reserved.</p>

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