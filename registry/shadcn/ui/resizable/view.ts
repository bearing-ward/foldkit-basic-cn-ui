export const resizablePanelGroupClassName =
  "flex h-full w-full overflow-hidden rounded-lg border border-gray-200 bg-white";

export const resizablePanelGroupDirectionClassName = (
  direction: "horizontal" | "vertical"
): string => (direction === "vertical" ? "flex-col" : "flex-row");

export const resizablePanelClassName =
  "flex items-center justify-center p-6 text-sm font-medium text-gray-950";

export const resizableHandleClassName =
  "relative flex shrink-0 items-center justify-center bg-transparent outline-none after:absolute after:bg-gray-400 focus-visible:ring-2 focus-visible:ring-accent-500 data-[direction=horizontal]:w-3 data-[direction=horizontal]:cursor-col-resize data-[direction=horizontal]:after:h-4 data-[direction=horizontal]:after:w-px data-[direction=vertical]:h-3 data-[direction=vertical]:cursor-row-resize data-[direction=vertical]:after:h-px data-[direction=vertical]:after:w-4";
