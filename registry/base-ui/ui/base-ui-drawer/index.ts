import { Option } from "effect";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  drawerBackdropClasses,
  drawerCloseClasses,
  drawerContentClasses,
  drawerDescriptionClasses,
  drawerPopupClasses,
  drawerPortalClasses,
  drawerRootClasses,
  drawerTitleClasses,
  drawerTriggerClasses,
  drawerViewportClasses,
} from "./view";

export {
  drawerBackdropClasses,
  drawerCloseClasses,
  drawerContentClasses,
  drawerDescriptionClasses,
  drawerPopupClasses,
  drawerPortalClasses,
  drawerRootClasses,
  drawerTitleClasses,
  drawerTriggerClasses,
  drawerViewportClasses,
} from "./view";

export type DrawerStyle = Readonly<Record<string, string>>;

export type DrawerState = Readonly<{
  open?: boolean | undefined;
}>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  id?: string | undefined;
  onClick: ParentMessage;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
  testId?: string | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type PartViewConfig = Readonly<{
  id?: string | undefined;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
  state?: DrawerState | undefined;
  testId?: string | undefined;
}>;

export type PopupViewConfig<ParentMessage> = Readonly<{
  titleId: string;
  descriptionId: string;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
  state?: DrawerState | undefined;
  modal?: boolean | undefined;
  testId?: string | undefined;
  onKeyDown?: ((key: string, shiftKey: boolean) => ParentMessage) | undefined;
  onPointerDown?:
    | ((screenX: number, screenY: number, pointerType: string) => ParentMessage)
    | undefined;
  onPointerMove?:
    | ((screenX: number, screenY: number, pointerType: string) => ParentMessage)
    | undefined;
  onPointerUp?:
    | ((screenX: number, screenY: number, pointerType: string) => ParentMessage)
    | undefined;
}>;

export type CloseViewConfig<ParentMessage> = Readonly<{
  id?: string | undefined;
  onClick: ParentMessage;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
  testId?: string | undefined;
}>;

export type FocusGuardViewConfig<ParentMessage> = Readonly<{
  onFocus: ParentMessage;
  testId?: string | undefined;
}>;

const cn = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const stateAttributes = <ParentMessage>(
  h: ReturnType<typeof html<ParentMessage>>,
  state?: DrawerState
) => {
  if (state === undefined || state.open === undefined) {
    return [];
  }

  return state.open
    ? [h.Attribute("data-open", "")]
    : [h.Attribute("data-closed", "")];
};

const partView = <ParentMessage>(
  tagName: "div" | "h2" | "p",
  baseClasses: string,
  { id, children, className, style, state, testId }: PartViewConfig
): Html => {
  const h = html<ParentMessage>();
  const attributes = [
    ...(id === undefined ? [] : [h.Id(id)]),
    ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
    ...(style === undefined ? [] : [h.Style(style)]),
    ...stateAttributes(h, state),
    h.Class(cn(baseClasses, className)),
  ];

  if (tagName === "h2") {
    return h.h2(attributes, children);
  }

  if (tagName === "p") {
    return h.p(attributes, children);
  }

  return h.div(attributes, children);
};

export const rootView = <ParentMessage>(config: RootViewConfig): Html =>
  partView<ParentMessage>("div", drawerRootClasses, config);

export const triggerView = <ParentMessage>({
  id,
  onClick,
  children,
  className,
  style,
  testId,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      h.Type("button"),
      h.OnClick(onClick),
      ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(drawerTriggerClasses, className)),
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
      h.Class(cn(drawerPortalClasses, className)),
    ],
    children
  );
};

export const backdropView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", drawerBackdropClasses, config);

export const viewportView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", drawerViewportClasses, config);

export const popupView = <ParentMessage>({
  titleId,
  descriptionId,
  children,
  className,
  style,
  state,
  modal = true,
  testId,
  onKeyDown,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: PopupViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.aside(
    [
      h.Attribute("role", "dialog"),
      h.Attribute("aria-modal", modal ? "true" : "false"),
      h.Attribute("aria-labelledby", titleId),
      h.Attribute("aria-describedby", descriptionId),
      h.Attribute("tabindex", "-1"),
      ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
      ...(onKeyDown === undefined
        ? []
        : [
            h.OnKeyDownPreventDefault((key, { shiftKey }) =>
              key === "Tab"
                ? Option.some(onKeyDown(key, shiftKey))
                : Option.none()
            ),
          ]),
      ...(onPointerDown === undefined
        ? []
        : [
            h.OnPointerDown((pointerType, _button, screenX, screenY) =>
              Option.some(onPointerDown(screenX, screenY, pointerType))
            ),
          ]),
      ...(onPointerMove === undefined
        ? []
        : [
            h.OnPointerMove((screenX, screenY, pointerType) =>
              Option.some(onPointerMove(screenX, screenY, pointerType))
            ),
          ]),
      ...(onPointerUp === undefined
        ? []
        : [
            h.OnPointerUp((screenX, screenY, pointerType) =>
              Option.some(onPointerUp(screenX, screenY, pointerType))
            ),
          ]),
      ...(style === undefined ? [] : [h.Style(style)]),
      ...stateAttributes(h, state),
      h.Class(cn(drawerPopupClasses, className)),
    ],
    children
  );
};

export const focusGuardView = <ParentMessage>({
  onFocus,
  testId,
}: FocusGuardViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.Tabindex(0),
      h.AriaHidden(true),
      ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
      h.OnFocus(onFocus),
      h.Class("sr-only"),
    ],
    []
  );
};

export const contentView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", drawerContentClasses, config);

export const titleView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("h2", drawerTitleClasses, config);

export const descriptionView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("p", drawerDescriptionClasses, config);

export const closeView = <ParentMessage>({
  id,
  onClick,
  children,
  className,
  style,
  testId,
}: CloseViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      ...(id === undefined ? [] : [h.Id(id)]),
      h.Type("button"),
      h.OnClick(onClick),
      ...(testId === undefined ? [] : [h.DataAttribute("testid", testId)]),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(drawerCloseClasses, className)),
    ],
    children
  );
};
