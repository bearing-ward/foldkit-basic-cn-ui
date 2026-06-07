import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as ScrollArea from "../../../registry/default/ui/scroll-area";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Scroll Area"]),
      ScrollArea.view<UiMessage>({
        ariaLabel: "Vernacular architecture excerpt",
        children: [
          h.p(
            [],
            [
              "Vernacular architecture is building done outside any academic tradition, and without professional guidance.",
            ]
          ),
          h.p(
            [],
            [
              "This type of architecture usually serves immediate, local needs and reflects local traditions.",
            ]
          ),
        ],
      }),
    ]
  );
});
