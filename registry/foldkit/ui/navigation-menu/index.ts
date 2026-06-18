import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  navigationMenuArrowClassName,
  navigationMenuContentClassName,
  navigationMenuItemClassName,
  navigationMenuLinkClassName,
  navigationMenuListClassName,
  navigationMenuPopupClassName,
  navigationMenuPortalClassName,
  navigationMenuPositionerClassName,
  navigationMenuRootClassName,
  navigationMenuTriggerClassName,
  navigationMenuViewportClassName,
} from "./view";

export {
  navigationMenuArrowClassName,
  navigationMenuContentClassName,
  navigationMenuItemClassName,
  navigationMenuLinkClassName,
  navigationMenuListClassName,
  navigationMenuPopupClassName,
  navigationMenuPortalClassName,
  navigationMenuPositionerClassName,
  navigationMenuRootClassName,
  navigationMenuTriggerClassName,
  navigationMenuViewportClassName,
} from "./view";

export type NavigationMenuStyle = Readonly<Record<string, string>>;

export type PartViewConfig = Readonly<{
  children: readonly Html[];
  className?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

export type TriggerViewConfig<ParentMessage> = Readonly<{
  open: boolean;
  onToggle: ParentMessage;
  children: readonly Html[];
  className?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

export type LinkViewConfig = Readonly<{
  href: string;
  children: readonly Html[];
  className?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

export type PortalViewConfig = Readonly<{
  open: boolean;
  children: readonly Html[];
  className?: string | undefined;
  style?: NavigationMenuStyle | undefined;
}>;

const classNames = (base: string, className?: string): string =>
  [base, className]
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

const divPartView = <ParentMessage>(
  baseClassName: string,
  { children, className, style }: PartViewConfig
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(baseClassName, className)),
    ],
    children
  );
};

export const rootView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuRootClassName, config);

export const listView = <ParentMessage>(config: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.nav(
    [
      h.Attribute("aria-label", "Main navigation"),
      h.Class(classNames(navigationMenuListClassName, config.className)),
      ...(config.style === undefined ? [] : [h.Style(config.style)]),
    ],
    config.children
  );
};

export const itemView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuItemClassName, config);

export const triggerView = <ParentMessage>({
  open,
  onToggle,
  children,
  className,
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
      h.Class(classNames(navigationMenuTriggerClassName, className)),
    ],
    children
  );
};

export const linkView = <ParentMessage>({
  href,
  children,
  className,
  style,
}: LinkViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.a(
    [
      h.Href(href),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(navigationMenuLinkClassName, className)),
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
      h.Class(classNames(navigationMenuPortalClassName, className)),
    ],
    children
  );
};

export const positionerView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuPositionerClassName, config);

export const popupView = <ParentMessage>(config: PartViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.Attribute("role", "menu"),
      ...(config.style === undefined ? [] : [h.Style(config.style)]),
      h.Class(classNames(navigationMenuPopupClassName, config.className)),
    ],
    config.children
  );
};

export const viewportView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuViewportClassName, config);

export const contentView = <ParentMessage>(config: PartViewConfig): Html =>
  divPartView<ParentMessage>(navigationMenuContentClassName, config);

export const arrowView = <ParentMessage>({
  className,
  style,
}: Omit<PartViewConfig, "children">): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      ...(style === undefined ? [] : [h.Style(style)]),
      h.Class(classNames(navigationMenuArrowClassName, className)),
    ],
    []
  );
};
