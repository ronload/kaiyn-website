import { setRequestLocale } from "next-intl/server";
import { PositionCalculator } from "@/components/custom/position-calculator/position-calculator";
import { Container } from "@/components/layout/container";

type Props = { params: Promise<{ locale: string }> };

export default async function PositionSizeCalculatorPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Container variant="narrow" className="pt-32 pb-16 md:pt-40 md:pb-24">
        <PositionCalculator />
      </Container>
    </main>
  );
}
