import type { ComponentProps } from "react";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

type NativeSelectProps = ComponentProps<"select"> & { wrapperClassName?: string };

function NativeSelect({ className, wrapperClassName, multiple, size, ...props }: NativeSelectProps) {
  const listbox = multiple || (size !== undefined && size > 1);

  return (
    <div data-slot="native-select-wrapper" className={cn("group/native-select relative inline-block min-w-0 has-[select:disabled]:opacity-50", wrapperClassName)}>
      <select
        data-slot="native-select"
        multiple={multiple}
        size={size}
        className={cn(
          "w-full min-w-0 rounded-lg border border-input bg-transparent py-1 pl-2.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 motion-reduce:transition-none",
          listbox ? "h-auto pr-2.5" : "h-8 appearance-none pr-8",
          className,
        )}
        {...props}
      />
      {!listbox && <Icon name="chevron-down" size={16} slot="native-select-icon" />}
    </div>
  );
}

function NativeSelectOption({ className, ...props }: ComponentProps<"option">) {
  return <option data-slot="native-select-option" className={cn("bg-[Canvas] text-[CanvasText]", className)} {...props} />;
}

function NativeSelectOptGroup({ className, ...props }: ComponentProps<"optgroup">) {
  return <optgroup data-slot="native-select-optgroup" className={cn("bg-[Canvas] text-[CanvasText]", className)} {...props} />;
}

export { NativeSelect, NativeSelectOption, NativeSelectOptGroup };
export type { NativeSelectProps };
