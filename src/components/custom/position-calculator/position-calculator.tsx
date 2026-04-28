"use client";

import { useState } from "react";
import { CommunityForm } from "./community-form";
import { CustomForm } from "./custom-form";
import { ModeSwitcher } from "./mode-switcher";
import type { CalculatorMode } from "./types";

export function PositionCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("Regular");
  return (
    <div className="flex flex-col items-center gap-8">
      <ModeSwitcher mode={mode} onModeChange={setMode} />
      {mode === "Regular" ? <CustomForm /> : <CommunityForm />}
    </div>
  );
}
