"use client";

import { useTranslations } from "next-intl";
import { type FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculatePosition,
  type PositionCalculationResult,
} from "@/lib/position-calculator/calculations";
import { sanitizeNumericInput } from "@/lib/position-calculator/validation";

interface PositionData {
  dollarRisk: string;
  entryPrice: string;
  stopLoss: string;
}

type Field = keyof PositionData;

export function CustomForm() {
  const t = useTranslations("PositionCalculator");
  const [formData, setFormData] = useState<PositionData>({
    dollarRisk: "",
    entryPrice: "",
    stopLoss: "",
  });

  const result = useMemo<PositionCalculationResult | null>(() => {
    if (!formData.dollarRisk || !formData.entryPrice || !formData.stopLoss) {
      return null;
    }
    const dollarRisk = parseFloat(formData.dollarRisk);
    const entryPrice = parseFloat(formData.entryPrice);
    const stopLoss = parseFloat(formData.stopLoss);
    if (
      Number.isNaN(dollarRisk) ||
      Number.isNaN(entryPrice) ||
      Number.isNaN(stopLoss)
    ) {
      return null;
    }
    return calculatePosition({ dollarRisk, entryPrice, stopLoss });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sanitized = sanitizeNumericInput(value);
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setFormData({ dollarRisk: "", entryPrice: "", stopLoss: "" });
  };

  const fields: {
    key: Field;
    label: string;
    description: string;
    placeholder: string;
  }[] = [
    {
      key: "dollarRisk",
      label: t("regular.fields.dollarRisk.label"),
      description: t("regular.fields.dollarRisk.description"),
      placeholder: t("regular.fields.dollarRisk.placeholder"),
    },
    {
      key: "entryPrice",
      label: t("regular.fields.entryPrice.label"),
      description: t("regular.fields.entryPrice.description"),
      placeholder: t("regular.fields.entryPrice.placeholder"),
    },
    {
      key: "stopLoss",
      label: t("regular.fields.stopLoss.label"),
      description: t("regular.fields.stopLoss.description"),
      placeholder: t("regular.fields.stopLoss.placeholder"),
    },
  ];

  const direction = result
    ? t(result.direction === "Long" ? "directions.long" : "directions.short")
    : "";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur"
    >
      <h2 className="text-balance text-center font-semibold text-2xl">
        {t("regular.title")}
      </h2>

      {fields.map((field) => (
        <div key={field.key} className="flex flex-col gap-2">
          <Label htmlFor={field.key}>{field.label}</Label>
          <Input
            id={field.key}
            name={field.key}
            type="text"
            inputMode="decimal"
            value={formData[field.key]}
            onChange={handleChange}
            placeholder={field.placeholder}
          />
          <p className="text-muted-foreground text-xs leading-relaxed">
            {field.description}
          </p>
        </div>
      ))}

      {result && (
        <div className="flex flex-col gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-400 text-sm">
          <h3 className="font-semibold text-base">
            {t("result.headingRegular", { direction })}
          </h3>
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
    </form>
  );
}
