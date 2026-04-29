import "server-only";
import {
  ICT_SMC_CHAPTERS,
  type Locale,
  type LocalizedChapter,
} from "@/lib/tutorial/chapters";
import { loadIctSmcChapter } from "@/lib/tutorial/load-chapter";
import { getChapterToc, type TocItem } from "@/lib/tutorial/table-of-contents";

export type ChapterMetaWithSections = LocalizedChapter & {
  sections: TocItem[];
};

export async function loadAllChaptersMetaWithSections(
  locale: Locale,
): Promise<ChapterMetaWithSections[]> {
  return Promise.all(
    ICT_SMC_CHAPTERS.map(async (record) => {
      const { body } = await loadIctSmcChapter(record.slug, locale);
      const sections = getChapterToc(body).filter((item) => item.depth === 2);
      return {
        slug: record.slug,
        order: record.order,
        file: record.files[locale],
        title: record.titles[locale],
        sections,
      };
    }),
  );
}
