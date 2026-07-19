const dealOptions = [
  {
    title: "Upload a quote",
    description: "PDF, photo or screenshot",
    icon: "↑",
  },
  {
    title: "Paste a link",
    description: "From any retailer",
    icon: "↗",
  },
  {
    title: "Describe the deal",
    description: "Tell us what you've been offered",
    icon: "•••",
  },
];
const analysisCards = [
  {
    title: "Price Score",
    description: "How competitive is the price?",
    icon: "🏷",
  },
  {
    title: "Value Score",
    description: "Is it good value for what you get?",
    icon: "☆",
  },
  {
    title: "Risk Check",
    description: "Any red flags or things missing?",
    icon: "!",
  },
  {
    title: "Market Comparison",
    description: "See how it compares to the market",
    icon: "↗",
  },
  {
    title: "Smart Recommendation",
    description: "Buy now, negotiate, wait or walk away",
    icon: "✓",
  },
];

const categories = [
  {
    title: "Mobile Phones",
    description: "Compare contracts and phone deals",
    icon: "▯",
  },
  {
    title: "Broadband",
    description: "Find the best broadband deals",
    icon: "⌁",
  },
  {
    title: "Electronics",
    description: "TVs, laptops, gadgets and more",
    icon: "▭",
  },
  {
    title: "Home Insurance",
    description: "Review quotes and save",
    icon: "⌂",
  },
  {
    title: "Car Insurance",
    description: "Find better-value cover",
    icon: "▱",
  },
  {
    title: "Travel",
    description: "Flights, holidays and packages",
    icon: "✈",
  },
];

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101b26] text-white">
      <header className="border-b border-white/10">
      
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          
          <div>
            <div className="text-3xl font-extrabold tracking-tight">
              Deal<span className="text-[#2ee866]">Beater</span>
            </div>

            <p className="mt-1 text-[10px] font-semibold tracking-[0.16em] text-white/65">
              DON&apos;T BUY UNTIL WE&apos;VE CHECKED IT.
            </p>
          </div>

         <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
  <a
    href="#how-it-works"
    className="transition hover:text-[#2ee866]"
  >
    How It Works
  </a>

  <a
    href="#categories"
    className="transition hover:text-[#2ee866]"
  >
    Categories
  </a>

  <a
    href="#about"
    className="transition hover:text-[#2ee866]"
  >
    About Us
  </a>

  <Link
    href="/contact"
    className="transition hover:text-[#2ee866]"
  >
    Contact
  </Link>
</nav>

          <div className="rounded-lg bg-[#20c95a] px-5 py-3 text-sm font-bold shadow-lg shadow-black/20">
            Coming Soon
          </div>
        </div>
      </header>

      <section
        id="how-it-works"
        className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-16"
      >
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-semibold text-[#68f18e]">
            AI-powered deal checking
          </div>

          <h1 className="max-w-2xl text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl lg:text-7xl">
            Don&apos;t buy
            <br />
            until we&apos;ve
            <br />
            <span className="text-[#2ee866]">checked</span> it.
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/75">
            Upload a quote, paste a link or tell us about a deal. Deal Beater
            helps UK consumers make smarter buying decisions before they spend
            their money.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <TrustItem
              title="Independent analysis"
              text="Clear, unbiased insight."
            />

            <TrustItem title="Free to use" text="No hidden catch." />

            <TrustItem
              title="Your data is safe"
              text="Private and secure."
            />
          </div>
        </div>

        <div className="rounded-[28px] border border-white/10 bg-[#2f3d4c] p-5 shadow-2xl shadow-black/25 sm:p-7">
          <h2 className="text-center text-2xl font-bold">
            Check any deal in seconds
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {dealOptions.map((option) => (
              <div
                key={option.title}
                className="rounded-2xl border border-white/12 bg-[#465463] p-5 text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 text-3xl text-[#4bf17a]">
                  {option.icon}
                </div>

                <h3 className="mt-4 font-bold">{option.title}</h3>

                <p className="mt-2 text-sm leading-5 text-white/70">
                  {option.description}
                </p>
              </div>
            ))}
          </div>

          <div className="my-5 flex items-center gap-4 text-xs text-white/60">
            <div className="h-px flex-1 bg-white/15" />
            OR
            <div className="h-px flex-1 bg-white/15" />
          </div>

          <div className="rounded-2xl border border-dashed border-white/25 bg-[#1f2c39] px-6 py-8 text-center">
            <p className="text-lg font-semibold">Launching soon</p>

            <p className="mt-2 text-white/70">
              Quote uploads, product links and AI deal analysis are on the way.
            </p>
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-black/10 px-6 py-12 lg:px-10">
  <div className="mx-auto max-w-7xl">
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
        Independent AI analysis
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        AI-powered deal analysis
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-white/70">
        We analyse price, value, terms and market data to give you a clear,
        easy-to-understand answer.
      </p>
    </div>

    <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {analysisCards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-white/12 bg-[#465464] p-6 text-center shadow-lg shadow-black/10 transition duration-200 hover:-translate-y-1 hover:border-[#2ee866]/40"
        >
          <div className="text-4xl text-[#4bf17a]">{card.icon}</div>

          <h3 className="mt-4 font-bold">{card.title}</h3>

          <p className="mt-2 text-sm leading-5 text-white/75">
            {card.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

<section id="categories" className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
        Popular categories
      </p>

      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
        Built for everyday buying decisions
      </h2>
    </div>

    <span className="text-sm font-semibold text-[#52ee7e]">
      More categories coming soon
    </span>
  </div>

  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {categories.map((category) => (
      <div
        key={category.title}
        className="flex items-center gap-4 rounded-2xl border border-white/10 bg-[#263543] p-5 transition duration-200 hover:-translate-y-1 hover:border-[#2ee866]/35"
      >
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#2ee866]/30 text-2xl text-[#2ee866]">
          {category.icon}
        </div>

        <div>
          <h3 className="font-bold">{category.title}</h3>

          <p className="mt-1 text-sm text-white/68">
            {category.description}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>

<section
  id="about"
  className="border-t border-white/10 bg-[#0d1822] px-6 py-14 lg:px-10"
>
  <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
        About Deal Beater
      </p>

      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
        A trusted second opinion before you buy
      </h2>
    </div>

    <div className="space-y-4 text-base leading-7 text-white/72">
      <p>
        Deal Beater is building a UK consumer platform designed to help people
        review quotes, products, contracts and offers before making a purchase.
      </p>

      <p>
        Our mission is simple: provide clear, useful and transparent guidance
        that helps people understand whether a deal is competitive, what may be
        missing and what they should consider next.
      </p>
    </div>
  </div>
</section>

<section className="px-6 py-14 lg:px-10">
  <div className="mx-auto max-w-4xl rounded-[28px] border border-white/10 bg-[#2f3d4c] p-8 text-center shadow-2xl shadow-black/20 sm:p-12">
    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
      Launching soon
    </p>

    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
      Be first to hear when Deal Beater launches
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-white/72">
      We&apos;re currently building the UK&apos;s smartest AI deal checker.
      Join the launch list and we&apos;ll let you know when it&apos;s ready.
    </p>

    <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        placeholder="Enter your email address"
        className="min-w-0 flex-1 rounded-xl border border-white/15 bg-[#1d2a36] px-4 py-4 text-white outline-none placeholder:text-white/40 focus:border-[#2ee866]"
      />

      <button
        type="button"
        className="rounded-xl bg-[#20c95a] px-6 py-4 font-bold text-white transition hover:bg-[#2ee866]"
      >
        Notify Me
      </button>
    </form>

    <p className="mt-3 text-xs text-white/45">
      No spam. Just launch updates.
    </p>
  </div>
</section>

  <footer className="mt-24 border-t border-white/10 bg-[#101b26]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-10 md:grid-cols-2">

          {/* Left */}
          <div>
            <h3 className="text-2xl font-black text-white">
              Deal Beater
            </h3>

            <p className="mt-4 max-w-md text-white/70 leading-7">
              Helping UK consumers make smarter buying decisions before they
              spend. Compare products, services and quotes with confidence.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col md:items-end">

            <h4 className="text-lg font-bold text-white">
              Company
            </h4>

            <div className="mt-4 flex flex-col gap-3">

              <Link
                href="/privacy"
                className="text-white/70 transition hover:text-[#2ee866]"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="text-white/70 transition hover:text-[#2ee866]"
              >
                Terms of Use
              </Link>

              <Link
                href="/cookies"
                className="text-white/70 transition hover:text-[#2ee866]"
              >
                Cookie Policy
              </Link>

              <Link
                href="/contact"
                className="text-white/70 transition hover:text-[#2ee866]"
              >
                Contact
              </Link>

            </div>

          </div>

        </div>

        <div className="my-10 h-px bg-white/10" />

        <div className="flex flex-col gap-3 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
<div className="mb-6 inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-medium text-[#2ee866]">
  🚀 Deal Beater is currently in development
</div>
          <p>
            © 2026 Deal Beater. All rights reserved.
          </p>

          <p>
            Operated by <span className="font-semibold text-white/70">Frame Tech UK Ltd</span>
          </p>

        </div>

      </div>
    </footer>
    </main>
  );
}

function TrustItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-3 border-l border-white/15 pl-4 first:border-l-0 first:pl-0">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#2ee866] text-sm font-black text-[#2ee866]">
        ✓
      </div>
      Impact-Site-Verification: ec27a0d1-2d84-4df8-9a86-d902c22ab577

      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-white/60">{text}</p>
      </div>
    </div>
  );
}