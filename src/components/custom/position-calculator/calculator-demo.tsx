import { useTranslations } from "next-intl";

const SYMBOL = "btc";
const ENTRY_PRICE = 76200;
const POSITION_SIZE_USDT = 5442.86;
const POSITION_SIZE_UNITS = 0.07;
const RISK_PERCENTAGE = 1.84;
const MAX_LOSS = 100;

const TAKE_PROFITS = [
  { price: 73300, profit: 207.14 },
  { price: 70500, profit: 407.14 },
  { price: 65000, profit: 800.0 },
];

export function CalculatorDemo() {
  const t = useTranslations("PositionCalculator");
  const direction = t("directions.short");

  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-3 rounded-2xl border border-border bg-card/60 p-4 backdrop-blur"
    >
      <div className="rounded-xl border border-input bg-input/30 p-3 font-mono text-[0.7rem] leading-6 text-foreground/90">
        <div>标的：btc</div>
        <div>方向：空</div>
        <div>进场：76200</div>
        <div>止盈：73300/70500/65000</div>
        <div>止损：77600</div>
      </div>

      <div className="flex flex-col gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-[0.7rem] text-emerald-400">
        <h3 className="font-semibold text-xs">
          {t("result.headingCommunity", { direction, symbol: SYMBOL })}
        </h3>
        <div>
          <span className="font-semibold">{t("result.entryPrice")}: </span>
          {ENTRY_PRICE.toFixed(6)}
        </div>
        <div>
          <span className="font-semibold">{t("result.positionSize")}: </span>
          {t("result.positionSizeValue", {
            usdt: POSITION_SIZE_USDT.toFixed(2),
            units: POSITION_SIZE_UNITS.toFixed(2),
          })}
        </div>
        <div>
          <span className="font-semibold">{t("result.riskPercentage")}: </span>
          {RISK_PERCENTAGE.toFixed(2)}%
        </div>
        <div>
          <span className="font-semibold">{t("result.maxLoss")}: </span>$
          {MAX_LOSS.toFixed(2)} USDT
        </div>
        <div className="mt-0.5 flex flex-col gap-0.5">
          <span className="font-semibold">{t("result.takeProfitLevels")}</span>
          {TAKE_PROFITS.map((tp, n) => (
            <div key={`tp-${tp.price}-${tp.profit}`} className="ml-3 font-mono">
              {t("result.takeProfitItem", {
                n: n + 1,
                price: tp.price.toFixed(6),
                profit: tp.profit.toFixed(2),
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
