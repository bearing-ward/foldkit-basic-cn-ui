import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

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

export const NoActiveTooltip = S.TaggedStruct("NoActiveTooltip", {});
export const ActiveTooltip = S.TaggedStruct("ActiveTooltip", {
  label: S.String,
});
export const TooltipState = S.Union([NoActiveTooltip, ActiveTooltip]);
export type TooltipState = typeof TooltipState.Type;

export const Model = S.Struct({
  tooltip: TooltipState,
});
export type Model = typeof Model.Type;

export const noActiveTooltip = (): TooltipState => ({
  _tag: "NoActiveTooltip",
});

export const activeTooltip = (label: string): TooltipState => ({
  _tag: "ActiveTooltip",
  label,
});

// MESSAGE

export const HoveredChartDatum = m("HoveredChartDatum", { label: S.String });
export const LeftChart = m("LeftChart");

export const Message = S.Union([HoveredChartDatum, LeftChart]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ tooltip: noActiveTooltip() }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      HoveredChartDatum: ({ label }) => [
        evo(model, { tooltip: () => activeTooltip(label) }),
        [],
      ],
      LeftChart: () => [evo(model, { tooltip: () => noActiveTooltip() }), []],
    })
  );

// VIEW

const activeDatum = (label: string): Chart.ChartDatum =>
  chartData.find((datum) => datum.label === label) ?? {
    label: "February",
    values: { desktop: 305, mobile: 200 },
  };

const activeIndex = (label: string): number =>
  Math.max(
    0,
    chartData.findIndex((datum) => datum.label === label)
  );

const tooltipLeftPercent = (label: string): string =>
  `${10 + activeIndex(label) * 15}%`;

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-full")],
    [
      h.div(
        [h.Class("relative w-full")],
        [
          Chart.containerView<Message>({
            ariaLabel: "Monthly visitors with tooltip",
            children: [
              Chart.barChartView<Message>({
                data: chartData,
                series: chartSeries,
                axisLabelFormatter: (label) => label.slice(0, 3),
                ...(model.tooltip._tag === "ActiveTooltip"
                  ? { activeDatumLabel: model.tooltip.label }
                  : {}),
                onHoveredDatum: (label) => HoveredChartDatum({ label }),
                onLeftChart: LeftChart(),
              }),
            ],
          }),
          M.value(model.tooltip).pipe(
            M.tagsExhaustive({
              NoActiveTooltip: () => h.empty,
              ActiveTooltip: ({ label }) => {
                const datum = activeDatum(label);

                return h.div(
                  [
                    h.Class(
                      "pointer-events-none absolute top-4 z-10 transition-[left] duration-150"
                    ),
                    h.Style({
                      left: tooltipLeftPercent(label),
                      transform: "translateX(-50%)",
                    }),
                  ],
                  [
                    Chart.tooltipView<Message>({
                      label: datum.label,
                      className: "shadow-lg",
                      rows: [
                        {
                          label: "Desktop",
                          value: String(datum.values.desktop),
                          color: "#2563eb",
                        },
                        {
                          label: "Mobile",
                          value: String(datum.values.mobile),
                          color: "#60a5fa",
                        },
                      ],
                    }),
                  ]
                );
              },
            })
          ),
        ]
      ),
    ]
  );
});
