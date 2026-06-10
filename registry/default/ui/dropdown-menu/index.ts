import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  dropdownMenuBackdropClassName,
  dropdownMenuItemClassName,
  dropdownMenuLabelClassName,
  dropdownMenuPopupClassName,
  dropdownMenuPortalClassName,
  dropdownMenuPositionerClassName,
  dropdownMenuRootClassName,
  dropdownMenuSeparatorClassName,
  dropdownMenuShortcutClassName,
  dropdownMenuTriggerClassName,
} from "./view";

export {
  dropdownMenuBackdropClassName,
  dropdownMenuItemClassName,
  dropdownMenuLabelClassName,
  dropdownMenuPopupClassName,
  dropdownMenuPortalClassName,
  dropdownMenuPositionerClassName,
  dropdownMenuRootClassName,
  dropdownMenuSeparatorClassName,
  dropdownMenuShortcutClassName,
  dropdownMenuTriggerClassName,
} from "./view";

export type DropdownMenuStyle = Readonly<Record<string, string>>;

export type PartViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onToggle: ParentMessage;
  open?: boolean | undefined;
  className?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  className?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  className?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onSelect: ParentMessage;
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: DropdownMenuStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  className,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "dropdown-menu"),
      h.Class(classNames(dropdownMenuRootClassName, className)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onToggle,
  open = false,
  className,
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
      h.Class(classNames(dropdownMenuTriggerClassName, className)),
    ],
    children
  );
};

export const portalView = <ParentMessage>({
  open,
  children,
  className,
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
      h.Class(classNames(dropdownMenuPortalClassName, className)),
    ],
    children
  );
};

export const backdropView = <ParentMessage>({
  onClose,
  className,
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
      h.Class(classNames(dropdownMenuBackdropClassName, className)),
    ],
    []
  );
};

export const positionerView = <ParentMessage>({
  children,
  className,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.DataAttribute("slot", "dropdown-menu-positioner"),
      h.Class(classNames(dropdownMenuPositionerClassName, className)),
    ],
    children
  );
};

export const popupView = <ParentMessage>({
  children,
  className,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "menu"),
      h.DataAttribute("slot", "dropdown-menu-popup"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(dropdownMenuPopupClassName, className)),
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
      h.Class(dropdownMenuShortcutClassName),
    ],
    [shortcut]
  );
};

export const itemView = <ParentMessage>({
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
      h.Attribute("role", "menuitem"),
      h.Disabled(disabled),
      h.DataAttribute("slot", "dropdown-menu-item"),
      ...(disabled
        ? [h.DataAttribute("disabled", "true")]
        : [h.OnClick(onSelect)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(dropdownMenuItemClassName, className)),
    ],
    children
  );
};

export const labelView = <ParentMessage>({
  children,
  className,
  style,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "dropdown-menu-label"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(dropdownMenuLabelClassName, className)),
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
      h.AriaHidden(true),
      h.DataAttribute("slot", "dropdown-menu-separator"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(dropdownMenuSeparatorClassName, className)),
    ],
    []
  );
};
