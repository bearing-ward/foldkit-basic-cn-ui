import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  breadcrumbClassName,
  breadcrumbEllipsisClassName,
  breadcrumbItemClassName,
  breadcrumbLinkClassName,
  breadcrumbListClassName,
  breadcrumbPageClassName,
  breadcrumbSeparatorClassName,
} from "./view";

export {
  breadcrumbClassName,
  breadcrumbEllipsisClassName,
  breadcrumbItemClassName,
  breadcrumbLinkClassName,
  breadcrumbListClassName,
  breadcrumbPageClassName,
  breadcrumbSeparatorClassName,
};

/** Inline style object accepted by Foldkit h.Style. */
export type BreadcrumbStyle = Readonly<Record<string, string>>;

/** Root navigation config for the breadcrumb. */
export type RootViewConfig = Readonly<{
  /** Breadcrumb list content. */
  children: readonly Html[];
  /** Accessible label for the navigation landmark. */
  label?: string | undefined;
  /** Additional class names appended after default root classes. */
  className?: string | undefined;
  /** Optional inline styles. */
  style?: BreadcrumbStyle | undefined;
}>;

/** List config for breadcrumb ordered items. */
export type ListViewConfig = Readonly<{
  /** Breadcrumb item and separator children. */
  children: readonly Html[];
  className?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Item config for one breadcrumb level. */
export type ItemViewConfig = Readonly<{
  /** Link, page, ellipsis, or custom content. */
  children: readonly Html[];
  className?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Link config for navigable breadcrumb levels. */
export type LinkViewConfig = Readonly<{
  href: string;
  children: readonly (Html | string)[];
  className?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Current-page config for the final breadcrumb item. */
export type PageViewConfig = Readonly<{
  children: readonly (Html | string)[];
  className?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Separator config. */
export type SeparatorViewConfig = Readonly<{
  children?: readonly (Html | string)[] | undefined;
  className?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Ellipsis config for collapsed breadcrumb ranges. */
export type EllipsisViewConfig = Readonly<{
  label?: string | undefined;
  className?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

const classNames = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  label = "breadcrumb",
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.nav(
    [
      h.Attribute("aria-label", label),
      h.Class(classNames(breadcrumbClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const listView = <ParentMessage>({
  children,
  className,
  style,
}: ListViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.ol(
    [
      h.Class(classNames(breadcrumbListClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  children,
  className,
  style,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.li(
    [
      h.Class(classNames(breadcrumbItemClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
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
      h.Class(classNames(breadcrumbLinkClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const pageView = <ParentMessage>({
  children,
  className,
  style,
}: PageViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.span(
    [
      h.Attribute("aria-current", "page"),
      h.Class(classNames(breadcrumbPageClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const separatorView = <ParentMessage>({
  children = ["›"],
  className,
  style,
}: SeparatorViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  return h.li(
    [
      h.Attribute("aria-hidden", "true"),
      h.Class(classNames(breadcrumbSeparatorClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const ellipsisView = <ParentMessage>({
  label = "More",
  className,
  style,
}: EllipsisViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  return h.span(
    [
      h.Attribute("aria-label", label),
      h.Attribute("role", "img"),
      h.Class(classNames(breadcrumbEllipsisClassName, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    ["..."]
  );
};

export const view = <ParentMessage>(
  items: readonly Readonly<{ label: string; href?: string | undefined }>[],
  separator: string = "›"
): Html =>
  rootView<ParentMessage>({
    children: [
      listView<ParentMessage>({
        children: items.flatMap((item, index) => [
          itemView<ParentMessage>({
            children: [
              item.href === undefined
                ? pageView<ParentMessage>({ children: [item.label] })
                : linkView<ParentMessage>({
                    href: item.href,
                    children: [item.label],
                  }),
            ],
          }),
          ...(index === items.length - 1
            ? []
            : [separatorView<ParentMessage>({ children: [separator] })]),
        ]),
      }),
    ],
  });
