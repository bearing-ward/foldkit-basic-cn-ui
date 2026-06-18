import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  itemActionsClassName,
  itemClassName,
  itemContentClassName,
  itemDescriptionClassName,
  itemFooterClassName,
  itemGroupClassName,
  itemHeaderClassName,
  itemMediaClassName,
  itemMediaVariantClassNames,
  itemSeparatorClassName,
  itemSizeClassNames,
  itemTitleClassName,
  itemVariantClassNames,
} from "./view";

export {
  itemActionsClassName,
  itemButtonClassName,
  itemClassName,
  itemContentClassName,
  itemDescriptionClassName,
  itemFooterClassName,
  itemGroupClassName,
  itemHeaderClassName,
  itemMediaClassName,
  itemMediaVariantClassNames,
  itemSeparatorClassName,
  itemSizeClassNames,
  itemTitleClassName,
  itemVariantClassNames,
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

const classNames = (...values: readonly (string | undefined)[]): string =>
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
      classNames(
        itemClassName,
        itemVariantClassNames[variant],
        itemSizeClassNames[size],
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
      h.Class(classNames(itemGroupClassName, className)),
    ],
    children
  );
};

export const separatorView = <ParentMessage>(): Html => {
  const h = html<ParentMessage>();
  return h.div(
    [h.Attribute("role", "separator"), h.Class(itemSeparatorClassName)],
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
      h.Class(classNames(itemHeaderClassName, className)),
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
        classNames(
          itemMediaClassName,
          itemMediaVariantClassNames[variant],
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
      h.Class(classNames(itemContentClassName, className)),
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
      h.Class(classNames(itemTitleClassName, className)),
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
      h.Class(classNames(itemDescriptionClassName, className)),
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
      h.Class(classNames(itemActionsClassName, className)),
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
      h.Class(classNames(itemFooterClassName, className)),
    ],
    children
  );
};
