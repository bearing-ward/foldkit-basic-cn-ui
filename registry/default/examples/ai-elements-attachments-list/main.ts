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

const productDemo: Attachments.AttachmentData = {
  id: "product-demo",
  type: "file",
  filename: "product-demo.mp4",
  mediaType: "video/mp4",
};

const quarterlyReport: Attachments.AttachmentData = {
  id: "quarterly-report",
  type: "file",
  filename: "quarterly-report.pdf",
  mediaType: "application/pdf",
};

const apiDocumentation: Attachments.AttachmentData = {
  id: "api-documentation",
  type: "source",
  title: "API Documentation",
  url: "https://example.com/api",
  description: "Source document used as context.",
};

const podcastEpisode: Attachments.AttachmentData = {
  id: "podcast-episode",
  type: "file",
  filename: "podcast-episode.mp3",
  mediaType: "audio/mpeg",
};

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [
  {
    attachments: [
      productDemo,
      quarterlyReport,
      apiDocumentation,
      podcastEpisode,
    ],
  },
  [],
];

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
      variant: "List",
      showMediaType: true,
      onRemove: (attachment) => ClickedRemoveAttachment({ id: attachment.id }),
    })
);
