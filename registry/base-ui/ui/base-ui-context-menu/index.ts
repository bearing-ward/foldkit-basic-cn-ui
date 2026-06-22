import { Option } from "effect";
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

export { contextMenuSubmenuPopupClasses } from "./view";

export type ContextMenuStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  onOpen: ParentMessage;
  onPointerDown?: (clientX: number, clientY: number) => ParentMessage;
  children: readonly Html[];
  className?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  className?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type PartViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: ContextMenuStyle | undefined;
  testId?: string | undefined;
}>;

export type BackdropViewConfig<ParentMessage> = Readonly<{
  onClose: ParentMessage;
  className?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

export type ItemViewConfig<ParentMessage> = Readonly<{
  onSelect: ParentMessage;
  children: readonly Html[];
  disabled?: boolean | undefined;
  className?: string | undefined;
  style?: ContextMenuStyle | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuRootClasses, className)),
    ],
    children
  );
};

export const triggerView = <ParentMessage>({
  onOpen,
  onPointerDown,
  children,
  className,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("aria-haspopup", "menu"),
      h.OnClick(onOpen),
      h.OnContextMenu(onOpen),
      ...(onPointerDown === undefined
        ? []
        : [
            h.OnPointerDown(
              (
                _pointerType,
                _button,
                _screenX,
                _screenY,
                _timeStamp,
                clientX,
                clientY
              ) => Option.some(onPointerDown(clientX, clientY))
            ),
          ]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuTriggerClasses, className)),
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
    return h.div([h.Hidden(true)], []);
  }

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuPortalClasses, className)),
    ],
    children
  );
};

export const positionerView = <ParentMessage>({
  children,
  className,
  style,
  testId,
}: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuPositionerClasses, className)),
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
      h.Attribute("aria-label", "Close context menu"),
      h.OnClick(onClose),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuBackdropClasses, className)),
    ],
    []
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
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuPopupClasses, className)),
    ],
    children
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
      ...(disabled ? [h.Attribute("data-disabled", "")] : []),
      h.OnClick(onSelect),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(contextMenuItemClasses, className)),
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
      h.Class(cn(contextMenuSeparatorClasses, className)),
    ],
    []
  );
};
