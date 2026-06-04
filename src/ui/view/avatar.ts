import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Avatar from "../../../registry/default/ui/avatar";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

const adaImageSrc =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%234f46e5'/%3E%3Ctext x='40' y='48' text-anchor='middle' font-size='24' font-family='Arial' fill='white'%3EAL%3C/text%3E%3C/svg%3E";

export const view = Submodel.defineView<UiModel, UiMessage>((): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Avatar"]),

      h.h3(
        [h.Class("mb-4 mt-8 text-lg font-semibold text-gray-900")],
        ["Basic"]
      ),
      h.div(
        [h.Class("flex flex-wrap items-center gap-3")],
        [
          Avatar.view<UiMessage>({
            alt: "Ada Lovelace",
            fallback: "AL",
            src: adaImageSrc,
          }),
          Avatar.view<UiMessage>({ fallback: "GH" }),
          Avatar.view<UiMessage>({ fallback: "HT", size: "Large" }),
        ]
      ),

      h.h3(
        [h.Class("mb-4 mt-8 text-lg font-semibold text-gray-900")],
        ["Group"]
      ),
      Avatar.groupView<UiMessage>([
        Avatar.view<UiMessage>({
          alt: "Ada Lovelace",
          fallback: "AL",
          src: adaImageSrc,
        }),
        Avatar.view<UiMessage>({ fallback: "GH" }),
        Avatar.view<UiMessage>({ fallback: "HT" }),
        Avatar.countView<UiMessage>({ count: 4 }),
      ]),
    ]
  );
});
