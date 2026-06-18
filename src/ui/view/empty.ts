import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Empty from "../../../registry/shadcn/ui/empty";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Empty"]),

      Empty.view<UiMessage>({
        title: "No projects yet",
        description: "Create a project to start collecting registry slices.",
        icon: "+",
      }),
    ]
  );
});
