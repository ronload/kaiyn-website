"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, usePathname } from "@/i18n/navigation";
import type { ChapterMetaWithSections } from "@/lib/tutorial/load-all-chapters-meta";
import { cn } from "@/lib/utils";

type Props = {
  chapters: ChapterMetaWithSections[];
};

function deriveActiveSlug(pathname: string | null): string | undefined {
  if (!pathname) return undefined;
  const match = pathname.match(/\/tutorial\/ict-smc\/([^/]+)/);
  return match?.[1];
}

export function ChapterSidebar({ chapters }: Props) {
  const pathname = usePathname();
  const activeSlug = deriveActiveSlug(pathname);
  const [defaultValue] = useState(() => (activeSlug ? [activeSlug] : []));

  return (
    <Accordion
      multiple
      defaultValue={defaultValue}
      className="w-full gap-1 overflow-visible rounded-none border-0"
    >
      {chapters.map((chapter) => {
        const isActive = chapter.slug === activeSlug;
        const padded = String(chapter.order).padStart(2, "0");
        return (
          <AccordionItem
            key={chapter.slug}
            value={chapter.slug}
            className="border-0 not-last:border-b-0 data-open:bg-transparent"
          >
            <AccordionTrigger
              className={cn(
                "gap-2 rounded-md border border-transparent p-2 text-[0.8rem] font-medium text-muted-foreground transition-colors hover:bg-accent/40 hover:no-underline aria-expanded:text-foreground",
                isActive &&
                  "border-accent bg-accent text-foreground hover:bg-accent",
              )}
            >
              <span className="text-pretty leading-snug">
                {padded}. {chapter.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-1 pb-1">
              {chapter.sections.length === 0 ? null : (
                <ul className="-ml-2 flex translate-x-px flex-col gap-0.5 border-l border-border pl-2 py-0.5">
                  {chapter.sections.map((section) => (
                    <li key={section.url}>
                      <Link
                        href={`/tutorial/ict-smc/${chapter.slug}${section.url}`}
                        className="block -translate-x-px rounded-md border border-transparent px-2 py-1 text-[0.8rem] font-medium text-muted-foreground no-underline! transition-colors hover:bg-accent/40 hover:text-foreground"
                      >
                        {section.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
