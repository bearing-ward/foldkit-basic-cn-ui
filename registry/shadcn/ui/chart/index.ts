import { Option } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  chartAxisClassName,
  chartBarClassName,
  chartContainerClassName,
  chartGridClassName,
  chartLegendClassName,
  chartLegendItemClassName,
  chartLegendSwatchClassName,
  chartSvgClassName,
  chartTooltipClassName,
} from "./view";

export {
  chartAxisClassName,
  chartBarClassName,
  chartContainerClassName,
  chartGridClassName,
  chartLegendClassName,
  chartLegendItemClassName,
  chartLegendSwatchClassName,
  chartSvgClassName,
  chartTooltipClassName,
} from "./view";

/** Named chart series rendered by bars, legends, and tooltip rows. */
export type ChartSeries = Readonly<{
  key: string;
  label: string;
  color: string;
}>;

/** A single categorical chart row. Values are addressed by series key. */
export type ChartDatum = Readonly<{
  label: string;
  values: Readonly<Record<string, number>>;
}>;

/** Shared dimensions used by SVG chart helpers. */
export type ChartDimensions = Readonly<{
  width?: number;
  height?: number;
  padding?: number;
}>;

/** Root container props for chart composition. */
export type ContainerViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
  ariaLabel?: string;
}>;

/** Bar chart rendering props. */
export type BarChartViewConfig<ParentMessage> = ChartDimensions &
  Readonly<{
    data: readonly ChartDatum[];
    series: readonly ChartSeries[];
    showGrid?: boolean;
    showAxis?: boolean;
    axisLabelFormatter?: (label: string) => string;
    rtl?: boolean;
    className?: string;
    activeDatumLabel?: string;
    onHoveredDatum?: (label: string) => ParentMessage;
    onLeftChart?: ParentMessage;
  }>;

/** Static tooltip content props. Interactive hover tooltips are parent-owned. */
export type TooltipViewConfig = Readonly<{
  label: string;
  rows: readonly Readonly<{ label: string; value: string; color: string }>[];
  className?: string;
}>;

/** Legend props for visible series labels. */
export type LegendViewConfig = Readonly<{
  series: readonly ChartSeries[];
  className?: string;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const maxValue = (
  data: readonly ChartDatum[],
  series: readonly ChartSeries[]
): number =>
  Math.max(
    1,
    ...data.flatMap((datum) =>
      series.map((item) => datum.values[item.key] ?? 0)
    )
  );

/** Wraps chart content with the shadcn-style chart region and label. */
export const containerView = <ParentMessage>({
  children,
  className,
  ariaLabel = "Chart",
}: ContainerViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "region"),
      h.AriaLabel(ariaLabel),
      h.DataAttribute("slot", "chart"),
      h.Class(classNames(chartContainerClassName, className)),
    ],
    children
  );
};

/** Renders a deterministic SVG bar chart from parent-owned data. */
export const barChartView = <ParentMessage>({
  data,
  series,
  width = 480,
  height = 260,
  padding = 32,
  showGrid = true,
  showAxis = true,
  axisLabelFormatter = (label) => label,
  rtl = false,
  className,
  activeDatumLabel,
  onHoveredDatum,
  onLeftChart,
}: BarChartViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const plotWidth = width - padding * 2;
  const plotHeight = height - padding * 2;
  const groupWidth = plotWidth / Math.max(1, data.length);
  const barGap = 6;
  const barWidth = Math.max(
    4,
    (groupWidth - barGap * (series.length + 1)) / Math.max(1, series.length)
  );
  const maximum = maxValue(data, series);
  const reversedData = [...data];
  reversedData.reverse();
  const orderedData: readonly ChartDatum[] = rtl ? reversedData : data;
  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return h.svg(
    [
      h.Attribute("viewBox", `0 0 ${width} ${height}`),
      h.Attribute("role", "img"),
      h.AriaLabel("Bar chart"),
      h.DataAttribute("slot", "chart-svg"),
      h.Class(classNames(chartSvgClassName, className)),
    ],
    [
      ...(showGrid
        ? gridLines.map((line) => {
            const y = padding + plotHeight - plotHeight * line;

            return h.line(
              [
                h.Attribute("x1", String(padding)),
                h.Attribute("x2", String(width - padding)),
                h.Attribute("y1", String(y)),
                h.Attribute("y2", String(y)),
                h.Class(chartGridClassName),
              ],
              []
            );
          })
        : []),
      ...orderedData.flatMap((datum, datumIndex) =>
        series.map((item, seriesIndex) => {
          const value = datum.values[item.key] ?? 0;
          const barHeight = (value / maximum) * plotHeight;
          const isActive = datum.label === activeDatumLabel;
          const x =
            padding +
            datumIndex * groupWidth +
            barGap +
            seriesIndex * (barWidth + barGap);
          const y = padding + plotHeight - barHeight;

          return h.rect(
            [
              h.Attribute("x", String(x)),
              h.Attribute("y", String(y)),
              h.Attribute("width", String(barWidth)),
              h.Attribute("height", String(barHeight)),
              h.Attribute("rx", "4"),
              h.Attribute("fill", item.color),
              h.Attribute("data-series", item.key),
              h.Attribute("data-value", String(value)),
              h.Class(
                [
                  chartBarClassName,
                  isActive ? "opacity-100" : "opacity-85",
                ].join(" ")
              ),
            ],
            []
          );
        })
      ),
      ...(onHoveredDatum === undefined
        ? []
        : orderedData.map((datum, datumIndex) =>
            h.rect(
              [
                h.Attribute("x", String(padding + datumIndex * groupWidth)),
                h.Attribute("y", String(padding)),
                h.Attribute("width", String(groupWidth)),
                h.Attribute("height", String(plotHeight)),
                h.Attribute("fill", "transparent"),
                h.Attribute("data-slot", "chart-hover-target"),
                h.Attribute("data-label", datum.label),
                h.OnPointerMove(() => Option.some(onHoveredDatum(datum.label))),
                ...(onLeftChart === undefined
                  ? []
                  : [h.OnPointerLeave(() => Option.some(onLeftChart))]),
              ],
              []
            )
          )),
      ...(showAxis
        ? orderedData.map((datum, datumIndex) =>
            h.text(
              [
                h.Attribute(
                  "x",
                  String(padding + datumIndex * groupWidth + groupWidth / 2)
                ),
                h.Attribute("y", String(height - 8)),
                h.Attribute("text-anchor", "middle"),
                h.Class(chartAxisClassName),
              ],
              [axisLabelFormatter(datum.label)]
            )
          )
        : []),
    ]
  );
};

/** Renders static tooltip content matching shadcn ChartTooltipContent shape. */
export const tooltipView = <ParentMessage>({
  label,
  rows,
  className,
}: TooltipViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "chart-tooltip"),
      h.Class(classNames(chartTooltipClassName, className)),
    ],
    [
      h.p([h.Class("mb-2 font-medium text-gray-950")], [label]),
      ...rows.map((row) =>
        h.div(
          [h.Class("flex items-center justify-between gap-8")],
          [
            h.span(
              [h.Class("inline-flex items-center gap-2 text-gray-600")],
              [
                h.span(
                  [
                    h.Attribute("aria-hidden", "true"),
                    h.Style({ backgroundColor: row.color }),
                    h.Class(chartLegendSwatchClassName),
                  ],
                  []
                ),
                row.label,
              ]
            ),
            h.span([h.Class("font-mono text-gray-950")], [row.value]),
          ]
        )
      ),
    ]
  );
};

/** Renders a visible legend for chart series. */
export const legendView = <ParentMessage>({
  series,
  className,
}: LegendViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "chart-legend"),
      h.Class(classNames(chartLegendClassName, className)),
    ],
    series.map((item) =>
      h.span(
        [h.Class(chartLegendItemClassName)],
        [
          h.span(
            [
              h.Attribute("aria-hidden", "true"),
              h.Style({ backgroundColor: item.color }),
              h.Class(chartLegendSwatchClassName),
            ],
            []
          ),
          item.label,
        ]
      )
    )
  );
};
