import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Sidebar from "../../ui/sidebar";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
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

const variantCard = (
  h: ReturnType<typeof html<Message>>,
  label: string,
  state: Sidebar.SidebarState,
  side: Sidebar.SidebarSide,
  variant: Sidebar.SidebarVariant,
  collapsible: Sidebar.SidebarCollapsible
): Html =>
  h.div(
    [h.Class("space-y-3")],
    [
      h.p([h.Class("text-sm font-medium text-gray-700")], [label]),
      Sidebar.providerView<Message>({
        className: "min-h-48",
        children: [
          Sidebar.sidebarView<Message>({
            state,
            side,
            variant,
            collapsible,
            children: [
              Sidebar.headerView<Message>({
                children: [h.span([h.Class(Sidebar.sidebarIconClassName)], ["S"])],
              }),
              Sidebar.contentView<Message>({
                children: [
                  Sidebar.groupView<Message>({
                    children: [
                      Sidebar.groupLabelView<Message>("Workspace", state),
                      Sidebar.groupContentView<Message>({
                        children: [
                          Sidebar.menuView<Message>({
                            children: [
                              Sidebar.menuItemView<Message>({
                                children: [
                                  Sidebar.menuButtonView<Message>({
                                    item: {
                                      label,
                                      icon: label.slice(0, 1),
                                      active: true,
                                    },
                                    state,
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
            ],
          }),
          Sidebar.insetView<Message>({
            className: "p-4",
            children: [
              h.p([h.Class("text-sm text-gray-600")], [
                `${side} ${variant} ${collapsible}`,
              ]),
            ],
          }),
        ],
      }),
    ]
  );

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-4 lg:grid-cols-3")],
    [
      variantCard(h, "Icon", "collapsed", "left", "sidebar", "icon"),
      variantCard(h, "Floating", "expanded", "left", "floating", "offcanvas"),
      variantCard(h, "Right inset", "expanded", "right", "inset", "none"),
    ]
  );
});
