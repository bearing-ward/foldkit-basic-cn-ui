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

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Dir("rtl")],
    [
      Sidebar.providerView<Message>({
        children: [
          Sidebar.sidebarView<Message>({
            state: "expanded",
            side: "right",
            variant: "inset",
            children: [
              Sidebar.headerView<Message>({
                children: [
                  h.span([h.Class(Sidebar.sidebarIconClasses)], ["أ"]),
                  h.span([h.Class("text-sm font-semibold text-gray-950")], [
                    "شركة أكمي",
                  ]),
                ],
              }),
              Sidebar.contentView<Message>({
                children: [
                  Sidebar.groupView<Message>({
                    children: [
                      Sidebar.groupLabelView<Message>("التطبيق"),
                      Sidebar.groupContentView<Message>({
                        children: [
                          Sidebar.menuView<Message>({
                            children: [
                              Sidebar.menuItemView<Message>({
                                children: [
                                  Sidebar.menuButtonView<Message>({
                                    item: {
                                      label: "لوحة التحكم",
                                      icon: "ل",
                                      active: true,
                                    },
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
            children: [
              h.h2([h.Class("text-xl font-semibold text-gray-950")], [
                "واجهة من اليمين إلى اليسار",
              ]),
            ],
          }),
        ],
      }),
    ]
  );
});
