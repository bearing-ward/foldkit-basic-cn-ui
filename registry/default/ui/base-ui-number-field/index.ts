import { Option } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  numberFieldButtonClassName,
  numberFieldGroupClassName,
  numberFieldInputClassName,
  numberFieldRootClassName,
  numberFieldScrubAreaClassName,
  numberFieldScrubAreaCursorClassName,
} from "./view";

export {
  numberFieldButtonClassName,
  numberFieldGroupClassName,
  numberFieldInputClassName,
  numberFieldRootClassName,
  numberFieldScrubAreaClassName,
  numberFieldScrubAreaCursorClassName,
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
    className?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type ScrubAreaViewConfig<ParentMessage> = NumberFieldState &
  Readonly<{
    id?: string | undefined;
    testId?: string | undefined;
    children: readonly Html[];
    onPointerDown?: (screenX: number) => ParentMessage;
    onPointerMove?: (screenX: number) => ParentMessage;
    onPointerUp?: ParentMessage | undefined;
    className?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type ScrubAreaCursorViewConfig = NumberFieldState &
  Readonly<{
    children: readonly Html[];
    className?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type GroupViewConfig = NumberFieldState &
  Readonly<{
    children: readonly Html[];
    className?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

export type ButtonViewConfig<ParentMessage> = NumberFieldState &
  Readonly<{
    ariaLabel: string;
    onClick: ParentMessage;
    children: readonly Html[];
    className?: string | undefined;
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
    className?: string | undefined;
    style?: NumberFieldStyle | undefined;
  }>;

const classNames = (base: string, className?: string): string =>
  [base, className]
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
  className,
  style,
  ...state
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(numberFieldRootClassName, className)),
    ],
    children
  );
};

export const scrubAreaView = <ParentMessage>({
  id,
  testId,
  children,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  className,
  style,
  ...state
}: ScrubAreaViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
      ...(onPointerDown === undefined
        ? []
        : [
            h.OnPointerDown(
              (_pointerType, _button, screenX) =>
                Option.some(onPointerDown(screenX))
            ),
          ]),
      ...(onPointerMove === undefined
        ? []
        : [
            h.OnPointerMove((screenX) =>
              Option.some(onPointerMove(screenX))
            ),
          ]),
      ...(onPointerUp === undefined
        ? []
        : [h.OnPointerUp(() => Option.some(onPointerUp))]),
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(numberFieldScrubAreaClassName, className)),
    ],
    children
  );
};

export const scrubAreaCursorView = <ParentMessage>({
  children,
  className,
  style,
  ...state
}: ScrubAreaCursorViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(numberFieldScrubAreaCursorClassName, className)),
    ],
    children
  );
};

export const groupView = <ParentMessage>({
  children,
  className,
  style,
  ...state
}: GroupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(numberFieldGroupClassName, className)),
    ],
    children
  );
};

const buttonView = <ParentMessage>({
  ariaLabel,
  onClick,
  children,
  className,
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
      h.Class(classNames(numberFieldButtonClassName, className)),
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
  className,
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
    h.Class(classNames(numberFieldInputClassName, className)),
  ]);
};
