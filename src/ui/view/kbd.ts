import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Kbd from "../../../registry/shadcn/ui/kbd";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Kbd"]),

      Kbd.groupView<UiMessage>([
        Kbd.view<UiMessage>({ label: "Cmd" }),
        h.span([h.Class("text-sm text-gray-400")], ["+"]),
        Kbd.view<UiMessage>({ label: "K" }),
      ]),
    ]
  );
});
