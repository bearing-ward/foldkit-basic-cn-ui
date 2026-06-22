import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  menubarItemClasses,
  menubarMenuClasses,
  menubarPopupClasses,
  menubarRootClasses,
  menubarSeparatorClasses,
  menubarTriggerClasses,
} from "./view";

export {
  menubarItemClasses,
  menubarMenuClasses,
  menubarPopupClasses,
  menubarRootClasses,
  menubarSeparatorClasses,
  menubarTriggerClasses,
} from "./view";

export type MenubarStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: MenubarStyle | undefined;
}>;

export type MenuViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: MenubarStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onToggle?: ParentMessage | undefined;
  open?: boolean | undefined;
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: MenubarStyle | undefined;
}>;

export type PopupViewConfig = Readonly<{
  open?: boolean | undefined;
  children: readonly Html[];
  classes?: string | undefined;
  style?: MenubarStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  children: readonly Html[];
  onSelect?: ParentMessage | undefined;
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: MenubarStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  classes,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "menubar"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(menubarRootClasses, classes)),
    ],
    children
  );
};

export const menuView = <ParentMessage>({
  children,
  classes,
  style,
}: MenuViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(menubarMenuClasses, classes)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  children,
  onToggle,
  open = false,
  disabled = false,
  classes,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("role", "menuitem"),
      h.Attribute("aria-haspopup", "menu"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      ...(open ? [h.Attribute("data-open", "")] : []),
      ...(disabled ? [h.Disabled(true), h.Attribute("data-disabled", "")] : []),
      ...(onToggle === undefined ? [] : [h.OnClick(onToggle)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(menubarTriggerClasses, classes)),
    ],
    children
  );
};

export const popupView = <ParentMessage>({
  open = true,
  children,
  classes,
  style,
}: PopupViewConfig): Html => {
  const h = html<ParentMessage>();

  if (!open) {
    return h.div([h.Hidden(true)], []);
  }

  return h.div(
    [
      h.Attribute("role", "menu"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(menubarPopupClasses, classes)),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  children,
  onSelect,
  disabled = false,
  classes,
  style,
}: ItemViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "menuitem"),
      ...(disabled ? [h.Attribute("data-disabled", "")] : []),
      ...(onSelect === undefined ? [] : [h.OnClick(onSelect)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(menubarItemClasses, classes)),
    ],
    children
  );
};

export const separatorView = <ParentMessage>({
  classes,
  style,
}: Omit<MenuViewConfig, "children">): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "separator"),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(menubarSeparatorClasses, classes)),
    ],
    []
  );
};
