import {
  knowledgeEngine,
} from "@/app/knowledge";

interface KnowledgeSectionProps {
  articleId: string;
}

export function KnowledgeSection({
  articleId,
}: KnowledgeSectionProps) {
  const article =
    knowledgeEngine.getById(
      articleId,
    );

  if (!article) {
    return null;
  }

  return (
    <section
      id={article.id}
      className="
        scroll-mt-24
        overflow-hidden
        rounded-3xl
        border
        border-slate-700/70
        bg-slate-900/70
        shadow-xl
        ring-1
        ring-white/5
      "
    >
      <div className="border-b border-slate-700/70 px-6 py-6 sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-400">
          Blinlx knowledge
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">
          {article.title}
        </h2>

        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          {article.summary}
        </p>
      </div>

      <div className="space-y-5 px-6 py-6 sm:px-8">
        {article.content.map(
          (paragraph) => (
            <p
              key={paragraph}
              className="leading-8 text-slate-200"
            >
              {paragraph}
            </p>
          ),
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {article.tags.map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-700 bg-slate-950/60 px-3 py-1 text-xs text-slate-400"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}