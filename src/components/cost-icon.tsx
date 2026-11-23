"use client";

import { useEffect, useRef } from "react";

let registration: Promise<unknown> | undefined;

export function CostIcon() {
  const host = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    registration ??= import("@lordicon/element")
      .then(({ defineElement }) => defineElement({ motion: "auto" }))
      .catch(() => { registration = undefined; });

    const icon = document.createElement("lord-icon");
    icon.setAttribute("src", "/lordicon-coins.json");
    icon.setAttribute("trigger", "hover");
    icon.setAttribute("colors", "primary:#705080,secondary:#347c88");
    icon.setAttribute("stroke", "regular");
    host.current?.appendChild(icon);
    return () => icon.remove();
  }, []);

  return <span ref={host} className="lordicon-host cost-icon" aria-hidden="true" />;
}
