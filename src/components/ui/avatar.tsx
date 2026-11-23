"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

function Avatar({ className, size = "default", ...props }: AvatarPrimitive.Root.Props & { size?: "default" | "sm" | "lg" }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={(state) => cn("group/avatar relative inline-flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=sm]:size-6 data-[size=lg]:size-10", typeof className === "function" ? className(state) : className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={(state) => cn("aspect-square size-full rounded-full object-cover", typeof className === "function" ? className(state) : className)} {...props} />;
}

function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) {
  return <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={(state) => cn("flex size-full items-center justify-center rounded-full bg-secondary text-sm text-primary group-data-[size=sm]/avatar:text-xs", typeof className === "function" ? className(state) : className)} {...props} />;
}

export { Avatar, AvatarImage, AvatarFallback };
