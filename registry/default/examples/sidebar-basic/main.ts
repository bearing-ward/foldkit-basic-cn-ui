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
  { selectedLabel: "Dashboard", state: "expanded" },
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

const workspaceItems = (
  activeLabel: string
): readonly Sidebar.SidebarMenuItem<Message>[] => [
  {
    label: "Dashboard",
    icon: "D",
    active: activeLabel === "Dashboard",
    onClick: ClickedSelectSidebarItem({ label: "Dashboard" }),
  },
  {
    label: "Projects",
    icon: "P",
    active: activeLabel === "Projects",
    onClick: ClickedSelectSidebarItem({ label: "Projects" }),
  },
  {
    label: "Calendar",
    icon: "C",
    active: activeLabel === "Calendar",
    onClick: ClickedSelectSidebarItem({ label: "Calendar" }),
  },
];

const statCard = (
  h: ReturnType<typeof html<Message>>,
  label: string,
  value: string
): Html =>
  h.div(
    [h.Class("rounded-lg border border-gray-200 bg-gray-50 p-4")],
    [
      h.p([h.Class("text-sm text-gray-500")], [label]),
      h.p([h.Class("mt-2 text-2xl font-semibold text-gray-950")], [value]),
    ]
  );

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Sidebar.view<Message>({
    state: model.state,
    items: workspaceItems(model.selectedLabel),
    children: [
      h.div(
        [h.Class("space-y-4")],
        [
          h.div(
            [h.Class("flex items-center justify-between gap-4")],
            [
              h.div(
                [h.Class("space-y-1")],
                [
                  h.p(
                    [h.Class("text-sm font-medium text-gray-500")],
                    ["Application"]
                  ),
                  h.h2(
                    [h.Class("text-2xl font-semibold text-gray-950")],
                    [model.selectedLabel]
                  ),
                ]
              ),
              h.button(
                [
                  h.OnClick(ClickedToggleSidebar()),
                  h.Class(
                    "inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                  ),
                ],
                [model.state === "expanded" ? "Collapse" : "Expand"]
              ),
            ]
          ),
          h.div(
            [h.Class("grid gap-3 sm:grid-cols-3")],
            [
              statCard(h, "Active projects", "12"),
              statCard(h, "Open tasks", "48"),
              statCard(h, "Members", "8"),
            ]
          ),
        ]
      ),
    ],
  });
});
