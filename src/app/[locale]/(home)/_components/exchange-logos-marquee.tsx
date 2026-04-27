import { useTranslations } from "next-intl";
import { Marquee } from "@/components/ui/marquee";

const exchanges = [
  "binance",
  "bingx",
  "bitget",
  "btcc",
  "bybit",
  "gateio",
  "lbank",
  "mexc",
  "okx",
  "pionex",
  "weex",
] as const;

const mobileRow1 = exchanges.slice(0, 6);
const mobileRow2 = exchanges.slice(6);

function ExchangeLogo({ name }: { name: string }) {
  return (
    // biome-ignore lint/performance/noImgElement: logos have varied aspect ratios; next/image's required width/height props trigger spurious "width or height modified" warnings here.
    <img
      src={`/img/exchange-logo/wordmark/${name}.png`}
      alt={name}
      className="h-8 w-auto opacity-70 brightness-0 invert"
    />
  );
}

export function ExchangeLogosMarquee() {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-black py-12 md:py-16">
      <h2 className="text-center font-semibold text-xl text-white/80 md:text-3xl">
        {t("exchangesTitle")}
      </h2>
      <p className="mb-10 text-center text-xl text-white/60 md:mb-12 md:text-3xl">
        {t("exchangesDescription")}
      </p>
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Marquee
          pauseOnHover
          className="hidden [--duration:40s] [--gap:3rem] md:flex"
        >
          {exchanges.map((name) => (
            <ExchangeLogo key={name} name={name} />
          ))}
        </Marquee>
        <div className="flex flex-col gap-4 md:hidden">
          <Marquee pauseOnHover className="[--duration:30s] [--gap:2rem]">
            {mobileRow1.map((name) => (
              <ExchangeLogo key={name} name={name} />
            ))}
          </Marquee>
          <Marquee
            reverse
            pauseOnHover
            className="[--duration:30s] [--gap:2rem]"
          >
            {mobileRow2.map((name) => (
              <ExchangeLogo key={name} name={name} />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
