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
  query: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleSidebar = m("ClickedToggleSidebar");
export const UpdatedSearch = m("UpdatedSearch", { value: S.String });
export const Message = S.Union([ClickedToggleSidebar, UpdatedSearch]);
export type Message = typeof Message.Type;

// INIT

type UpdateReturn = readonly [Model, readonly Command.Command<Message>[]];

export const init = (): UpdateReturn => [
  { state: "expanded", query: "" },
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
      UpdatedSearch: ({ value }) => [
        evo(model, { query: () => value }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Sidebar.providerView<Message>({
    children: [
      Sidebar.sidebarView<Message>({
        state: model.state,
        collapsible: "icon",
        children: [
          Sidebar.headerView<Message>({
            children: [
              Sidebar.triggerView<Message>({
                label: "Toggle Sidebar",
                onClick: ClickedToggleSidebar(),
                children: [model.state === "expanded" ? "Close" : "Open"],
              }),
            ],
          }),
          Sidebar.contentView<Message>({
            children: [
              Sidebar.inputView<Message>({
                label: "Search documentation",
                placeholder: "Search",
                value: model.query,
                onInput: (value) => UpdatedSearch({ value }),
              }),
              Sidebar.groupView<Message>({
                children: [
                  Sidebar.groupLabelView<Message>("Application", model.state),
                  Sidebar.groupContentView<Message>({
                    children: [
                      Sidebar.menuView<Message>({
                        children: [
                          Sidebar.menuItemView<Message>({
                            children: [
                              Sidebar.menuButtonView<Message>({
                                item: {
                                  label: "Dashboard",
                                  icon: "D",
                                  active: true,
                                },
                                state: model.state,
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
          h.p([h.Class("text-sm font-medium text-gray-500")], [
            "Controlled Sidebar",
          ]),
          h.h2([h.Class("text-2xl font-semibold text-gray-950")], [
            model.state === "expanded" ? "Expanded" : "Collapsed",
          ]),
          h.p([h.Class("mt-2 text-sm text-gray-600")], [
            model.query === "" ? "Search is empty" : `Searching for ${model.query}`,
          ]),
        ],
      }),
    ],
  });
});
