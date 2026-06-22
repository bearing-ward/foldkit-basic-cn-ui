import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  inputGroupAddonClassesByAlign,
  inputGroupButtonClasses,
  inputGroupClasses,
  inputGroupControlClasses,
  inputGroupIconButtonClasses,
  inputGroupTextareaClasses,
  inputGroupTextClasses,
} from "./view";
import type { InputGroupAddonAlign } from "./view";

export type { InputGroupAddonAlign };

export {
  inputGroupAddonClassesByAlign,
  inputGroupButtonClasses,
  inputGroupClasses,
  inputGroupControlClasses,
  inputGroupIconButtonClasses,
  inputGroupTextareaClasses,
  inputGroupTextClasses,
} from "./view";

export type ViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
}>;

export type AddonViewConfig = Readonly<{
  children: readonly (Html | string)[];
  align?: InputGroupAddonAlign;
  classes?: string;
}>;

export type InputViewConfig<ParentMessage> = Readonly<{
  placeholder?: string;
  ariaLabel?: string;
  value?: string;
  onInput?: ((value: string) => ParentMessage) | undefined;
  disabled?: boolean;
  name?: string;
  classes?: string;
}>;

export type TextareaViewConfig<ParentMessage> = Readonly<{
  placeholder?: string;
  ariaLabel?: string;
  value?: string;
  onInput?: ((value: string) => ParentMessage) | undefined;
  disabled?: boolean;
  name?: string;
  rows?: number;
  classes?: string;
}>;

export type ButtonViewConfig<ParentMessage> = Readonly<{
  children: readonly (Html | string)[];
  ariaLabel?: string;
  onClick?: ParentMessage;
  disabled?: boolean;
  icon?: boolean;
  classes?: string;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  children,
  classes,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "input-group"),
      h.Class(cn(inputGroupClasses, classes)),
    ],
    children
  );
};

export const addonView = <ParentMessage>({
  children,
  align = "InlineStart",
  classes,
}: AddonViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "input-group-addon"),
      h.DataAttribute("align", align),
      h.Class(cn(inputGroupAddonClassesByAlign(align), classes)),
    ],
    children
  );
};

export const inputView = <ParentMessage>({
  placeholder,
  ariaLabel,
  value,
  onInput,
  disabled = false,
  name,
  classes,
}: InputViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.DataAttribute("slot", "input-group-control"),
    h.Class(cn(inputGroupControlClasses, classes)),
    ...(placeholder === undefined ? [] : [h.Placeholder(placeholder)]),
    ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
    ...(value === undefined ? [] : [h.Value(value)]),
    ...(onInput === undefined ? [] : [h.OnChange(onInput)]),
    ...(name === undefined ? [] : [h.Name(name)]),
    ...(disabled ? [h.Disabled(true)] : []),
  ]);
};

export const textareaView = <ParentMessage>({
  placeholder,
  ariaLabel,
  value,
  onInput,
  disabled = false,
  name,
  rows,
  classes,
}: TextareaViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();

  return h.textarea(
    [
      h.DataAttribute("slot", "input-group-control"),
      h.Class(cn(inputGroupTextareaClasses, classes)),
      ...(placeholder === undefined ? [] : [h.Placeholder(placeholder)]),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(value === undefined ? [] : [h.Value(value)]),
      ...(onInput === undefined ? [] : [h.OnChange(onInput)]),
      ...(name === undefined ? [] : [h.Name(name)]),
      ...(rows === undefined ? [] : [h.Attribute("rows", String(rows))]),
      ...(disabled ? [h.Disabled(true)] : []),
    ],
    []
  );
};

export const buttonView = <ParentMessage>({
  children,
  ariaLabel,
  onClick,
  disabled = false,
  icon = false,
  classes,
}: ButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(onClick === undefined ? [] : [h.OnClick(onClick)]),
      ...(disabled ? [h.Disabled(true)] : []),
      h.Class(
        cn(
          icon ? inputGroupIconButtonClasses : inputGroupButtonClasses,
          classes
        )
      ),
    ],
    children
  );
};

export const textView = <ParentMessage>(
  children: readonly (Html | string)[],
  classes?: string
): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [h.Class(cn(inputGroupTextClasses, classes))],
    children
  );
};
