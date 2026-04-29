import type { routing } from "@/i18n/routing";

export type Locale = (typeof routing.locales)[number];

export type ChapterRecord = {
  slug: string;
  order: number;
  files: Record<Locale, string>;
  titles: Record<Locale, string>;
};

export type LocalizedChapter = {
  slug: string;
  order: number;
  file: string;
  title: string;
};

export const ICT_SMC_CHAPTERS = [
  {
    slug: "introduction",
    order: 0,
    files: {
      en: "Chapter 00. Introduction.md",
      "zh-TW": "Chapter 00. 引言｜Inroduction.md",
      "zh-CN": "Chapter 00. 引言｜Inroduction.md",
    },
    titles: {
      en: "Introduction",
      "zh-TW": "引言",
      "zh-CN": "引言",
    },
  },
  {
    slug: "market-structure",
    order: 1,
    files: {
      en: "Chapter 01. Market Structure.md",
      "zh-TW": "Chapter 01. 市場結構｜Market Structure.md",
      "zh-CN": "Chapter 01. 市场结构｜Market Structure.md",
    },
    titles: {
      en: "Market Structure",
      "zh-TW": "市場結構",
      "zh-CN": "市场结构",
    },
  },
  {
    slug: "liquidity",
    order: 2,
    files: {
      en: "Chapter 02. Liquidity.md",
      "zh-TW": "Chapter 02. 流動性｜Liquidity.md",
      "zh-CN": "Chapter 02. 流动性｜Liquidity.md",
    },
    titles: {
      en: "Liquidity",
      "zh-TW": "流動性",
      "zh-CN": "流动性",
    },
  },
  {
    slug: "imbalance",
    order: 3,
    files: {
      en: "Chapter 03. Imbalance.md",
      "zh-TW": "Chapter 03. 失衡｜Imbalance.md",
      "zh-CN": "Chapter 03. 失衡｜Imbalance.md",
    },
    titles: {
      en: "Imbalance",
      "zh-TW": "失衡",
      "zh-CN": "失衡",
    },
  },
  {
    slug: "supply-and-demand",
    order: 4,
    files: {
      en: "Chapter 04. Supply and Demand.md",
      "zh-TW": "Chapter 04. 供給與需求｜Supply and Demand.md",
      "zh-CN": "Chapter 04. 供给与需求｜Supply and Demand.md",
    },
    titles: {
      en: "Supply and Demand",
      "zh-TW": "供給與需求",
      "zh-CN": "供给与需求",
    },
  },
  {
    slug: "ipda",
    order: 5,
    files: {
      en: "Chapter 05. Interbank Price Delivery Algorithm.md",
      "zh-TW":
        "Chapter 05. 銀行間價格傳遞演算法｜Interbank Price Delivery Algorithm.md",
      "zh-CN":
        "Chapter 05. 银行间价格传递演算法｜Interbank Price Delivery Algorithm.md",
    },
    titles: {
      en: "Interbank Price Delivery Algorithm",
      "zh-TW": "銀行間價格傳遞演算法",
      "zh-CN": "银行间价格传递演算法",
    },
  },
  {
    slug: "dealing-range",
    order: 6,
    files: {
      en: "Chapter 06. Dealing Range.md",
      "zh-TW": "Chapter 06. 交易區間｜Dealing Range.md",
      "zh-CN": "Chapter 06. 交易区间｜Dealing Range.md",
    },
    titles: {
      en: "Dealing Range",
      "zh-TW": "交易區間",
      "zh-CN": "交易区间",
    },
  },
  {
    slug: "advanced-market-structure",
    order: 7,
    files: {
      en: "Chapter 07. Advanced Market Structure.md",
      "zh-TW": "Chapter 07. 進階市場結構｜Advanced Market Structure.md",
      "zh-CN": "Chapter 07. 进阶市场结构｜Advanced Market Structure.md",
    },
    titles: {
      en: "Advanced Market Structure",
      "zh-TW": "進階市場結構",
      "zh-CN": "进阶市场结构",
    },
  },
  {
    slug: "entry",
    order: 8,
    files: {
      en: "Chapter 08. Entry.md",
      "zh-TW": "Chapter 08. 進場｜Entry.md",
      "zh-CN": "Chapter 08. 进场｜Entry.md",
    },
    titles: {
      en: "Entry",
      "zh-TW": "進場",
      "zh-CN": "进场",
    },
  },
] as const satisfies readonly ChapterRecord[];

export type IctSmcChapterSlug = (typeof ICT_SMC_CHAPTERS)[number]["slug"];

export function getIctSmcChapterSlugs(): IctSmcChapterSlug[] {
  return ICT_SMC_CHAPTERS.map((c) => c.slug);
}

export function isIctSmcChapterSlug(value: string): value is IctSmcChapterSlug {
  return ICT_SMC_CHAPTERS.some((c) => c.slug === value);
}

export function getIctSmcChapterRecord(
  slug: string,
): ChapterRecord | undefined {
  return ICT_SMC_CHAPTERS.find((c) => c.slug === slug);
}

function toLocalized(record: ChapterRecord, locale: Locale): LocalizedChapter {
  return {
    slug: record.slug,
    order: record.order,
    file: record.files[locale],
    title: record.titles[locale],
  };
}

export function getIctSmcChapterLocalized(
  slug: string,
  locale: Locale,
): LocalizedChapter | undefined {
  const record = getIctSmcChapterRecord(slug);
  return record ? toLocalized(record, locale) : undefined;
}

export function getIctSmcChapterNeighbors(
  slug: string,
  locale: Locale,
): {
  prev?: LocalizedChapter;
  next?: LocalizedChapter;
} {
  const idx = ICT_SMC_CHAPTERS.findIndex((c) => c.slug === slug);
  if (idx === -1) return {};
  const prev = idx > 0 ? ICT_SMC_CHAPTERS[idx - 1] : undefined;
  const next =
    idx < ICT_SMC_CHAPTERS.length - 1 ? ICT_SMC_CHAPTERS[idx + 1] : undefined;
  return {
    prev: prev ? toLocalized(prev, locale) : undefined,
    next: next ? toLocalized(next, locale) : undefined,
  };
}
