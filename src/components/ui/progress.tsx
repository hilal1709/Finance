"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "@/lib/utils";

type ProgressProps = ProgressPrimitive.Root.Props & { indicatorClassName?: string };

function Progress({ className, indicatorClassName, children, value, max = 100, ...props }: ProgressProps) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      value={value}
      max={max}
      className={(state) => cn("relative h-1 w-full overflow-hidden rounded-full bg-muted", typeof className === "function" ? className(state) : className)}
      {...props}
    >
      {children}
      <ProgressPrimitive.Track data-slot="progress-track" className="h-full w-full">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn("h-full bg-primary transition-[width] data-indeterminate:w-full motion-reduce:transition-none", indicatorClassName)}
        />
      </ProgressPrimitive.Track>
    </ProgressPrimitive.Root>
  );
}

export { Progress };
export type { ProgressProps };
