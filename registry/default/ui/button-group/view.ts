export type ButtonGroupOrientation = "horizontal" | "vertical";

export const buttonGroupClassName =
  "inline-flex isolate items-stretch overflow-hidden rounded-lg border border-gray-300 bg-white shadow-sm";

export const buttonGroupClassNameByOrientation = (
  orientation: ButtonGroupOrientation = "horizontal"
): string => {
  if (orientation === "vertical") {
    return "flex-col divide-y divide-gray-200";
  }

  return "flex-row divide-x divide-gray-200";
};

export const buttonGroupItemClassName =
  "relative z-0 flex min-w-0 items-stretch focus-within:z-10";

export const buttonGroupSeparatorClassName =
  "shrink-0 self-stretch bg-gray-200 data-[orientation=horizontal]:h-auto data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-px data-[orientation=vertical]:w-auto";

export const buttonGroupTextClassName =
  "inline-flex items-center justify-center whitespace-nowrap bg-gray-50 px-3 text-sm font-medium text-gray-500";
