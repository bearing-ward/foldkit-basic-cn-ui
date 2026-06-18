import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  inputGroupAddonClassNameByAlign,
  inputGroupButtonClassName,
  inputGroupClassName,
  inputGroupControlClassName,
  inputGroupIconButtonClassName,
  inputGroupTextareaClassName,
  inputGroupTextClassName,
} from "./view";
import type { InputGroupAddonAlign } from "./view";

export type { InputGroupAddonAlign };

export {
  inputGroupAddonClassNameByAlign,
  inputGroupButtonClassName,
  inputGroupClassName,
  inputGroupControlClassName,
  inputGroupIconButtonClassName,
  inputGroupTextareaClassName,
  inputGroupTextClassName,
} from "./view";

export type ViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;

export type AddonViewConfig = Readonly<{
  children: readonly (Html | string)[];
  align?: InputGroupAddonAlign;
  className?: string;
}>;

export type InputViewConfig<ParentMessage> = Readonly<{
  placeholder?: string;
  ariaLabel?: string;
  value?: string;
  onInput?: ((value: string) => ParentMessage) | undefined;
  disabled?: boolean;
  name?: string;
  className?: string;
}>;

export type TextareaViewConfig<ParentMessage> = Readonly<{
  placeholder?: string;
  ariaLabel?: string;
  value?: string;
  onInput?: ((value: string) => ParentMessage) | undefined;
  disabled?: boolean;
  name?: string;
  rows?: number;
  className?: string;
}>;

export type ButtonViewConfig<ParentMessage> = Readonly<{
  children: readonly (Html | string)[];
  ariaLabel?: string;
  onClick?: ParentMessage;
  disabled?: boolean;
  icon?: boolean;
  className?: string;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  children,
  className,
}: ViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "input-group"),
      h.Class(classNames(inputGroupClassName, className)),
    ],
    children
  );
};

export const addonView = <ParentMessage>({
  children,
  align = "InlineStart",
  className,
}: AddonViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      h.DataAttribute("slot", "input-group-addon"),
      h.DataAttribute("align", align),
      h.Class(classNames(inputGroupAddonClassNameByAlign(align), className)),
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
  className,
}: InputViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.DataAttribute("slot", "input-group-control"),
    h.Class(classNames(inputGroupControlClassName, className)),
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
  className,
}: TextareaViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();

  return h.textarea(
    [
      h.DataAttribute("slot", "input-group-control"),
      h.Class(classNames(inputGroupTextareaClassName, className)),
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
  className,
}: ButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...(onClick === undefined ? [] : [h.OnClick(onClick)]),
      ...(disabled ? [h.Disabled(true)] : []),
      h.Class(
        classNames(
          icon ? inputGroupIconButtonClassName : inputGroupButtonClassName,
          className
        )
      ),
    ],
    children
  );
};

export const textView = <ParentMessage>(
  children: readonly (Html | string)[],
  className?: string
): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [h.Class(classNames(inputGroupTextClassName, className))],
    children
  );
};
