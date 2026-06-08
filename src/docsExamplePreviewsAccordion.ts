import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AccordionBasicExample from "../registry/default/examples/accordion-basic/main";
import * as AccordionMultipleExample from "../registry/default/examples/accordion-multiple/main";
import * as ShadcnAccordionBasicExample from "../registry/default/examples/shadcn-accordion-basic/main";
import * as ShadcnAccordionBordersExample from "../registry/default/examples/shadcn-accordion-borders/main";
import * as ShadcnAccordionCardExample from "../registry/default/examples/shadcn-accordion-card/main";
import * as ShadcnAccordionDisabledExample from "../registry/default/examples/shadcn-accordion-disabled/main";
import * as ShadcnAccordionMultipleExample from "../registry/default/examples/shadcn-accordion-multiple/main";
import * as ShadcnAccordionRtlExample from "../registry/default/examples/shadcn-accordion-rtl/main";
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

export const shadcnAccordionBasicExamplePreview = (
  model: ShadcnAccordionBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAccordionBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAccordionBasicExampleMessage({ message }),
  });
};

export const shadcnAccordionMultipleExamplePreview = (
  model: ShadcnAccordionMultipleExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAccordionMultipleExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAccordionMultipleExampleMessage({ message }),
  });
};

export const shadcnAccordionDisabledExamplePreview = (
  model: ShadcnAccordionDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAccordionDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAccordionDisabledExampleMessage({ message }),
  });
};

export const shadcnAccordionBordersExamplePreview = (
  model: ShadcnAccordionBordersExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAccordionBordersExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAccordionBordersExampleMessage({ message }),
  });
};

export const shadcnAccordionCardExamplePreview = (
  model: ShadcnAccordionCardExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAccordionCardExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAccordionCardExampleMessage({ message }),
  });
};

export const shadcnAccordionRtlExamplePreview = (
  model: ShadcnAccordionRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAccordionRtlExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAccordionRtlExampleMessage({ message }),
  });
};
