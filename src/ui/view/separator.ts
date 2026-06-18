import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Separator from "../../../registry/base-ui/ui/separator";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Separator"]),

      h.div(
        [h.Class("space-y-4")],
        [
          h.p([h.Class("text-sm font-medium text-gray-950")], ["Horizontal"]),
          Separator.view<UiMessage>(),
          h.div(
            [h.Class("flex h-8 items-center gap-4 text-sm text-gray-700")],
            [
              h.span([], ["Preview"]),
              Separator.view<UiMessage>({ orientation: "vertical" }),
              h.span([], ["Code"]),
            ]
          ),
        ]
      ),
    ]
  );
});
