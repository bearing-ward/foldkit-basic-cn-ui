export type ButtonGroupOrientation = "horizontal" | "vertical";

export const buttonGroupClassName =
  "flex w-fit items-stretch [&>*]:focus-visible:relative [&>*]:focus-visible:z-10";

export const buttonGroupClassNameByOrientation = (
  orientation: ButtonGroupOrientation = "horizontal"
): string => {
  if (orientation === "vertical") {
    return "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none";
  }

  return "flex-row has-[>[data-slot=button-group]]:gap-2 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>input]:flex-1";
};

export const buttonGroupItemClassName =
  "relative z-0 flex min-w-0 items-stretch rounded-md border border-gray-300 shadow-xs focus-within:z-10";

export const buttonGroupSeparatorClassName =
  "relative !m-0 shrink-0 self-stretch bg-gray-300 data-[orientation=horizontal]:h-auto data-[orientation=horizontal]:w-px data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-px";

export const buttonGroupTextClassName =
  "flex items-center gap-2 rounded-md border border-gray-300 bg-gray-50 px-4 text-sm font-medium text-gray-900 shadow-xs";
