import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as AlertDialog from "../../ui/shadcn-alert-dialog";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  connected: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShowDialog = m("ClickedShowDialog");
export const ClickedCancel = m("ClickedCancel");
export const ClickedContinue = m("ClickedContinue");

export const Message = S.Union([
  ClickedShowDialog,
  ClickedCancel,
  ClickedContinue,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, connected: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShowDialog: () => [evo(model, { open: () => true }), []],
      ClickedCancel: () => [evo(model, { open: () => false }), []],
      ClickedContinue: () => [
        evo(model, { open: () => false, connected: () => true }),
        [],
      ],
    })
  );

// VIEW

const bluetoothIcon = (): Html => {
  const h = html<Message>();

  return h.svg(
    [
      h.Attribute("width", "20"),
      h.Attribute("height", "20"),
      h.Attribute("viewBox", "0 0 24 24"),
      h.Attribute("fill", "none"),
      h.Attribute("stroke", "currentColor"),
      h.Attribute("stroke-width", "2"),
      h.Attribute("stroke-linecap", "round"),
      h.Attribute("stroke-linejoin", "round"),
      h.AriaHidden(true),
    ],
    [h.path([h.Attribute("d", "m7 7 10 10-5 5V2l5 5L7 17")], [])]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const titleId = "alert-dialog-title";
  const descriptionId = "alert-dialog-description";

  return h.div(
    [h.Class("space-y-3")],
    [
      AlertDialog.rootView<Message>({
        children: [
          AlertDialog.triggerView<Message>({
            onClick: ClickedShowDialog(),
            children: [h.span([], ["Show Dialog"])],
          }),
          AlertDialog.portalView<Message>({
            open: model.open,
            children: [
              AlertDialog.backdropView<Message>({ children: [] }),
              AlertDialog.viewportView<Message>({
                children: [
                  AlertDialog.contentView<Message>({
                    titleId,
                    descriptionId,
                    size: "sm",
                    children: [
                      AlertDialog.headerView<Message>({
                        children: [
                          AlertDialog.mediaView<Message>({
                            children: [bluetoothIcon()],
                          }),
                          AlertDialog.titleView<Message>({
                            id: titleId,
                            children: [h.span([], ["Enable bluetooth?"])],
                          }),
                          AlertDialog.descriptionView<Message>({
                            id: descriptionId,
                            children: [
                              h.span(
                                [],
                                [
                                  "This will allow this device to connect with nearby accessories.",
                                ]
                              ),
                            ],
                          }),
                        ],
                      }),
                      AlertDialog.footerView<Message>({
                        children: [
                          AlertDialog.closeView<Message>({
                            onClick: ClickedCancel(),
                            children: [h.span([], ["Cancel"])],
                          }),
                          AlertDialog.closeView<Message>({
                            onClick: ClickedContinue(),
                            variant: "Confirm",
                            children: [h.span([], ["Continue"])],
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
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Connected: ${model.connected ? "yes" : "no"}`]
      ),
    ]
  );
});
