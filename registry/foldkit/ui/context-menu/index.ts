import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  contextMenuBackdropClasses,
  contextMenuItemClasses,
  contextMenuPopupClasses,
  contextMenuPortalClasses,
  contextMenuPositionerClasses,
  contextMenuRootClasses,
  contextMenuSeparatorClasses,
  contextMenuTriggerClasses,
} from "./view";

export {
  contextMenuBackdropClasses,
  contextMenuItemClasses,
  contextMenuPopupClasses,
  contextMenuPortalClasses,
  contextMenuPositionerClasses,
  contextMenuRootClasses,
  contextMenuSeparatorClasses,
  contextMenuTriggerClasses,
} from "./view";

export type ContextMenuStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  onOpen: ParentMessage;
  children: readonly Html[];
  classes?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type PartViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  classes?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  onSelect: ParentMessage;
  children: readonly Html[];
  disabled?: boolean | undefined;
  classes?: string | undefined;
  style?: ContextMenuStyle | undefined;
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
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuRootClasses, classes)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  onOpen,
  children,
  classes,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("aria-haspopup", "menu"),
      h.OnClick(onOpen),
      h.OnContextMenu(onOpen),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuTriggerClasses, classes)),
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
    return h.div([h.Hidden(true)], []);
  }

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuPortalClasses, classes)),
    ],
    children
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
      h.Class(cn(contextMenuPositionerClasses, classes)),
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
      h.Attribute("aria-label", "Close context menu"),
      h.OnClick(onClose),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuBackdropClasses, classes)),
    ],
    []
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
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuPopupClasses, classes)),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
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
      h.Attribute("role", "menuitem"),
      h.Disabled(disabled),
      ...(disabled ? [h.Attribute("data-disabled", "")] : []),
      h.OnClick(onSelect),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuItemClasses, classes)),
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
      h.Class(cn(contextMenuSeparatorClasses, classes)),
    ],
    []
  );
};
