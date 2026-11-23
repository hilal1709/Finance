import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { AceternitySurface } from "@/components/ui/aceternity-surface";

// Adapted from shadcn/ui base-nova; callers own spacing and layout.
function Card({ className, as: Component = "div", ...props }: ComponentProps<"div"> & { as?: "article" | "section" | "div" }) {
  return <AceternitySurface as={Component} data-slot="card" className={cn("group/card min-w-0 rounded-xl border border-border bg-card text-card-foreground", className)} {...props} />;
}

function CardHeader({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("group/card-header", className)} {...props} />;
}

function CardTitle({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("text-base leading-snug font-medium", className)} {...props} />;
}

function CardDescription({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function CardAction({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-action" className={cn(className)} {...props} />;
}

function CardContent({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn(className)} {...props} />;
}

function CardFooter({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="card-footer" className={cn(className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter };
