import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  toolbarButtonClasses,
  toolbarGroupClasses,
  toolbarInputClasses,
  toolbarLinkClasses,
  toolbarRootClasses,
  toolbarSeparatorClasses,
} from "./view";

export {
  toolbarButtonClasses,
  toolbarGroupClasses,
  toolbarInputClasses,
  toolbarLinkClasses,
  toolbarRootClasses,
  toolbarSeparatorClasses,
} from "./view";

export type ToolbarOrientation = "horizontal" | "vertical";
export type ToolbarStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  ariaLabel?: string | undefined;
  orientation?: ToolbarOrientation | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: ToolbarStyle | undefined;
}>;

export type GroupViewConfig = Readonly<{
  children: readonly Html[];
  ariaLabel?: string | undefined;
  orientation?: ToolbarOrientation | undefined;
  className?: string | undefined;
  style?: ToolbarStyle | undefined;
}>;

export type ButtonViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  ariaLabel?: string | undefined;
  onClick?: ParentMessage | undefined;
  orientation?: ToolbarOrientation | undefined;
  disabled?: boolean | undefined;
  focusableWhenDisabled?: boolean | undefined;
  className?: string | undefined;
  style?: ToolbarStyle | undefined;
}>;

export type LinkViewConfig = Readonly<{
  href: string;
  children: readonly Html[];
  orientation?: ToolbarOrientation | undefined;
  className?: string | undefined;
  style?: ToolbarStyle | undefined;
}>;

export type InputViewConfig<ParentMessage> = Readonly<{
  value: string;
  onInput: (value: string) => ParentMessage;
  ariaLabel: string;
  orientation?: ToolbarOrientation | undefined;
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: ToolbarStyle | undefined;
}>;

export type SeparatorViewConfig = Readonly<{
  orientation?: ToolbarOrientation | undefined;
  className?: string | undefined;
  style?: ToolbarStyle | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  orientation: ToolbarOrientation,
  disabled: boolean,
  focusableWhenDisabled = true
) => [
  h.DataAttribute("orientation", orientation),
  ...(disabled ? [h.DataAttribute("disabled", "")] : []),
  ...(disabled && focusableWhenDisabled
    ? [h.DataAttribute("focusable", "")]
    : []),
];

export const rootView = <ParentMessage>({
  children,
  ariaLabel,
  orientation = "horizontal",
  disabled = false,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "toolbar"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...stateAttributes(h, orientation, disabled),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toolbarRootClasses, className)),
    ],
    children
  );
};

export const groupView = <ParentMessage>({
  children,
  ariaLabel,
  orientation = "horizontal",
  className,
  style,
}: GroupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      h.DataAttribute("orientation", orientation),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toolbarGroupClasses, className)),
    ],
    children
  );
};

export const buttonView = <ParentMessage>({
  children,
  ariaLabel,
  onClick,
  orientation = "horizontal",
  disabled = false,
  focusableWhenDisabled = true,
  className,
  style,
}: ButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      ...stateAttributes(h, orientation, disabled, focusableWhenDisabled),
      ...(disabled ? [h.Disabled(true)] : []),
      ...(disabled || onClick === undefined ? [] : [h.OnClick(onClick)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toolbarButtonClasses, className)),
    ],
    children
  );
};

export const linkView = <ParentMessage>({
  href,
  children,
  orientation = "horizontal",
  className,
  style,
}: LinkViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.a(
    [
      h.Href(href),
      h.DataAttribute("orientation", orientation),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toolbarLinkClasses, className)),
    ],
    children
  );
};

export const inputView = <ParentMessage>({
  value,
  onInput,
  ariaLabel,
  orientation = "horizontal",
  disabled = false,
  className,
  style,
}: InputViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
    h.Type("text"),
    h.Value(value),
    h.AriaLabel(ariaLabel),
    h.OnChange(onInput),
    h.OnInput(onInput),
    ...stateAttributes(h, orientation, disabled),
    ...(disabled ? [h.Disabled(true)] : []),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(toolbarInputClasses, className)),
  ]);
};

export const separatorView = <ParentMessage>({
  orientation = "vertical",
  className,
  style,
}: SeparatorViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "separator"),
      h.Attribute("aria-orientation", orientation),
      h.DataAttribute("orientation", orientation),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(toolbarSeparatorClasses, className)),
    ],
    []
  );
};
