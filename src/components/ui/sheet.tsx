"use client";

import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function Sheet(props: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root {...props} />;
}

function SheetClose(props: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetContent({ className, children, side = "right", showCloseButton = false, ...props }: SheetPrimitive.Popup.Props & { side?: "left" | "right"; showCloseButton?: boolean }) {
  return (
    <SheetPrimitive.Portal>
      <SheetPrimitive.Backdrop data-slot="sheet-overlay" className="mobile-overlay" />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={(state) => cn(
          "fixed inset-y-0 z-30 w-72 max-w-[calc(100%_-_2rem)] bg-popover text-popover-foreground outline-none",
          side === "left" ? "left-0" : "right-0",
          typeof className === "function" ? className(state) : className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetClose render={<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3" />} aria-label="Tutup">
            <Icon name="close" />
          </SheetClose>
        )}
      </SheetPrimitive.Popup>
    </SheetPrimitive.Portal>
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return <SheetPrimitive.Title data-slot="sheet-title" className={(state) => cn("text-base font-medium", typeof className === "function" ? className(state) : className)} {...props} />;
}

function SheetDescription({ className, ...props }: SheetPrimitive.Description.Props) {
  return <SheetPrimitive.Description data-slot="sheet-description" className={(state) => cn("text-sm text-muted-foreground", typeof className === "function" ? className(state) : className)} {...props} />;
}

export { Sheet, SheetContent, SheetTitle, SheetDescription, SheetClose };
