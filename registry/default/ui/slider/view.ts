import type { Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const fieldClassName = "flex w-full min-w-64 max-w-sm flex-col gap-2";

export const headerClassName =
  "flex items-center justify-between text-sm text-gray-900";

export const labelClassName = "cursor-pointer select-none font-medium";

export const valueClassName = "tabular-nums text-gray-600";

export const rootClassName =
  "relative flex h-6 w-full touch-none select-none items-center";

export const trackClassName = "h-1.5 w-full rounded-full bg-gray-200";

export const filledTrackClassName = "h-full rounded-full bg-accent-600";

export const thumbClassName =
  "h-5 w-5 cursor-grab rounded-full border-2 border-accent-600 bg-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600 focus-visible:ring-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60 data-[dragging]:cursor-grabbing";

export type SliderFieldViewInput = Readonly<{
  attributes: Ui.Slider.SliderAttributes;
  label: string;
  valueText: string;
}>;

export const sliderFieldView = ({
  attributes,
  label,
  valueText,
}: SliderFieldViewInput): Html => {
  const h = html<Ui.Slider.Message>();

  return h.div(
    [h.Class(fieldClassName)],
    [
      h.div(
        [h.Class(headerClassName)],
        [
          h.label([...attributes.label, h.Class(labelClassName)], [label]),
          h.span([h.Class(valueClassName)], [valueText]),
        ]
      ),
      h.div(
        [...attributes.root, h.Class(rootClassName)],
        [
          h.div(
            [...attributes.track, h.Class(trackClassName)],
            [
              h.div(
                [...attributes.filledTrack, h.Class(filledTrackClassName)],
                []
              ),
            ]
          ),
          h.div([...attributes.thumb, h.Class(thumbClassName)], []),
          h.input(attributes.hiddenInput),
        ]
      ),
    ]
  );
};
