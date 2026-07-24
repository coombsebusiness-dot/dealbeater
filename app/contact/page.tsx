import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Blinlx with questions, feedback, retailer enquiries, partnership opportunities or support requests.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Blinlx",
    description:
      "Get in touch with Blinlx for support, feedback, partnerships and general enquiries.",
    url: "/contact",
    type: "website",
  },
};

const contactOptions = [
  {
    title: "General enquiries",
    description:
      "Questions about Blinlx, how it works or anything else you would like to ask.",
    email: "help@blinlx.com",
  },
  {
    title: "Feedback and product suggestions",
    description:
      "Tell us what you think, report an incorrect result or suggest a feature that would make Blinlx better.",
     email: "help@blinlx.com",
  },
  {
    title: "Retailer and partnership enquiries",
    description:
      "Retailers, affiliate networks and potential partners can contact us to discuss working together.",
    email: "help@blinlx.com",
  },
];

export default function ContactPage() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#101b26] text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/" aria-label="Blinlx homepage">
            <div className="text-3xl font-extrabold tracking-tight">
             Blin<span className="text-[#2ee866]">lx</span>
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
        <div className="pointer-events-none absolute left-1/2 top-16 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
            Contact Blinlx
          </p>

          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            We&apos;d love to
            <span className="text-[#2ee866]"> hear from you.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/68">
            Whether you have a question, found an incorrect result or want to
            discuss working with Blinlx, send us a message and we&apos;ll
            get back to you as soon as we can.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10 px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-3">
            {contactOptions.map((option) => (
              <article
                key={option.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-7"
              >
                <div
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#2ee866]/40 bg-[#2ee866]/10 text-lg font-black text-[#2ee866]"
                >
                  @
                </div>

                <h2 className="mt-5 text-xl font-black">{option.title}</h2>

                <p className="mt-3 leading-7 text-white/62">
                  {option.description}
                </p>

                <a
                  href={`mailto:${option.email}`}
                  className="mt-6 inline-flex font-bold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  {option.email}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 lg:px-10 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              Email us directly
            </p>

            <h2 className="mt-4 text-3xl font-black sm:text-4xl">
              The quickest way to reach us.
            </h2>

            <p className="mt-5 max-w-2xl leading-7 text-white/68">
              Email us with as much detail as possible. For incorrect product
              matches or retailer listings, include the product name, the link
              you checked and a short explanation of the issue.
            </p>

            <a
             href="mailto:help@blinlx.com"
              className="mt-8 inline-flex rounded-xl bg-[#2ee866] px-7 py-4 font-black text-[#07140b] transition hover:brightness-110"
            >
              Email help@blinlx.com
            </a>
          </div>

          <aside className="rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] p-7 sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
              Company information
            </p>

            <h2 className="mt-4 text-2xl font-black">
              Deal<span className="text-[#2ee866]">Beater</span>
            </h2>

            <div className="mt-6 space-y-4 leading-7 text-white/68">
              <p>
                Blinlx is operated by{" "}
                <strong className="text-white">Frame Tech UK Ltd</strong>.
              </p>

              <p>
                Website:{" "}
                <a
                  href="https://blinlx.com"
                  className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  blinlx.com
                </a>
              </p>

              <p>
                Email:{" "}
                <a
                  href="mailto:help@blinlx.com"
                  className="font-semibold text-[#2ee866] transition hover:text-[#68f18e]"
                >
                  help@blinlx.com
                </a>
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-white/10 px-6 py-16 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-3xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] px-6 py-12 text-center sm:px-10">
          <h2 className="text-3xl font-black sm:text-4xl">
            Ready to check your next purchase?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-white/68">
            Return to the Deal Checker and compare the product before spending
            your money.
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
              <Link href="/" aria-label="Blinlx homepage">
                <h2 className="text-2xl font-black">
                  Blin<span className="text-[#2ee866]">lx</span>
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