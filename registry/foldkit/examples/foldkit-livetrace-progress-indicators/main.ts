import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as LiveTrace from "../../ui/foldkit-livetrace";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedInspectProgress = m("ClickedInspectProgress");
export const Message = S.Union([ClickedInspectProgress]);
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
      ClickedInspectProgress: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return LiveTrace.themeView<Message>({
    classes: "min-h-0",
    children: [
      h.div(
        [h.Class("grid max-w-3xl gap-5")],
        [
          h.div(
            [h.Class("flex flex-wrap gap-2")],
            [
              LiveTrace.statusBadgeView<Message>({ status: "Completed" }),
              LiveTrace.statusBadgeView<Message>({ status: "Running" }),
              LiveTrace.statusBadgeView<Message>({ status: "Failed" }),
              LiveTrace.statusBadgeView<Message>({ status: "Concurrent" }),
            ]
          ),
          h.div(
            [h.Class("grid grid-cols-4 gap-4")],
            [
              LiveTrace.stepMarkerView<Message>({ state: "Complete" }),
              LiveTrace.stepMarkerView<Message>({ state: "Running" }),
              LiveTrace.stepMarkerView<Message>({
                state: "Pending",
                label: "2",
              }),
              LiveTrace.stepMarkerView<Message>({ state: "Failed" }),
            ]
          ),
          h.div(
            [h.Class("space-y-3")],
            [
              LiveTrace.progressTrackView<Message>({
                value: 0,
                tone: "Default",
              }),
              LiveTrace.progressTrackView<Message>({
                value: 42,
                tone: "Accent",
              }),
              LiveTrace.progressTrackView<Message>({ value: 100, tone: "Ok" }),
              LiveTrace.progressTrackView<Message>({
                value: 24,
                tone: "Error",
              }),
            ]
          ),
          LiveTrace.controlButtonView<Message>({
            label: "Inspect progress",
          }),
        ]
      ),
    ],
  });
});
