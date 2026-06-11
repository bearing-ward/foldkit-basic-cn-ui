import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Drawer from "../../ui/shadcn-drawer";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedScrollableContent = m("ClickedScrollableContent");
export const ClickedCancel = m("ClickedCancel");
export const ClickedSubmit = m("ClickedSubmit");

export const Message = S.Union([
  ClickedScrollableContent,
  ClickedCancel,
  ClickedSubmit,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedScrollableContent: () => [evo(model, { open: () => true }), []],
      ClickedCancel: () => [evo(model, { open: () => false }), []],
      ClickedSubmit: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "drawer-scrollable-title";
  const descriptionId = "drawer-scrollable-description";

  return h.div(
    [h.Class("flex flex-wrap gap-2")],
    [
      Drawer.rootView<Message>({
        children: [
          Drawer.triggerView<Message>({
            onClick: ClickedScrollableContent(),
            className:
              "border border-gray-200 bg-white text-gray-950 hover:bg-gray-50",
            children: [h.span([], ["Scrollable Content"])],
          }),
          Drawer.portalView<Message>({
            open: model.open,
            children: [
              Drawer.backdropView<Message>({ children: [] }),
              Drawer.viewportView<Message>({
                children: [
                  Drawer.popupView<Message>({
                    titleId,
                    descriptionId,
                    className: "p-0",
                    children: [
                      Drawer.contentView<Message>({
                        className: "gap-0",
                        children: [
                          h.div(
                            [
                              h.Class(
                                "grid gap-1.5 p-4 text-center sm:text-left"
                              ),
                            ],
                            [
                              Drawer.titleView<Message>({
                                id: titleId,
                                children: [h.span([], ["Move Goal"])],
                              }),
                              Drawer.descriptionView<Message>({
                                id: descriptionId,
                                children: [
                                  h.span([], ["Set your daily activity goal."]),
                                ],
                              }),
                            ]
                          ),
                          h.div(
                            [h.Class("no-scrollbar overflow-y-auto px-4")],
                            Array.from({ length: 10 }, (_, index) =>
                              h.p(
                                [
                                  h.Class(
                                    "mb-4 text-sm leading-normal text-gray-700"
                                  ),
                                ],
                                [`${index + 1}. ${loremIpsum}`]
                              )
                            )
                          ),
                          h.div(
                            [h.Class("mt-auto grid gap-2 p-4")],
                            [
                              h.button(
                                [
                                  h.Type("button"),
                                  h.OnClick(ClickedSubmit()),
                                  h.Class(Drawer.shadcnDrawerTriggerClassName),
                                ],
                                ["Submit"]
                              ),
                              Drawer.closeView<Message>({
                                onClick: ClickedCancel(),
                                children: [h.span([], ["Cancel"])],
                              }),
                            ]
                          ),
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
    ]
  );
});
