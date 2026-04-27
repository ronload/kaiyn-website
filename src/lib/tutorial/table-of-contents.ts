import "server-only";
import { getTableOfContents } from "fumadocs-core/content/toc";
import type { TOCItemType } from "fumadocs-core/toc";

export type TocItem = TOCItemType;

export function getChapterToc(body: string): TocItem[] {
  return getTableOfContents(body).filter(
    (item) => item.depth === 2 || item.depth === 3,
  );
}
