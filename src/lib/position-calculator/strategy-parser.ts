export interface StrategyData {
  symbol: string;
  direction: "Long" | "Short";
  entryRange: { min: number; max: number };
  takeProfits: number[];
  stopLoss: number;
}

export function parseStrategy(text: string): StrategyData | null {
  try {
    const lines = text.trim().split("\n");
    let symbol = "";
    let direction: "Long" | "Short" = "Long";
    let entryRange = { min: 0, max: 0 };
    let takeProfits: number[] = [];
    let stopLoss = 0;

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.includes("标的：") || trimmed.includes("標的：")) {
        symbol = trimmed.split("：")[1]?.trim() || "";
      }

      if (trimmed.includes("方向：")) {
        const dir = trimmed.split("：")[1]?.trim() || "";
        direction = dir.includes("多") ? "Long" : "Short";
      }

      if (trimmed.includes("进场：") || trimmed.includes("進場：")) {
        const entryText = trimmed.split("：")[1]?.trim() || "";
        entryRange = parseEntryPrice(entryText);
      }

      if (trimmed.includes("止盈：")) {
        const tpText = trimmed.split("：")[1]?.trim() || "";
        takeProfits = tpText
          .split("/")
          .map((p) => parseFloat(p.trim()))
          .filter((p) => !Number.isNaN(p));
      }

      if (trimmed.includes("止损：") || trimmed.includes("止損：")) {
        const slText = trimmed.split("：")[1]?.trim() || "";
        stopLoss = parseFloat(slText);
      }
    }

    if (
      !symbol ||
      entryRange.min === 0 ||
      entryRange.max === 0 ||
      stopLoss === 0
    ) {
      return null;
    }

    return { symbol, direction, entryRange, takeProfits, stopLoss };
  } catch {
    return null;
  }
}

function parseEntryPrice(entryText: string): { min: number; max: number } {
  if (entryText.includes("-")) {
    const entries = entryText.split("-").map((p) => parseFloat(p.trim()));
    if (entries.length === 2 && !entries.some(Number.isNaN)) {
      return { min: Math.min(...entries), max: Math.max(...entries) };
    }
  } else {
    const singleEntry = parseFloat(entryText);
    if (!Number.isNaN(singleEntry)) {
      return { min: singleEntry, max: singleEntry };
    }
  }

  return { min: 0, max: 0 };
}
