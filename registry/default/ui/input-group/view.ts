export type InputGroupAddonAlign =
  | "InlineStart"
  | "InlineEnd"
  | "BlockStart"
  | "BlockEnd";

export const inputGroupClassName =
  "relative flex h-9 min-w-0 items-center rounded-md border border-gray-300 bg-white text-gray-950 shadow-sm transition focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-100";

export const inputGroupControlClassName =
  "min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 py-1 text-sm outline-none placeholder:text-gray-400 focus:ring-0";

export const inputGroupTextClassName =
  "flex items-center gap-2 text-sm text-gray-500";

export const inputGroupAddonClassNameByAlign = (
  align: InputGroupAddonAlign = "InlineStart"
): string => {
  if (align === "InlineEnd") {
    return "order-last flex items-center justify-center gap-1.5 pr-3 text-sm font-medium text-gray-500";
  }

  if (align === "BlockStart") {
    return "order-first flex w-full items-center justify-center gap-2 border-b border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500";
  }

  if (align === "BlockEnd") {
    return "order-last flex w-full items-center justify-center gap-2 border-t border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-500";
  }

  return "order-first flex items-center justify-center gap-1.5 pl-3 text-sm font-medium text-gray-500";
};
