"use client";

import { AnimatedTabs } from "@/components/ui/animated-tabs";
import type { Comparison } from "@/lib/cost-demo";

const ranges = [
  { title: "MoM", value: "MoM" },
  { title: "YoY", value: "YoY" },
  { title: "YTD", value: "YTD" },
] as const;

export function PeriodTabs({ value, onChange }: { value: Comparison; onChange: (value: Comparison) => void }) {
  return <AnimatedTabs tabs={ranges} value={value} onValueChange={onChange} label="Perbandingan periode" />;
}
