import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as LiveTrace from "../../ui/foldkit-livetrace";
import {
  activeExecutionSteps,
  completedExecutionSteps,
  sampleEmbeddings,
} from "../../ui/foldkit-livetrace/sample-data";

// MODEL

const ExecutionMode = S.Union([
  S.Literal("Completed"),
  S.Literal("Quickstart"),
]);

export const Model = S.Struct({
  mode: ExecutionMode,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShowCompleted = m("ClickedShowCompleted");
export const ClickedShowQuickstart = m("ClickedShowQuickstart");
export const Message = S.Union([ClickedShowCompleted, ClickedShowQuickstart]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ mode: "Completed" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShowCompleted: () => [evo(model, { mode: () => "Completed" }), []],
      ClickedShowQuickstart: () => [
        evo(model, { mode: () => "Quickstart" }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const completed = model.mode === "Completed";

  return LiveTrace.themeView<Message>({
    className: "min-h-0",
    children: [
      h.div(
        [h.Class("grid max-w-3xl gap-4")],
        [
          h.div(
            [h.Class("flex gap-2")],
            [
              LiveTrace.controlButtonView<Message>({
                label: "Completed",
                active: completed,
                onClick: ClickedShowCompleted(),
              }),
              LiveTrace.controlButtonView<Message>({
                label: "Quickstart",
                active: !completed,
                onClick: ClickedShowQuickstart(),
              }),
            ]
          ),
          LiveTrace.executionPanelView<Message>({
            documentName: "report-q3.pdf",
            documentMeta: "12 pages · 18,402 tokens",
            badgeLabel: completed ? "complete" : "parse...",
            steps: completed ? completedExecutionSteps : activeExecutionSteps,
            embeddings: completed ? sampleEmbeddings : [],
          }),
        ]
      ),
    ],
  });
});
