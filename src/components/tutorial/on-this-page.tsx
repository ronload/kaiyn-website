"use client";

import {
  AnchorProvider,
  TOCItem as PrimitiveTOCItem,
  ScrollProvider,
  type TOCItemInfo,
  type TOCItemType,
  useTOC,
  useTOCListener,
} from "fumadocs-core/toc";
import { useTranslations } from "next-intl";
import {
  type CSSProperties,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

type Props = {
  toc: TOCItemType[];
};

type ComputedSVG = {
  width: number;
  height: number;
  content: ReactNode;
  d: string;
  positions: [top: number, bottom: number, x: number][];
  itemLineLengths: [top: number, bottom: number][];
};

const BASE_OFFSET = 8;

function getItemOffset(depth: number): number {
  if (depth <= 2) return 12 + BASE_OFFSET;
  if (depth === 3) return 24 + BASE_OFFSET;
  return 36 + BASE_OFFSET;
}

function getLineOffset(depth: number): number {
  if (depth <= 2) return BASE_OFFSET;
  if (depth === 3) return 8 + BASE_OFFSET;
  return 16 + BASE_OFFSET;
}

function TocItems({ toc }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<ComputedSVG | null>(null);

  const onPrint = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.clientHeight === 0) return;
    if (toc.length === 0) {
      setSvg(null);
      return;
    }

    let w = 0;
    let h = 0;
    let d = "";
    const positions: [top: number, bottom: number, x: number][] = [];

    for (let i = 0; i < toc.length; i++) {
      const item = toc[i];
      const element = container.querySelector<HTMLElement>(
        `a[href="${item.url}"]`,
      );
      if (!element) continue;

      const styles = getComputedStyle(element);
      const x = getLineOffset(item.depth) + 0.5;
      const top = element.offsetTop + Number.parseFloat(styles.paddingTop);
      const bottom =
        element.offsetTop +
        element.clientHeight -
        Number.parseFloat(styles.paddingBottom);

      w = Math.max(x + 8, w);
      h = Math.max(h, bottom);

      if (i === 0 || positions.length === 0) {
        d += ` M${x} ${top} L${x} ${bottom}`;
      } else {
        const [, upperBottom, upperX] = positions[positions.length - 1];
        d += ` C ${upperX} ${top - 4} ${x} ${upperBottom + 4} ${x} ${top} L${x} ${bottom}`;
      }

      positions.push([top, bottom, x]);
    }

    const content: ReactNode = (
      <path d={d} className="stroke-foreground" strokeWidth="1" fill="none" />
    );

    const itemLineLengths: [top: number, bottom: number][] = [];
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    const n = path.getTotalLength();
    for (let i = 0; i < positions.length; i++) {
      const [top, bottom] = positions[i];
      let l =
        i > 0 ? itemLineLengths[i - 1][1] + (top - positions[i - 1][1]) : top;
      while (l < n && path.getPointAtLength(l).y < top) l++;
      itemLineLengths.push([l, l + bottom - top]);
    }

    setSvg({
      content,
      width: w,
      height: h,
      d,
      itemLineLengths,
      positions,
    });
  }, [toc]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(onPrint);
    observer.observe(container);
    onPrint();
    return () => observer.disconnect();
  }, [onPrint]);

  return (
    <div ref={containerRef} className="relative flex flex-col">
      {svg && <ThumbTrack computed={svg} />}
      {toc.map((item, index) => (
        <TocItem key={item.url} item={item} index={index} toc={toc} />
      ))}
    </div>
  );
}

type ThumbBoxInfo = {
  startIdx: number;
  endIdx: number;
  isUp: boolean;
};

function ThumbTrack({ computed }: { computed: ComputedSVG }) {
  const ref = useRef<HTMLDivElement>(null);
  const previousRef = useRef<ThumbBoxInfo | null>(null);
  const tocInfo = useTOC();

  const calculate = useCallback(
    (items: TOCItemInfo[]): Record<string, string> => {
      const out: Record<string, string> = {};
      const startIdx = items.findIndex((item) => item.active);
      if (startIdx === -1) return out;

      const endIdx = items.findLastIndex((item) => item.active);
      out["--track-top"] = `${computed.positions[startIdx][0]}px`;
      out["--track-bottom"] = `${computed.positions[endIdx][1]}px`;

      let isUp = false;
      if (previousRef.current) {
        const prev = previousRef.current;
        isUp =
          prev.startIdx > startIdx ||
          prev.endIdx > endIdx ||
          (prev.startIdx === startIdx && prev.endIdx === endIdx && prev.isUp);
      }
      previousRef.current = { startIdx, endIdx, isUp };
      out["--offset-distance"] = isUp
        ? `${computed.itemLineLengths[startIdx][0]}px`
        : `${computed.itemLineLengths[endIdx][1]}px`;
      out["--opacity"] = "1";

      return out;
    },
    [computed],
  );

  useTOCListener((items) => {
    const element = ref.current;
    if (!element) return;
    for (const [k, v] of Object.entries(calculate(items))) {
      element.style.setProperty(k, v);
    }
  });

  return (
    <div
      ref={ref}
      className="absolute inset-s-0 top-0"
      style={
        {
          width: computed.width,
          height: computed.height,
          ...calculate(tocInfo.get()),
        } as CSSProperties
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${computed.width} ${computed.height}`}
        aria-hidden="true"
        focusable="false"
        className="absolute transition-[clip-path]"
        style={{
          width: computed.width,
          height: computed.height,
          clipPath:
            "polygon(0 var(--track-top,0), 100% var(--track-top,0), 100% var(--track-bottom,0), 0 var(--track-bottom,0))",
        }}
      >
        {computed.content}
      </svg>
      <div
        className="absolute size-1 rounded-full bg-foreground opacity-(--opacity,0) transition-[opacity,offset-distance] [offset-distance:var(--offset-distance,0)]"
        style={{
          offsetPath: `path("${computed.d}")`,
        }}
      />
    </div>
  );
}

function TocItem({
  item,
  index,
  toc,
}: {
  item: TOCItemType;
  index: number;
  toc: TOCItemType[];
}) {
  const offset = getLineOffset(item.depth);
  const upperOffset = index > 0 ? getLineOffset(toc[index - 1].depth) : offset;
  const lowerOffset =
    index + 1 < toc.length ? getLineOffset(toc[index + 1].depth) : offset;
  const isFirst = index === 0;
  const isLast = index === toc.length - 1;

  return (
    <PrimitiveTOCItem
      href={item.url}
      className={cn(
        "relative scroll-m-4 wrap-anywhere py-1.5 text-sm transition-colors",
        "text-muted-foreground hover:text-foreground data-[active=true]:text-foreground",
        isFirst && "pt-0",
        isLast && "pb-0",
      )}
      style={{ paddingInlineStart: getItemOffset(item.depth) }}
    >
      {offset !== upperOffset && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={`${Math.min(offset, upperOffset)} 0 ${Math.abs(upperOffset - offset)} 12`}
          aria-hidden="true"
          focusable="false"
          className="-z-1 -top-1.5 absolute"
          style={{
            width: Math.abs(upperOffset - offset) + 1,
            height: 12,
            insetInlineStart: Math.min(offset, upperOffset),
          }}
        >
          <path
            d={`M ${upperOffset} 0 C ${upperOffset} 8 ${offset} 4 ${offset} 12`}
            strokeWidth="1"
            fill="none"
            className="stroke-foreground/10"
          />
        </svg>
      )}
      <div
        className={cn(
          "-z-1 absolute inset-y-0 w-px bg-foreground/10",
          offset !== upperOffset && "top-1.5",
          offset !== lowerOffset && "bottom-1.5",
        )}
        style={{ insetInlineStart: offset }}
      />
      {item.title}
    </PrimitiveTOCItem>
  );
}

export function OnThisPage({ toc }: Props) {
  const t = useTranslations("TutorialChapter");
  const containerRef = useRef<HTMLElement>(null);

  if (toc.length === 0) return null;

  return (
    <aside
      ref={containerRef}
      className="hidden xl:sticky xl:top-36 xl:block xl:max-h-[calc(100dvh-10rem)] xl:self-start xl:overflow-y-auto xl:[scrollbar-width:none] xl:[&::-webkit-scrollbar]:hidden"
    >
      <nav aria-label={t("tableOfContents")}>
        <p className="mb-3 font-medium text-foreground text-sm">
          {t("tableOfContents")}
        </p>
        <AnchorProvider toc={toc} single>
          <ScrollProvider containerRef={containerRef}>
            <TocItems toc={toc} />
          </ScrollProvider>
        </AnchorProvider>
      </nav>
    </aside>
  );
}
