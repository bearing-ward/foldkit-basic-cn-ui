import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import type { AnchorConfig } from "foldkit/ui/tooltip";

import type { RenderInfo } from "./index";

export const tooltipTriggerClassName =
  "inline-flex cursor-pointer select-none items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50";

export const panelClassName =
  "rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white shadow-lg";

export const tooltipRootClassName = "relative inline-block";

export const tooltipAnchor: AnchorConfig = {
  placement: "top",
  gap: 6,
  padding: 8,
};

export type TooltipViewInput = Readonly<{
  render: RenderInfo;
  triggerLabel: string;
  panelText: string;
}>;

export const tooltipView = ({
  render,
  triggerLabel,
  panelText,
}: TooltipViewInput): Html => {
  const h = html();

  return h.div(
    [h.Class(tooltipRootClassName)],
    [
      h.button(
        [...render.trigger, h.Class(tooltipTriggerClassName)],
        [h.span([], [triggerLabel])]
      ),
      render.isVisible
        ? h.div(
            [...render.panel, h.Class(panelClassName)],
            [h.span([], [panelText])]
          )
        : h.empty,
    ]
  );
};
