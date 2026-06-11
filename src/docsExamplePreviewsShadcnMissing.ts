import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as ShadcnBaseAccordionBasicExample from "../registry/default/examples/shadcn-base-accordion-basic/main";
import * as ShadcnCheckboxBasicExample from "../registry/default/examples/shadcn-checkbox-basic/main";
import * as ShadcnCollapsibleBasicExample from "../registry/default/examples/shadcn-collapsible-basic/main";
import * as ShadcnComboboxBasicExample from "../registry/default/examples/shadcn-combobox-basic/main";
import * as ShadcnContextMenuBasicExample from "../registry/default/examples/shadcn-context-menu-basic/main";
import * as ShadcnDatePickerBasicExample from "../registry/default/examples/shadcn-date-picker-basic/main";
import * as ShadcnDialogBasicExample from "../registry/default/examples/shadcn-dialog-basic/main";
import * as ShadcnDialogCustomCloseButtonExample from "../registry/default/examples/shadcn-dialog-custom-close-button/main";
import * as ShadcnDialogNoCloseButtonExample from "../registry/default/examples/shadcn-dialog-no-close-button/main";
import * as ShadcnDialogRtlExample from "../registry/default/examples/shadcn-dialog-rtl/main";
import * as ShadcnDialogScrollableContentExample from "../registry/default/examples/shadcn-dialog-scrollable-content/main";
import * as ShadcnDialogStickyFooterExample from "../registry/default/examples/shadcn-dialog-sticky-footer/main";
import * as ShadcnDrawerBasicExample from "../registry/default/examples/shadcn-drawer-basic/main";
import * as ShadcnDrawerResponsiveDialogExample from "../registry/default/examples/shadcn-drawer-responsive-dialog/main";
import * as ShadcnDrawerRtlExample from "../registry/default/examples/shadcn-drawer-rtl/main";
import * as ShadcnDrawerScrollableContentExample from "../registry/default/examples/shadcn-drawer-scrollable-content/main";
import * as ShadcnDrawerSidesExample from "../registry/default/examples/shadcn-drawer-sides/main";
import * as ShadcnFieldBasicExample from "../registry/default/examples/shadcn-field-basic/main";
import * as ShadcnInputBasicExample from "../registry/default/examples/shadcn-input-basic/main";
import * as ShadcnInputDisabledExample from "../registry/default/examples/shadcn-input-disabled/main";
import * as ShadcnInputFileExample from "../registry/default/examples/shadcn-input-file/main";
import * as ShadcnInputInvalidExample from "../registry/default/examples/shadcn-input-invalid/main";
import * as ShadcnInputRtlExample from "../registry/default/examples/shadcn-input-rtl/main";
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

export const shadcnDialogCustomCloseButtonExamplePreview = (
  model: ShadcnDialogCustomCloseButtonExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDialogCustomCloseButtonExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDialogCustomCloseButtonExampleMessage({ message }),
  });
};

export const shadcnDialogNoCloseButtonExamplePreview = (
  model: ShadcnDialogNoCloseButtonExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDialogNoCloseButtonExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDialogNoCloseButtonExampleMessage({ message }),
  });
};

export const shadcnDialogStickyFooterExamplePreview = (
  model: ShadcnDialogStickyFooterExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDialogStickyFooterExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDialogStickyFooterExampleMessage({ message }),
  });
};

export const shadcnDialogScrollableContentExamplePreview = (
  model: ShadcnDialogScrollableContentExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDialogScrollableContentExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDialogScrollableContentExampleMessage({ message }),
  });
};

export const shadcnDialogRtlExamplePreview = (
  model: ShadcnDialogRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDialogRtlExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDialogRtlExampleMessage({ message }),
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

export const shadcnDrawerScrollableContentExamplePreview = (
  model: ShadcnDrawerScrollableContentExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDrawerScrollableContentExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDrawerScrollableContentExampleMessage({ message }),
  });
};

export const shadcnDrawerResponsiveDialogExamplePreview = (
  model: ShadcnDrawerResponsiveDialogExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDrawerResponsiveDialogExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDrawerResponsiveDialogExampleMessage({ message }),
  });
};

export const shadcnDrawerRtlExamplePreview = (
  model: ShadcnDrawerRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDrawerRtlExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDrawerRtlExampleMessage({ message }),
  });
};

export const shadcnDrawerSidesExamplePreview = (
  model: ShadcnDrawerSidesExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnDrawerSidesExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnDrawerSidesExampleMessage({ message }),
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

export const shadcnInputDisabledExamplePreview = (
  model: ShadcnInputDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnInputDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnInputDisabledExampleMessage({ message }),
  });
};

export const shadcnInputInvalidExamplePreview = (
  model: ShadcnInputInvalidExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnInputInvalidExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnInputInvalidExampleMessage({ message }),
  });
};

export const shadcnInputFileExamplePreview = (
  model: ShadcnInputFileExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnInputFileExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnInputFileExampleMessage({ message }),
  });
};

export const shadcnInputRtlExamplePreview = (
  model: ShadcnInputRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnInputRtlExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnInputRtlExampleMessage({ message }),
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
