import Link from "next/link";

interface GuideHeroProps {
  title: string;
  subtitle: string;
  readingTime: string;
  updated: string;
}

export function GuideHero({
  title,
  subtitle,
  readingTime,
  updated,
}: GuideHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-slate-700/60 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 shadow-2xl">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.12),transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-8 py-20">

        <div className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
          📸 Blinlx Buying Guide
        </div>

        <h1 className="mt-8 text-5xl font-black tracking-tight text-white md:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-3xl text-xl leading-9 text-slate-300">
          {subtitle}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">

          <div className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
            🧠 Independently Researched
          </div>

          <div className="rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2 text-sm text-green-400">
            💚 Trust Before Profit
          </div>

          <div className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
            📅 Updated {updated}
          </div>

          <div className="rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm text-slate-300">
            ⏱ {readingTime}
          </div>

        </div>

        <div className="mt-14 rounded-3xl border border-slate-700/70 bg-slate-900/70 p-8">

          <h2 className="text-2xl font-bold text-white">
            💚 Before You Spend A Penny...
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-300">
            Buying your first camera should be exciting—not confusing.
            This guide has been built to help you understand your
            options, avoid expensive mistakes and buy with confidence.
            We would not recommend products because they pay the biggest
            commission. We recommend them because they are the right
            choice for you.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="#blinlx-way"
              className="rounded-2xl bg-green-500 px-6 py-3 font-semibold text-black transition hover:bg-green-400"
            >
              Start Learning ↓
            </Link>

            <Link
              href="#recommendations"
              className="rounded-2xl border border-slate-600 px-6 py-3 font-semibold text-white transition hover:border-green-500"
            >
              Skip To Recommendations
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}