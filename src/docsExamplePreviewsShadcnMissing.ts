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

export const shadcnContextMenuBasicExamplePreview = (): Html =>
  ShadcnContextMenuBasicExample.view(ShadcnContextMenuBasicExample.init()[0]);

export const shadcnDatePickerBasicExamplePreview = (): Html =>
  ShadcnDatePickerBasicExample.view(ShadcnDatePickerBasicExample.init()[0]);

export const shadcnDialogBasicExamplePreview = (): Html =>
  ShadcnDialogBasicExample.view(ShadcnDialogBasicExample.init()[0]);

export const shadcnDrawerBasicExamplePreview = (): Html =>
  ShadcnDrawerBasicExample.view(ShadcnDrawerBasicExample.init()[0]);

export const shadcnFieldBasicExamplePreview = (): Html =>
  ShadcnFieldBasicExample.view(ShadcnFieldBasicExample.init()[0]);

export const shadcnInputBasicExamplePreview = (): Html =>
  ShadcnInputBasicExample.view(ShadcnInputBasicExample.init()[0]);

export const shadcnMenubarBasicExamplePreview = (): Html =>
  ShadcnMenubarBasicExample.view(ShadcnMenubarBasicExample.init()[0]);

export const shadcnNavigationMenuBasicExamplePreview = (): Html =>
  ShadcnNavigationMenuBasicExample.view(
    ShadcnNavigationMenuBasicExample.init()[0]
  );

export const shadcnPopoverBasicExamplePreview = (): Html =>
  ShadcnPopoverBasicExample.view(ShadcnPopoverBasicExample.init()[0]);

export const shadcnProgressBasicExamplePreview = (): Html =>
  ShadcnProgressBasicExample.view(ShadcnProgressBasicExample.init()[0]);

export const shadcnScrollAreaBasicExamplePreview = (): Html =>
  ShadcnScrollAreaBasicExample.view(ShadcnScrollAreaBasicExample.init()[0]);

export const shadcnSeparatorBasicExamplePreview = (): Html =>
  ShadcnSeparatorBasicExample.view(ShadcnSeparatorBasicExample.init()[0]);

export const shadcnTextareaBasicExamplePreview = (): Html =>
  ShadcnTextareaBasicExample.view(ShadcnTextareaBasicExample.init()[0]);

export const shadcnToggleBasicExamplePreview = (): Html =>
  ShadcnToggleBasicExample.view(ShadcnToggleBasicExample.init()[0]);

export const shadcnToggleGroupBasicExamplePreview = (): Html =>
  ShadcnToggleGroupBasicExample.view(ShadcnToggleGroupBasicExample.init()[0]);

export const shadcnToastBasicExamplePreview = (): Html =>
  ShadcnToastBasicExample.view(ShadcnToastBasicExample.init()[0]);

export const shadcnTooltipBasicExamplePreview = (): Html =>
  ShadcnTooltipBasicExample.view(ShadcnTooltipBasicExample.init()[0]);
