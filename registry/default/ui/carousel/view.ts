export type CarouselOrientation = "horizontal" | "vertical";

export const carouselClassName = "relative w-full";

export const carouselViewportClassName = "overflow-hidden rounded-xl";

export const carouselContentClassName =
  "flex transition-transform duration-300 ease-out";

export const carouselVerticalContentClassName =
  "flex flex-col transition-transform duration-300 ease-out";

export const carouselItemClassName = "min-w-0 shrink-0 grow-0 basis-full";

export const carouselCardClassName =
  "flex aspect-square items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-4xl font-semibold text-gray-400";

export const carouselButtonClassName =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-white text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:pointer-events-none disabled:opacity-50";

export const carouselPreviousClassName =
  "absolute left-2 top-1/2 -translate-y-1/2";

export const carouselNextClassName =
  "absolute right-2 top-1/2 -translate-y-1/2";

export const carouselStatusClassName = "text-sm text-gray-600";
