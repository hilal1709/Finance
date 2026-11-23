"use client";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

// shadcn/ui base-nova Tabs primitives; animation is composed by AnimatedTabs.
export function Tabs(props: TabsPrimitive.Root.Props) {
  return <TabsPrimitive.Root data-slot="tabs" {...props} />;
}

export function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return <TabsPrimitive.List data-slot="tabs-list" className={(state) => cn("inline-flex items-center", typeof className === "function" ? className(state) : className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return <TabsPrimitive.Tab data-slot="tabs-trigger" className={(state) => cn("relative inline-flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", typeof className === "function" ? className(state) : className)} {...props} />;
}

export function TabsContent(props: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" {...props} />;
}
