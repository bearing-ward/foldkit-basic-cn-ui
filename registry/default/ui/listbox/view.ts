export const rootClassName = "relative inline-block";

export const triggerClassName =
  "inline-flex min-w-56 cursor-pointer select-none items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-normal text-gray-900 transition hover:bg-gray-100";

export const defaultItemsClassName =
  "absolute z-10 mt-1 max-h-64 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg outline-none";

export const animatedItemsClassName =
  "absolute z-10 mt-1 max-h-64 w-64 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg outline-none transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0";

export const itemClassName =
  "group flex cursor-pointer items-center gap-2 px-3 py-2 text-base text-gray-700 data-[active]:bg-gray-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export const selectedIconClassName =
  "h-4 w-4 shrink-0 text-gray-900 opacity-0 group-data-[selected]:opacity-100";

export const backdropClassName = "fixed inset-0 z-0";

export const defaultAnchor = {
  placement: "bottom-start" as const,
  gap: 4,
  padding: 8,
};
