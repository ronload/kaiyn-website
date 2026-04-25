import { ExchangeLogosMarquee } from "./_components/exchange-logos-marquee";
import { FeatureCards } from "./_components/feature-cards";
import Hero from "./_components/hero";
import { Timeline } from "./_components/timeline";

export default function Home() {
  return (
    <>
      <Hero />
      <ExchangeLogosMarquee />
      <FeatureCards />
      <Timeline />
    </>
  );
}
