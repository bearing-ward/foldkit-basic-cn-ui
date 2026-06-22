import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  shadcnSelectContentClasses,
  shadcnSelectGroupClasses,
  shadcnSelectIconClasses,
  shadcnSelectItemClasses,
  shadcnSelectLabelClasses,
  shadcnSelectRootClasses,
  shadcnSelectScrollButtonClasses,
  shadcnSelectSeparatorClasses,
  shadcnSelectTriggerClasses,
  shadcnSelectValueClasses,
  shadcnSelectViewportClasses,
} from "./view";

export { descriptionId, view } from "../../../foldkit/ui/select";
export type { SelectAttributes, ViewConfig } from "../../../foldkit/ui/select";

export {
  shadcnSelectContentClasses,
  shadcnSelectGroupClasses,
  shadcnSelectIconClasses,
  shadcnSelectItemClasses,
  shadcnSelectLabelClasses,
  shadcnSelectRootClasses,
  shadcnSelectScrollButtonClasses,
  shadcnSelectSeparatorClasses,
  shadcnSelectTriggerClasses,
  shadcnSelectValueClasses,
  shadcnSelectViewportClasses,
} from "./view";

export type ShadcnSelectStyle = Readonly<Record<string, string>>;
export type ShadcnSelectChild = Html | string;

export type PartViewConfig = Readonly<{
  children: readonly ShadcnSelectChild[];
  classes?: string | undefined;
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
  classes?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

export type ValueViewConfig = Readonly<{
  children: readonly ShadcnSelectChild[];
  placeholder?: boolean | undefined;
  classes?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

export type ContentViewConfig = Readonly<{
  open: boolean;
  children: readonly ShadcnSelectChild[];
  classes?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
  testId?: string | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  selected: boolean;
  onSelect: ParentMessage;
  children: readonly ShadcnSelectChild[];
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

export type ScrollButtonViewConfig = Readonly<{
  direction: "up" | "down";
  classes?: string | undefined;
  style?: ShadcnSelectStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const partAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  baseClasses: string,
  classes: string | undefined,
  style: ShadcnSelectStyle | undefined,
  testId: string | undefined
) => [
  ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
  ...(style === undefined ? [] : [h.Style(style)]),
  h.Class(cn(baseClasses, classes)),
];

export const rootView = <ParentMessage>({
  children,
  classes,
  style,
  testId,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    partAttributes(
      h,
      shadcnSelectRootClasses,
      classes,
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
  classes,
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
      h.Class(cn(shadcnSelectTriggerClasses, classes)),
    ],
    children
  );
};

export const valueView = <ParentMessage>({
  children,
  placeholder = false,
  classes,
  style,
}: ValueViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      ...(placeholder ? [h.Attribute("data-placeholder", "")] : []),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(shadcnSelectValueClasses, classes)),
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
      h.Class(shadcnSelectIconClasses),
    ],
    ["v"]
  );
};

export const contentView = <ParentMessage>({
  open,
  children,
  classes,
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
        shadcnSelectContentClasses,
        classes,
        style,
        testId
      ),
    ],
    children
  );
};

export const viewportView = <ParentMessage>({
  children,
  classes,
  style,
  testId,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    partAttributes(
      h,
      shadcnSelectViewportClasses,
      classes,
      style,
      testId
    ),
    children
  );
};

export const groupView = <ParentMessage>({
  children,
  classes,
  style,
  testId,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      ...partAttributes(
        h,
        shadcnSelectGroupClasses,
        classes,
        style,
        testId
      ),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  children,
  classes,
  style,
  testId,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    partAttributes(
      h,
      shadcnSelectLabelClasses,
      classes,
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
  classes,
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
      h.Class(cn(shadcnSelectItemClasses, classes)),
    ],
    children
  );
};

export const separatorView = <ParentMessage>({
  classes,
  style,
}: Omit<PartViewConfig, "children">): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "separator"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(shadcnSelectSeparatorClasses, classes)),
    ],
    []
  );
};

export const scrollButtonView = <ParentMessage>({
  direction,
  classes,
  style,
}: ScrollButtonViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("aria-hidden", "true"),
      h.Attribute("data-direction", direction),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(shadcnSelectScrollButtonClasses, classes)),
    ],
    [direction === "up" ? "^" : "v"]
  );
};
