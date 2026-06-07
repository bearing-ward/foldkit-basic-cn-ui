import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  sidebarClassName,
  sidebarContentClassName,
  sidebarFooterClassName,
  sidebarGroupClassName,
  sidebarGroupLabelClassName,
  sidebarHeaderClassName,
  sidebarIconClassName,
  sidebarInsetClassName,
  sidebarLabelClassName,
  sidebarMenuButtonClassName,
  sidebarMenuClassName,
  sidebarMenuItemClassName,
  sidebarProviderClassName,
  sidebarRailClassName,
} from "./view";

export {
  sidebarClassName,
  sidebarContentClassName,
  sidebarFooterClassName,
  sidebarGroupClassName,
  sidebarGroupLabelClassName,
  sidebarHeaderClassName,
  sidebarIconClassName,
  sidebarInsetClassName,
  sidebarLabelClassName,
  sidebarMenuButtonClassName,
  sidebarMenuClassName,
  sidebarMenuItemClassName,
  sidebarProviderClassName,
  sidebarRailClassName,
} from "./view";

export type SidebarState = "expanded" | "collapsed";

export type SidebarMenuItem<ParentMessage> = Readonly<{
  label: string;
  icon: string;
  active?: boolean;
  href?: string;
  onClick?: ParentMessage;
}>;

type ViewConfig<ParentMessage> = Readonly<{
  children: readonly (Html | string)[];
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type SidebarViewConfig<ParentMessage> = ViewConfig<ParentMessage> &
  Readonly<{
    state?: SidebarState;
  }>;

export type SidebarMenuButtonViewConfig<ParentMessage> = Readonly<{
  item: SidebarMenuItem<ParentMessage>;
  state?: SidebarState;
  className?: string;
}>;

const classNames = (...values: readonly (string | undefined)[]): string =>
  values
    .filter((value): value is string => value !== undefined && value !== "")
    .join(" ");

export const providerView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-provider"),
      h.Class(classNames(sidebarProviderClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const sidebarView = <ParentMessage>({
  children,
  state = "expanded",
  className,
  attributes = [],
}: SidebarViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.aside(
    [
      h.DataAttribute("slot", "sidebar"),
      h.DataAttribute("state", state),
      h.AriaLabel("Application sidebar"),
      h.Class(classNames(sidebarClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const headerView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-header"),
      h.Class(classNames(sidebarHeaderClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const contentView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-content"),
      h.Class(classNames(sidebarContentClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const footerView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-footer"),
      h.Class(classNames(sidebarFooterClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const groupView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-group"),
      h.Class(classNames(sidebarGroupClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const groupLabelView = <ParentMessage>(
  label: string,
  state: SidebarState = "expanded"
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-group-label"),
      h.DataAttribute("state", state),
      h.Class(sidebarGroupLabelClassName),
    ],
    [label]
  );
};

export const menuView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.ul(
    [
      h.DataAttribute("slot", "sidebar-menu"),
      h.Class(classNames(sidebarMenuClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const menuItemView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.li(
    [
      h.DataAttribute("slot", "sidebar-menu-item"),
      h.Class(classNames(sidebarMenuItemClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const menuButtonView = <ParentMessage>({
  item,
  state = "expanded",
  className,
}: SidebarMenuButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const attributes = [
    h.DataAttribute("slot", "sidebar-menu-button"),
    h.DataAttribute("active", item.active === true ? "true" : "false"),
    h.AriaCurrent(item.active === true ? "page" : "false"),
    h.AriaLabel(item.label),
    h.Class(classNames(sidebarMenuButtonClassName, className)),
    ...(item.onClick === undefined ? [] : [h.OnClick(item.onClick)]),
  ];
  const children = [
    h.span(
      [
        h.DataAttribute("slot", "sidebar-menu-icon"),
        h.Class(sidebarIconClassName),
      ],
      [item.icon]
    ),
    h.span(
      [
        h.DataAttribute("slot", "sidebar-menu-label"),
        h.DataAttribute("state", state),
        h.Class(sidebarLabelClassName),
      ],
      [item.label]
    ),
  ];

  return item.href === undefined
    ? h.button(attributes, children)
    : h.a([h.Href(item.href), ...attributes], children);
};

export const railView = <ParentMessage>(): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.AriaHidden(true),
      h.DataAttribute("slot", "sidebar-rail"),
      h.Class(sidebarRailClassName),
    ],
    []
  );
};

export const insetView = <ParentMessage>({
  children,
  className,
  attributes = [],
}: ViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.main(
    [
      h.DataAttribute("slot", "sidebar-inset"),
      h.Class(classNames(sidebarInsetClassName, className)),
      ...attributes,
    ],
    children
  );
};

const hBrand = <ParentMessage>(
  icon: string,
  label: string,
  state: SidebarState
): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [h.Class("flex min-w-0 items-center gap-3")],
    [
      h.span([h.Class(sidebarIconClassName)], [icon]),
      h.span(
        [
          h.DataAttribute("slot", "sidebar-brand-label"),
          h.DataAttribute("state", state),
          h.Class(
            "truncate text-sm font-semibold text-gray-950 data-[state=collapsed]:sr-only"
          ),
        ],
        [label]
      ),
    ]
  );
};

export const view = <ParentMessage>({
  state = "expanded",
  items,
  children,
}: Readonly<{
  state?: SidebarState;
  items: readonly SidebarMenuItem<ParentMessage>[];
  children: readonly (Html | string)[];
}>): Html =>
  providerView<ParentMessage>({
    children: [
      sidebarView<ParentMessage>({
        state,
        children: [
          headerView<ParentMessage>({
            children: [hBrand<ParentMessage>("AC", "Acme Inc.", state)],
          }),
          contentView<ParentMessage>({
            children: [
              groupView<ParentMessage>({
                children: [
                  groupLabelView<ParentMessage>("Platform", state),
                  menuView<ParentMessage>({
                    children: items.map((item) =>
                      menuItemView<ParentMessage>({
                        children: [
                          menuButtonView<ParentMessage>({ item, state }),
                        ],
                      })
                    ),
                  }),
                ],
              }),
            ],
          }),
          footerView<ParentMessage>({
            children: [state === "expanded" ? "Team workspace" : "Team"],
          }),
        ],
      }),
      railView<ParentMessage>(),
      insetView<ParentMessage>({ children }),
    ],
  });
