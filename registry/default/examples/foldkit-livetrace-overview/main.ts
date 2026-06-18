import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as LiveTrace from "../../ui/foldkit-livetrace";
import {
  completedTraceSteps,
  sampleActivityRows,
  sampleLogLines,
} from "../../ui/foldkit-livetrace/sample-data";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedInspectOverview = m("ClickedInspectOverview");
export const Message = S.Union([ClickedInspectOverview]);
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
      ClickedInspectOverview: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return LiveTrace.themeView<Message>({
    className: "min-h-0",
    children: [
      h.div(
        [h.Class("max-w-6xl space-y-4")],
        [
          h.div(
            [h.Class(LiveTrace.panelClassName)],
            [
              h.div(
                [h.Class("grid grid-cols-[minmax(0,1fr)_280px]")],
                [
                  h.div(
                    [h.Class("border-r border-border")],
                    [
                      h.div(
                        [
                          h.Class(
                            "flex items-center gap-4 border-b border-border bg-muted px-4 py-2"
                          ),
                        ],
                        [
                          LiveTrace.windowDotsView<Message>(),
                          h.span(
                            [
                              h.Class(
                                "font-mono text-sm text-muted-foreground"
                              ),
                            ],
                            ["traces/user/demo"]
                          ),
                          h.div(
                            [h.Class("ml-auto flex gap-2")],
                            [
                              LiveTrace.controlButtonView<Message>({
                                label: "Run workflow",
                                active: true,
                              }),
                              LiveTrace.controlButtonView<Message>({
                                label: "Failing run",
                              }),
                            ]
                          ),
                        ]
                      ),
                      h.div(
                        [h.Class("p-5")],
                        [
                          LiveTrace.traceCardView<Message>({
                            title: "Processing research-notes.md",
                            traceId: "doc:research-notes.md:1781730619928-117",
                            elapsed: "9350ms",
                            status: "Completed",
                            steps: completedTraceSteps,
                            logLines: sampleLogLines,
                          }),
                        ]
                      ),
                    ]
                  ),
                  LiveTrace.activityPanelView<Message>({
                    rows: sampleActivityRows.slice(0, 1),
                    eventsPerSecond: "0.0",
                  }),
                ]
              ),
            ]
          ),
          LiveTrace.controlButtonView<Message>({
            label: "Inspect overview",
          }),
        ]
      ),
    ],
  });
});
