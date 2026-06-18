import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Toggle from "../../ui/base-ui-toggle";

// MODEL

const PressedState = S.Union([S.Literal("Pressed"), S.Literal("Unpressed")]);
type PressedState = typeof PressedState.Type;

export const Model = S.Struct({
  favorite: PressedState,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleFavorite = m("ClickedToggleFavorite");
export const Message = S.Union([ClickedToggleFavorite]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ favorite: "Unpressed" }, []];

// UPDATE

const nextPressedState = (state: PressedState): PressedState =>
  state === "Pressed" ? "Unpressed" : "Pressed";

const isPressed = (state: PressedState): boolean => state === "Pressed";

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleFavorite: () => [
        evo(model, { favorite: nextPressedState }),
        [],
      ],
    })
  );

// VIEW

const heartIcon = (pressed: boolean): Html => {
  const h = html<Message>();

  return h.span([h.Class(Toggle.toggleIconClassName)], [pressed ? "♥" : "♡"]);
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const pressed = isPressed(model.favorite);

  return h.div(
    [h.Class("rounded-lg border border-gray-200 p-4")],
    [
      Toggle.view<Message>({
        pressed,
        ariaLabel: "Favorite",
        value: "favorite",
        onPressedChange: ClickedToggleFavorite(),
        children: [heartIcon(pressed)],
      }),
    ]
  );
});
