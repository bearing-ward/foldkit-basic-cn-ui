import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Kbd from "../../ui/kbd";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedAccept = m("ClickedAccept");
export const Message = S.Union([ClickedAccept]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedAccept: () => [model, []],
    })
  );

// VIEW

const demoRowClasses = "flex flex-wrap items-center gap-2";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-5")],
    [
      h.div(
        [h.Class(demoRowClasses)],
        [
          Kbd.view<Message>({ label: "⌘" }),
          Kbd.view<Message>({ label: "⇧" }),
          Kbd.view<Message>({ label: "⌥" }),
          Kbd.view<Message>({ label: "⌃" }),
          Kbd.view<Message>({ label: "`" }),
          Kbd.groupView<Message>([
            Kbd.view<Message>({ label: "Ctrl" }),
            h.span([h.Class("text-sm text-gray-500")], ["+"]),
            Kbd.view<Message>({ label: "B" }),
          ]),
        ]
      ),
      h.div(
        [h.Class(demoRowClasses)],
        [
          h.span([h.Class("text-sm text-gray-700")], ["Use"]),
          Kbd.groupView<Message>([
            Kbd.view<Message>({ label: "Ctrl" }),
            h.span([h.Class("text-sm text-gray-500")], ["+"]),
            Kbd.view<Message>({ label: "B" }),
          ]),
          Kbd.groupView<Message>([
            Kbd.view<Message>({ label: "Ctrl" }),
            h.span([h.Class("text-sm text-gray-500")], ["+"]),
            Kbd.view<Message>({ label: "K" }),
          ]),
          h.span([h.Class("text-sm text-gray-700")], [
            "to open the command palette",
          ]),
        ]
      ),
      h.button(
        [
          h.Type("button"),
          h.OnClick(ClickedAccept()),
          h.Class(
            "inline-flex h-9 items-center gap-2 rounded-md bg-gray-950 px-4 text-sm font-medium text-white shadow-sm transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2"
          ),
        ],
        ["Accept", Kbd.view<Message>({ label: "⏎", size: "Small" })]
      ),
      h.div(
        [h.Class(demoRowClasses)],
        [
          h.button(
            [
              h.Type("button"),
              h.Class(
                "inline-flex h-9 items-center rounded-l-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-950 shadow-sm"
              ),
            ],
            ["Save"]
          ),
          h.button(
            [
              h.Type("button"),
              h.Class(
                "-ml-px inline-flex h-9 items-center gap-2 rounded-r-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-950 shadow-sm"
              ),
            ],
            ["Print", Kbd.view<Message>({ label: "⌘", size: "Small" })]
          ),
        ]
      ),
    ]
  );
});
