import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AlertBasicExample from "../registry/default/examples/alert-basic/main";
import * as AlertDestructiveExample from "../registry/default/examples/alert-destructive/main";
import * as AlertDialogBasicExample from "../registry/default/examples/alert-dialog-basic/main";
import * as ShadcnAlertDialogBasicExample from "../registry/default/examples/shadcn-alert-dialog-basic/main";
import * as Main from "./main";

type Message = Main.Message;

export const alertBasicExamplePreview = (
  model: AlertBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AlertBasicExample.view,
    toParentMessage: (message) => Main.GotAlertBasicExampleMessage({ message }),
  });
};

export const alertDestructiveExamplePreview = (
  model: AlertDestructiveExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AlertDestructiveExample.view,
    toParentMessage: (message) =>
      Main.GotAlertDestructiveExampleMessage({ message }),
  });
};

export const alertDialogBasicExamplePreview = (
  model: AlertDialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AlertDialogBasicExample.view,
    toParentMessage: (message) =>
      Main.GotAlertDialogBasicExampleMessage({ message }),
  });
};

export const shadcnAlertDialogBasicExamplePreview = (
  model: ShadcnAlertDialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAlertDialogBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAlertDialogBasicExampleMessage({ message }),
  });
};
