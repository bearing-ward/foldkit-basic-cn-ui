import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Sidebar from "../../ui/sidebar";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedAddProject = m("ClickedAddProject");
export const ClickedProjectActions = m("ClickedProjectActions");
export const Message = S.Union([ClickedAddProject, ClickedProjectActions]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

export const init = (): UpdateReturn => [{}, []];

// UPDATE

export const update = (model: Model, _message: Message): UpdateReturn => [
  model,
  [],
];

// VIEW

type IconName = "app" | "hash" | "more";

const iconPath = (name: IconName): string =>
  ({
    app: "M6 7h12M6 11h12M8 3h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    hash: "M4 9h16M4 15h16M10 3 8 21M16 3l-2 18",
    more: "M5 12h.01M12 12h.01M19 12h.01",
  })[name];

const iconView = (
  h: ReturnType<typeof html<Message>>,
  icon: IconName,
  classes = ""
): Html =>
  h.svg(
    [
      h.AriaHidden(true),
      h.Class(
        `size-6 shrink-0 text-black ${classes}`
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

const labelView = (
  h: ReturnType<typeof html<Message>>,
  value: string
): Html =>
  h.span([h.Class("min-w-0 truncate text-xl font-normal text-black")], [value]);

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Sidebar.providerView<Message>({
    classes:
      "mx-auto h-[520px] min-h-0 max-w-[1024px] rounded-2xl border-neutral-200 bg-white [--sidebar-width:20rem]",
    children: [
      Sidebar.sidebarView<Message>({
        state: "expanded",
        collapsible: "none",
        children: [
          Sidebar.headerView<Message>({
            classes: "px-6 pb-4 pt-6",
            children: [
              Sidebar.menuView<Message>({
                children: [
                  Sidebar.menuItemView<Message>({
                    children: [
                      Sidebar.menuButtonView<Message>({
                        item: {
                          active: false,
                          icon: "app",
                          label: "Acme Inc",
                        },
                        size: "lg",
                        classes:
                          "h-12 rounded-none px-0 hover:bg-transparent data-[active=true]:bg-transparent",
                        children: [
                          h.span(
                            [
                              h.AriaHidden(true),
                              h.Class(
                                "flex size-9 shrink-0 items-center justify-center rounded-xl bg-black text-lg font-semibold text-white"
                              ),
                            ],
                            [iconView(h, "app", "size-5 text-white")]
                          ),
                          h.span(
                            [h.Class("text-xl font-semibold text-black")],
                            ["Acme Inc."]
                          ),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          Sidebar.contentView<Message>({
            classes: "px-6 py-2",
            children: [
              Sidebar.groupView<Message>({
                classes: "gap-4 p-0",
                children: [
                  Sidebar.groupLabelView<Message>("Projects"),
                  Sidebar.groupActionView<Message>({
                    label: "Add Project",
                    onClick: ClickedAddProject(),
                    children: ["+"],
                    classes:
                      "right-0 top-0 text-2xl text-neutral-600 hover:bg-transparent hover:text-black",
                  }),
                  Sidebar.groupContentView<Message>({
                    children: [
                      Sidebar.menuView<Message>({
                        classes: "gap-3",
                        children: [
                          Sidebar.menuItemView<Message>({
                            children: [
                              Sidebar.menuButtonView<Message>({
                                item: {
                                  label: "Design Engineering",
                                  icon: "hash",
                                  active: true,
                                },
                                classes:
                                  "h-11 rounded-none px-0 text-xl hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:font-normal data-[active=true]:text-black",
                                children: [
                                  iconView(h, "hash"),
                                  labelView(h, "Design Engineering"),
                                ],
                              }),
                              Sidebar.menuActionView<Message>({
                                label: "Project actions",
                                onClick: ClickedProjectActions(),
                                children: [iconView(h, "more", "size-5 text-neutral-600")],
                                classes:
                                  "right-0 top-3 text-lg text-neutral-600 hover:bg-transparent hover:text-black",
                              }),
                              Sidebar.menuBadgeView<Message>({
                                label: "24",
                                classes:
                                  "right-7 top-3 rounded-full bg-neutral-100 px-2 text-base text-neutral-700",
                              }),
                              Sidebar.menuSubView<Message>({
                                classes: "ml-5 mt-1 gap-3 py-2",
                                children: [
                                  Sidebar.menuSubItemView<Message>({
                                    children: [
                                      Sidebar.menuSubButtonView<Message>({
                                        label: "Milestones",
                                        href: "/milestones",
                                        active: true,
                                        classes:
                                          "h-8 rounded-none px-4 text-lg text-neutral-700 hover:bg-transparent data-[active=true]:bg-transparent data-[active=true]:text-neutral-700",
                                      }),
                                    ],
                                  }),
                                  Sidebar.menuSubItemView<Message>({
                                    children: [
                                      Sidebar.menuSubButtonView<Message>({
                                        label: "Settings",
                                        href: "/settings",
                                        classes:
                                          "h-8 rounded-none px-4 text-lg text-neutral-700 hover:bg-transparent",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          Sidebar.menuItemView<Message>({
                            children: [
                              Sidebar.menuSkeletonView<Message>({
                                width: "100%",
                                classes: "mt-2 px-0",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          Sidebar.footerView<Message>({
            classes: "mt-auto border-t border-sidebar-border px-6 py-5",
            children: [
              h.span([h.Class("text-lg text-neutral-500")], ["m@example.com"]),
            ],
          }),
        ],
      }),
      Sidebar.insetView<Message>({
        classes: "bg-white p-8",
        children: [
          h.h2([h.Class("text-2xl font-semibold text-black")], [
            "Sidebar menu composition",
          ]),
        ],
      }),
    ],
  });
});
