import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  meterIndicatorClasses,
  meterLabelClasses,
  meterPercent,
  meterRootClasses,
  meterStatus,
  meterStatusDataAttribute,
  meterTrackClasses,
  meterValueClasses,
} from "./view";
import type { MeterStatus } from "./view";

export type { MeterStatus };

export {
  meterIndicatorClasses,
  meterLabelClasses,
  meterPercent,
  meterRootClasses,
  meterStatus,
  meterStatusDataAttribute,
  meterTrackClasses,
  meterValueClasses,
} from "./view";

/** Props for the Meter Root anatomy part. */
export type RootViewConfig = Readonly<{
  /** Current meter value. */
  value: number;
  /** Child anatomy parts rendered inside the root. */
  children: readonly Html[];
  /** Minimum value announced by aria-valuemin. */
  min?: number;
  /** Maximum value announced by aria-valuemax. */
  max?: number;
  /** Id of the visible label used by aria-labelledby. */
  labelId?: string;
  /** Locale used by Intl.NumberFormat for the default percent formatter. */
  locale?: Intl.LocalesArgument | undefined;
  /** Intl.NumberFormat options merged into the default percent formatter. */
  format?: Intl.NumberFormatOptions | undefined;
  /** Formats values for visible text and default aria-valuetext. */
  formatValue?: FormatValue | undefined;
  /** Returns custom aria-valuetext from the current meter context. */
  getAriaValueText?: GetAriaValueText | undefined;
  /** Additional class appended to the default Root classes. */
  classes?: string | undefined;
  /** Inline styles applied to the Root element. */
  style?: MeterStyle | undefined;
}>;

/** Props for the Meter Label anatomy part. */
export type LabelViewConfig = Readonly<{
  /** Visible label text for the measured range. */
  label: string;
  /** Stable id used by Root aria-labelledby. */
  id?: string;
  /** Additional class appended to the default Label classes. */
  classes?: string | undefined;
  /** Inline styles applied to the Label element. */
  style?: MeterStyle | undefined;
}>;

/** Props for the Meter Value anatomy part. */
export type ValueViewConfig = Readonly<{
  /** Current meter value. */
  value: number;
  /** Minimum value used for percent formatting. */
  min?: number;
  /** Maximum value used for percent formatting. */
  max?: number;
  /** Locale used by Intl.NumberFormat for the default percent formatter. */
  locale?: Intl.LocalesArgument | undefined;
  /** Intl.NumberFormat options merged into the default percent formatter. */
  format?: Intl.NumberFormatOptions | undefined;
  /** Formats values before rendering. */
  formatValue?: FormatValue | undefined;
  /** Renders custom visible value text from the current meter context. */
  renderValue?: RenderValue | undefined;
  /** Additional class appended to the default Value classes. */
  classes?: string | undefined;
  /** Inline styles applied to the Value element. */
  style?: MeterStyle | undefined;
}>;

/** Props for the Meter Track anatomy part. */
export type TrackViewConfig = Readonly<{
  /** Indicator or custom children rendered inside the track. */
  children: readonly Html[];
  /** Additional class appended to the default Track classes. */
  classes?: string | undefined;
  /** Inline styles applied to the Track element. */
  style?: MeterStyle | undefined;
}>;

/** Props for the Meter Indicator anatomy part. */
export type IndicatorViewConfig = Readonly<{
  /** Current meter value. */
  value: number;
  /** Minimum value used for percent width calculation. */
  min?: number;
  /** Maximum value used for percent width calculation. */
  max?: number;
  /** Additional class appended to the default Indicator classes. */
  classes?: string | undefined;
  /** Inline styles applied after the computed width style. */
  style?: MeterStyle | undefined;
}>;

/** Props for the complete Meter convenience view. */
export type ViewConfig = Readonly<{
  /** Current meter value. */
  value: number;
  /** Visible label text for the measured range. */
  label: string;
  /** Minimum value announced by aria-valuemin and used for percent math. */
  min?: number;
  /** Maximum value announced by aria-valuemax and used for percent math. */
  max?: number;
  /** Label id used by aria-labelledby. */
  id?: string;
  /** Locale used by Intl.NumberFormat for the default percent formatter. */
  locale?: Intl.LocalesArgument | undefined;
  /** Intl.NumberFormat options merged into the default percent formatter. */
  format?: Intl.NumberFormatOptions | undefined;
  /** Formats values for visible text and default aria-valuetext. */
  formatValue?: FormatValue | undefined;
  /** Returns custom aria-valuetext from the current meter context. */
  getAriaValueText?: GetAriaValueText | undefined;
  /** Renders custom visible value text from the current meter context. */
  renderValue?: RenderValue | undefined;
  /** Additional class appended to the default Root classes. */
  classes?: string | undefined;
  /** Inline styles applied to the Root element. */
  style?: MeterStyle | undefined;
  /** Additional class appended to the default Label classes. */
  labelClasses?: string | undefined;
  /** Inline styles applied to the Label element. */
  labelStyle?: MeterStyle | undefined;
  /** Additional class appended to the default Value classes. */
  valueClasses?: string | undefined;
  /** Inline styles applied to the Value element. */
  valueStyle?: MeterStyle | undefined;
  /** Additional class appended to the default Track classes. */
  trackClasses?: string | undefined;
  /** Inline styles applied to the Track element. */
  trackStyle?: MeterStyle | undefined;
  /** Additional class appended to the default Indicator classes. */
  indicatorClasses?: string | undefined;
  /** Inline styles applied after the Indicator computed width style. */
  indicatorStyle?: MeterStyle | undefined;
}>;

/** Shared context passed to Meter formatting and rendering callbacks. */
export type MeterValueContext = Readonly<{
  /** Formatted value text. */
  formattedValue: string;
  /** Raw meter value. */
  value: number;
  /** Current meter status. */
  status: MeterStatus;
}>;

/** Inline style object accepted by Foldkit h.Style. */
export type MeterStyle = Readonly<Record<string, string>>;

/** Formats a meter value for visible and accessible text. */
export type FormatValue = (value: number) => string;

/** Returns custom aria-valuetext from the current meter context. */
export type GetAriaValueText = (context: MeterValueContext) => string;

/** Renders custom visible value text from the current meter context. */
export type RenderValue = (context: MeterValueContext) => string;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const defaultFormatValue = (
  value: number,
  min: number,
  max: number,
  locale?: Intl.LocalesArgument,
  format?: Intl.NumberFormatOptions
): string =>
  new Intl.NumberFormat(locale, { style: "percent", ...format }).format(
    meterPercent(value, min, max) / 100
  );

/** Formats a meter value with the default percent formatter or a custom formatter. */
export const formattedValue = (
  value: number,
  min = 0,
  max = 100,
  locale?: Intl.LocalesArgument,
  format?: Intl.NumberFormatOptions,
  formatValue?: FormatValue
): string =>
  formatValue === undefined
    ? defaultFormatValue(value, min, max, locale, format)
    : formatValue(value);

const meterValueContext = (
  value: number,
  min: number,
  max: number,
  locale?: Intl.LocalesArgument,
  format?: Intl.NumberFormatOptions,
  formatValue?: FormatValue
): MeterValueContext => {
  const status = meterStatus(value, max);

  return {
    formattedValue: formattedValue(
      value,
      min,
      max,
      locale,
      format,
      formatValue
    ),
    status,
    value,
  };
};

/** Returns the default aria-valuetext for a meter value. */
export const ariaValueText = (
  value: number,
  min = 0,
  max = 100,
  locale?: Intl.LocalesArgument,
  format?: Intl.NumberFormatOptions,
  formatValue?: FormatValue
): string => {
  const context = meterValueContext(
    value,
    min,
    max,
    locale,
    format,
    formatValue
  );

  return context.formattedValue;
};

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  status: MeterStatus
) => [h.DataAttribute(meterStatusDataAttribute(status), "")];

/** Renders the Meter Root with meterbar semantics and status data attributes. */
export const rootView = <ParentMessage>({
  value,
  children,
  min = 0,
  max = 100,
  labelId,
  locale,
  format,
  formatValue,
  getAriaValueText,
  classes,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();
  const status = meterStatus(value, max);
  const context = meterValueContext(
    value,
    min,
    max,
    locale,
    format,
    formatValue
  );

  return h.div(
    [
      h.Attribute("role", "meter"),
      h.Attribute("aria-valuemin", String(min)),
      h.Attribute("aria-valuemax", String(max)),
      h.Attribute("aria-valuenow", String(value)),
      h.Attribute(
        "aria-valuetext",
        getAriaValueText === undefined
          ? ariaValueText(value, min, max, locale, format, formatValue)
          : getAriaValueText(context)
      ),
      ...(labelId === undefined
        ? []
        : [h.Attribute("aria-labelledby", labelId)]),
      ...stateAttributes(h, status),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(meterRootClasses, classes)),
    ],
    children
  );
};

/** Renders the Meter Label anatomy part. */
export const labelView = <ParentMessage>({
  label,
  id,
  classes,
  style,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(meterLabelClasses, classes)),
    ],
    [label]
  );
};

/** Renders the Meter Value anatomy part as aria-hidden visible text. */
export const valueView = <ParentMessage>({
  value,
  min = 0,
  max = 100,
  locale,
  format,
  formatValue,
  renderValue,
  classes,
  style,
}: ValueViewConfig): Html => {
  const h = html<ParentMessage>();
  const context = meterValueContext(
    value,
    min,
    max,
    locale,
    format,
    formatValue
  );
  const valueText =
    renderValue === undefined ? context.formattedValue : renderValue(context);

  return h.span(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(meterValueClasses, classes)),
    ],
    [valueText]
  );
};

/** Renders the Meter Track anatomy part. */
export const trackView = <ParentMessage>({
  children,
  classes,
  style,
}: TrackViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(meterTrackClasses, classes)),
    ],
    children
  );
};

/** Renders the Meter Indicator anatomy part with value-driven width. */
export const indicatorView = <ParentMessage>({
  value,
  min = 0,
  max = 100,
  classes,
  style,
}: IndicatorViewConfig): Html => {
  const h = html<ParentMessage>();
  const status = meterStatus(value, max);
  const computedStyle = {
    height: "inherit",
    insetInlineStart: "0",
    width: `${meterPercent(value, min, max)}%`,
    ...style,
  };

  return h.div(
    [
      ...stateAttributes(h, status),
      ...(computedStyle === undefined ? [] : [h.Style(computedStyle)]),
      h.Class(cn(meterIndicatorClasses, classes)),
    ],
    []
  );
};

/** Renders the complete Base UI-style Meter anatomy: Root, Label, Value, Track, and Indicator. */
export const view = <ParentMessage>({
  value,
  label,
  min = 0,
  max = 100,
  id = "base-ui-meter-label",
  locale,
  format,
  formatValue,
  getAriaValueText,
  renderValue,
  classes,
  style,
  labelClasses,
  labelStyle,
  valueClasses,
  valueStyle,
  trackClasses,
  trackStyle,
  indicatorClasses,
  indicatorStyle,
}: ViewConfig): Html =>
  rootView<ParentMessage>({
    value,
    min,
    max,
    labelId: id,
    locale,
    format,
    formatValue,
    getAriaValueText:
      getAriaValueText === undefined
        ? undefined
        : (context) => getAriaValueText(context),
    classes,
    style,
    children: [
      labelView<ParentMessage>({
        label,
        id,
        classes: labelClasses,
        style: labelStyle,
      }),
      valueView<ParentMessage>({
        value,
        min,
        max,
        locale,
        format,
        formatValue,
        renderValue,
        classes: valueClasses,
        style: valueStyle,
      }),
      trackView<ParentMessage>({
        classes: trackClasses,
        style: trackStyle,
        children: [
          indicatorView<ParentMessage>({
            value,
            min,
            max,
            classes: indicatorClasses,
            style: indicatorStyle,
          }),
        ],
      }),
    ],
  });
