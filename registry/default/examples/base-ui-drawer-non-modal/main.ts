import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Drawer from "../../ui/base-ui-drawer";

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
  const titleId = "non-modal-drawer-title";
  const descriptionId = "non-modal-drawer-description";

  return Drawer.rootView<Message>({
    children: [
      Drawer.triggerView<Message>({
        onClick: ClickedOpenDrawer(),
        children: [h.span([], ["Open non-modal drawer"])],
      }),
      Drawer.portalView<Message>({
        open: model.open,
        children: [
          Drawer.viewportView<Message>({
            state: { open: model.open },
            children: [
              Drawer.popupView<Message>({
                titleId,
                descriptionId,
                state: { open: model.open },
                modal: false,
                children: [
                  Drawer.contentView<Message>({
                    children: [
                      Drawer.titleView<Message>({
                        id: titleId,
                        children: [h.span([], ["Non-modal drawer"])],
                      }),
                      Drawer.descriptionView<Message>({
                        id: descriptionId,
                        children: [
                          h.span(
                            [],
                            [
                              "This drawer does not trap focus and ignores outside clicks. Use the close button or swipe to dismiss it.",
                            ]
                          ),
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
      }),
    ],
  });
});
