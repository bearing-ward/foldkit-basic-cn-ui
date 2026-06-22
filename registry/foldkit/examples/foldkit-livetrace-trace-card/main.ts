import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import type {
  TraceStatus,
  TraceStepViewConfig,
} from "../../ui/foldkit-livetrace";
import * as LiveTrace from "../../ui/foldkit-livetrace";
import {
  completedTraceSteps,
  failedTraceSteps,
  runningTraceSteps,
  sampleLogLines,
} from "../../ui/foldkit-livetrace/sample-data";

// MODEL

const TraceMode = S.Union([
  S.Literal("Completed"),
  S.Literal("Running"),
  S.Literal("Failed"),
]);

export const Model = S.Struct({
  mode: TraceMode,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShowCompleted = m("ClickedShowCompleted");
export const ClickedShowRunning = m("ClickedShowRunning");
export const ClickedShowFailed = m("ClickedShowFailed");
export const Message = S.Union([
  ClickedShowCompleted,
  ClickedShowRunning,
  ClickedShowFailed,
]);
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
      ClickedShowRunning: () => [evo(model, { mode: () => "Running" }), []],
      ClickedShowFailed: () => [evo(model, { mode: () => "Failed" }), []],
    })
  );

// VIEW

const stepsForMode = (mode: TraceStatus): readonly TraceStepViewConfig[] =>
  M.value(mode).pipe(
    M.withReturnType<readonly TraceStepViewConfig[]>(),
    M.when("Completed", () => completedTraceSteps),
    M.when("Running", () => runningTraceSteps),
    M.when("Failed", () => failedTraceSteps),
    M.when("Concurrent", () => completedTraceSteps),
    M.exhaustive
  );

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return LiveTrace.themeView<Message>({
    classes: "min-h-0",
    children: [
      h.div(
        [h.Class("grid max-w-4xl gap-4")],
        [
          h.div(
            [h.Class("flex flex-wrap gap-2")],
            [
              LiveTrace.controlButtonView<Message>({
                label: "Completed",
                active: model.mode === "Completed",
                onClick: ClickedShowCompleted(),
              }),
              LiveTrace.controlButtonView<Message>({
                label: "Running",
                active: model.mode === "Running",
                onClick: ClickedShowRunning(),
              }),
              LiveTrace.controlButtonView<Message>({
                label: "Failed",
                active: model.mode === "Failed",
                onClick: ClickedShowFailed(),
              }),
            ]
          ),
          LiveTrace.traceCardView<Message>({
            title: `Processing report-q3.pdf`,
            traceId: "doc:report-q3.pdf:1781731499937-324",
            elapsed: model.mode === "Running" ? "2410ms" : "9350ms",
            status: model.mode,
            steps: stepsForMode(model.mode),
            logLines: sampleLogLines,
          }),
        ]
      ),
    ],
  });
});
