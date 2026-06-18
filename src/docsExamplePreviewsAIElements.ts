import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AiElementsAttachmentsGridExample from "../registry/default/examples/ai-elements-attachments-grid/main";
import * as AiElementsAttachmentsInlineExample from "../registry/default/examples/ai-elements-attachments-inline/main";
import * as AiElementsAttachmentsListExample from "../registry/default/examples/ai-elements-attachments-list/main";
import * as Main from "./main";

type Message = Main.Message;

export const aiElementsAttachmentsGridExamplePreview = (
  model: AiElementsAttachmentsGridExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AiElementsAttachmentsGridExample.view,
    toParentMessage: (message) =>
      Main.GotAiElementsAttachmentsGridExampleMessage({ message }),
  });
};

export const aiElementsAttachmentsInlineExamplePreview = (
  model: AiElementsAttachmentsInlineExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AiElementsAttachmentsInlineExample.view,
    toParentMessage: (message) =>
      Main.GotAiElementsAttachmentsInlineExampleMessage({ message }),
  });
};

export const aiElementsAttachmentsListExamplePreview = (
  model: AiElementsAttachmentsListExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AiElementsAttachmentsListExample.view,
    toParentMessage: (message) =>
      Main.GotAiElementsAttachmentsListExampleMessage({ message }),
  });
};
