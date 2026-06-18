import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Drawer from "../../../foldkit/ui/drawer";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedOpenDrawer = m("ClickedOpenDrawer");
export const ClickedCloseDrawer = m("ClickedCloseDrawer");

export const Message = S.Union([ClickedOpenDrawer, ClickedCloseDrawer]);
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
      ClickedOpenDrawer: () => [evo(model, { open: () => true }), []],
      ClickedCloseDrawer: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "drawer-title";
  const descriptionId = "drawer-description";

  return Drawer.rootView<Message>({
    children: [
      Drawer.triggerView<Message>({
        onClick: ClickedOpenDrawer(),
        children: [h.span([], ["Open drawer"])],
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
                children: [
                  Drawer.contentView<Message>({
                    children: [
                      Drawer.titleView<Message>({
                        id: titleId,
                        children: [h.span([], ["Drawer"])],
                      }),
                      Drawer.descriptionView<Message>({
                        id: descriptionId,
                        children: [
                          h.span(
                            [],
                            [
                              "This is a drawer that slides in from the side. You can swipe to dismiss it.",
                            ]
                          ),
                        ],
                      }),
                    ],
                  }),
                  Drawer.closeView<Message>({
                    onClick: ClickedCloseDrawer(),
                    children: [h.span([], ["Close"])],
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
});
