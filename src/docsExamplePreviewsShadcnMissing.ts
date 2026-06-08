import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as ShadcnCheckboxBasicExample from "../registry/default/examples/shadcn-checkbox-basic/main";
import * as ShadcnCollapsibleBasicExample from "../registry/default/examples/shadcn-collapsible-basic/main";
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

export const shadcnCheckboxBasicExamplePreview = (): Html =>
  ShadcnCheckboxBasicExample.view(ShadcnCheckboxBasicExample.init()[0]);

export const shadcnCollapsibleBasicExamplePreview = (): Html =>
  ShadcnCollapsibleBasicExample.view(ShadcnCollapsibleBasicExample.init()[0]);

export const shadcnComboboxBasicExamplePreview = (): Html =>
  html<never>().div(
    [
      html<never>().Class(
        "rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-700"
      ),
    ],
    ["Search cities..."]
  );

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

export const shadcnToastBasicExamplePreview = (): Html =>
  ShadcnToastBasicExample.view(ShadcnToastBasicExample.init()[0]);
