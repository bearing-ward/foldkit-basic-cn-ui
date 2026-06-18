import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as LiveTrace from "../../ui/foldkit-livetrace";
import { sampleLogLines } from "../../ui/foldkit-livetrace/sample-data";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedInspectLogs = m("ClickedInspectLogs");
export const Message = S.Union([ClickedInspectLogs]);
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
      ClickedInspectLogs: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return LiveTrace.themeView<Message>({
    className: "min-h-0",
    children: [
      h.div(
        [h.Class("max-w-3xl space-y-4")],
        [
          LiveTrace.logConsoleView<Message>({
            title: "Effect.log -> SpanEvent stream",
            status: "closed · 4 events",
            lines: sampleLogLines,
          }),
          LiveTrace.controlButtonView<Message>({
            label: "Inspect logs",
          }),
        ]
      ),
    ],
  });
});
