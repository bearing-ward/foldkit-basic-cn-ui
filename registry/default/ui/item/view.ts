export const itemClassName =
  "group/item flex w-full items-start gap-4 rounded-lg p-4 text-left transition-colors";
export const itemVariantClassNames = {
  default: "bg-transparent",
  outline: "border border-gray-200 bg-white shadow-sm",
  muted: "bg-gray-100/80",
} as const;
export const itemSizeClassNames = {
  default: "min-h-20",
  sm: "min-h-16 p-3",
  xs: "min-h-12 gap-3 p-2.5 text-sm",
} as const;
export const itemGroupClassName =
  "grid overflow-hidden rounded-lg border border-gray-200 bg-white";
export const itemSeparatorClassName = "h-px bg-gray-200";
export const itemHeaderClassName = "mb-2 text-sm font-medium text-gray-500";
export const itemMediaClassName =
  "flex shrink-0 items-center justify-center overflow-hidden rounded-md";
export const itemMediaVariantClassNames = {
  default: "size-10 bg-gray-100 text-gray-700",
  icon: "size-10 border border-gray-200 bg-white text-gray-700",
  avatar: "size-10 rounded-full bg-accent-100 font-medium text-accent-700",
  image: "size-14 rounded-md bg-gray-100 object-cover",
} as const;
export const itemContentClassName = "min-w-0 flex-1 space-y-1";
export const itemTitleClassName = "font-medium leading-none text-gray-950";
export const itemDescriptionClassName = "text-sm leading-5 text-gray-600";
export const itemActionsClassName = "ml-auto flex shrink-0 items-center gap-2";
export const itemFooterClassName = "mt-3 text-xs text-gray-500";
export const itemButtonClassName =
  "inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-950 shadow-sm transition hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";
