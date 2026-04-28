export interface PositionCalculationInput {
  dollarRisk: number;
  entryPrice: number;
  stopLoss: number;
}

export interface PositionCalculationResult {
  positionSize: number;
  positionSizeUSDT: number;
  riskPercentage: number;
  maxLoss: number;
  direction: "Long" | "Short";
}

export interface TakeProfitCalculation {
  price: number;
  profit: number;
}

export function calculatePosition(
  input: PositionCalculationInput,
): PositionCalculationResult {
  const { dollarRisk, entryPrice, stopLoss } = input;

  const direction: "Long" | "Short" = entryPrice > stopLoss ? "Long" : "Short";

  const riskPerUnit = Math.abs(entryPrice - stopLoss);

  const positionSize = dollarRisk / riskPerUnit;

  const positionSizeUSDT = positionSize * entryPrice;

  const totalCapital = 10000;
  const riskPercentage = (dollarRisk / totalCapital) * 100;

  const maxLoss = dollarRisk;

  return {
    positionSize,
    positionSizeUSDT,
    riskPercentage,
    maxLoss,
    direction,
  };
}

export function calculateTakeProfits(
  takeProfits: number[],
  entryPrice: number,
  positionSize: number,
  direction: "Long" | "Short",
): TakeProfitCalculation[] {
  return takeProfits.map((tpPrice) => {
    const profitPerUnit =
      direction === "Long" ? tpPrice - entryPrice : entryPrice - tpPrice;
    const profit = profitPerUnit * positionSize;
    return { price: tpPrice, profit };
  });
}

export function calculateCommunityPosition(
  dollarRisk: number,
  entryRange: { min: number; max: number },
  stopLoss: number,
  takeProfits: number[],
  direction: "Long" | "Short",
) {
  const entryPrice = (entryRange.min + entryRange.max) / 2;

  const baseResult = calculatePosition({
    dollarRisk,
    entryPrice,
    stopLoss,
  });

  const riskPercentage = (dollarRisk / baseResult.positionSizeUSDT) * 100;

  const profits = calculateTakeProfits(
    takeProfits,
    entryPrice,
    baseResult.positionSize,
    direction,
  );

  return {
    ...baseResult,
    riskPercentage,
    entryPrice,
    profits,
  };
}
