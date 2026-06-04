import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Badge from "../../../registry/default/ui/badge";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Badge"]),

      h.h3(
        [h.Class("mb-4 mt-8 text-lg font-semibold text-gray-900")],
        ["Variants"]
      ),
      h.div(
        [h.Class("flex flex-wrap items-center gap-2")],
        [
          Badge.view<UiMessage>({ label: "Default" }),
          Badge.view<UiMessage>({ label: "Secondary", variant: "Secondary" }),
          Badge.view<UiMessage>({
            label: "Destructive",
            variant: "Destructive",
          }),
          Badge.view<UiMessage>({ label: "Outline", variant: "Outline" }),
        ]
      ),
    ]
  );
});
