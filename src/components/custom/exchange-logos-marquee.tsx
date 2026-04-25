import Image from "next/image";
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

export function ExchangeLogosMarquee() {
  return (
    <section className="bg-black py-12 md:py-16">
      <div
        className="relative"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <Marquee pauseOnHover className="[--duration:40s] [--gap:3rem]">
          {exchanges.map((name) => (
            <Image
              key={name}
              src={`/img/exchange-logo/${name}.png`}
              alt={name}
              width={120}
              height={32}
              className="h-8 w-auto opacity-70 brightness-0 invert"
            />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
