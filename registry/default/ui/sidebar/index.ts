import type { Attribute, Html } from "foldkit/html";
import { html } from "foldkit/html";

import {
  sidebarClassName,
  sidebarContainerClassName,
  sidebarContentClassName,
  sidebarFooterClassName,
  sidebarGapClassName,
  sidebarGroupActionClassName,
  sidebarGroupContentClassName,
  sidebarGroupClassName,
  sidebarGroupLabelClassName,
  sidebarHeaderClassName,
  sidebarIconClassName,
  sidebarInnerClassName,
  sidebarInputClassName,
  sidebarInsetClassName,
  sidebarLabelClassName,
  sidebarMenuActionClassName,
  sidebarMenuBadgeClassName,
  sidebarMenuButtonClassName,
  sidebarMenuClassName,
  sidebarMenuItemClassName,
  sidebarMenuSkeletonClassName,
  sidebarMenuSkeletonIconClassName,
  sidebarMenuSkeletonTextClassName,
  sidebarMenuSubButtonClassName,
  sidebarMenuSubClassName,
  sidebarMenuSubItemClassName,
  sidebarProviderClassName,
  sidebarRailClassName,
  sidebarSeparatorClassName,
  sidebarTriggerClassName,
} from "./view";

export {
  sidebarClassName,
  sidebarContainerClassName,
  sidebarContentClassName,
  sidebarFooterClassName,
  sidebarGapClassName,
  sidebarGroupActionClassName,
  sidebarGroupContentClassName,
  sidebarGroupClassName,
  sidebarGroupLabelClassName,
  sidebarHeaderClassName,
  sidebarIconClassName,
  sidebarInnerClassName,
  sidebarInputClassName,
  sidebarInsetClassName,
  sidebarLabelClassName,
  sidebarMenuActionClassName,
  sidebarMenuBadgeClassName,
  sidebarMenuButtonClassName,
  sidebarMenuClassName,
  sidebarMenuItemClassName,
  sidebarMenuSkeletonClassName,
  sidebarMenuSkeletonIconClassName,
  sidebarMenuSkeletonTextClassName,
  sidebarMenuSubButtonClassName,
  sidebarMenuSubClassName,
  sidebarMenuSubItemClassName,
  sidebarProviderClassName,
  sidebarRailClassName,
  sidebarSeparatorClassName,
  sidebarTriggerClassName,
} from "./view";

export type SidebarState = "expanded" | "collapsed";
export type SidebarSide = "left" | "right";
export type SidebarVariant = "sidebar" | "floating" | "inset";
export type SidebarCollapsible = "offcanvas" | "icon" | "none";

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

type OptionalChildrenViewConfig<ParentMessage> = Readonly<{
  children?: readonly (Html | string)[];
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

type ActionViewConfig<ParentMessage> = Readonly<{
  label: string;
  onClick?: ParentMessage;
  children?: readonly (Html | string)[];
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type SidebarViewConfig<ParentMessage> = ViewConfig<ParentMessage> &
  Readonly<{
    state?: SidebarState;
    side?: SidebarSide;
    variant?: SidebarVariant;
    collapsible?: SidebarCollapsible;
  }>;

export type SidebarMenuButtonViewConfig<ParentMessage> = Readonly<{
  item: SidebarMenuItem<ParentMessage>;
  state?: SidebarState;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline";
  className?: string;
  children?: readonly (Html | string)[];
}>;

export type SidebarInputViewConfig<ParentMessage> = Readonly<{
  label: string;
  value?: string;
  placeholder?: string;
  onInput?: (value: string) => ParentMessage;
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type SidebarMenuBadgeViewConfig<ParentMessage> = Readonly<{
  label: string;
  state?: SidebarState;
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type SidebarMenuSubButtonViewConfig<ParentMessage> = Readonly<{
  label: string;
  href?: string;
  onClick?: ParentMessage;
  active?: boolean;
  className?: string;
  attributes?: readonly Attribute<ParentMessage>[];
}>;

export type SidebarMenuSkeletonViewConfig = Readonly<{
  state?: SidebarState;
  showIcon?: boolean;
  width?: string;
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

export const triggerView = <ParentMessage>({
  label,
  onClick,
  children = ["Toggle Sidebar"],
  className,
  attributes = [],
}: ActionViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.DataAttribute("slot", "sidebar-trigger"),
      h.AriaLabel(label),
      h.Class(classNames(sidebarTriggerClassName, className)),
      ...(onClick === undefined ? [] : [h.OnClick(onClick)]),
      ...attributes,
    ],
    children
  );
};

export const sidebarView = <ParentMessage>({
  children,
  state = "expanded",
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  attributes = [],
}: SidebarViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  const stateCollapsible = state === "collapsed" ? collapsible : "";
  const sidebarAttributes = [
    h.DataAttribute("slot", "sidebar"),
    h.DataAttribute("sidebar", "sidebar"),
    h.DataAttribute("state", state),
    h.DataAttribute("side", side),
    h.DataAttribute("variant", variant),
    h.DataAttribute("collapsible", stateCollapsible),
    h.AriaLabel("Application sidebar"),
    h.Class(classNames(sidebarClassName, className)),
    ...attributes,
  ];

  if (collapsible === "none") {
    return h.aside(sidebarAttributes, [
      h.div(
        [
          h.DataAttribute("slot", "sidebar-inner"),
          h.DataAttribute("sidebar", "sidebar"),
          h.Class(classNames(sidebarContainerClassName, sidebarInnerClassName)),
        ],
        children
      ),
    ]);
  }

  return h.aside(sidebarAttributes, [
    h.div(
      [
        h.AriaHidden(true),
        h.DataAttribute("slot", "sidebar-gap"),
        h.DataAttribute("state", state),
        h.DataAttribute("side", side),
        h.DataAttribute("variant", variant),
        h.DataAttribute("collapsible", stateCollapsible),
        h.Class(sidebarGapClassName),
      ],
      []
    ),
    h.div(
      [
        h.DataAttribute("slot", "sidebar-container"),
        h.DataAttribute("state", state),
        h.DataAttribute("side", side),
        h.DataAttribute("variant", variant),
        h.DataAttribute("collapsible", stateCollapsible),
        h.Class(sidebarContainerClassName),
      ],
      [
        h.div(
          [
            h.DataAttribute("slot", "sidebar-inner"),
            h.DataAttribute("sidebar", "sidebar"),
            h.Class(sidebarInnerClassName),
          ],
          children
        ),
      ]
    ),
  ]);
};

export const inputView = <ParentMessage>({
  label,
  value,
  placeholder,
  onInput,
  className,
  attributes = [],
}: SidebarInputViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.input([
      h.DataAttribute("slot", "sidebar-input"),
      h.DataAttribute("sidebar", "input"),
    h.AriaLabel(label),
    h.Class(classNames(sidebarInputClassName, className)),
    ...(value === undefined ? [] : [h.Value(value)]),
    ...(placeholder === undefined ? [] : [h.Placeholder(placeholder)]),
    ...(onInput === undefined ? [] : [h.OnInput(onInput)]),
    ...attributes,
  ]);
};

export const separatorView = <ParentMessage>({
  className,
  attributes = [],
}: OptionalChildrenViewConfig<ParentMessage> = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-separator"),
      h.DataAttribute("sidebar", "separator"),
      h.Class(classNames(sidebarSeparatorClassName, className)),
      ...attributes,
    ],
    []
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
      h.DataAttribute("sidebar", "header"),
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
      h.DataAttribute("sidebar", "content"),
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
      h.DataAttribute("sidebar", "footer"),
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
      h.DataAttribute("sidebar", "group"),
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
      h.DataAttribute("sidebar", "group-label"),
      h.DataAttribute("state", state),
      h.Class(sidebarGroupLabelClassName),
    ],
    [label]
  );
};

export const groupActionView = <ParentMessage>({
  label,
  onClick,
  children = ["+"],
  className,
  attributes = [],
}: ActionViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.DataAttribute("slot", "sidebar-group-action"),
      h.DataAttribute("sidebar", "group-action"),
      h.AriaLabel(label),
      h.Class(classNames(sidebarGroupActionClassName, className)),
      ...(onClick === undefined ? [] : [h.OnClick(onClick)]),
      ...attributes,
    ],
    children
  );
};

export const groupContentView = <ParentMessage>({
  children = [],
  className,
  attributes = [],
}: OptionalChildrenViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-group-content"),
      h.DataAttribute("sidebar", "group-content"),
      h.Class(classNames(sidebarGroupContentClassName, className)),
      ...attributes,
    ],
    children
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
      h.DataAttribute("sidebar", "menu"),
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
      h.DataAttribute("sidebar", "menu-item"),
      h.Class(classNames(sidebarMenuItemClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const menuButtonView = <ParentMessage>({
  item,
  state = "expanded",
  size = "default",
  variant = "default",
  className,
  children: customChildren,
}: SidebarMenuButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const attributes = [
    h.DataAttribute("slot", "sidebar-menu-button"),
    h.DataAttribute("sidebar", "menu-button"),
    h.DataAttribute("active", item.active === true ? "true" : "false"),
    h.DataAttribute("size", size),
    h.DataAttribute("variant", variant),
    h.DataAttribute("state", state),
    h.AriaCurrent(item.active === true ? "page" : "false"),
    h.AriaLabel(item.label),
    h.Class(classNames(sidebarMenuButtonClassName, className)),
    ...(item.onClick === undefined ? [] : [h.OnClick(item.onClick)]),
  ];
  const children = customChildren ?? [
    h.span(
      [
      h.DataAttribute("slot", "sidebar-menu-icon"),
        h.DataAttribute("brand", size === "lg" ? "true" : "false"),
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
    ? h.button([h.Type("button"), ...attributes], children)
    : h.a([h.Href(item.href), ...attributes], children);
};

export const menuActionView = <ParentMessage>({
  label,
  onClick,
  children = ["..."],
  className,
  attributes = [],
}: ActionViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.DataAttribute("slot", "sidebar-menu-action"),
      h.DataAttribute("sidebar", "menu-action"),
      h.DataAttribute("show-on-hover", "false"),
      h.AriaLabel(label),
      h.Class(classNames(sidebarMenuActionClassName, className)),
      ...(onClick === undefined ? [] : [h.OnClick(onClick)]),
      ...attributes,
    ],
    children
  );
};

export const menuBadgeView = <ParentMessage>({
  label,
  state = "expanded",
  className,
  attributes = [],
}: SidebarMenuBadgeViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.span(
    [
      h.DataAttribute("slot", "sidebar-menu-badge"),
      h.DataAttribute("sidebar", "menu-badge"),
      h.DataAttribute("state", state),
      h.Class(classNames(sidebarMenuBadgeClassName, className)),
      ...attributes,
    ],
    [label]
  );
};

export const menuSubView = <ParentMessage>({
  children = [],
  className,
  attributes = [],
}: OptionalChildrenViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.ul(
    [
      h.DataAttribute("slot", "sidebar-menu-sub"),
      h.DataAttribute("sidebar", "menu-sub"),
      h.Class(classNames(sidebarMenuSubClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const menuSubItemView = <ParentMessage>({
  children = [],
  className,
  attributes = [],
}: OptionalChildrenViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();

  return h.li(
    [
      h.DataAttribute("slot", "sidebar-menu-sub-item"),
      h.DataAttribute("sidebar", "menu-sub-item"),
      h.Class(classNames(sidebarMenuSubItemClassName, className)),
      ...attributes,
    ],
    children
  );
};

export const menuSubButtonView = <ParentMessage>({
  label,
  href,
  onClick,
  active = false,
  className,
  attributes = [],
}: SidebarMenuSubButtonViewConfig<ParentMessage>): Html => {
  const h = html<ParentMessage>();
  const itemAttributes = [
    h.DataAttribute("slot", "sidebar-menu-sub-button"),
    h.DataAttribute("sidebar", "menu-sub-button"),
    h.DataAttribute("active", active === true ? "true" : "false"),
    h.AriaCurrent(active === true ? "page" : "false"),
    h.Class(classNames(sidebarMenuSubButtonClassName, className)),
    ...(onClick === undefined ? [] : [h.OnClick(onClick)]),
    ...attributes,
  ];

  return href === undefined
    ? h.button([h.Type("button"), ...itemAttributes], [label])
    : h.a([h.Href(href), ...itemAttributes], [label]);
};

export const menuSkeletonView = <ParentMessage>({
  state = "expanded",
  showIcon = true,
  width = "70%",
  className,
}: SidebarMenuSkeletonViewConfig = {}): Html => {
  const h = html<ParentMessage>();

  return h.div(
    [
      h.DataAttribute("slot", "sidebar-menu-skeleton"),
      h.DataAttribute("sidebar", "menu-skeleton"),
      h.Class(classNames(sidebarMenuSkeletonClassName, className)),
    ],
    [
      ...(showIcon === true
        ? [
            h.span(
              [
                h.AriaHidden(true),
                h.DataAttribute("slot", "sidebar-menu-skeleton-icon"),
                h.DataAttribute("sidebar", "menu-skeleton-icon"),
                h.Class(sidebarMenuSkeletonIconClassName),
              ],
              []
            ),
          ]
        : []),
      h.span(
        [
          h.AriaHidden(true),
          h.DataAttribute("slot", "sidebar-menu-skeleton-text"),
          h.DataAttribute("sidebar", "menu-skeleton-text"),
          h.DataAttribute("state", state),
          h.Style({ width }),
          h.Class(sidebarMenuSkeletonTextClassName),
        ],
        []
      ),
    ]
  );
};

export const railView = <ParentMessage>(
  onClick?: ParentMessage,
  side: SidebarSide = "left"
): Html => {
  const h = html<ParentMessage>();

  return h.button(
    [
      h.Type("button"),
      h.AriaLabel("Toggle Sidebar"),
      h.Title("Toggle Sidebar"),
      h.DataAttribute("slot", "sidebar-rail"),
      h.DataAttribute("sidebar", "rail"),
      h.DataAttribute("side", side),
      h.Class(sidebarRailClassName),
      ...(onClick === undefined ? [] : [h.OnClick(onClick)]),
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
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  items,
  children,
}: Readonly<{
  state?: SidebarState;
  side?: SidebarSide;
  variant?: SidebarVariant;
  collapsible?: SidebarCollapsible;
  items: readonly SidebarMenuItem<ParentMessage>[];
  children: readonly (Html | string)[];
}>): Html =>
  providerView<ParentMessage>({
    children: [
      sidebarView<ParentMessage>({
        state,
        side,
        variant,
        collapsible,
        children: [
          headerView<ParentMessage>({
            children: [hBrand<ParentMessage>("AC", "Acme Inc.", state)],
          }),
          contentView<ParentMessage>({
            children: [
              groupView<ParentMessage>({
                children: [
                  groupLabelView<ParentMessage>("Platform", state),
                  groupContentView<ParentMessage>({
                    children: [
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
