import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  otpFieldInputClassName,
  otpFieldInputGroupClassName,
  otpFieldRootClassName,
  otpFieldSeparatorClassName,
} from "./view";

export {
  otpFieldInputClassName,
  otpFieldInputGroupClassName,
  otpFieldRootClassName,
  otpFieldSeparatorClassName,
} from "./view";

export type OtpFieldStyle = Readonly<Record<string, string>>;

export type OtpFieldState = Readonly<{
  disabled?: boolean | undefined;
  invalid?: boolean | undefined;
}>;

export type RootViewConfig = OtpFieldState &
  Readonly<{
    children: readonly Html[];
    className?: string | undefined;
    style?: OtpFieldStyle | undefined;
  }>;

export type InputGroupViewConfig = OtpFieldState &
  Readonly<{
    children: readonly Html[];
    ariaLabel: string;
    className?: string | undefined;
    style?: OtpFieldStyle | undefined;
  }>;

export type InputViewConfig<ParentMessage> = OtpFieldState &
  Readonly<{
    id: string;
    value: string;
    index: number;
    onInput: (value: string, index: number) => ParentMessage;
    ariaLabel: string;
    name?: string | undefined;
    className?: string | undefined;
    style?: OtpFieldStyle | undefined;
  }>;

export type SeparatorViewConfig = Readonly<{
  label?: string | undefined;
  className?: string | undefined;
  style?: OtpFieldStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  state: OtpFieldState
) => [
  ...(state.disabled === true ? [h.DataAttribute("disabled", "")] : []),
  ...(state.invalid === true ? [h.DataAttribute("invalid", "")] : []),
];

export const rootView = <ParentMessage>({
  children,
  className,
  style,
  ...state
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      h.Class(classNames(otpFieldRootClassName, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const inputGroupView = <ParentMessage>({
  children,
  ariaLabel,
  className,
  style,
  ...state
}: InputGroupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      h.Role("group"),
      h.AriaLabel(ariaLabel),
      h.Class(classNames(otpFieldInputGroupClassName, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

export const inputView = <ParentMessage>({
  id,
  value,
  index,
  onInput,
  ariaLabel,
  name,
  className,
  style,
  ...state
}: InputViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.Id(id),
    h.Type("text"),
    h.Value(value),
    h.OnInput((value) => onInput(value, index)),
    h.AriaLabel(ariaLabel),
    ...(name === undefined ? [] : [h.Name(name)]),
    h.Attribute("autocomplete", "one-time-code"),
    h.Attribute("inputmode", "numeric"),
    h.Attribute("maxlength", "1"),
    h.Attribute("pattern", "[0-9]*"),
    ...(state.disabled === true ? [h.Disabled(true)] : []),
    ...(state.invalid === true ? [h.Attribute("aria-invalid", "true")] : []),
    ...(value === "" ? [] : [h.DataAttribute("filled", "")]),
    ...stateAttributes(h, state),
    h.Class(classNames(otpFieldInputClassName, className)),
    h.Style(style ?? {}),
  ]);
};

export const separatorView = <ParentMessage>({
  label = "-",
  className,
  style,
}: SeparatorViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Attribute("aria-hidden", "true"),
      h.Class(classNames(otpFieldSeparatorClassName, className)),
      h.Style(style ?? {}),
    ],
    [label]
  );
};
