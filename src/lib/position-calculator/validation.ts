export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateNumericField(
  value: string,
  fieldName: string,
  isRequired = true,
): string | undefined {
  if (isRequired && !value.trim()) {
    return `${fieldName} is required`;
  }

  if (
    value.trim() &&
    (Number.isNaN(parseFloat(value)) || parseFloat(value) <= 0)
  ) {
    return "Please enter a valid positive number";
  }

  return undefined;
}

export function validateRegularForm(data: {
  dollarRisk: string;
  entryPrice: string;
  stopLoss: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const dollarRiskError = validateNumericField(data.dollarRisk, "Dollar risk");
  if (dollarRiskError) errors.dollarRisk = dollarRiskError;

  const entryPriceError = validateNumericField(data.entryPrice, "Entry price");
  if (entryPriceError) errors.entryPrice = entryPriceError;

  const stopLossError = validateNumericField(data.stopLoss, "Stop loss");
  if (stopLossError) errors.stopLoss = stopLossError;

  if (data.entryPrice && data.stopLoss) {
    const entry = parseFloat(data.entryPrice);
    const stop = parseFloat(data.stopLoss);
    if (!Number.isNaN(entry) && !Number.isNaN(stop) && entry === stop) {
      errors.stopLoss = "Stop loss must be different from entry price";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateCommunityForm(data: {
  dollarRisk: string;
  strategyText: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  const dollarRiskError = validateNumericField(data.dollarRisk, "Dollar risk");
  if (dollarRiskError) errors.dollarRisk = dollarRiskError;

  if (!data.strategyText.trim()) {
    errors.strategyText = "Strategy details are required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function sanitizeNumericInput(value: string): string {
  return value.replace(/[^0-9.]/g, "");
}
