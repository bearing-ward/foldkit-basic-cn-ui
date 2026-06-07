import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Empty from "../../ui/empty";

// MODEL

export const EmptyMode = S.Union([S.Literal("Projects"), S.Literal("Search")]);

export const Model = S.Struct({
  mode: EmptyMode,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleEmptyExample = m("ClickedToggleEmptyExample");

export const Message = S.Union([ClickedToggleEmptyExample]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ mode: "Projects" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleEmptyExample: () => [
        evo(model, {
          mode: (mode) => (mode === "Projects" ? "Search" : "Projects"),
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
      Empty.view<Message>({
        title:
          model.mode === "Projects" ? "No projects yet" : "No results found",
        description:
          model.mode === "Projects"
            ? "Create a project to start collecting registry slices."
            : "Try a different filter or clear the current search.",
        icon: model.mode === "Projects" ? "+" : "0",
        action: h.button(
          [h.OnClick(ClickedToggleEmptyExample()), h.Class(buttonClassName)],
          [
            model.mode === "Projects"
              ? "Show search state"
              : "Show project state",
          ]
        ),
      }),
    ]
  );
});
