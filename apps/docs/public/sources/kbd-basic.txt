import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Kbd from "../../ui/kbd";

// MODEL

export const KbdMode = S.Union([S.Literal("Mac"), S.Literal("Windows")]);

export const Model = S.Struct({
  mode: KbdMode,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleKbdExample = m("ClickedToggleKbdExample");

export const Message = S.Union([ClickedToggleKbdExample]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ mode: "Mac" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleKbdExample: () => [
        evo(model, {
          mode: (mode) => (mode === "Mac" ? "Windows" : "Mac"),
        }),
        [],
      ],
    })
  );

// VIEW

const buttonClassName =
  "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-4")],
    [
      h.div(
        [h.Class("space-y-4")],
        [
          h.div(
            [h.Class("flex items-center gap-3")],
            [
              h.span([h.Class("text-sm text-gray-600")], ["Command menu"]),
              Kbd.groupView<Message>([
                Kbd.view<Message>({
                  label: model.mode === "Mac" ? "Cmd" : "Ctrl",
                }),
                h.span([h.Class("text-sm text-gray-400")], ["+"]),
                Kbd.view<Message>({ label: "K" }),
              ]),
            ]
          ),
          h.div(
            [h.Class("flex items-center gap-3")],
            [
              h.span([h.Class("text-sm text-gray-600")], ["Dismiss"]),
              Kbd.view<Message>({ label: "Esc", size: "Small" }),
            ]
          ),
          h.button(
            [h.OnClick(ClickedToggleKbdExample()), h.Class(buttonClassName)],
            ["Switch platform"]
          ),
        ]
      ),
    ]
  );
});
