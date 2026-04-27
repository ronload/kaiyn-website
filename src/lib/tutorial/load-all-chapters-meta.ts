import "server-only";
import { type ChapterRecord, ICT_SMC_CHAPTERS } from "@/lib/tutorial/chapters";
import { loadIctSmcChapter } from "@/lib/tutorial/load-chapter";
import { getChapterToc, type TocItem } from "@/lib/tutorial/table-of-contents";

export type ChapterMetaWithSections = ChapterRecord & {
  sections: TocItem[];
};

export async function loadAllChaptersMetaWithSections(): Promise<
  ChapterMetaWithSections[]
> {
  return Promise.all(
    ICT_SMC_CHAPTERS.map(async (record) => {
      const { body } = await loadIctSmcChapter(record.slug);
      const sections = getChapterToc(body).filter((item) => item.depth === 2);
      return { ...record, sections };
    }),
  );
}
