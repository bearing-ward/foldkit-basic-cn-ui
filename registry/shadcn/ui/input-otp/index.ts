import type { Option } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  inputOtpGroupClasses,
  inputOtpRootClasses,
  inputOtpSeparatorClasses,
  inputOtpSlotClasses,
} from "./view";

export {
  inputOtpGroupClasses,
  inputOtpRootClasses,
  inputOtpSeparatorClasses,
  inputOtpSlotClasses,
} from "./view";

/** Shared style object for Input OTP anatomy helpers. */
export type InputOtpStyle = Readonly<Record<string, string>>;

/** Common disabled and invalid state forwarded to wrapper and slot attributes. */
export type InputOtpState = Readonly<{
  disabled?: boolean | undefined;
  invalid?: boolean | undefined;
}>;

/** Configures the root and group wrappers around OTP slots. */
export type ViewConfig = InputOtpState &
  Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  dir?: "ltr" | "rtl" | undefined;
  style?: InputOtpStyle | undefined;
}>;

/** Configures one controlled OTP slot input. */
export type SlotViewConfig<ParentMessage> = InputOtpState &
  Readonly<{
  id?: string | undefined;
  name?: string | undefined;
  value: string;
  ariaLabel: string;
  onInput: (value: string) => ParentMessage;
  onKeyDown?: ((key: string) => Option.Option<ParentMessage>) | undefined;
  inputMode?: string | undefined;
  pattern?: string | undefined;
  active?: boolean | undefined;
  className?: string | undefined;
  style?: InputOtpStyle | undefined;
}>;

/** Digits-only pattern matching shadcn/input-otp examples. */
export const REGEXP_ONLY_DIGITS = "[0-9]*";

/** Alphanumeric pattern matching shadcn/input-otp examples. */
export const REGEXP_ONLY_DIGITS_AND_CHARS = "[a-zA-Z0-9]*";

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  state: InputOtpState
) => [
  ...(state.disabled === true ? [h.DataAttribute("disabled", "")] : []),
  ...(state.invalid === true ? [h.DataAttribute("invalid", "")] : []),
];

const matchesPattern = (value: string, pattern: string): boolean =>
  new RegExp(`^(?:${pattern})$`, "u").test(value);

const patternCharacters = (value: string, pattern?: string): string =>
  pattern === undefined
    ? value
    : value
        .split("")
        .filter((character) => matchesPattern(character, pattern))
        .join("");

/** Renders the Input OTP root wrapper. */
export const rootView = <ParentMessage>({
  children,
  className,
  dir,
  style,
  ...state
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      ...(dir === undefined ? [] : [h.Attribute("dir", dir)]),
      h.DataAttribute("slot", "input-otp"),
      h.Class(cn(inputOtpRootClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

/** Renders a grouped set of adjacent OTP slots. */
export const groupView = <ParentMessage>({
  children,
  className,
  dir,
  style,
  ...state
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      ...(dir === undefined ? [] : [h.Attribute("dir", dir)]),
      h.DataAttribute("slot", "input-otp-group"),
      h.Class(cn(inputOtpGroupClasses, className)),
      h.Style(style ?? {}),
    ],
    children
  );
};

/** Renders one controlled OTP slot input. */
export const slotView = <ParentMessage>({
  id,
  name,
  value,
  ariaLabel,
  onInput,
  onKeyDown,
  inputMode,
  pattern,
  active = false,
  className,
  style,
  ...state
}: SlotViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
    ...(id === undefined ? [] : [h.Id(id)]),
    ...(name === undefined ? [] : [h.Name(name)]),
    h.Type("text"),
    h.Value(value),
    h.AriaLabel(ariaLabel),
    h.Autocomplete("one-time-code"),
    h.OnInput((nextValue) => onInput(patternCharacters(nextValue, pattern))),
    ...(onKeyDown === undefined
      ? []
      : [h.OnKeyDownPreventDefault((key) => onKeyDown(key))]),
    ...(inputMode === undefined ? [] : [h.Attribute("inputmode", inputMode)]),
    ...(pattern === undefined ? [] : [h.Attribute("pattern", pattern)]),
    ...(state.disabled === true ? [h.Disabled(true)] : []),
    ...(state.invalid === true ? [h.AriaInvalid(true)] : []),
    ...stateAttributes(h, state),
    h.DataAttribute("slot", "input-otp-slot"),
    h.DataAttribute("active", active ? "true" : "false"),
    h.DataAttribute("filled", value === "" ? "false" : "true"),
    h.Class(cn(inputOtpSlotClasses, className)),
    h.Style(style ?? {}),
  ]);
};

/** Renders an aria-hidden visual separator between OTP groups. */
export const separatorView = <ParentMessage>(): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "input-otp-separator"),
      h.Class(inputOtpSeparatorClasses),
    ],
    ["•"]
  );
};
