"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  calculateCommunityPosition,
  type TakeProfitCalculation,
} from "@/lib/position-calculator/calculations";
import { parseStrategy } from "@/lib/position-calculator/strategy-parser";
import { sanitizeNumericInput } from "@/lib/position-calculator/validation";

interface CommunityFormData {
  dollarRisk: string;
  strategyText: string;
}

interface CommunityResult {
  symbol: string;
  direction: "Long" | "Short";
  positionSizeUSDT: number;
  positionSize: number;
  entryPrice: number;
  riskPercentage: number;
  maxLoss: number;
  profits: TakeProfitCalculation[];
}

export function CommunityForm() {
  const t = useTranslations("PositionCalculator");
  const [formData, setFormData] = useState<CommunityFormData>({
    dollarRisk: "",
    strategyText: "",
  });

  const { result, parseError } = useMemo<{
    result: CommunityResult | null;
    parseError: string;
  }>(() => {
    if (!formData.dollarRisk || !formData.strategyText) {
      return { result: null, parseError: "" };
    }
    const dollarRisk = parseFloat(formData.dollarRisk);
    if (Number.isNaN(dollarRisk) || dollarRisk <= 0) {
      return { result: null, parseError: "" };
    }
    const strategy = parseStrategy(formData.strategyText);
    if (!strategy) {
      return { result: null, parseError: t("community.errors.parse") };
    }
    const calculation = calculateCommunityPosition(
      dollarRisk,
      strategy.entryRange,
      strategy.stopLoss,
      strategy.takeProfits,
      strategy.direction,
    );
    return {
      result: { symbol: strategy.symbol, ...calculation },
      parseError: "",
    };
  }, [formData, t]);

  const handleDollarRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitized = sanitizeNumericInput(e.target.value);
    setFormData((prev) => ({ ...prev, dollarRisk: sanitized }));
  };

  const handleStrategyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, strategyText: e.target.value }));
  };

  const handleClear = () => {
    setFormData({ dollarRisk: "", strategyText: "" });
  };

  const direction = result
    ? t(result.direction === "Long" ? "directions.long" : "directions.short")
    : "";

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
      <h2 className="text-balance text-center font-semibold text-2xl">
        {t("community.title")}
      </h2>

      <div className="flex flex-col gap-2">
        <Label htmlFor="dollarRisk">
          {t("community.fields.dollarRisk.label")}
        </Label>
        <Input
          id="dollarRisk"
          name="dollarRisk"
          type="text"
          inputMode="decimal"
          value={formData.dollarRisk}
          onChange={handleDollarRiskChange}
          placeholder={t("community.fields.dollarRisk.placeholder")}
        />
        <p className="text-muted-foreground text-xs leading-relaxed">
          {t("community.fields.dollarRisk.description")}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="strategyText">
          {t("community.fields.strategyText.label")}
        </Label>
        <Textarea
          id="strategyText"
          name="strategyText"
          value={formData.strategyText}
          onChange={handleStrategyChange}
          placeholder={t("community.fields.strategyText.placeholder")}
          className="min-h-48 font-mono leading-relaxed"
        />
        <p className="text-muted-foreground text-xs leading-relaxed">
          {t("community.fields.strategyText.description")}
        </p>
      </div>

      {parseError && (
        <div
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-destructive text-sm"
        >
          {parseError}
        </div>
      )}

      {result && (
        <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 text-sm">
          <h3 className="font-semibold text-base">
            {t("result.headingCommunity", {
              direction,
              symbol: result.symbol,
            })}
          </h3>
          <div>
            <span className="font-semibold">{t("result.entryPrice")}: </span>
            {result.entryPrice.toFixed(6)}
          </div>
          <div>
            <span className="font-semibold">{t("result.positionSize")}: </span>
            {t("result.positionSizeValue", {
              usdt: result.positionSizeUSDT.toFixed(2),
              units: result.positionSize.toFixed(2),
            })}
          </div>
          <div>
            <span className="font-semibold">
              {t("result.riskPercentage")}:{" "}
            </span>
            {result.riskPercentage.toFixed(2)}%
          </div>
          <div>
            <span className="font-semibold">{t("result.maxLoss")}: </span>$
            {result.maxLoss.toFixed(2)} USDT
          </div>
          {result.profits.length > 0 && (
            <div className="mt-1 flex flex-col gap-1">
              <span className="font-semibold">
                {t("result.takeProfitLevels")}
              </span>
              {result.profits.map((tp, n) => (
                <div
                  key={`tp-${tp.price}-${tp.profit}`}
                  className="ml-4 font-mono text-xs"
                >
                  {t("result.takeProfitItem", {
                    n: n + 1,
                    price: tp.price.toFixed(6),
                    profit: tp.profit.toFixed(2),
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-center">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleClear}
        >
          {t("actions.clear")}
        </Button>
      </div>
    </div>
  );
}
