import type { Ui } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

export const rootClassName = "max-w-md";

export const buttonClassName =
  "flex w-full cursor-pointer select-none items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left text-base font-normal text-gray-900 transition hover:bg-gray-100 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[open]:rounded-b-none";

export const panelClassName =
  "rounded-b-lg border-x border-b border-gray-300 px-4 py-3 text-sm text-gray-700";

export const buttonContentClassName =
  "flex w-full items-center justify-between gap-4";

export const chevronClassName =
  "text-sm text-gray-600 transition-transform group-data-[open]:rotate-180";

export type DisclosureViewInput = Readonly<{
  attributes: Ui.Disclosure.DisclosureAttributes;
  isOpen: boolean;
  title: string;
  body: string;
}>;

export const disclosureView = ({
  attributes,
  isOpen,
  title,
  body,
}: DisclosureViewInput): Html => {
  const h = html<Ui.Disclosure.Message>();

  return h.div(
    [h.Class(rootClassName)],
    [
      h.button(
        [
          ...attributes.button,
          h.AriaLabel(title),
          h.Class(`group ${buttonClassName}`),
        ],
        [
          h.span(
            [h.Class(buttonContentClassName)],
            [
              h.span([], [title]),
              h.span([h.AriaHidden(true), h.Class(chevronClassName)], ["v"]),
            ]
          ),
        ]
      ),
      isOpen
        ? h.div([...attributes.panel, h.Class(panelClassName)], [body])
        : h.empty,
    ]
  );
};
