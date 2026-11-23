"use client";

import { useId, type ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutGroup, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type AnimatedTab<Value extends string> = {
  title: ReactNode;
  value: Value;
  disabled?: boolean;
};

type AnimatedTabsProps<Value extends string> = {
  tabs: readonly AnimatedTab<Value>[];
  value: Value;
  onValueChange: (value: Value) => void;
  label: string;
  className?: string;
};

// Aceternity Tabs' shared-layout highlight, adapted for operational controls.
// Source: https://ui.aceternity.com/components/tabs
// Base UI keeps stable tab order, roving focus, and Arrow/Home/End navigation.
export function AnimatedTabs<Value extends string>({ tabs, value, onValueChange, label, className }: AnimatedTabsProps<Value>) {
  const id = useId();
  const reducedMotion = useReducedMotion();

  return (
    <LayoutGroup id={id}>
      <Tabs
        value={value}
        onValueChange={(next) => {
          const selected = tabs.find((tab) => tab.value === next && !tab.disabled);
          if (selected) onValueChange(selected.value);
        }}
        className={cn("aceternity-tabs", className)}
        data-slot="animated-tabs"
      >
        <TabsList activateOnFocus className="aceternity-tabs-list" aria-label={label}>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} disabled={tab.disabled} className="aceternity-tab">
              {value === tab.value && (
                <motion.span
                  aria-hidden="true"
                  layoutId="active-tab"
                  className="aceternity-tabs-indicator"
                  transition={reducedMotion ? { duration: 0 } : { type: "spring", bounce: 0.12, duration: 0.3 }}
                />
              )}
              <span className="period-tab-label">{tab.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </LayoutGroup>
  );
}
