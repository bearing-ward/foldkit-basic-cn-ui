import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Skeleton from "../../../registry/shadcn/ui/skeleton";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Skeleton"]),

      h.div(
        [h.Class("w-full max-w-sm space-y-4")],
        [
          h.div(
            [h.Class("flex items-center gap-3")],
            [
              Skeleton.view<UiMessage>({ shape: "Avatar" }),
              h.div(
                [h.Class("space-y-2")],
                [
                  Skeleton.view<UiMessage>({
                    shape: "Text",
                    className: "w-32",
                  }),
                  Skeleton.view<UiMessage>({
                    shape: "Text",
                    className: "w-48",
                  }),
                ]
              ),
            ]
          ),
          Skeleton.view<UiMessage>({ shape: "Block" }),
        ]
      ),
    ]
  );
});
