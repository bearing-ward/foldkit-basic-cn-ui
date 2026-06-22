export type CarouselOrientation = "horizontal" | "vertical";

export const carouselClasses = "relative w-full";

export const carouselViewportClasses = "overflow-hidden rounded-xl";

export const carouselContentClasses =
  "flex transition-transform duration-300 ease-out";

export const carouselVerticalContentClasses =
  "flex flex-col transition-transform duration-300 ease-out";

export const carouselItemClasses = "min-w-0 shrink-0 grow-0 basis-full";

export const carouselCardClasses =
  "flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-4xl font-semibold text-gray-400";

export const carouselButtonClasses =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:pointer-events-none disabled:opacity-50";

export const carouselPreviousClasses =
  "absolute left-2 top-1/2 -translate-y-1/2";

export const carouselNextClasses =
  "absolute right-2 top-1/2 -translate-y-1/2";

export const carouselStatusClasses = "text-sm text-gray-600";
