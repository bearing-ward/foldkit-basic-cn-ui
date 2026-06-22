import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  formControlClasses,
  formErrorClasses,
  formFieldClasses,
  formLabelClasses,
  formRootClasses,
  formSubmitClasses,
} from "./view";

export {
  formControlClasses,
  formErrorClasses,
  formFieldClasses,
  formLabelClasses,
  formRootClasses,
  formSubmitClasses,
} from "./view";

export type FormStyle = Readonly<Record<string, string>>;

export type FormState = Readonly<{
  disabled?: boolean | undefined;
  invalid?: boolean | undefined;
  submitting?: boolean | undefined;
}>;

export type RootViewConfig<ParentMessage> = FormState &
  Readonly<{
    onSubmit: ParentMessage;
    children: readonly Html[];
    classes?: string | undefined;
    style?: FormStyle | undefined;
  }>;

export type FieldViewConfig = FormState &
  Readonly<{
    children: readonly Html[];
    classes?: string | undefined;
    style?: FormStyle | undefined;
  }>;

export type LabelViewConfig = Readonly<{
  forId: string;
  children: readonly Html[];
  classes?: string | undefined;
  style?: FormStyle | undefined;
}>;

export type ControlViewConfig<ParentMessage> = FormState &
  Readonly<{
    id: string;
    value: string;
    onInput: (value: string) => ParentMessage;
    ariaLabel?: string | undefined;
    name?: string | undefined;
    type?: string | undefined;
    placeholder?: string | undefined;
    describedById?: string | undefined;
    classes?: string | undefined;
    style?: FormStyle | undefined;
  }>;

export type ErrorViewConfig = Readonly<{
  id?: string | undefined;
  show: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: FormStyle | undefined;
}>;

export type SubmitViewConfig = FormState &
  Readonly<{
    children: readonly Html[];
    classes?: string | undefined;
    style?: FormStyle | undefined;
  }>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  state: FormState
) => [
  ...(state.disabled === true ? [h.DataAttribute("disabled", "")] : []),
  ...(state.invalid === true ? [h.DataAttribute("invalid", "")] : []),
  ...(state.invalid === false ? [h.DataAttribute("valid", "")] : []),
  ...(state.submitting === true ? [h.DataAttribute("submitting", "")] : []),
];

export const rootView = <ParentMessage>({
  onSubmit,
  children,
  classes,
  style,
  ...state
}: RootViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.form(
    [
      h.OnSubmit(onSubmit),
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(formRootClasses, classes)),
    ],
    children
  );
};

export const fieldView = <ParentMessage>({
  children,
  classes,
  style,
  ...state
}: FieldViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(formFieldClasses, classes)),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  forId,
  children,
  classes,
  style,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.label(
    [
      h.Attribute("for", forId),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(formLabelClasses, classes)),
    ],
    children
  );
};

export const controlView = <ParentMessage>({
  id,
  value,
  onInput,
  ariaLabel,
  name,
  type = "text",
  placeholder,
  describedById,
  classes,
  style,
  ...state
}: ControlViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.Id(id),
    h.Type(type),
    h.Value(value),
    h.OnInput(onInput),
    ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
    ...(name === undefined ? [] : [h.Attribute("name", name)]),
    ...(placeholder === undefined ? [] : [h.Placeholder(placeholder)]),
    ...(describedById === undefined
      ? []
      : [h.Attribute("aria-describedby", describedById)]),
    ...(state.invalid === undefined
      ? []
      : [h.Attribute("aria-invalid", state.invalid ? "true" : "false")]),
    ...(state.disabled === true ? [h.Disabled(true)] : []),
    ...stateAttributes(h, state),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(formControlClasses, classes)),
  ]);
};

export const errorView = <ParentMessage>({
  id,
  show,
  children,
  classes,
  style,
}: ErrorViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      h.Attribute("role", "alert"),
      h.AriaHidden(!show),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(formErrorClasses, classes)),
    ],
    show ? children : []
  );
};

export const submitView = <ParentMessage>({
  children,
  classes,
  style,
  ...state
}: SubmitViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("submit"),
      ...(state.disabled === true || state.submitting === true
        ? [h.Disabled(true)]
        : []),
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(formSubmitClasses, classes)),
    ],
    children
  );
};
