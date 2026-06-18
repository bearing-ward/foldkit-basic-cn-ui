import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  drawerBackdropClassName,
  drawerCloseClassName,
  drawerContentClassName,
  drawerDescriptionClassName,
  drawerPopupClassName,
  drawerPortalClassName,
  drawerRootClassName,
  drawerTitleClassName,
  drawerTriggerClassName,
  drawerViewportClassName,
} from "./view";

export {
  drawerBackdropClassName,
  drawerCloseClassName,
  drawerContentClassName,
  drawerDescriptionClassName,
  drawerPopupClassName,
  drawerPortalClassName,
  drawerRootClassName,
  drawerTitleClassName,
  drawerTriggerClassName,
  drawerViewportClassName,
} from "./view";

export type DrawerStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  onClick: ParentMessage;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
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
}>;

export type PopupViewConfig = Readonly<{
  titleId: string;
  descriptionId: string;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type CloseViewConfig<ParentMessage> = Readonly<{
  onClick: ParentMessage;
  children: readonly Html[];
  className?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const partView = <ParentMessage>(
  tagName: "div" | "h2" | "p",
  baseClassName: string,
  { id, children, className, style }: PartViewConfig
): Html => {
  const h = html<ParentMessage>();
  const attributes = [
    ...(id === undefined ? [] : [h.Id(id)]),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(classNames(baseClassName, className)),
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
  partView<ParentMessage>("div", drawerRootClassName, config);

export const triggerView = <ParentMessage>({
  onClick,
  children,
  className,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onClick),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(drawerTriggerClassName, className)),
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
      h.Class(classNames(drawerPortalClassName, className)),
    ],
    children
  );
};

export const backdropView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", drawerBackdropClassName, config);

export const viewportView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", drawerViewportClassName, config);

export const popupView = <ParentMessage>({
  titleId,
  descriptionId,
  children,
  className,
  style,
}: PopupViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.aside(
    [
      h.Attribute("role", "dialog"),
      h.Attribute("aria-modal", "true"),
      h.Attribute("aria-labelledby", titleId),
      h.Attribute("aria-describedby", descriptionId),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(drawerPopupClassName, className)),
    ],
    children
  );
};

export const contentView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", drawerContentClassName, config);

export const titleView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("h2", drawerTitleClassName, config);

export const descriptionView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("p", drawerDescriptionClassName, config);

export const closeView = <ParentMessage>({
  onClick,
  children,
  className,
  style,
}: CloseViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onClick),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(drawerCloseClassName, className)),
    ],
    children
  );
};
