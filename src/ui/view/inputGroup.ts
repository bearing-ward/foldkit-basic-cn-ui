import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as InputGroup from "../../../registry/shadcn/ui/input-group";
import * as Kbd from "../../../registry/shadcn/ui/kbd";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Input Group"]),

      InputGroup.view<UiMessage>({
        classes: "max-w-xs",
        children: [
          InputGroup.addonView<UiMessage>({
            align: "InlineStart",
            children: [
              h.span([h.AriaHidden(true), h.Class("text-gray-400")], ["⌕"]),
            ],
          }),
          InputGroup.inputView<UiMessage>({
            ariaLabel: "Search",
            placeholder: "Search...",
          }),
          InputGroup.addonView<UiMessage>({
            align: "InlineEnd",
            children: [
              Kbd.view<UiMessage>({ label: "⌘", size: "Small" }),
              Kbd.view<UiMessage>({ label: "K", size: "Small" }),
            ],
          }),
        ],
      }),
    ]
  );
});
