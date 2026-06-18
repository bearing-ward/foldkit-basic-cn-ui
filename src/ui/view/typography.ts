import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Typography from "../../../registry/shadcn/ui/typography";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Typography"]),

      h.div(
        [h.Class("max-w-2xl space-y-4")],
        [
          Typography.h1<UiMessage>("Component registry"),
          Typography.p<UiMessage>(
            "Typography helpers keep example prose consistent."
          ),
          Typography.inlineCode<UiMessage>("className"),
        ]
      ),
    ]
  );
});
