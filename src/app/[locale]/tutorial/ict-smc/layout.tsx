import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";
import { ChapterSidebar } from "@/components/tutorial/chapter-sidebar";
import { ChapterSidebarMobile } from "@/components/tutorial/chapter-sidebar-mobile";
import { loadAllChaptersMetaWithSections } from "@/lib/tutorial/load-all-chapters-meta";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function IctSmcLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const chapters = await loadAllChaptersMetaWithSections();

  return (
    <main>
      <Container variant="wide" className="pt-32 pb-16 md:pt-36 md:pb-24">
        <ChapterSidebarMobile chapters={chapters} className="mb-6 lg:hidden" />
        <div className="grid grid-cols-1 gap-x-10 lg:grid-cols-[16rem_minmax(0,1fr)] xl:gap-x-12">
          <aside className="hidden lg:sticky lg:top-36 lg:block lg:self-start">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-px bg-linear-to-b from-transparent via-border to-transparent"
            />
            <div className="max-h-[calc(100dvh-10rem)] overflow-y-auto pr-4">
              <ChapterSidebar chapters={chapters} />
            </div>
          </aside>
          <div className="min-w-0">{children}</div>
        </div>
      </Container>
    </main>
  );
}
