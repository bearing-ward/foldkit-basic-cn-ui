import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const animationTriggerClassName =
  "inline-flex cursor-pointer select-none items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const animationContentClassName =
  "rounded-lg border border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-900 transition duration-200 ease-out data-[closed]:-translate-y-2 data-[closed]:scale-95 data-[closed]:opacity-0";

export type AnimationPanelInput = Readonly<{
  body: string;
}>;

export const animationPanel = ({ body }: AnimationPanelInput): Html => {
  const h = html();

  return h.p([], [body]);
};
