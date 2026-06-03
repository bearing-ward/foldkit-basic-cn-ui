export const inputClassName =
  "w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-base text-gray-900 outline-none focus:ring-2 focus:ring-accent-500";

export const buttonClassName =
  "absolute inset-y-0 right-0 flex cursor-pointer items-center px-4 text-gray-400 transition-colors hover:text-gray-900";

export const itemsClassName =
  "w-(--button-width) overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg outline-none z-10";

export const itemClassName =
  "cursor-pointer px-3 py-2 text-base text-gray-700 data-[active]:bg-gray-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export const backdropClassName = "fixed inset-0 z-0";

export const wrapperClassName = "relative w-full max-w-72";

export const inputWrapperClassName = "relative";

export const selectedIconClassName =
  "h-4 w-4 shrink-0 text-gray-900 data-[selected=false]:invisible";

export const tagClassName =
  "inline-flex items-center gap-1 rounded-md bg-gray-200 px-2 py-0.5 text-sm text-gray-700";

export const emptyTagClassName = "py-0.5 text-sm text-gray-400";

export const defaultAnchor = {
  placement: "bottom-start" as const,
  gap: 8,
  padding: 8,
};
