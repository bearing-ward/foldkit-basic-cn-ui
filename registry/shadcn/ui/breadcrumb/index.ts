import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  breadcrumbClasses,
  breadcrumbEllipsisClasses,
  breadcrumbItemClasses,
  breadcrumbLinkClasses,
  breadcrumbListClasses,
  breadcrumbPageClasses,
  breadcrumbSeparatorClasses,
} from "./view";

export {
  breadcrumbClasses,
  breadcrumbEllipsisClasses,
  breadcrumbItemClasses,
  breadcrumbLinkClasses,
  breadcrumbListClasses,
  breadcrumbPageClasses,
  breadcrumbSeparatorClasses,
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
  classes?: string | undefined;
  /** Optional inline styles. */
  style?: BreadcrumbStyle | undefined;
}>;

/** List config for breadcrumb ordered items. */
export type ListViewConfig = Readonly<{
  /** Breadcrumb item and separator children. */
  children: readonly Html[];
  classes?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Item config for one breadcrumb level. */
export type ItemViewConfig = Readonly<{
  /** Link, page, ellipsis, or custom content. */
  children: readonly Html[];
  classes?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Link config for navigable breadcrumb levels. */
export type LinkViewConfig = Readonly<{
  href: string;
  children: readonly (Html | string)[];
  classes?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Current-page config for the final breadcrumb item. */
export type PageViewConfig = Readonly<{
  children: readonly (Html | string)[];
  classes?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Separator config. */
export type SeparatorViewConfig = Readonly<{
  children?: readonly (Html | string)[] | undefined;
  classes?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

/** Ellipsis config for collapsed breadcrumb ranges. */
export type EllipsisViewConfig = Readonly<{
  label?: string | undefined;
  classes?: string | undefined;
  style?: BreadcrumbStyle | undefined;
}>;

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  label = "breadcrumb",
  classes,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.nav(
    [
      h.Attribute("aria-label", label),
      h.Class(cn(breadcrumbClasses, classes)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const listView = <ParentMessage>({
  children,
  classes,
  style,
}: ListViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.ol(
    [
      h.Class(cn(breadcrumbListClasses, classes)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const itemView = <ParentMessage>({
  children,
  classes,
  style,
}: ItemViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.li(
    [
      h.Class(cn(breadcrumbItemClasses, classes)),
      ...(style === undefined ? [] : [h.Style(style)]),
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
      h.Class(cn(breadcrumbLinkClasses, classes)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const pageView = <ParentMessage>({
  children,
  classes,
  style,
}: PageViewConfig): Html => {
  const h = html<ParentMessage>();
  return h.span(
    [
      h.Attribute("aria-current", "page"),
      h.Class(cn(breadcrumbPageClasses, classes)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const separatorView = <ParentMessage>({
  children = ["›"],
  classes,
  style,
}: SeparatorViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  return h.li(
    [
      h.Attribute("aria-hidden", "true"),
      h.Class(cn(breadcrumbSeparatorClasses, classes)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const ellipsisView = <ParentMessage>({
  label = "More",
  classes,
  style,
}: EllipsisViewConfig = {}): Html => {
  const h = html<ParentMessage>();
  return h.span(
    [
      h.Attribute("aria-label", label),
      h.Attribute("role", "img"),
      h.Class(cn(breadcrumbEllipsisClasses, classes)),
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
