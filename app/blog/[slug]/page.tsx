import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/app/components/lib/blog-posts";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Deal Beater`,
      description: post.description,
      url: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(post.publishedAt));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Organization",
      name: "Deal Beater",
      url: "https://dealbeater.co.uk",
    },
    publisher: {
      "@type": "Organization",
      name: "Deal Beater",
      url: "https://dealbeater.co.uk",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dealbeater.co.uk/blog/${post.slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-[#101b26] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c"),
        }}
      />

      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
          <Link href="/">
            <div className="text-3xl font-extrabold tracking-tight">
              Deal<span className="text-[#2ee866]">Beater</span>
            </div>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link href="/blog" className="transition hover:text-[#2ee866]">
              All guides
            </Link>

            <Link href="/" className="transition hover:text-[#2ee866]">
              Check a deal
            </Link>
          </nav>
        </div>
      </header>

      <article>
        <header className="relative overflow-hidden border-b border-white/10 px-6 py-16 lg:px-10 lg:py-24">
          <div className="pointer-events-none absolute left-1/2 top-10 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[#2ee866]/5 blur-[120px]" />

          <div className="relative mx-auto max-w-4xl text-center">
            <Link
              href="/blog"
              className="text-sm font-bold uppercase tracking-[0.16em] text-[#52ee7e]"
            >
              {post.category}
            </Link>

            <h1 className="mt-6 text-4xl font-black tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-white/65">
              {post.description}
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 text-sm text-white/45">
              <span>{formattedDate}</span>
              <span aria-hidden="true">•</span>
              <span>{post.readingTime}</span>
              <span aria-hidden="true">•</span>
              <span>Deal Beater Editorial</span>
            </div>
          </div>
        </header>

        <div className="px-6 py-14 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-[#2ee866]/20 bg-[#2ee866]/[0.06] p-6 text-lg leading-8 text-white/75">
              {post.featuredText}
            </div>

            <div className="mt-12 space-y-12">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-3xl font-black tracking-tight">
                    {section.heading}
                  </h2>

                  <div className="mt-5 space-y-5 text-[17px] leading-8 text-white/68">
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}

                    {section.bullets && (
                      <ul className="space-y-3">
                        {section.bullets.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span
                              aria-hidden="true"
                              className="mt-[11px] h-2 w-2 shrink-0 rounded-full bg-[#2ee866]"
                            />

                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>
              ))}
            </div>

            <div className="mt-16 rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center">
              <h2 className="text-3xl font-black">
                Check the deal before you buy
              </h2>

              <p className="mx-auto mt-4 max-w-xl leading-8 text-white/65">
                Prices and specifications can vary between retailers. Use Deal
                Beater to compare the exact product and review your options.
              </p>

              <Link
                href="/"
                className="mt-7 inline-flex rounded-xl bg-[#2ee866] px-7 py-4 font-black text-[#09120d] transition hover:bg-[#68f18e]"
              >
                Check a product
              </Link>
            </div>

            <div className="mt-10">
              <Link
                href="/blog"
                className="font-bold text-[#2ee866] transition hover:text-[#68f18e]"
              >
                ← Back to all buying guides
              </Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}