import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  navigationMenuArrowClasses,
  navigationMenuContentClasses,
  navigationMenuItemClasses,
  navigationMenuLinkClasses,
  navigationMenuListClasses,
  navigationMenuPopupClasses,
  navigationMenuPortalClasses,
  navigationMenuPositionerClasses,
  navigationMenuRootClasses,
  navigationMenuTriggerClasses,
  navigationMenuViewportClasses,
} from "./view";

export {
  navigationMenuArrowClasses,
  navigationMenuContentClasses,
  navigationMenuItemClasses,
  navigationMenuLinkClasses,
  navigationMenuListClasses,
  navigationMenuPopupClasses,
  navigationMenuPortalClasses,
  navigationMenuPositionerClasses,
  navigationMenuRootClasses,
  navigationMenuTriggerClasses,
  navigationMenuViewportClasses,
} from "./view";

export type NavigationMenuStyle = Readonly<Record<string, string>>;

export type PartViewConfig = Readonly<{
  children: readonly Html[];
  classes?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  open: boolean;
  onToggle: ParentMessage;
  children: readonly Html[];
  classes?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

export type LinkViewConfig = Readonly<{
  href: string;
  children: readonly Html[];
  classes?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  classes?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

const cn = (base: string, classes?: string): string =>
  [base, classes]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const divPartView = <ParentMessage>(
  baseClasses: string,
  { children, classes, style }: PartViewConfig
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(baseClasses, classes)),
    ],
    children
  );
};

export const rootView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuRootClasses, config);

export const listView = <ParentMessage>(config: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.nav(
    [
      h.Attribute("aria-label", "Main navigation"),
      h.Class(cn(navigationMenuListClasses, config.classes)),
      ...(config.style === undefined ? [] : [h.Style(config.style)]),
    ],
    config.children
  );
};

export const itemView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuItemClasses, config);

export const triggerView = <ParentMessage>({
  open,
  onToggle,
  children,
  classes,
  style,
}: TriggerViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.Attribute("aria-expanded", open ? "true" : "false"),
      h.Attribute("aria-haspopup", "menu"),
      ...(open ? [h.Attribute("data-open", "")] : []),
      h.OnClick(onToggle),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(navigationMenuTriggerClasses, classes)),
    ],
    children
  );
};

export const linkView = <ParentMessage>({
  href,
  children,
  classes,
  style,
}: LinkViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.a(
    [
      h.Href(href),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(navigationMenuLinkClasses, classes)),
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
      h.Class(cn(navigationMenuPortalClasses, classes)),
    ],
    children
  );
};

export const positionerView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuPositionerClasses, config);

export const popupView = <ParentMessage>(config: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "menu"),
      ...(config.style === undefined ? [] : [h.Style(config.style)]),
      h.Class(cn(navigationMenuPopupClasses, config.classes)),
    ],
    config.children
  );
};

export const viewportView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuViewportClasses, config);

export const contentView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuContentClasses, config);

export const arrowView = <ParentMessage>({
  classes,
  style,
}: Omit<PartViewConfig, "children">): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(cn(navigationMenuArrowClasses, classes)),
    ],
    []
  );
};
