import { useTranslations } from "next-intl";
import { ConceptCard } from "@/components/custom/concept-card";
import { Marquee } from "@/components/ui/marquee";

const conceptKeys = [
  "marketStructure",
  "liquidity",
  "imbalance",
  "supplyAndDemand",
  "ipda",
  "dealingRange",
  "advancedMarketStructure",
  "entry",
] as const;

export function ConceptCardsMarqueeBackground() {
  const t = useTranslations("HomePage.cards.concepts");

  const firstColumn = conceptKeys.slice(0, 4);
  const secondColumn = conceptKeys.slice(4, 8);

  return (
    <div className="absolute inset-0 flex h-full items-center justify-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_5%,#000_25%,#000_75%,transparent_95%)]">
      <div className="flex flex-row gap-3">
        <Marquee
          vertical
          pauseOnHover
          className="h-[22rem] [--duration:30s] [--gap:0.75rem]"
        >
          {firstColumn.map((key) => (
            <ConceptCard
              key={key}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
            />
          ))}
        </Marquee>
        <Marquee
          vertical
          reverse
          pauseOnHover
          className="h-[22rem] [--duration:30s] [--gap:0.75rem]"
        >
          {secondColumn.map((key) => (
            <ConceptCard
              key={key}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
            />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
