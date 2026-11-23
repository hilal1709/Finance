import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The caller supplies table-wrap when horizontal scrolling is needed.
function Table({ className, ...props }: ComponentProps<"table">) {
  return <table data-slot="table" className={cn("w-full border-collapse caption-bottom text-sm", className)} {...props} />;
}

function TableHeader({ className, ...props }: ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={cn("[&_tr]:border-b [&_tr]:border-border", className)} {...props} />;
}

function TableBody({ className, ...props }: ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn("[&_tr:last-child]:border-0", className)} {...props} />;
}

function TableFooter({ className, ...props }: ComponentProps<"tfoot">) {
  return <tfoot data-slot="table-footer" className={cn("border-t border-border bg-muted/50 font-medium [&>tr:last-child]:border-b-0", className)} {...props} />;
}

function TableRow({ className, ...props }: ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn("border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted motion-reduce:transition-none", className)} {...props} />;
}

function TableHead({ className, ...props }: ComponentProps<"th">) {
  return <th data-slot="table-head" className={cn("px-2 py-2 text-left align-middle font-medium text-muted-foreground", className)} {...props} />;
}

function TableCell({ className, ...props }: ComponentProps<"td">) {
  return <td data-slot="table-cell" className={cn("p-2 align-middle", className)} {...props} />;
}

function TableCaption({ className, ...props }: ComponentProps<"caption">) {
  return <caption data-slot="table-caption" className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />;
}

export { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption };
