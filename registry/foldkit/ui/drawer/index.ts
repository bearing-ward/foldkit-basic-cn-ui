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

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  onClick: ParentMessage;
  children: readonly Html[];
  classes?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type PartViewConfig = Readonly<{
  id?: string | undefined;
  children: readonly Html[];
  classes?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type PopupViewConfig = Readonly<{
  titleId: string;
  descriptionId: string;
  children: readonly Html[];
  classes?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

export type CloseViewConfig<ParentMessage> = Readonly<{
  onClick: ParentMessage;
  children: readonly Html[];
  classes?: string | undefined;
  style?: DrawerStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const partView = <ParentMessage>(
  tagName: "div" | "h2" | "p",
  baseClasses: string,
  { id, children, classes, style }: PartViewConfig
): Html => {
  const h = html<ParentMessage>();
  const attributes = [
    ...(id === undefined ? [] : [h.Id(id)]),
    ...(style === undefined ? [] : [h.Style(style)]),
    h.Class(cn(baseClasses, classes)),
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
  onClick,
  children,
  classes,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onClick),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(drawerTriggerClasses, classes)),
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
      h.Class(cn(drawerPortalClasses, classes)),
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
  classes,
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
      h.Class(cn(drawerPopupClasses, classes)),
    ],
    children
  );
};

export const contentView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("div", drawerContentClasses, config);

export const titleView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("h2", drawerTitleClasses, config);

export const descriptionView = <ParentMessage>(config: PartViewConfig): Html =>
  partView<ParentMessage>("p", drawerDescriptionClasses, config);

export const closeView = <ParentMessage>({
  onClick,
  children,
  classes,
  style,
}: CloseViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(onClick),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(drawerCloseClasses, classes)),
    ],
    children
  );
};
