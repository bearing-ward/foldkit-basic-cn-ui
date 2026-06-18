import { Array, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Attachments from "../../ui/ai-elements-attachments";

// MODEL

export const Model = S.Struct({
  attachments: S.Array(Attachments.AttachmentData),
});
export type Model = typeof Model.Type;

// MESSAGE

const ClickedRemoveAttachment = m("ClickedRemoveAttachment", { id: S.String });

export const Message = S.Union([ClickedRemoveAttachment]);
export type Message = typeof Message.Type;

// INIT

const mountainLandscape: Attachments.AttachmentData = {
  id: "mountain-landscape",
  type: "file",
  filename: "mountain-landscape.jpg",
  mediaType: "image/jpeg",
  url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23dbeafe'/%3E%3Cpath d='M0 140 95 55l60 60 45-42 120 107H0z' fill='%230f766e'/%3E%3C/svg%3E",
};

const oceanSunset: Attachments.AttachmentData = {
  id: "ocean-sunset",
  type: "file",
  filename: "ocean-sunset.jpg",
  mediaType: "image/jpeg",
  url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23fde68a'/%3E%3Ccircle cx='160' cy='80' r='38' fill='%23f97316'/%3E%3Cpath d='M0 118h320v62H0z' fill='%230f766e'/%3E%3C/svg%3E",
};

const apiDocumentation: Attachments.AttachmentData = {
  id: "api-documentation",
  type: "source",
  title: "API Documentation",
  url: "https://example.com/api",
  description: "Source document used as context.",
};

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ attachments: [mountainLandscape, oceanSunset, apiDocumentation] }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [
  evo(model, {
    attachments: (attachments) =>
      Array.filter(attachments, (attachment) => attachment.id !== message.id),
  }),
  [],
];

// VIEW

export const view = Submodel.defineView<Model, Message>(
  (model): Html =>
    Attachments.view<Message>({
      attachments: model.attachments,
      variant: "Grid",
      onRemove: (attachment) => ClickedRemoveAttachment({ id: attachment.id }),
    })
);
