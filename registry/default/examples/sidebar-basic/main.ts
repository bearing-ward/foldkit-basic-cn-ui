import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Sidebar from "../../ui/sidebar";

// MODEL

export const Model = S.Struct({
  state: S.Union([S.Literal("expanded"), S.Literal("collapsed")]),
  selectedLabel: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleSidebar = m("ClickedToggleSidebar");
export const ClickedSelectSidebarItem = m("ClickedSelectSidebarItem", {
  label: S.String,
});
export const Message = S.Union([
  ClickedToggleSidebar,
  ClickedSelectSidebarItem,
]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

export const init = (): UpdateReturn => [
  { selectedLabel: "Models", state: "expanded" },
  [],
];

// UPDATE

export const update = (model: Model, message: Message): UpdateReturn =>
  M.value(message).pipe(
    M.withReturnType<UpdateReturn>(),
    M.tagsExhaustive({
      ClickedToggleSidebar: () => [
        evo(model, {
          state: (state) => (state === "expanded" ? "collapsed" : "expanded"),
        }),
        [],
      ],
      ClickedSelectSidebarItem: ({ label }) => [
        evo(model, { selectedLabel: () => label }),
        [],
      ],
    })
  );

// VIEW

type NavItem = Readonly<{
  label: string;
  icon: IconName;
  muted?: boolean;
  hasChevron?: boolean;
}>;

type IconName =
  | "app"
  | "models"
  | "book"
  | "settings"
  | "hash"
  | "chart"
  | "map"
  | "more"
  | "chevron-right"
  | "chevron-down"
  | "panel";

const primaryItems: readonly NavItem[] = [
  { label: "Models", icon: "models", hasChevron: true },
  { label: "Documentation", icon: "book", hasChevron: true },
  { label: "Settings", icon: "settings", hasChevron: true },
];

const projectItems: readonly NavItem[] = [
  { label: "Design Engineering", icon: "hash", hasChevron: false },
  { label: "Sales & Marketing", icon: "chart", hasChevron: false },
  { label: "Travel", icon: "map", hasChevron: false },
  { label: "More", icon: "more", muted: true, hasChevron: false },
];

const iconPath = (name: IconName): string =>
  ({
    app: "M6 7h12M6 11h12M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    models:
      "M5 7h14M5 7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
    book: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15Z",
    settings: "M4 8h7M15 8h5M13 8a2 2 0 1 0-4 0 2 2 0 0 0 4 0ZM4 16h3M11 16h9M11 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z",
    hash: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
    chart: "M21 12a9 9 0 1 1-9-9v9h9ZM12 3a9 9 0 0 1 9 9",
    map: "M9 18 3 21V6l6-3 6 3 6-3v15l-6 3-6-3ZM9 3v15M15 6v15",
    more: "M5 12h.01M12 12h.01M19 12h.01",
    "chevron-right": "m9 18 6-6-6-6",
    "chevron-down": "m6 9 6 6 6-6",
    panel: "M3 5h18v14H3V5ZM9 5v14",
  })[name];

const iconView = (
  h: ReturnType<typeof html<Message>>,
  icon: IconName,
  className = ""
): Html =>
  h.svg(
    [
      h.AriaHidden(true),
      h.Class(
        `size-6 shrink-0 text-black ${className}`
      ),
      h.Xmlns("http://www.w3.org/2000/svg"),
      h.ViewBox("0 0 24 24"),
      h.Fill("none"),
      h.Stroke("currentColor"),
      h.StrokeWidth("2"),
      h.StrokeLinecap("round"),
      h.StrokeLinejoin("round"),
    ],
    [h.path([h.D(iconPath(icon))], [])]
  );

const chevronView = (
  h: ReturnType<typeof html<Message>>,
  state: Sidebar.SidebarState,
  icon: IconName = "chevron-right"
): Html =>
  h.svg(
    [
      h.AriaHidden(true),
      h.DataAttribute("state", state),
      h.Class(
        "ml-auto size-5 text-black data-[state=collapsed]:hidden"
      ),
      h.Xmlns("http://www.w3.org/2000/svg"),
      h.ViewBox("0 0 24 24"),
      h.Fill("none"),
      h.Stroke("currentColor"),
      h.StrokeWidth("2"),
      h.StrokeLinecap("round"),
      h.StrokeLinejoin("round"),
    ],
    [h.path([h.D(iconPath(icon))], [])]
  );

const accountHeader = (
  h: ReturnType<typeof html<Message>>,
  state: Sidebar.SidebarState
): Html =>
  Sidebar.menuView<Message>({
    children: [
      Sidebar.menuItemView<Message>({
        children: [
          Sidebar.menuButtonView<Message>({
            item: {
              active: false,
              icon: "app",
              label: "Acme Inc",
              onClick: ClickedSelectSidebarItem({ label: "Acme Inc" }),
            },
            size: "lg",
            state,
            className:
              "h-16 rounded-none px-0 hover:bg-transparent data-[active=true]:bg-transparent",
            children: [
              h.span(
                [
                  h.AriaHidden(true),
                  h.Class(
                    "flex size-12 shrink-0 items-center justify-center rounded-2xl bg-black text-2xl leading-none text-white"
                  ),
                ],
                [iconView(h, "app", "size-7 text-white")]
              ),
              h.span(
                [
                  h.DataAttribute("state", state),
                  h.Class(
                    "grid min-w-0 flex-1 text-left leading-tight data-[state=collapsed]:sr-only"
                  ),
                ],
                [
                  h.span(
                    [h.Class("truncate text-xl font-semibold text-black")],
                    ["Acme Inc"]
                  ),
                  h.span([h.Class("truncate text-base text-black")], ["Enterprise"]),
                ]
              ),
              chevronView(h, state, "chevron-down"),
            ],
          }),
        ],
      }),
    ],
  });

const navButtonView = (
  h: ReturnType<typeof html<Message>>,
  state: Sidebar.SidebarState,
  item: NavItem,
  activeLabel: string
): Html =>
  Sidebar.menuItemView<Message>({
    children: [
      Sidebar.menuButtonView<Message>({
        item: {
          active: activeLabel === item.label,
          icon: item.icon,
          label: item.label,
          onClick: ClickedSelectSidebarItem({ label: item.label }),
        },
        state,
        className:
          "h-11 rounded-none px-0 text-xl font-normal text-black hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:font-normal data-[active=true]:text-black",
        children: [
          iconView(h, item.icon, item.muted === true ? "text-neutral-500" : ""),
          h.span(
            [
              h.DataAttribute("state", state),
              h.Class(
                `min-w-0 truncate data-[state=collapsed]:sr-only ${
                  item.muted === true ? "text-neutral-600" : "text-black"
                }`
              ),
            ],
            [item.label]
          ),
          ...(item.hasChevron === true ? [chevronView(h, state)] : []),
        ],
      }),
    ],
  });

const navSectionView = (
  h: ReturnType<typeof html<Message>>,
  state: Sidebar.SidebarState,
  items: readonly NavItem[],
  activeLabel: string
): Html =>
  Sidebar.menuView<Message>({
    className: "gap-3",
    children: items.map((item) => navButtonView(h, state, item, activeLabel)),
  });

const userFooter = (
  h: ReturnType<typeof html<Message>>,
  state: Sidebar.SidebarState
): Html =>
  Sidebar.menuView<Message>({
    children: [
      Sidebar.menuItemView<Message>({
        children: [
          Sidebar.menuButtonView<Message>({
            item: {
              active: false,
              icon: "app",
              label: "shadcn",
              onClick: ClickedSelectSidebarItem({ label: "shadcn" }),
            },
            size: "lg",
            state,
            className:
              "h-14 rounded-none px-0 hover:bg-transparent data-[active=true]:bg-transparent",
            children: [
              h.span(
                [
                  h.AriaHidden(true),
                  h.Class(
                    "flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-fuchsia-500 via-violet-500 to-cyan-400 text-base font-semibold text-white"
                  ),
                ],
                ["S"]
              ),
              h.span(
                [
                  h.DataAttribute("state", state),
                  h.Class(
                    "grid min-w-0 flex-1 text-left leading-tight data-[state=collapsed]:sr-only"
                  ),
                ],
                [
                  h.span(
                    [h.Class("truncate text-xl font-semibold text-black")],
                    ["shadcn"]
                  ),
                  h.span([h.Class("truncate text-base text-black")], [
                    "m@example.com",
                  ]),
                ]
              ),
              chevronView(h, state, "chevron-down"),
            ],
          }),
        ],
      }),
    ],
  });

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Sidebar.providerView<Message>({
    className:
      "mx-auto h-[640px] min-h-0 max-w-[1024px] rounded-2xl border-neutral-200 bg-white [--sidebar-width:20rem] [--sidebar-width-icon:4.5rem]",
    children: [
      Sidebar.sidebarView<Message>({
        state: model.state,
        collapsible: "icon",
        children: [
          Sidebar.headerView<Message>({
            className: "gap-5 px-6 pb-3 pt-6",
            children: [
              accountHeader(h, model.state),
              navSectionView(h, model.state, primaryItems, model.selectedLabel),
            ],
          }),
          Sidebar.contentView<Message>({
            className: "gap-4 px-6 py-1",
            children: [
              Sidebar.groupView<Message>({
                className: "gap-3 p-0",
                children: [
                  Sidebar.groupLabelView<Message>("Projects", model.state),
                  Sidebar.groupContentView<Message>({
                    children: [
                      navSectionView(
                        h,
                        model.state,
                        projectItems,
                        model.selectedLabel
                      ),
                    ],
                  }),
                ],
              }),
            ],
          }),
          Sidebar.footerView<Message>({
            className: "mt-auto px-6 pb-6 pt-4",
            children: [userFooter(h, model.state)],
          }),
          Sidebar.railView<Message>(ClickedToggleSidebar()),
        ],
      }),
      Sidebar.insetView<Message>({
        className: "bg-white p-6",
        children: [
          Sidebar.triggerView<Message>({
            label: "Toggle Sidebar",
            onClick: ClickedToggleSidebar(),
            children: [iconView(h, "panel")],
            className: "size-9 text-black hover:bg-transparent",
          }),
        ],
      }),
    ],
  });
});
