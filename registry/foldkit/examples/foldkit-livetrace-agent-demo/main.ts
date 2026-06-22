import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as LiveTrace from "../../ui/foldkit-livetrace";
import {
  sampleAgentSteps,
  sampleLogLines,
} from "../../ui/foldkit-livetrace/sample-data";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedInspectAgent = m("ClickedInspectAgent");
export const Message = S.Union([ClickedInspectAgent]);
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
      ClickedInspectAgent: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return LiveTrace.themeView<Message>({
    classes: "min-h-0",
    children: [
      h.div(
        [h.Class("max-w-5xl space-y-4")],
        [
          h.div(
            [h.Class(LiveTrace.panelClasses)],
            [
              h.div(
                [
                  h.Class(
                    "flex items-center gap-3 border-b border-border px-4 py-3"
                  ),
                ],
                [
                  LiveTrace.windowDotsView<Message>(),
                  h.span(
                    [h.Class("font-mono text-sm text-card-foreground")],
                    ["traces/user/demo"]
                  ),
                  LiveTrace.statusBadgeView<Message>({
                    status: "Running",
                    label: "RAG agent",
                  }),
                ]
              ),
              h.div(
                [h.Class("grid grid-cols-6 border-b border-border")],
                [
                  LiveTrace.metricView<Message>({
                    label: "status",
                    value: "complete",
                    tone: "Ok",
                  }),
                  LiveTrace.metricView<Message>({
                    label: "tokens · in",
                    value: "888",
                  }),
                  LiveTrace.metricView<Message>({
                    label: "tokens · out",
                    value: "125",
                  }),
                  LiveTrace.metricView<Message>({
                    label: "cost",
                    value: "$0.011",
                  }),
                  LiveTrace.metricView<Message>({
                    label: "ttft",
                    value: "3700ms",
                    tone: "Accent",
                  }),
                  LiveTrace.metricView<Message>({
                    label: "events/s",
                    value: "16.8",
                  }),
                ]
              ),
              h.div(
                [h.Class("grid gap-0 lg:grid-cols-[1.1fr_0.9fr]")],
                [
                  h.div(
                    [h.Class("space-y-3 border-r border-border p-3")],
                    sampleAgentSteps.map(LiveTrace.agentStepCardView)
                  ),
                  h.div(
                    [h.Class("p-4")],
                    [
                      h.div(
                        [h.Class("mb-4 flex items-center justify-between")],
                        [
                          LiveTrace.statusBadgeView<Message>({
                            status: "Completed",
                            label: "assistant",
                          }),
                          h.span(
                            [
                              h.Class(
                                "font-mono text-xs text-muted-foreground"
                              ),
                            ],
                            ["complete"]
                          ),
                        ]
                      ),
                      h.p(
                        [h.Class("text-sm leading-6 text-card-foreground/90")],
                        [
                          "first two weeks of November. NRR ticked to 118% - the highest reading since Q4 last year - with gross retention holding at 94%.",
                        ]
                      ),
                    ]
                  ),
                ]
              ),
            ]
          ),
          LiveTrace.logConsoleView<Message>({
            title: "Effect.log -> SpanEvent stream",
            status: "closed · 8 events",
            lines: sampleLogLines,
          }),
          LiveTrace.controlButtonView<Message>({
            label: "Inspect agent",
          }),
        ]
      ),
    ],
  });
});
