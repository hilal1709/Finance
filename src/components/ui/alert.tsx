import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const alertVariants = cva("group/alert relative w-full rounded-lg border border-border text-sm", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      destructive: "border-destructive/30 bg-card text-destructive [&_[data-slot=alert-description]]:text-destructive",
    },
  },
  defaultVariants: { variant: "default" },
});

function Alert({ className, variant = "default", role = "status", ...props }: ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return <div data-slot="alert" data-variant={variant} role={role} className={cn(alertVariants({ variant }), className)} {...props} />;
}

function AlertTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("font-medium [&_a]:underline [&_a]:underline-offset-3", className)} {...props} />;
}

function AlertDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("text-sm text-muted-foreground [&_a]:underline [&_a]:underline-offset-3", className)} {...props} />;
}

function AlertAction({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="alert-action" className={cn(className)} {...props} />;
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
