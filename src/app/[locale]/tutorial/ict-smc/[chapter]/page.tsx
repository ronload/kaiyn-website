import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ChapterPagination } from "@/components/tutorial/chapter-pagination";
import { Markdown } from "@/components/tutorial/markdown";
import { OnThisPage } from "@/components/tutorial/on-this-page";
import { routing } from "@/i18n/routing";
import {
  getIctSmcChapterNeighbors,
  getIctSmcChapterSlugs,
  isIctSmcChapterSlug,
  type Locale,
} from "@/lib/tutorial/chapters";
import { loadIctSmcChapter } from "@/lib/tutorial/load-chapter";
import { getChapterToc } from "@/lib/tutorial/table-of-contents";

type Props = {
  params: Promise<{ locale: string; chapter: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getIctSmcChapterSlugs().map((chapter) => ({ locale, chapter })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, chapter } = await params;
  if (!isIctSmcChapterSlug(chapter)) return {};
  const { title } = await loadIctSmcChapter(chapter, locale as Locale);
  return { title: `${title} · Kaiyn` };
}

export default async function ChapterPage({ params }: Props) {
  const { locale, chapter } = await params;
  setRequestLocale(locale);

  if (!isIctSmcChapterSlug(chapter)) notFound();

  const { title, body } = await loadIctSmcChapter(chapter, locale as Locale);
  const { prev, next } = getIctSmcChapterNeighbors(chapter, locale as Locale);
  const toc = getChapterToc(body);

  return (
    <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_14rem] xl:gap-x-12">
      <div className="mx-auto min-w-0 w-full max-w-3xl">
        <article>
          <h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <div className="mt-8">
            <Markdown lang={locale}>{body}</Markdown>
          </div>
        </article>
        <ChapterPagination prev={prev} next={next} />
      </div>
      <OnThisPage toc={toc} />
    </div>
  );
}
