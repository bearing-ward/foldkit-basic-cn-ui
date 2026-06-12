import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  shadcnSelectContentClassName,
  shadcnSelectGroupClassName,
  shadcnSelectIconClassName,
  shadcnSelectItemClassName,
  shadcnSelectLabelClassName,
  shadcnSelectRootClassName,
  shadcnSelectScrollButtonClassName,
  shadcnSelectSeparatorClassName,
  shadcnSelectTriggerClassName,
  shadcnSelectValueClassName,
  shadcnSelectViewportClassName,
} from "./view";

export { descriptionId, view } from "../select";
export type { SelectAttributes, ViewConfig } from "../select";

export {
  shadcnSelectContentClassName,
  shadcnSelectGroupClassName,
  shadcnSelectIconClassName,
  shadcnSelectItemClassName,
  shadcnSelectLabelClassName,
  shadcnSelectRootClassName,
  shadcnSelectScrollButtonClassName,
  shadcnSelectSeparatorClassName,
  shadcnSelectTriggerClassName,
  shadcnSelectValueClassName,
  shadcnSelectViewportClassName,
} from "./view";

export type ShadcnSelectStyle = Readonly<Record<string, string>>;
export type ShadcnSelectChild = Html | string;

export type PartViewConfig = Readonly<{
  children: readonly ShadcnSelectChild[];
  className?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
  testId?: string | undefined;
}>;

export type RootViewConfig = PartViewConfig;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  open: boolean;
  onToggle: ParentMessage;
  children: readonly ShadcnSelectChild[];
  ariaLabel?: string | undefined;
  disabled?: boolean | undefined;
  invalid?: boolean | undefined;
  className?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

export type ValueViewConfig = Readonly<{
  children: readonly ShadcnSelectChild[];
  placeholder?: boolean | undefined;
  className?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

export type ContentViewConfig = Readonly<{
  open: boolean;
  children: readonly ShadcnSelectChild[];
  className?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
  testId?: string | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  selected: boolean;
  onSelect: ParentMessage;
  children: readonly ShadcnSelectChild[];
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

export type ScrollButtonViewConfig = Readonly<{
  direction: "up" | "down";
  className?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const partAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  baseClassName: string,
  className: string | undefined,
  style: ShadcnSelectStyle | undefined,
  testId: string | undefined
) => [
  ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
  ...(style === undefined ? [] : [h.Style(style)]),
  h.Class(classNames(baseClassName, className)),
];

export const rootView = <ParentMessage>({
  children,
  className,
  style,
  testId,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    partAttributes(
      h,
      shadcnSelectRootClassName,
      className,
      style,
      testId
    ),
    children
  );
};

export const triggerView = <ParentMessage>({
  open,
  onToggle,
  children,
  ariaLabel,
  disabled = false,
  invalid = false,
  className,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "combobox"),
      h.Attribute("aria-haspopup", "listbox"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      ...(ariaLabel === undefined ? [] : [h.AriaLabel(ariaLabel)]),
      h.Disabled(disabled),
      ...(invalid ? [h.Attribute("aria-invalid", "true")] : []),
      ...(invalid ? [h.Attribute("data-invalid", "")] : []),
      h.OnClick(onToggle),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnSelectTriggerClassName, className)),
    ],
    children
  );
};

export const valueView = <ParentMessage>({
  children,
  placeholder = false,
  className,
  style,
}: ValueViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(placeholder ? [h.Attribute("data-placeholder", "")] : []),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnSelectValueClassName, className)),
    ],
    children
  );
};

export const iconView = <ParentMessage>({
  open,
}: Readonly<{ open: boolean }>): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Attribute("aria-hidden", "true"),
      h.Attribute("data-state", open ? "open" : "closed"),
      h.Class(shadcnSelectIconClassName),
    ],
    ["v"]
  );
};

export const contentView = <ParentMessage>({
  open,
  children,
  className,
  style,
  testId,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  if (!open) {
    return h.div([h.Hidden(true)], []);
  }

  return h.div(
    [
      h.Attribute("role", "listbox"),
      h.Attribute("data-state", "open"),
      ...partAttributes(
        h,
        shadcnSelectContentClassName,
        className,
        style,
        testId
      ),
    ],
    children
  );
};

export const viewportView = <ParentMessage>({
  children,
  className,
  style,
  testId,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    partAttributes(
      h,
      shadcnSelectViewportClassName,
      className,
      style,
      testId
    ),
    children
  );
};

export const groupView = <ParentMessage>({
  children,
  className,
  style,
  testId,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      ...partAttributes(
        h,
        shadcnSelectGroupClassName,
        className,
        style,
        testId
      ),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  children,
  className,
  style,
  testId,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    partAttributes(
      h,
      shadcnSelectLabelClassName,
      className,
      style,
      testId
    ),
    children
  );
};

export const itemView = <ParentMessage>({
  selected,
  onSelect,
  children,
  disabled = false,
  className,
  style,
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "option"),
      h.Attribute("aria-selected", selected ? "true" : "false"),
      h.Attribute("data-state", selected ? "checked" : "unchecked"),
      h.Disabled(disabled),
      ...(disabled ? [h.Attribute("data-disabled", "")] : []),
      h.OnClick(onSelect),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnSelectItemClassName, className)),
    ],
    children
  );
};

export const separatorView = <ParentMessage>({
  className,
  style,
}: Omit<PartViewConfig, "children">): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "separator"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnSelectSeparatorClassName, className)),
    ],
    []
  );
};

export const scrollButtonView = <ParentMessage>({
  direction,
  className,
  style,
}: ScrollButtonViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("aria-hidden", "true"),
      h.Attribute("data-direction", direction),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(shadcnSelectScrollButtonClassName, className)),
    ],
    [direction === "up" ? "^" : "v"]
  );
};
