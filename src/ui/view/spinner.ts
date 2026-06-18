import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Spinner from "../../../registry/shadcn/ui/spinner";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Spinner"]),

      h.div(
        [h.Class("flex items-center gap-3 text-sm text-gray-700")],
        [Spinner.view<UiMessage>(), h.span([], ["Loading"])]
      ),
    ]
  );
});
