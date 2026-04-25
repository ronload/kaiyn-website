import { ExchangeLogosMarquee } from "@/components/custom/exchange-logos-marquee";
import { FeatureCardsSection } from "@/components/custom/feature-cards-section";
import HeroSection from "@/components/custom/hero-section";
import { Timeline } from "@/components/custom/timeline";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ExchangeLogosMarquee />
      <FeatureCardsSection />
      <Timeline />
    </>
  );
}
