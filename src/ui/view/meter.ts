import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Meter from "../../../registry/default/ui/meter";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Meter"]),

      Meter.view<UiMessage>({
        value: 24,
        label: "Storage Used",
        id: "ui-meter-storage-used-label",
      }),
    ]
  );
});
