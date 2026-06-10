import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  progressIndicatorClassName,
  progressLabelClassName,
  progressPercent,
  progressRootClassName,
  progressStatus,
  progressStatusDataAttribute,
  progressTrackClassName,
  progressValueClassName,
} from "./view";
import type { ProgressStatus } from "./view";

export type { ProgressStatus };

export {
  progressIndicatorClassName,
  progressLabelClassName,
  progressPercent,
  progressRootClassName,
  progressStatus,
  progressStatusDataAttribute,
  progressTrackClassName,
  progressValueClassName,
} from "./view";

/** Props for the Progress Root anatomy part. */
export type RootViewConfig = Readonly<{
  /** Current progress value. Use null for indeterminate progress. */
  value: number | null;
  /** Child anatomy parts rendered inside the root. */
  children: readonly Html[];
  /** Minimum value announced by aria-valuemin. */
  min?: number;
  /** Maximum value announced by aria-valuemax. */
  max?: number;
  /** Id of the visible label used by aria-labelledby. */
  labelId?: string;
  /** Formats determinate values for visible text and default aria-valuetext. */
  formatValue?: FormatValue | undefined;
  /** Returns custom aria-valuetext from the current progress context. */
  getAriaValueText?: GetAriaValueText | undefined;
  /** Additional class appended to the default Root classes. */
  className?: string | undefined;
  /** Inline styles applied to the Root element. */
  style?: ProgressStyle | undefined;
}>;

/** Props for the Progress Label anatomy part. */
export type LabelViewConfig = Readonly<{
  /** Visible label text for the progress task. */
  label: string;
  /** Stable id used by Root aria-labelledby. */
  id?: string;
  /** Additional class appended to the default Label classes. */
  className?: string | undefined;
  /** Inline styles applied to the Label element. */
  style?: ProgressStyle | undefined;
}>;

/** Props for the Progress Value anatomy part. */
export type ValueViewConfig = Readonly<{
  /** Current progress value. Use null for indeterminate progress. */
  value: number | null;
  /** Formats determinate values before rendering. */
  formatValue?: FormatValue | undefined;
  /** Renders custom visible value text from the current progress context. */
  renderValue?: RenderValue | undefined;
  /** Additional class appended to the default Value classes. */
  className?: string | undefined;
  /** Inline styles applied to the Value element. */
  style?: ProgressStyle | undefined;
}>;

/** Props for the Progress Track anatomy part. */
export type TrackViewConfig = Readonly<{
  /** Indicator or custom children rendered inside the track. */
  children: readonly Html[];
  /** Additional class appended to the default Track classes. */
  className?: string | undefined;
  /** Inline styles applied to the Track element. */
  style?: ProgressStyle | undefined;
}>;

/** Props for the Progress Indicator anatomy part. */
export type IndicatorViewConfig = Readonly<{
  /** Current progress value. Use null for indeterminate progress. */
  value: number | null;
  /** Minimum value used for percent width calculation. */
  min?: number;
  /** Maximum value used for percent width calculation. */
  max?: number;
  /** Additional class appended to the default Indicator classes. */
  className?: string | undefined;
  /** Inline styles applied after the computed width style. */
  style?: ProgressStyle | undefined;
}>;

/** Props for the complete Progress convenience view. */
export type ViewConfig = Readonly<{
  /** Current progress value. Use null for indeterminate progress. */
  value: number | null;
  /** Visible label text for the progress task. */
  label: string;
  /** Minimum value announced by aria-valuemin and used for percent math. */
  min?: number;
  /** Maximum value announced by aria-valuemax and used for percent math. */
  max?: number;
  /** Label id used by aria-labelledby. */
  id?: string;
  /** Formats determinate values for visible text and default aria-valuetext. */
  formatValue?: FormatValue | undefined;
  /** Returns custom aria-valuetext from the current progress context. */
  getAriaValueText?: GetAriaValueText | undefined;
  /** Renders custom visible value text from the current progress context. */
  renderValue?: RenderValue | undefined;
  /** Additional class appended to the default Root classes. */
  className?: string | undefined;
  /** Inline styles applied to the Root element. */
  style?: ProgressStyle | undefined;
  /** Additional class appended to the default Label classes. */
  labelClassName?: string | undefined;
  /** Inline styles applied to the Label element. */
  labelStyle?: ProgressStyle | undefined;
  /** Additional class appended to the default Value classes. */
  valueClassName?: string | undefined;
  /** Inline styles applied to the Value element. */
  valueStyle?: ProgressStyle | undefined;
  /** Additional class appended to the default Track classes. */
  trackClassName?: string | undefined;
  /** Inline styles applied to the Track element. */
  trackStyle?: ProgressStyle | undefined;
  /** Additional class appended to the default Indicator classes. */
  indicatorClassName?: string | undefined;
  /** Inline styles applied after the Indicator computed width style. */
  indicatorStyle?: ProgressStyle | undefined;
}>;

/** Shared context passed to Progress formatting and rendering callbacks. */
export type ProgressValueContext = Readonly<{
  /** Formatted value text, or null when progress is indeterminate. */
  formattedValue: string | null;
  /** Raw progress value, or null when progress is indeterminate. */
  value: number | null;
  /** Current progress status. */
  status: ProgressStatus;
}>;

/** Inline style object accepted by Foldkit h.Style. */
export type ProgressStyle = Readonly<Record<string, string>>;

/** Formats a determinate progress value for visible and accessible text. */
export type FormatValue = (value: number) => string;

/** Returns custom aria-valuetext from the current progress context. */
export type GetAriaValueText = (context: ProgressValueContext) => string;

/** Renders custom visible value text from the current progress context. */
export type RenderValue = (context: ProgressValueContext) => string;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const defaultFormatValue = (value: number): string =>
  (value / 100).toLocaleString(undefined, { style: "percent" });

/** Formats a progress value with the default percent formatter or a custom formatter. */
export const formattedValue = (
  value: number | null,
  formatValue: FormatValue = defaultFormatValue
): string => (value === null ? "" : formatValue(value));

const progressValueContext = (
  value: number | null,
  max: number,
  formatValue?: FormatValue
): ProgressValueContext => {
  const status = progressStatus(value, max);

  return {
    formattedValue: value === null ? null : formattedValue(value, formatValue),
    status,
    value,
  };
};

/** Returns the default aria-valuetext for determinate or indeterminate progress. */
export const ariaValueText = (
  value: number | null,
  max = 100,
  formatValue?: FormatValue
): string => {
  const context = progressValueContext(value, max, formatValue);

  return context.formattedValue ?? "indeterminate progress";
};

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  status: ProgressStatus
) => [h.DataAttribute(progressStatusDataAttribute(status), "")];

/** Renders the Progress Root with progressbar semantics and status data attributes. */
export const rootView = <ParentMessage>({
  value,
  children,
  min = 0,
  max = 100,
  labelId,
  formatValue,
  getAriaValueText,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();
  const status = progressStatus(value, max);
  const context = progressValueContext(value, max, formatValue);

  return h.div(
    [
      h.Attribute("role", "progressbar"),
      h.Attribute("aria-valuemin", String(min)),
      h.Attribute("aria-valuemax", String(max)),
      ...(value === null ? [] : [h.Attribute("aria-valuenow", String(value))]),
      h.Attribute(
        "aria-valuetext",
        getAriaValueText === undefined
          ? ariaValueText(value, max, formatValue)
          : getAriaValueText(context)
      ),
      ...(labelId === undefined
        ? []
        : [h.Attribute("aria-labelledby", labelId)]),
      ...stateAttributes(h, status),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(progressRootClassName, className)),
    ],
    children
  );
};

/** Renders the Progress Label anatomy part. */
export const labelView = <ParentMessage>({
  label,
  id,
  className,
  style,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(progressLabelClassName, className)),
    ],
    [label]
  );
};

/** Renders the Progress Value anatomy part as aria-hidden visible text. */
export const valueView = <ParentMessage>({
  value,
  formatValue,
  renderValue,
  className,
  style,
}: ValueViewConfig): Html => {
  const h = html<ParentMessage>();
  const context = progressValueContext(value, 100, formatValue);
  const valueText =
    renderValue === undefined
      ? (context.formattedValue ?? "")
      : renderValue(context);

  return h.span(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(progressValueClassName, className)),
    ],
    [valueText]
  );
};

/** Renders the Progress Track anatomy part. */
export const trackView = <ParentMessage>({
  children,
  className,
  style,
}: TrackViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(progressTrackClassName, className)),
    ],
    children
  );
};

/** Renders the Progress Indicator anatomy part with value-driven width. */
export const indicatorView = <ParentMessage>({
  value,
  min = 0,
  max = 100,
  className,
  style,
}: IndicatorViewConfig): Html => {
  const h = html<ParentMessage>();
  const status = progressStatus(value, max);
  const computedStyle =
    value === null
      ? style
      : {
          height: "inherit",
          insetInlineStart: "0",
          width: `${progressPercent(value, min, max)}%`,
          ...style,
        };

  return h.div(
    [
      ...stateAttributes(h, status),
      ...(computedStyle === undefined ? [] : [h.Style(computedStyle)]),
      h.Class(classNames(progressIndicatorClassName, className)),
    ],
    []
  );
};

/** Renders the complete Base UI-style Progress anatomy: Root, Label, Value, Track, and Indicator. */
export const view = <ParentMessage>({
  value,
  label,
  min = 0,
  max = 100,
  id = "base-ui-progress-label",
  formatValue,
  getAriaValueText,
  renderValue,
  className,
  style,
  labelClassName,
  labelStyle,
  valueClassName,
  valueStyle,
  trackClassName,
  trackStyle,
  indicatorClassName,
  indicatorStyle,
}: ViewConfig): Html =>
  rootView<ParentMessage>({
    value,
    min,
    max,
    labelId: id,
    formatValue,
    getAriaValueText:
      getAriaValueText === undefined
        ? undefined
        : (context) => getAriaValueText(context),
    className,
    style,
    children: [
      labelView<ParentMessage>({
        label,
        id,
        className: labelClassName,
        style: labelStyle,
      }),
      valueView<ParentMessage>({
        value,
        formatValue,
        renderValue,
        className: valueClassName,
        style: valueStyle,
      }),
      trackView<ParentMessage>({
        className: trackClassName,
        style: trackStyle,
        children: [
          indicatorView<ParentMessage>({
            value,
            min,
            max,
            className: indicatorClassName,
            style: indicatorStyle,
          }),
        ],
      }),
    ],
  });
