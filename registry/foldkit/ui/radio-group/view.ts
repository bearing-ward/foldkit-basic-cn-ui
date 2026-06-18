import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const verticalGroupClassName = "flex w-full flex-col gap-2";

export const horizontalGroupClassName =
  "flex w-full flex-col gap-2 sm:flex-row sm:gap-4";

export const verticalOptionClassName =
  "flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-950 transition-colors data-[checked]:border-gray-950 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2";

export const horizontalOptionClassName =
  "flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-950 transition-colors data-[checked]:border-gray-950 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2";

export const labelClassName = "text-sm leading-5 text-gray-950";

export const descriptionClassName = "text-sm text-gray-600";

export const metaClassName = "text-sm font-semibold text-accent-600";

export const checkIcon = (): Html => {
  const h = html();

  return h.span([h.Class("size-2 rounded-full bg-current")], []);
};

export const checkPlaceholder = (): Html => {
  const h = html();

  return h.span([h.Class("size-2")], []);
};
