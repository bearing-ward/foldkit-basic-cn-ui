import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Toggle from "../../../registry/foldkit/ui/toggle";
import { ClickedToggleFavoriteDemo } from "../message";
import type { UiMessage } from "../message";
import type { UiModel } from "../model";

const heartIcon = (pressed: boolean): Html => {
  const h = html<UiMessage>();

  return h.span([h.Class(Toggle.toggleIconClassName)], [pressed ? "♥" : "♡"]);
};

export const view = Submodel.defineView<UiModel, UiMessage>((model): Html => {
  const h = html<UiMessage>();

  return h.div(
    [],
    [
      h.h2([h.Class("mb-6 text-2xl font-bold text-gray-900")], ["Toggle"]),

      h.div(
        [h.Class("flex items-center gap-3")],
        [
          Toggle.view<UiMessage>({
            pressed: model.toggleFavoriteDemoPressed,
            ariaLabel: "Favorite",
            value: "favorite",
            onPressedChange: ClickedToggleFavoriteDemo(),
            children: [heartIcon(model.toggleFavoriteDemoPressed)],
          }),
          h.p(
            [h.Class("text-sm text-gray-700")],
            [
              model.toggleFavoriteDemoPressed
                ? "Added to favorites"
                : "Not favorited",
            ]
          ),
        ]
      ),
    ]
  );
});
