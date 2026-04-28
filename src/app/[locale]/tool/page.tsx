import { useLocale, useTranslations } from "next-intl";
import { BentoCard } from "@/components/custom/bento-card";
import { CalculatorDemo } from "@/components/custom/position-calculator/calculator-demo";
import { Container } from "@/components/layout/container";

export default function ToolPage() {
  const t = useTranslations("ToolPage");
  const locale = useLocale();

  return (
    <main>
      <Container className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="flex flex-col gap-4">
          <h1 className="text-balance font-semibold text-4xl tracking-tight sm:text-5xl md:text-6xl">
            {t("title")}
          </h1>
          <p className="max-w-2xl text-balance text-lg text-muted-foreground md:text-xl">
            {t("description")}
          </p>
        </div>
        <div className="mt-12 grid w-full auto-rows-[22rem] grid-cols-3 gap-4">
          <BentoCard
            title={t("cards.positionCalculator.title")}
            description={t("cards.positionCalculator.description")}
            href={`/${locale}/tool/position-size-calculator`}
            cta={t("cards.positionCalculator.cta")}
            background={
              <div
                className="absolute inset-x-6 -top-20 origin-top scale-[0.85]"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, transparent 0%, black 22%, black 60%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to bottom, transparent 0%, black 22%, black 60%, transparent 100%)",
                }}
              >
                <CalculatorDemo />
              </div>
            }
          />
        </div>
      </Container>
    </main>
  );
}
