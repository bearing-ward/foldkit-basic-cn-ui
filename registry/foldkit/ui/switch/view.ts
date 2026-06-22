import clsx from "clsx";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const switchRowClasses = "flex items-center gap-3";

export const switchButtonClasses =
  "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-gray-300 transition-colors data-[checked]:bg-accent-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export const switchLabelClasses =
  "text-sm font-medium leading-5 text-gray-900";

export const switchDescriptionClasses = "text-sm leading-5 text-gray-500";

export const switchTextClasses = "space-y-1";

export const switchKnob = (isChecked: boolean): Html => {
  const h = html();

  return h.span(
    [
      h.Class(
        clsx(
          "pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow transition-transform",
          isChecked ? "translate-x-6" : "translate-x-1"
        )
      ),
    ],
    []
  );
};
