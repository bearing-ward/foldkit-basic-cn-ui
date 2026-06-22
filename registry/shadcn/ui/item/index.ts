import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  itemActionsClasses,
  itemClasses,
  itemContentClasses,
  itemDescriptionClasses,
  itemFooterClasses,
  itemGroupClasses,
  itemHeaderClasses,
  itemMediaClasses,
  itemMediaVariantClasses,
  itemSeparatorClasses,
  itemSizeClasses,
  itemTitleClasses,
  itemVariantClasses,
} from "./view";

export {
  itemActionsClasses,
  itemButtonClasses,
  itemClasses,
  itemContentClasses,
  itemDescriptionClasses,
  itemFooterClasses,
  itemGroupClasses,
  itemHeaderClasses,
  itemMediaClasses,
  itemMediaVariantClasses,
  itemSeparatorClasses,
  itemSizeClasses,
  itemTitleClasses,
  itemVariantClasses,
} from "./view";

export type ItemVariant = "default" | "outline" | "muted";
export type ItemSize = "default" | "sm" | "xs";
export type ItemMediaVariant = "default" | "icon" | "avatar" | "image";

export type ItemViewConfig = Readonly<{
  children: readonly (Html | string)[];
  variant?: ItemVariant;
  size?: ItemSize;
  className?: string;
  href?: string;
}>;
export type ItemPartViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
}>;
export type ItemMediaViewConfig = ItemPartViewConfig &
  Readonly<{ variant?: ItemMediaVariant }>;

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const view = <ParentMessage>({
  children,
  variant = "default",
  size = "default",
  className,
  href,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();
  const attributes = [
    h.DataAttribute("slot", "item"),
    h.Class(
      cn(
        itemClasses,
        itemVariantClasses[variant],
        itemSizeClasses[size],
        className
      )
    ),
  ];
  if (href !== undefined) {
    return h.a([h.Href(href), ...attributes], children);
  }
  return h.div(attributes, children);
};

export const groupView = <ParentMessage>({
  children,
  className,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-group"),
      h.Class(cn(itemGroupClasses, className)),
    ],
    children
  );
};

export const separatorView = <ParentMessage>(): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [h.Attribute("role", "separator"), h.Class(itemSeparatorClasses)],
    []
  );
};

export const headerView = <ParentMessage>({
  children,
  className,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-header"),
      h.Class(cn(itemHeaderClasses, className)),
    ],
    children
  );
};

export const mediaView = <ParentMessage>({
  children,
  variant = "default",
  className,
}: ItemMediaViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-media"),
      h.Class(
        cn(
          itemMediaClasses,
          itemMediaVariantClasses[variant],
          className
        )
      ),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  className,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-content"),
      h.Class(cn(itemContentClasses, className)),
    ],
    children
  );
};

export const titleView = <ParentMessage>({
  children,
  className,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.h3(
    [
      h.DataAttribute("slot", "item-title"),
      h.Class(cn(itemTitleClasses, className)),
    ],
    children
  );
};

export const descriptionView = <ParentMessage>({
  children,
  className,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.p(
    [
      h.DataAttribute("slot", "item-description"),
      h.Class(cn(itemDescriptionClasses, className)),
    ],
    children
  );
};

export const actionsView = <ParentMessage>({
  children,
  className,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-actions"),
      h.Class(cn(itemActionsClasses, className)),
    ],
    children
  );
};

export const footerView = <ParentMessage>({
  children,
  className,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-footer"),
      h.Class(cn(itemFooterClasses, className)),
    ],
    children
  );
};
