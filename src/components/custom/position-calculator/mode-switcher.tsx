"use client";

import { useTranslations } from "next-intl";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import type { CalculatorMode } from "./types";

const MODES: CalculatorMode[] = ["Regular", "Community"];

interface ModeSwitcherProps {
  mode: CalculatorMode;
  onModeChange: (mode: CalculatorMode) => void;
  className?: string;
  disabled?: boolean;
}

export function ModeSwitcher({
  mode,
  onModeChange,
  className,
  disabled = false,
}: ModeSwitcherProps) {
  const t = useTranslations("PositionCalculator.modes");

  const labels: Record<CalculatorMode, string> = {
    Regular: t("regular"),
    Community: t("community"),
  };

  const handleSelect = (next: CalculatorMode) => {
    if (!disabled && next !== mode) onModeChange(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const i = MODES.indexOf(mode);
    let next = i;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        next = i > 0 ? i - 1 : MODES.length - 1;
        break;
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        next = i < MODES.length - 1 ? i + 1 : 0;
        break;
      case "Home":
        event.preventDefault();
        next = 0;
        break;
      case "End":
        event.preventDefault();
        next = MODES.length - 1;
        break;
      default:
        return;
    }
    if (next !== i) handleSelect(MODES[next]);
  };

  return (
    <div
      role="radiogroup"
      aria-label={t("ariaGroupLabel")}
      aria-disabled={disabled || undefined}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "relative inline-flex h-12 w-72 items-center rounded-full border border-border p-1 outline-none transition-opacity sm:w-80",
        "focus-visible:ring-[3px] focus-visible:ring-ring/50",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-primary transition-transform duration-300 ease-out",
          mode === "Community" && "translate-x-full",
        )}
      />
      {MODES.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => handleSelect(option)}
          aria-pressed={mode === option}
          aria-label={t("ariaSwitchTo", { mode: labels[option] })}
          disabled={disabled}
          className={cn(
            "relative z-10 flex-1 cursor-pointer text-sm font-bold transition-colors",
            "disabled:cursor-not-allowed",
            mode === option
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  );
}
