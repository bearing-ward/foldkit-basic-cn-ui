export const triggerClasses =
  "inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-normal text-gray-900 transition hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:cursor-not-allowed disabled:opacity-50";

export const rootClasses = "relative inline-block";

export const defaultItemsClasses =
  "absolute z-10 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg outline-none";

export const animatedItemsClasses =
  "absolute z-10 mt-1 w-48 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg outline-none transition duration-150 ease-out data-[closed]:scale-95 data-[closed]:opacity-0";

export const itemClasses =
  "px-3 py-2 text-base text-gray-700 cursor-pointer data-[active]:bg-gray-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export const backdropClasses = "fixed inset-0 z-0";

export const defaultAnchor = {
  placement: "bottom-start" as const,
  gap: 4,
  padding: 8,
};
