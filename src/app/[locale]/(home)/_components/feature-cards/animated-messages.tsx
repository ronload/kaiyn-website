"use client";

import { useInView } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { AnimatedMessageList } from "./animated-message-list";

type Direction = "long" | "short";

type SignalData = {
  id: string;
  symbol: string;
  direction: Direction;
  entry: string;
  takeProfit: string;
  stopLoss: string;
};

const ICON_SRC = "/img/icon-light.svg";
const AUTHOR = "Kaiyn";

const signals: SignalData[] = [
  {
    id: "1",
    symbol: "BTC",
    direction: "short",
    entry: "91750",
    takeProfit: "91100/90400/89700/89000",
    stopLoss: "92300",
  },
  {
    id: "2",
    symbol: "CLO",
    direction: "long",
    entry: "0.63",
    takeProfit: "0.84/1.05/1.28",
    stopLoss: "0.6",
  },
  {
    id: "3",
    symbol: "BTC",
    direction: "long",
    entry: "94900",
    takeProfit: "100488/105000/110000/115000",
    stopLoss: "93700",
  },
  {
    id: "4",
    symbol: "ETH",
    direction: "short",
    entry: "3320",
    takeProfit: "3220/3120/3000",
    stopLoss: "3373",
  },
  {
    id: "5",
    symbol: "SOL",
    direction: "long",
    entry: "81.7-79.8",
    takeProfit: "89.7/98/111/124",
    stopLoss: "78",
  },
  {
    id: "6",
    symbol: "BTC",
    direction: "short",
    entry: "77900",
    takeProfit: "73700/70000/66500/63000",
    stopLoss: "78650",
  },
  {
    id: "7",
    symbol: "BREV",
    direction: "long",
    entry: "0.465",
    takeProfit: "0.515/0.61/0.72",
    stopLoss: "0.45",
  },
  {
    id: "8",
    symbol: "XPL",
    direction: "long",
    entry: "0.195",
    takeProfit: "0.254/0.4/0.55/0.75",
    stopLoss: "0.18",
  },
];

function SignalMessage({
  symbol,
  direction,
  entry,
  takeProfit,
  stopLoss,
}: Omit<SignalData, "id">) {
  const t = useTranslations("HomePage");

  return (
    <div className="flex w-fit flex-row items-end gap-2">
      <Image
        src={ICON_SRC}
        alt=""
        width={28}
        height={28}
        className="size-7 shrink-0"
      />
      <figure
        className={cn(
          "relative flex w-fit max-w-[320px] flex-col gap-1",
          "transform-gpu rounded-2xl rounded-bl-sm p-3",
          "bg-white/5 backdrop-blur-md",
          "[border:1px_solid_rgba(255,255,255,.1)]",
        )}
      >
        <span className="font-medium text-white text-xs">{AUTHOR}</span>
        <dl className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-0.5 text-xs">
          <dt className="text-white/50">{t("symbol")}</dt>
          <dd className="text-white/90">{symbol}</dd>
          <dt className="text-white/50">{t("direction")}</dt>
          <dd
            className={cn(
              "font-medium",
              direction === "long" ? "text-emerald-400" : "text-rose-400",
            )}
          >
            {t(direction)}
          </dd>
          <dt className="text-white/50">{t("entry")}</dt>
          <dd className="text-white/90">{entry}</dd>
          <dt className="text-white/50">{t("takeProfit")}</dt>
          <dd className="text-white/90">{takeProfit}</dd>
          <dt className="text-white/50">{t("stopLoss")}</dt>
          <dd className="text-white/90">{stopLoss}</dd>
        </dl>
      </figure>
    </div>
  );
}

export function AnimatedMessagesBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div
      ref={ref}
      className="absolute inset-x-2 top-4 flex h-[300px] flex-col overflow-hidden px-2 pt-2 pb-12 [mask-image:linear-gradient(to_bottom,transparent_0%,#000_10%,#000_70%,transparent_85%)]"
    >
      {isInView && (
        <AnimatedMessageList delay={1500} className="flex-1 items-start">
          {signals.map((item) => (
            <SignalMessage key={item.id} {...item} />
          ))}
        </AnimatedMessageList>
      )}
    </div>
  );
}
