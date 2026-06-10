import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as ShadcnBaseAccordionBasicExample from "../registry/default/examples/shadcn-base-accordion-basic/main";
import * as ShadcnCheckboxBasicExample from "../registry/default/examples/shadcn-checkbox-basic/main";
import * as ShadcnCollapsibleBasicExample from "../registry/default/examples/shadcn-collapsible-basic/main";
import * as ShadcnComboboxBasicExample from "../registry/default/examples/shadcn-combobox-basic/main";
import * as ShadcnContextMenuBasicExample from "../registry/default/examples/shadcn-context-menu-basic/main";
import * as ShadcnDatePickerBasicExample from "../registry/default/examples/shadcn-date-picker-basic/main";
import * as ShadcnDialogBasicExample from "../registry/default/examples/shadcn-dialog-basic/main";
import * as ShadcnDrawerBasicExample from "../registry/default/examples/shadcn-drawer-basic/main";
import * as ShadcnFieldBasicExample from "../registry/default/examples/shadcn-field-basic/main";
import * as ShadcnInputBasicExample from "../registry/default/examples/shadcn-input-basic/main";
import * as ShadcnMenubarBasicExample from "../registry/default/examples/shadcn-menubar-basic/main";
import * as ShadcnNavigationMenuBasicExample from "../registry/default/examples/shadcn-navigation-menu-basic/main";
import * as ShadcnPopoverBasicExample from "../registry/default/examples/shadcn-popover-basic/main";
import * as ShadcnProgressBasicExample from "../registry/default/examples/shadcn-progress-basic/main";
import * as ShadcnScrollAreaBasicExample from "../registry/default/examples/shadcn-scroll-area-basic/main";
import * as ShadcnSeparatorBasicExample from "../registry/default/examples/shadcn-separator-basic/main";
import * as ShadcnTextareaBasicExample from "../registry/default/examples/shadcn-textarea-basic/main";
import * as ShadcnToastBasicExample from "../registry/default/examples/shadcn-toast-basic/main";
import * as ShadcnToggleBasicExample from "../registry/default/examples/shadcn-toggle-basic/main";
import * as ShadcnToggleGroupBasicExample from "../registry/default/examples/shadcn-toggle-group-basic/main";
import * as ShadcnTooltipBasicExample from "../registry/default/examples/shadcn-tooltip-basic/main";
import * as Main from "./main";

type Message = Main.Message;

export const shadcnBaseAccordionBasicExamplePreview = (
  model: ShadcnBaseAccordionBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnBaseAccordionBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnBaseAccordionBasicExampleMessage({ message }),
  });
};

export const shadcnCheckboxBasicExamplePreview = (
  model: ShadcnCheckboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCheckboxBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCheckboxBasicExampleMessage({ message }),
  });
};

export const shadcnCollapsibleBasicExamplePreview = (
  model: ShadcnCollapsibleBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnCollapsibleBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnCollapsibleBasicExampleMessage({ message }),
  });
};

export const shadcnComboboxBasicExamplePreview = (
  model: ShadcnComboboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnComboboxBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnComboboxBasicExampleMessage({ message }),
  });
};

export const shadcnContextMenuBasicExamplePreview = (
  model: ShadcnContextMenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnContextMenuBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnContextMenuBasicExampleMessage({ message }),
  });
};

export const shadcnDatePickerBasicExamplePreview = (
  model: ShadcnDatePickerBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDatePickerBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDatePickerBasicExampleMessage({ message }),
  });
};

export const shadcnDialogBasicExamplePreview = (
  model: ShadcnDialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDialogBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDialogBasicExampleMessage({ message }),
  });
};

export const shadcnDrawerBasicExamplePreview = (
  model: ShadcnDrawerBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDrawerBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDrawerBasicExampleMessage({ message }),
  });
};

export const shadcnFieldBasicExamplePreview = (
  model: ShadcnFieldBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnFieldBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnFieldBasicExampleMessage({ message }),
  });
};

export const shadcnInputBasicExamplePreview = (
  model: ShadcnInputBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnInputBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnInputBasicExampleMessage({ message }),
  });
};

export const shadcnMenubarBasicExamplePreview = (
  model: ShadcnMenubarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnMenubarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnMenubarBasicExampleMessage({ message }),
  });
};

export const shadcnNavigationMenuBasicExamplePreview = (): Html =>
  ShadcnNavigationMenuBasicExample.view(
    ShadcnNavigationMenuBasicExample.init()[0]
  );

export const shadcnPopoverBasicExamplePreview = (
  model: ShadcnPopoverBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnPopoverBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnPopoverBasicExampleMessage({ message }),
  });
};

export const shadcnProgressBasicExamplePreview = (): Html =>
  ShadcnProgressBasicExample.view(ShadcnProgressBasicExample.init()[0]);

export const shadcnScrollAreaBasicExamplePreview = (): Html =>
  ShadcnScrollAreaBasicExample.view(ShadcnScrollAreaBasicExample.init()[0]);

export const shadcnSeparatorBasicExamplePreview = (): Html =>
  ShadcnSeparatorBasicExample.view(ShadcnSeparatorBasicExample.init()[0]);

export const shadcnTextareaBasicExamplePreview = (
  model: ShadcnTextareaBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnTextareaBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnTextareaBasicExampleMessage({ message }),
  });
};

export const shadcnToggleBasicExamplePreview = (
  model: ShadcnToggleBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnToggleBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnToggleBasicExampleMessage({ message }),
  });
};

export const shadcnToggleGroupBasicExamplePreview = (
  model: ShadcnToggleGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnToggleGroupBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnToggleGroupBasicExampleMessage({ message }),
  });
};

export const shadcnToastBasicExamplePreview = (
  model: ShadcnToastBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnToastBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnToastBasicExampleMessage({ message }),
  });
};

export const shadcnTooltipBasicExamplePreview = (
  model: ShadcnTooltipBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnTooltipBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnTooltipBasicExampleMessage({ message }),
  });
};
