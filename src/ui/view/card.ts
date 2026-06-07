import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Card from "../../../registry/default/ui/card";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Card"]),

      Card.view<UiMessage>([
        Card.headerView<UiMessage>([
          Card.titleView<UiMessage>("Project health"),
          Card.descriptionView<UiMessage>("Static shadcn-style card regions."),
        ]),
        Card.contentView<UiMessage>([
          h.p(
            [h.Class("text-sm text-gray-700")],
            ["Cards compose app-owned content into a consistent shell."]
          ),
        ]),
        Card.footerView<UiMessage>([
          h.span([h.Class("text-sm text-gray-600")], ["Ready"]),
        ]),
      ]),
    ]
  );
});
