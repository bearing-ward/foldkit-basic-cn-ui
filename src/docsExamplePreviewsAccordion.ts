import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AccordionBasicExample from "../registry/default/examples/accordion-basic/main";
import * as AccordionMultipleExample from "../registry/default/examples/accordion-multiple/main";
import * as Main from "./main";

type Message = Main.Message;

export const accordionBasicExamplePreview = (
  model: AccordionBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AccordionBasicExample.view,
    toParentMessage: (message) =>
      Main.GotAccordionBasicExampleMessage({ message }),
  });
};

export const accordionMultipleExamplePreview = (
  model: AccordionMultipleExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AccordionMultipleExample.view,
    toParentMessage: (message) =>
      Main.GotAccordionMultipleExampleMessage({ message }),
  });
};
