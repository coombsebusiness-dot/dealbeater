import Link from "next/link";
import DealChecker from "./components/DealChecker";

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
              href="#deal-checker"
              className="transition hover:text-[#2ee866]"
            >
              Check a Deal
            </a>

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
  className="relative overflow-hidden px-6 pt-10 pb-16 sm:pt-12 sm:pb-20 lg:px-10 lg:pt-14 lg:pb-24"
>
        <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl">
          <div className="text-center">
            <div className="inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-semibold text-[#68f18e]">
              AI-powered buying advice
            </div>

            <h1 className="mx-auto mt-7 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Don&apos;t buy until
              <br />
              we&apos;ve{" "}
              <span className="text-[#2ee866]">checked it.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
              Paste a product link, describe what you need or upload a quote.
              Deal Beater will analyse it and help you make a smarter buying
              decision.
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <DealChecker />
          </div>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-3 text-sm text-white/60 sm:grid-cols-3">
            <TrustItem title="Independent analysis" />
            <TrustItem title="No hidden bias" />
            <TrustItem title="Free to check" />
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black/10 px-6 py-12 lg:px-10">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#52ee7e]">
            Our promise
          </p>

          <h2 className="mt-4 text-3xl font-black sm:text-4xl">
            Advice we would trust with our own money.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-white/68">
            We will never recommend a product simply because it earns us more.
            Every recommendation is built around one question: if it was our
            money, what would we honestly do?
          </p>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#0d1822]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="text-2xl font-black">
                Deal<span className="text-[#2ee866]">Beater</span>
              </h3>

              <p className="mt-4 max-w-md leading-7 text-white/65">
                Helping UK consumers make smarter buying decisions before they
                spend their money.
              </p>

              <div className="mt-6 inline-flex rounded-full border border-[#2ee866]/30 bg-[#2ee866]/10 px-4 py-2 text-sm font-medium text-[#2ee866]">
                🚀 Deal Beater is currently in development
              </div>
            </div>

            <div className="md:text-right">
              <h4 className="text-lg font-bold">Company</h4>

              <div className="mt-4 flex flex-col gap-3 md:items-end">
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
              </div>
            </div>
          </div>

          <div className="my-10 h-px bg-white/10" />

          <div className="flex flex-col gap-3 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
            <p>© 2026 Deal Beater. All rights reserved.</p>

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
      <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#2ee866]/50 text-xs font-black text-[#2ee866]">
        ✓
      </span>

      <span>{title}</span>
    </div>
  );
}