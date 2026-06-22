import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  dropdownMenuBackdropClasses,
  dropdownMenuDestructiveItemClasses,
  dropdownMenuIconClasses,
  dropdownMenuIndicatorClasses,
  dropdownMenuInsetItemClasses,
  dropdownMenuItemClasses,
  dropdownMenuLabelClasses,
  dropdownMenuPopupClasses,
  dropdownMenuPortalClasses,
  dropdownMenuPositionerClasses,
  dropdownMenuRootClasses,
  dropdownMenuSeparatorClasses,
  dropdownMenuShortcutClasses,
  dropdownMenuSubContentClasses,
  dropdownMenuTriggerClasses,
} from "./view";

export {
  dropdownMenuBackdropClasses,
  dropdownMenuDestructiveItemClasses,
  dropdownMenuIconClasses,
  dropdownMenuIndicatorClasses,
  dropdownMenuInsetItemClasses,
  dropdownMenuItemClasses,
  dropdownMenuLabelClasses,
  dropdownMenuPopupClasses,
  dropdownMenuPortalClasses,
  dropdownMenuPositionerClasses,
  dropdownMenuRootClasses,
  dropdownMenuSeparatorClasses,
  dropdownMenuShortcutClasses,
  dropdownMenuSubContentClasses,
  dropdownMenuTriggerClasses,
} from "./view";

export type DropdownMenuStyle = Readonly<Record<string, string>>;

export type PartViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onToggle: ParentMessage;
  open?: boolean | undefined;
  classes?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  classes?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onSelect: ParentMessage;
  disabled?: boolean | undefined;
  inset?: boolean | undefined;
  destructive?: boolean | undefined;
  classes?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type CheckedItemViewConfig<ParentMessage> = ItemViewConfig<ParentMessage> &
  Readonly<{
    checked: boolean;
  }>;

export type RadioGroupViewConfig = Readonly<{
  children: readonly Html[];
  label?: string | undefined;
  classes?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type RadioItemViewConfig<ParentMessage> =
  ItemViewConfig<ParentMessage> &
    Readonly<{
      checked: boolean;
    }>;

export type SubTriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onOpen: ParentMessage;
  open?: boolean | undefined;
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const itemClasses = ({
  classes,
  inset = false,
  destructive = false,
}: Readonly<{
  classes?: string | undefined;
  inset?: boolean | undefined;
  destructive?: boolean | undefined;
}>): string =>
  [
    dropdownMenuItemClasses,
    inset ? dropdownMenuInsetItemClasses : undefined,
    destructive ? dropdownMenuDestructiveItemClasses : undefined,
    classes,
  ]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "dropdown-menu"),
      h.Class(cn(dropdownMenuRootClasses, classes)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onToggle,
  open = false,
  classes,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("aria-haspopup", "menu"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      h.DataAttribute("slot", "dropdown-menu-trigger"),
      ...(open ? [h.DataAttribute("open", "true")] : []),
      h.OnClick(onToggle),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(dropdownMenuTriggerClasses, classes)),
    ],
    children
  );
};

export const portalView = <ParentMessage>({
  open,
  children,
  classes,
  style,
}: PortalViewConfig): Html => {
  const h = html<ParentMessage>();

  if (!open) {
    return h.empty;
  }

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "dropdown-menu-portal"),
      h.Class(cn(dropdownMenuPortalClasses, classes)),
    ],
    children
  );
};

export const backdropView = <ParentMessage>({
  onClose,
  classes,
  style,
}: BackdropViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel("Close dropdown menu"),
      h.OnClick(onClose),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "dropdown-menu-backdrop"),
      h.Class(cn(dropdownMenuBackdropClasses, classes)),
    ],
    []
  );
};

export const positionerView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "dropdown-menu-positioner"),
      h.Class(cn(dropdownMenuPositionerClasses, classes)),
    ],
    children
  );
};

export const popupView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "menu"),
      h.DataAttribute("slot", "dropdown-menu-popup"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(dropdownMenuPopupClasses, classes)),
    ],
    children
  );
};

export const shortcutView = <ParentMessage>(shortcut: string): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "dropdown-menu-shortcut"),
      h.Class(dropdownMenuShortcutClasses),
    ],
    [shortcut]
  );
};

export const itemView = <ParentMessage>({
  onSelect,
  children,
  disabled = false,
  inset = false,
  destructive = false,
  classes,
  style,
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Disabled(disabled),
      h.DataAttribute("slot", "dropdown-menu-item"),
      ...(disabled
        ? [h.DataAttribute("disabled", "true")]
        : [h.OnClick(onSelect)]),
      ...(inset ? [h.DataAttribute("inset", "true")] : []),
      ...(destructive ? [h.DataAttribute("variant", "destructive")] : []),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(itemClasses({ classes, inset, destructive })),
    ],
    children
  );
};

export const checkboxItemView = <ParentMessage>({
  checked,
  onSelect,
  children,
  disabled = false,
  inset = false,
  classes,
  style,
}: CheckedItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitemcheckbox"),
      h.Attribute("aria-checked", checked ? "true" : "false"),
      h.Disabled(disabled),
      h.DataAttribute("slot", "dropdown-menu-checkbox-item"),
      ...(checked ? [h.DataAttribute("checked", "true")] : []),
      ...(disabled
        ? [h.DataAttribute("disabled", "true")]
        : [h.OnClick(onSelect)]),
      ...(inset ? [h.DataAttribute("inset", "true")] : []),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(itemClasses({ classes, inset })),
    ],
    children
  );
};

export const radioGroupView = <ParentMessage>({
  children,
  label,
  classes,
  style,
}: RadioGroupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "group"),
      ...(label === undefined ? [] : [h.AriaLabel(label)]),
      h.DataAttribute("slot", "dropdown-menu-radio-group"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classes ?? ""),
    ],
    children
  );
};

export const radioItemView = <ParentMessage>({
  checked,
  onSelect,
  children,
  disabled = false,
  inset = false,
  classes,
  style,
}: RadioItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitemradio"),
      h.Attribute("aria-checked", checked ? "true" : "false"),
      h.Disabled(disabled),
      h.DataAttribute("slot", "dropdown-menu-radio-item"),
      ...(checked ? [h.DataAttribute("checked", "true")] : []),
      ...(disabled
        ? [h.DataAttribute("disabled", "true")]
        : [h.OnClick(onSelect)]),
      ...(inset ? [h.DataAttribute("inset", "true")] : []),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(itemClasses({ classes, inset })),
    ],
    children
  );
};

export const subTriggerView = <ParentMessage>({
  onOpen,
  children,
  open = false,
  disabled = false,
  classes,
  style,
}: SubTriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Attribute("aria-haspopup", "menu"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      h.Disabled(disabled),
      h.DataAttribute("slot", "dropdown-menu-sub-trigger"),
      ...(open ? [h.DataAttribute("open", "true")] : []),
      ...(disabled
        ? [h.DataAttribute("disabled", "true")]
        : [h.OnClick(onOpen)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(itemClasses({ classes })),
    ],
    children
  );
};

export const subContentView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "menu"),
      h.DataAttribute("slot", "dropdown-menu-sub-content"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(dropdownMenuSubContentClasses, classes)),
    ],
    children
  );
};

export const itemIndicatorView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "dropdown-menu-item-indicator"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(dropdownMenuIndicatorClasses, classes)),
    ],
    children
  );
};

export const iconView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "dropdown-menu-icon"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(dropdownMenuIconClasses, classes)),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  children,
  classes,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "dropdown-menu-label"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(dropdownMenuLabelClasses, classes)),
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
      h.AriaHidden(true),
      h.DataAttribute("slot", "dropdown-menu-separator"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(dropdownMenuSeparatorClasses, classes)),
    ],
    []
  );
};
