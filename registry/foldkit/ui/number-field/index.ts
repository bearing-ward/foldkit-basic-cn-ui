import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  numberFieldButtonClasses,
  numberFieldGroupClasses,
  numberFieldInputClasses,
  numberFieldRootClasses,
  numberFieldScrubAreaClasses,
} from "./view";

export {
  numberFieldButtonClasses,
  numberFieldGroupClasses,
  numberFieldInputClasses,
  numberFieldRootClasses,
  numberFieldScrubAreaClasses,
} from "./view";

export type NumberFieldStyle = Readonly<Record<string, string>>;

export type NumberFieldState = Readonly<{
  disabled?: boolean | undefined;
  invalid?: boolean | undefined;
  focused?: boolean | undefined;
}>;

export type RootViewConfig = NumberFieldState &
  Readonly<{
    children: readonly Html[];
    classes?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type ScrubAreaViewConfig = NumberFieldState &
  Readonly<{
    id?: string | undefined;
    children: readonly Html[];
    classes?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type GroupViewConfig = NumberFieldState &
  Readonly<{
    children: readonly Html[];
    classes?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type ButtonViewConfig<ParentMessage> = NumberFieldState &
  Readonly<{
    ariaLabel: string;
    onClick: ParentMessage;
    children: readonly Html[];
    classes?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type InputViewConfig<ParentMessage> = NumberFieldState &
  Readonly<{
    id: string;
    value: string;
    onInput: (value: string) => ParentMessage;
    ariaLabel: string;
    labelledById?: string | undefined;
    min?: number | undefined;
    max?: number | undefined;
    step?: number | undefined;
    classes?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  state: NumberFieldState
) => [
  ...(state.disabled === true ? [h.DataAttribute("disabled", "")] : []),
  ...(state.invalid === true ? [h.DataAttribute("invalid", "")] : []),
  ...(state.invalid === false ? [h.DataAttribute("valid", "")] : []),
  ...(state.focused === true ? [h.DataAttribute("focused", "")] : []),
];

export const rootView = <ParentMessage>({
  children,
  classes,
  style,
  ...state
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(numberFieldRootClasses, classes)),
    ],
    children
  );
};

export const scrubAreaView = <ParentMessage>({
  id,
  children,
  classes,
  style,
  ...state
}: ScrubAreaViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(numberFieldScrubAreaClasses, classes)),
    ],
    children
  );
};

export const groupView = <ParentMessage>({
  children,
  classes,
  style,
  ...state
}: GroupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(numberFieldGroupClasses, classes)),
    ],
    children
  );
};

const buttonView = <ParentMessage>({
  ariaLabel,
  onClick,
  children,
  classes,
  style,
  ...state
}: ButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel(ariaLabel),
      h.OnClick(onClick),
      ...(state.disabled === true ? [h.Disabled(true)] : []),
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(numberFieldButtonClasses, classes)),
    ],
    children
  );
};

export const decrementView = <ParentMessage>(
  config: ButtonViewConfig<ParentMessage>
): Html => buttonView(config);

export const incrementView = <ParentMessage>(
  config: ButtonViewConfig<ParentMessage>
): Html => buttonView(config);

export const inputView = <ParentMessage>({
  id,
  value,
  onInput,
  ariaLabel,
  labelledById,
  min,
  max,
  step,
  classes,
  style,
  ...state
}: InputViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.Id(id),
    h.Type("number"),
    h.Value(value),
    h.OnInput(onInput),
    h.AriaLabel(ariaLabel),
    ...(labelledById === undefined
      ? []
      : [h.Attribute("aria-labelledby", labelledById)]),
    ...(min === undefined ? [] : [h.Attribute("min", String(min))]),
    ...(max === undefined ? [] : [h.Attribute("max", String(max))]),
    ...(step === undefined ? [] : [h.Attribute("step", String(step))]),
    ...(state.invalid === undefined
      ? []
      : [h.Attribute("aria-invalid", state.invalid ? "true" : "false")]),
    ...(state.disabled === true ? [h.Disabled(true)] : []),
    ...stateAttributes(h, state),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(numberFieldInputClasses, classes)),
  ]);
};
