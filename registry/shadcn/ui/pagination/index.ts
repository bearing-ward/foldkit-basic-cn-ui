import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  paginationContentClasses,
  paginationEllipsisClasses,
  paginationItemClasses,
  paginationLinkBaseClasses,
  paginationPreviousNextClasses,
  paginationRootClasses,
} from "./view";

export {
  paginationContentClasses,
  paginationEllipsisClasses,
  paginationItemClasses,
  paginationLinkBaseClasses,
  paginationPreviousNextClasses,
  paginationRootClasses,
} from "./view";

export type PaginationStyle = Readonly<Record<string, string>>;

export type RootViewConfig = Readonly<{
  children: readonly Html[];
  label?: string;
  className?: string;
  style?: PaginationStyle;
}>;

export type ContentViewConfig = Readonly<{
  children: readonly Html[];
  className?: string;
  style?: PaginationStyle;
}>;

export type ItemViewConfig = Readonly<{
  children: readonly Html[];
  className?: string;
  style?: PaginationStyle;
}>;

export type LinkViewConfig = Readonly<{
  href: string;
  children: readonly (Html | string)[];
  label?: string;
  active?: boolean;
  disabled?: boolean;
  className?: string;
  style?: PaginationStyle;
}>;

export type PreviousNextViewConfig = Readonly<{
  href: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  style?: PaginationStyle;
}>;

export type EllipsisViewConfig = Readonly<{
  label?: string;
  className?: string;
  style?: PaginationStyle;
}>;

export type PageItem = Readonly<{
  page: number;
  href: string;
  active?: boolean;
}>;

const cn = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const rootView = <ParentMessage>({
  children,
  label = "pagination",
  className,
  style,
}: RootViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.nav(
    [
      h.Attribute("aria-label", label),
      h.DataAttribute("slot", "pagination"),
      h.Class(cn(paginationRootClasses, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  className,
  style,
}: ContentViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.ul(
    [
      h.DataAttribute("slot", "pagination-content"),
      h.Class(cn(paginationContentClasses, className)),
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
      h.DataAttribute("slot", "pagination-item"),
      h.Class(cn(paginationItemClasses, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const linkView = <ParentMessage>({
  href,
  children,
  label,
  active = false,
  disabled = false,
  className,
  style,
}: LinkViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.a(
    [
      h.Href(disabled ? "#" : href),
      h.DataAttribute("slot", "pagination-link"),
      h.DataAttribute("active", String(active)),
      h.DataAttribute("disabled", String(disabled)),
      ...(label === undefined ? [] : [h.AriaLabel(label)]),
      ...(active ? [h.AriaCurrent("page")] : []),
      h.Class(cn(paginationLinkBaseClasses, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    children
  );
};

export const previousView = <ParentMessage>({
  href,
  label = "Previous",
  disabled = false,
  className,
  style,
}: PreviousNextViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.a(
    [
      h.Href(disabled ? "#" : href),
      h.AriaLabel(label),
      h.DataAttribute("slot", "pagination-previous"),
      h.DataAttribute("disabled", String(disabled)),
      h.Class(cn(paginationPreviousNextClasses, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    ["Previous"]
  );
};

export const nextView = <ParentMessage>({
  href,
  label = "Next",
  disabled = false,
  className,
  style,
}: PreviousNextViewConfig): Html => {
  const h = html<ParentMessage>();

  return h.a(
    [
      h.Href(disabled ? "#" : href),
      h.AriaLabel(label),
      h.DataAttribute("slot", "pagination-next"),
      h.DataAttribute("disabled", String(disabled)),
      h.Class(cn(paginationPreviousNextClasses, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    ["Next"]
  );
};

export const ellipsisView = <ParentMessage>({
  label = "More pages",
  className,
  style,
}: EllipsisViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.AriaLabel(label),
      h.DataAttribute("slot", "pagination-ellipsis"),
      h.Class(cn(paginationEllipsisClasses, className)),
      ...(style === undefined ? [] : [h.Style(style)]),
    ],
    ["..."]
  );
};

export const view = <ParentMessage>(
  pages: readonly PageItem[],
  className?: string
): Html =>
  rootView<ParentMessage>({
    ...(className === undefined ? {} : { className }),
    children: [
      contentView<ParentMessage>({
        children: [
          itemView<ParentMessage>({
            children: [previousView<ParentMessage>({ href: "#" })],
          }),
          ...pages.map((page) =>
            itemView<ParentMessage>({
              children: [
                linkView<ParentMessage>({
                  href: page.href,
                  ...(page.active === undefined ? {} : { active: page.active }),
                  label: `Page ${page.page}`,
                  children: [String(page.page)],
                }),
              ],
            })
          ),
          itemView<ParentMessage>({
            children: [nextView<ParentMessage>({ href: "#" })],
          }),
        ],
      }),
    ],
  });
