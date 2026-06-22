import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  fieldControlClasses,
  fieldDescriptionClasses,
  fieldErrorClasses,
  fieldItemClasses,
  fieldLabelClasses,
  fieldRootClasses,
  fieldValidityClasses,
} from "./view";

export {
  fieldControlClasses,
  fieldDescriptionClasses,
  fieldErrorClasses,
  fieldItemClasses,
  fieldLabelClasses,
  fieldRootClasses,
  fieldValidityClasses,
} from "./view";

export type FieldStyle = Readonly<Record<string, string>>;

export type FieldState = Readonly<{
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  invalid?: boolean | undefined;
  dirty?: boolean | undefined;
  touched?: boolean | undefined;
  filled?: boolean | undefined;
  focused?: boolean | undefined;
}>;

export type RootViewConfig = FieldState &
  Readonly<{
    children: readonly Html[];
    name?: string | undefined;
    className?: string | undefined;
    style?: FieldStyle | undefined;
  }>;

export type LabelViewConfig = Readonly<{
  children: readonly Html[];
  forId?: string | undefined;
  className?: string | undefined;
  style?: FieldStyle | undefined;
}>;

export type ControlViewConfig<ParentMessage> = FieldState &
  Readonly<{
    id: string;
    value: string;
    onInput: (value: string) => ParentMessage;
    describedByIds?: readonly string[] | undefined;
    ariaLabel?: string | undefined;
    name?: string | undefined;
    placeholder?: string | undefined;
    type?: string | undefined;
    className?: string | undefined;
    style?: FieldStyle | undefined;
  }>;

export type DescriptionViewConfig = Readonly<{
  id?: string | undefined;
  children: readonly Html[];
  className?: string | undefined;
  style?: FieldStyle | undefined;
}>;

export type ErrorViewConfig = Readonly<{
  id?: string | undefined;
  children: readonly Html[];
  show: boolean;
  className?: string | undefined;
  style?: FieldStyle | undefined;
}>;

export type ItemViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: FieldStyle | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  state: FieldState
) => [
  ...(state.disabled === true ? [h.DataAttribute("disabled", "")] : []),
  ...(state.required === true ? [h.DataAttribute("required", "")] : []),
  ...(state.invalid === true ? [h.DataAttribute("invalid", "")] : []),
  ...(state.invalid === false ? [h.DataAttribute("valid", "")] : []),
  ...(state.dirty === true ? [h.DataAttribute("dirty", "")] : []),
  ...(state.touched === true ? [h.DataAttribute("touched", "")] : []),
  ...(state.filled === true ? [h.DataAttribute("filled", "")] : []),
  ...(state.focused === true ? [h.DataAttribute("focused", "")] : []),
];

export const rootView = <ParentMessage>({
  children,
  name,
  className,
  style,
  ...state
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(name === undefined ? [] : [h.DataAttribute("name", name)]),
      ...stateAttributes(h, state),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(fieldRootClasses, className)),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  children,
  forId,
  className,
  style,
}: LabelViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.label(
    [
      ...(forId === undefined ? [] : [h.Attribute("for", forId)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(fieldLabelClasses, className)),
    ],
    children
  );
};

export const controlView = <ParentMessage>({
  id,
  value,
  onInput,
  describedByIds,
  ariaLabel,
  name,
  placeholder,
  type = "text",
  className,
  style,
  ...state
}: ControlViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const describedBy = describedByIds?.filter((item) => item !== "").join(" ");

  return h.input([
    h.Id(id),
    h.Type(type),
    h.Value(value),
    h.OnInput(onInput),
    ...(name === undefined ? [] : [h.Attribute("name", name)]),
    ...(placeholder === undefined ? [] : [h.Placeholder(placeholder)]),
    ...(describedBy === undefined || describedBy === ""
      ? []
      : [h.Attribute("aria-describedby", describedBy)]),
    ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
    ...(state.invalid === undefined
      ? []
      : [h.Attribute("aria-invalid", state.invalid ? "true" : "false")]),
    ...(state.required === true ? [h.Attribute("required", "")] : []),
    ...(state.disabled === true ? [h.Disabled(true)] : []),
    ...stateAttributes(h, state),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(fieldControlClasses, className)),
  ]);
};

export const descriptionView = <ParentMessage>({
  id,
  children,
  className,
  style,
}: DescriptionViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(fieldDescriptionClasses, className)),
    ],
    children
  );
};

export const errorView = <ParentMessage>({
  id,
  children,
  show,
  className,
  style,
}: ErrorViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      h.Attribute("role", "alert"),
      h.AriaHidden(!show),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(fieldErrorClasses, className)),
    ],
    show ? children : []
  );
};

export const itemView = <ParentMessage>({
  children,
  className,
  style,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(fieldItemClasses, className)),
    ],
    children
  );
};

export const validityView = <ParentMessage>(
  children: readonly Html[],
  className?: string
): Html => {
  const h = html<ParentMessage>();

  return h.p(
    [h.Class(cn(fieldValidityClasses, className))],
    children
  );
};
