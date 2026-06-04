import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Badge from "../../ui/badge";

// MODEL

export const Status = S.Union([S.Literal("Draft"), S.Literal("Published")]);

export const Model = S.Struct({
  status: Status,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleStatus = m("ClickedToggleStatus");

export const Message = S.Union([ClickedToggleStatus]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ status: "Draft" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleStatus: () => [
        evo(model, {
          status: (status) => (status === "Draft" ? "Published" : "Draft"),
        }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-4")],
    [
      h.div(
        [h.Class("flex flex-wrap items-center gap-2")],
        [
          Badge.view<Message>({
            label: model.status,
            variant: model.status === "Published" ? "Default" : "Secondary",
          }),
          Badge.view<Message>({ label: "New", variant: "Outline" }),
          Badge.view<Message>({ label: "Blocked", variant: "Destructive" }),
        ]
      ),
      h.button(
        [
          h.OnClick(ClickedToggleStatus()),
          h.Class(
            "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
          ),
        ],
        ["Toggle status"]
      ),
    ]
  );
});
