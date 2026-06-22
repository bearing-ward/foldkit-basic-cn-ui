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
  classes?: string;
  href?: string;
}>;
export type ItemPartViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string;
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
  classes,
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
        classes
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
  classes,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-group"),
      h.Class(cn(itemGroupClasses, classes)),
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
  classes,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-header"),
      h.Class(cn(itemHeaderClasses, classes)),
    ],
    children
  );
};

export const mediaView = <ParentMessage>({
  children,
  variant = "default",
  classes,
}: ItemMediaViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-media"),
      h.Class(
        cn(
          itemMediaClasses,
          itemMediaVariantClasses[variant],
          classes
        )
      ),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  classes,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-content"),
      h.Class(cn(itemContentClasses, classes)),
    ],
    children
  );
};

export const titleView = <ParentMessage>({
  children,
  classes,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.h3(
    [
      h.DataAttribute("slot", "item-title"),
      h.Class(cn(itemTitleClasses, classes)),
    ],
    children
  );
};

export const descriptionView = <ParentMessage>({
  children,
  classes,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.p(
    [
      h.DataAttribute("slot", "item-description"),
      h.Class(cn(itemDescriptionClasses, classes)),
    ],
    children
  );
};

export const actionsView = <ParentMessage>({
  children,
  classes,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-actions"),
      h.Class(cn(itemActionsClasses, classes)),
    ],
    children
  );
};

export const footerView = <ParentMessage>({
  children,
  classes,
}: ItemPartViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [
      h.DataAttribute("slot", "item-footer"),
      h.Class(cn(itemFooterClasses, classes)),
    ],
    children
  );
};
