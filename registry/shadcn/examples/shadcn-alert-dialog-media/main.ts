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
  shared: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedShareProject = m("ClickedShareProject");
export const ClickedCancel = m("ClickedCancel");
export const ClickedContinue = m("ClickedContinue");

export const Message = S.Union([
  ClickedShareProject,
  ClickedCancel,
  ClickedContinue,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, shared: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedShareProject: () => [evo(model, { open: () => true }), []],
      ClickedCancel: () => [evo(model, { open: () => false }), []],
      ClickedContinue: () => [
        evo(model, { open: () => false, shared: () => true }),
        [],
      ],
    })
  );

// VIEW

const shareIcon = (): Html => {
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
    [
      h.path([h.Attribute("d", "M12 5v14")], []),
      h.path([h.Attribute("d", "M5 12h14")], []),
      h.path([h.Attribute("d", "M16 5h3v3")], []),
      h.path([h.Attribute("d", "M8 19H5v-3")], []),
    ]
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
            onClick: ClickedShareProject(),
            children: [h.span([], ["Share Project"])],
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
                    children: [
                      AlertDialog.headerView<Message>({
                        children: [
                          AlertDialog.mediaView<Message>({
                            children: [shareIcon()],
                          }),
                          AlertDialog.titleView<Message>({
                            id: titleId,
                            children: [h.span([], ["Share project"])],
                          }),
                          AlertDialog.descriptionView<Message>({
                            id: descriptionId,
                            children: [
                              h.span(
                                [],
                                [
                                  "Anyone with this link will be able to view this project.",
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
        [`Shared: ${model.shared ? "yes" : "no"}`]
      ),
    ]
  );
});
