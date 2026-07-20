interface MoneyRecommendationCardProps {
  recommendation: string;
}

export default function MoneyRecommendationCard({
  recommendation,
}: MoneyRecommendationCardProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-zinc-900 to-zinc-950 p-6 shadow-xl sm:p-8">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">
          💚 If it was our money...
        </p>

        <p className="mt-4 max-w-2xl text-xl font-semibold leading-8 text-white sm:text-2xl">
          {recommendation}
        </p>

        <p className="mt-4 text-sm leading-6 text-zinc-400">
          Our recommendation is based on the retailer, seller,
          condition, warranty, returns and delivery information
          available for this offer.
        </p>
      </div>
    </section>
  );
}