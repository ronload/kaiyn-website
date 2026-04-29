import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  getIctSmcChapterLocalized,
  type IctSmcChapterSlug,
  type Locale,
} from "@/lib/tutorial/chapters";

const CONTENT_DIR = path.join(process.cwd(), "content", "tutorial", "ict-smc");

const CJK_INDENT_PREFIX = /^[​ 　]+\t?/gm;
const FIRST_H1 = /^#\s+(.+?)\s*$/m;

export type ChapterContent = {
  title: string;
  body: string;
};

export async function loadIctSmcChapter(
  slug: IctSmcChapterSlug,
  locale: Locale,
): Promise<ChapterContent> {
  const localized = getIctSmcChapterLocalized(slug, locale);
  if (!localized) {
    throw new Error(`Unknown chapter slug: ${slug}`);
  }
  const filepath = path.join(CONTENT_DIR, locale, localized.file);
  const raw = await readFile(filepath, "utf8");

  const sanitized = raw.replace(CJK_INDENT_PREFIX, "");
  const titleMatch = sanitized.match(FIRST_H1);
  const title = titleMatch?.[1]?.trim() ?? localized.title;
  const body = titleMatch
    ? sanitized.replace(titleMatch[0], "").trimStart()
    : sanitized;

  return { title, body };
}
