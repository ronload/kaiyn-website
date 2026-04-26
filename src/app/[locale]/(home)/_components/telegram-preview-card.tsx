import Image from "next/image";
import { useTranslations } from "next-intl";

import { ShinyButton } from "@/components/ui/shiny-button";

export function TelegramPreviewCard() {
  const t = useTranslations("HomePage");

  return (
    <div className="group relative flex w-full transform-gpu flex-col items-center justify-center gap-3 overflow-hidden bg-background px-5 py-8 text-center [border:1px_solid_rgba(255,255,255,.1)] [box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] sm:px-8 sm:py-10">
      <Image
        src="/img/icon-light.svg"
        alt=""
        width={96}
        height={96}
        className="size-16 rounded-full shadow-lg sm:size-24"
      />
      <h3 className="text-base font-semibold text-foreground sm:text-xl">
        {t("timeline.steps.joinCommunity.card.name")}
      </h3>
      <p className="text-xs text-muted-foreground">
        {t("timeline.steps.joinCommunity.card.members")}
      </p>
      <p className="max-w-[280px] text-balance text-xs leading-relaxed text-muted-foreground sm:text-sm">
        {t("subtitle")}
      </p>
      <a
        href="https://t.me/kaiyncapital"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-block sm:mt-2"
      >
        <ShinyButton className="rounded-full border-transparent bg-[#2AABEE] px-4 py-1.5 hover:bg-[#229ED9] sm:px-6 sm:py-2 [&>span]:text-xs [&>span]:font-bold! [&>span]:normal-case [&>span]:tracking-normal [&>span]:text-white sm:[&>span]:text-sm">
          {t("timeline.steps.joinCommunity.card.viewButton")}
        </ShinyButton>
      </a>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-neutral-800/10" />
    </div>
  );
}
