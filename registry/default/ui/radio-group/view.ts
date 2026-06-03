import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const verticalGroupClassName = "flex w-full flex-col gap-3";

export const horizontalGroupClassName =
  "flex w-full flex-col gap-3 sm:flex-row";

export const verticalOptionClassName =
  "relative flex cursor-pointer rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 data-[checked]:border-accent-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2";

export const horizontalOptionClassName =
  "relative flex flex-1 cursor-pointer rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50 data-[checked]:border-accent-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2";

export const labelClassName = "text-sm font-medium text-gray-900";

export const descriptionClassName = "text-sm text-gray-600";

export const metaClassName = "text-sm font-semibold text-accent-600";

export const checkIcon = (): Html => {
  const h = html();

  return h.svg(
    [h.ViewBox("0 0 24 24"), h.Fill("none"), h.Class("size-5 text-accent-600")],
    [
      h.path(
        [
          h.D("M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),
          h.Stroke("currentColor"),
          h.StrokeWidth("1.5"),
          h.StrokeLinecap("round"),
          h.StrokeLinejoin("round"),
        ],
        []
      ),
    ]
  );
};

export const checkPlaceholder = (): Html => {
  const h = html();

  return h.div([h.Class("size-5")], []);
};
