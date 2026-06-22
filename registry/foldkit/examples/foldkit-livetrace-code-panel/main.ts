import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as LiveTrace from "../../ui/foldkit-livetrace";
import { sampleCodeLines } from "../../ui/foldkit-livetrace/sample-data";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedInspectCode = m("ClickedInspectCode");
export const Message = S.Union([ClickedInspectCode]);
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
      ClickedInspectCode: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return LiveTrace.themeView<Message>({
    classes: "min-h-0",
    children: [
      h.div(
        [h.Class("max-w-3xl space-y-4")],
        [
          LiveTrace.codePanelView<Message>({
            path: "src/process.ts",
            lineLabel: "line 51",
            lines: sampleCodeLines,
          }),
          LiveTrace.controlButtonView<Message>({
            label: "Inspect code",
          }),
        ]
      ),
    ],
  });
});
