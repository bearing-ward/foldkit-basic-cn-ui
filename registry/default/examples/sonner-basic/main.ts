import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Sonner from "../../ui/sonner";

// MODEL

export const Model = S.Struct({
  visible: S.Boolean,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShowToast = m("ClickedShowToast");
export const ClickedDismissToast = m("ClickedDismissToast");
export const Message = S.Union([ClickedShowToast, ClickedDismissToast]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ visible: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShowToast: () => [evo(model, { visible: () => true }), []],
      ClickedDismissToast: () => [evo(model, { visible: () => false }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("min-h-40")],
    [
      h.button(
        [
          h.Type("button"),
          h.OnClick(ClickedShowToast()),
          h.Class(
            "rounded-md bg-gray-950 px-4 py-2 text-sm font-medium text-white"
          ),
        ],
        ["Show toast"]
      ),
      Sonner.viewportView<Message>({
        children: model.visible
          ? [
              Sonner.toastView<Message>({
                title: "Event has been created",
                description: "Sunday, December 03, 2023 at 9:00 AM",
                onClose: ClickedDismissToast(),
              }),
            ]
          : [],
      }),
    ]
  );
});
