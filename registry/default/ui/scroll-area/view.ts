export const scrollAreaRootClassName =
  "relative h-48 w-80 max-w-full overflow-hidden rounded-lg border border-gray-200 bg-white";

export const scrollAreaViewportClassName =
  "h-full w-full overflow-auto overscroll-contain p-4 [scrollbar-color:rgb(156_163_175)_transparent] [scrollbar-width:thin]";

export const scrollAreaContentClassName =
  "space-y-3 text-sm leading-6 text-gray-700";

export const scrollAreaScrollbarClassName =
  "pointer-events-none absolute inset-y-1 right-1 w-1.5 rounded-full bg-gray-100";

export const scrollAreaThumbClassName = "min-h-8 rounded-full bg-gray-400";

export const scrollAreaCornerClassName =
  "pointer-events-none absolute bottom-0 right-0 h-2 w-2 bg-white";

export const scrollAreaFadeClassName =
  "scroll-area-fade [mask-image:linear-gradient(to_bottom,transparent_0,black_min(40px,var(--scroll-area-overflow-y-start,0px)),black_calc(100%_-_min(40px,var(--scroll-area-overflow-y-end,40px))),transparent_100%)]";
