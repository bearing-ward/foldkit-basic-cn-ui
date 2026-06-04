import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as FileDrop from "../../ui/file-drop";

// MODEL

export const Model = S.Struct({
  fileDrop: FileDrop.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotFileDropMessage = m("GotFileDropMessage", {
  message: FileDrop.Message,
});

export const Message = S.Union([GotFileDropMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    fileDrop: FileDrop.init({ id: "file-drop-disabled" }),
  },
  [],
];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.fileDrop.id,
    model: model.fileDrop,
    view: FileDrop.view,
    viewInputs: {
      isDisabled: true,
      toView: (attributes) =>
        h.label(
          [...attributes.root, h.Class(FileDrop.dropZoneClassName)],
          [
            h.span(
              [h.Class(FileDrop.primaryTextClassName)],
              ["File uploads disabled"]
            ),
            h.span(
              [h.Class(FileDrop.secondaryTextClassName)],
              ["Uploads are unavailable while the project is archived."]
            ),
            h.input([
              ...attributes.input,
              h.AriaLabel("Upload files"),
              h.Class(FileDrop.fileInputClassName),
            ]),
          ]
        ),
    },
    toParentMessage: (message) => GotFileDropMessage({ message }),
  });
});
