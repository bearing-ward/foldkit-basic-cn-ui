import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Progress from "../../../registry/default/ui/progress";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Progress"]),

      Progress.view<UiMessage>({
        value: 20,
        label: "Export data",
        id: "ui-progress-export-data-label",
      }),
    ]
  );
});
