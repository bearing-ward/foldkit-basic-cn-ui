import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Chart from "../../ui/chart";

const chartData: readonly Chart.ChartDatum[] = [
  { label: "January", values: { desktop: 186, mobile: 80 } },
  { label: "February", values: { desktop: 305, mobile: 200 } },
  { label: "March", values: { desktop: 237, mobile: 120 } },
  { label: "April", values: { desktop: 73, mobile: 190 } },
  { label: "May", values: { desktop: 209, mobile: 130 } },
  { label: "June", values: { desktop: 214, mobile: 140 } },
];

const chartSeries: readonly Chart.ChartSeries[] = [
  { key: "desktop", label: "Desktop", color: "#2563eb" },
  { key: "mobile", label: "Mobile", color: "#60a5fa" },
];

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = m("Message");
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
      Message: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-full")],
    [
      h.div(
        [h.Class("grid w-full gap-4 md:grid-cols-[1fr_auto]")],
        [
          Chart.containerView<Message>({
            ariaLabel: "Monthly visitors with tooltip",
            children: [
              Chart.barChartView<Message>({
                data: chartData,
                series: chartSeries,
                axisLabelFormatter: (label) => label.slice(0, 3),
              }),
            ],
          }),
          Chart.tooltipView<Message>({
            label: "February",
            rows: [
              { label: "Desktop", value: "305", color: "#2563eb" },
              { label: "Mobile", value: "200", color: "#60a5fa" },
            ],
          }),
        ]
      ),
    ]
  );
});
