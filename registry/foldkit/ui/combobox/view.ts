import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const inputClasses =
  "w-full rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-base text-gray-900 outline-none focus:ring-2 focus:ring-accent-500";

export const buttonClasses =
  "absolute inset-y-0 right-0 flex cursor-pointer items-center px-4 text-gray-400 transition-colors hover:text-gray-900";

export const itemsClasses =
  "w-(--button-width) overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg outline-none z-10";

export const itemClasses =
  "cursor-pointer px-3 py-2 text-base text-gray-700 data-[active]:bg-gray-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export const backdropClasses = "fixed inset-0 z-0";

export const wrapperClasses = "relative w-full max-w-72";

export const inputWrapperClasses = "relative";

export const selectedIconClasses =
  "invisible h-4 w-4 shrink-0 text-gray-900 data-[selected=true]:visible";

export const tagClasses =
  "inline-flex items-center gap-1 rounded-md bg-gray-200 px-2 py-0.5 text-sm text-gray-700";

export const emptyTagClasses = "py-0.5 text-sm text-gray-400";

export const defaultAnchor = {
  placement: "bottom-start" as const,
  gap: 8,
  padding: 8,
};

export const selectedIcon = (isSelected: boolean): Html => {
  const h = html();

  return h.svg(
    [
      h.AriaHidden(true),
      h.Class(selectedIconClasses),
      h.DataAttribute("selected", String(isSelected)),
      h.Xmlns("http://www.w3.org/2000/svg"),
      h.Fill("none"),
      h.ViewBox("0 0 24 24"),
      h.StrokeWidth("2"),
      h.Stroke("currentColor"),
    ],
    [
      h.path(
        [
          h.StrokeLinecap("round"),
          h.StrokeLinejoin("round"),
          h.D("M4.5 12.75l6 6 9-13.5"),
        ],
        []
      ),
    ]
  );
};
