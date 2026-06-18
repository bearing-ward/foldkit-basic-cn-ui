import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AlertActionExample from "../registry/shadcn/examples/alert-action/main";
import * as AlertBasicExample from "../registry/shadcn/examples/alert-basic/main";
import * as AlertCustomColorsExample from "../registry/shadcn/examples/alert-custom-colors/main";
import * as AlertDestructiveExample from "../registry/shadcn/examples/alert-destructive/main";
import * as AlertDialogBasicExample from "../registry/base-ui/examples/alert-dialog-basic/main";
import * as AlertRtlExample from "../registry/shadcn/examples/alert-rtl/main";
import * as ShadcnAlertDialogBasicExample from "../registry/shadcn/examples/shadcn-alert-dialog-basic/main";
import * as ShadcnAlertDialogDestructiveExample from "../registry/shadcn/examples/shadcn-alert-dialog-destructive/main";
import * as ShadcnAlertDialogMediaExample from "../registry/shadcn/examples/shadcn-alert-dialog-media/main";
import * as ShadcnAlertDialogRtlExample from "../registry/shadcn/examples/shadcn-alert-dialog-rtl/main";
import * as ShadcnAlertDialogSmallMediaExample from "../registry/shadcn/examples/shadcn-alert-dialog-small-media/main";
import * as ShadcnAlertDialogSmallExample from "../registry/shadcn/examples/shadcn-alert-dialog-small/main";
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

export const alertActionExamplePreview = (
  model: AlertActionExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AlertActionExample.view,
    toParentMessage: (message) =>
      Main.GotAlertActionExampleMessage({ message }),
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

export const alertCustomColorsExamplePreview = (
  model: AlertCustomColorsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AlertCustomColorsExample.view,
    toParentMessage: (message) =>
      Main.GotAlertCustomColorsExampleMessage({ message }),
  });
};

export const alertRtlExamplePreview = (
  model: AlertRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AlertRtlExample.view,
    toParentMessage: (message) => Main.GotAlertRtlExampleMessage({ message }),
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

export const shadcnAlertDialogSmallExamplePreview = (
  model: ShadcnAlertDialogSmallExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAlertDialogSmallExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAlertDialogSmallExampleMessage({ message }),
  });
};

export const shadcnAlertDialogMediaExamplePreview = (
  model: ShadcnAlertDialogMediaExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAlertDialogMediaExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAlertDialogMediaExampleMessage({ message }),
  });
};

export const shadcnAlertDialogSmallMediaExamplePreview = (
  model: ShadcnAlertDialogSmallMediaExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAlertDialogSmallMediaExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAlertDialogSmallMediaExampleMessage({ message }),
  });
};

export const shadcnAlertDialogDestructiveExamplePreview = (
  model: ShadcnAlertDialogDestructiveExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAlertDialogDestructiveExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAlertDialogDestructiveExampleMessage({ message }),
  });
};

export const shadcnAlertDialogRtlExamplePreview = (
  model: ShadcnAlertDialogRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnAlertDialogRtlExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnAlertDialogRtlExampleMessage({ message }),
  });
};
