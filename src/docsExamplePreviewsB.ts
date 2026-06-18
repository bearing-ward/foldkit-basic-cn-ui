import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as BadgeBasicExample from "../registry/shadcn/examples/badge-basic/main";
import * as BadgeCustomColorsExample from "../registry/shadcn/examples/badge-custom-colors/main";
import * as BadgeIconExample from "../registry/shadcn/examples/badge-icon/main";
import * as BadgeLinkExample from "../registry/shadcn/examples/badge-link/main";
import * as BadgeRtlExample from "../registry/shadcn/examples/badge-rtl/main";
import * as BadgeSpinnerExample from "../registry/shadcn/examples/badge-spinner/main";
import * as BaseUiAlertDialogBasicExample from "../registry/base-ui/examples/base-ui-alert-dialog-basic/main";
import * as BaseUiAlertDialogCloseConfirmationExample from "../registry/base-ui/examples/base-ui-alert-dialog-close-confirmation/main";
import * as BaseUiAlertDialogControlledMultipleTriggersExample from "../registry/base-ui/examples/base-ui-alert-dialog-controlled-multiple-triggers/main";
import * as BaseUiAlertDialogDetachedTriggersExample from "../registry/base-ui/examples/base-ui-alert-dialog-detached-triggers/main";
import * as BaseUiAlertDialogMultipleTriggersExample from "../registry/base-ui/examples/base-ui-alert-dialog-multiple-triggers/main";
import * as BaseUiAlertDialogOpenFromMenuExample from "../registry/base-ui/examples/base-ui-alert-dialog-open-from-menu/main";
import * as BaseUiButtonBasicExample from "../registry/base-ui/examples/base-ui-button-basic/main";
import * as BreadcrumbBasicExample from "../registry/shadcn/examples/breadcrumb-basic/main";
import * as BreadcrumbCollapsedExample from "../registry/shadcn/examples/breadcrumb-collapsed/main";
import * as BreadcrumbDropdownExample from "../registry/shadcn/examples/breadcrumb-dropdown/main";
import * as BreadcrumbLinkExample from "../registry/shadcn/examples/breadcrumb-link/main";
import * as BreadcrumbRtlExample from "../registry/shadcn/examples/breadcrumb-rtl/main";
import * as BreadcrumbSeparatorExample from "../registry/shadcn/examples/breadcrumb-separator/main";
import * as ButtonBasicExample from "../registry/foldkit/examples/button-basic/main";
import * as ButtonDisabledExample from "../registry/foldkit/examples/button-disabled/main";
import * as ButtonGroupBasicExample from "../registry/shadcn/examples/button-group-basic/main";
import * as ButtonGroupInputGroupExample from "../registry/shadcn/examples/button-group-input-group/main";
import * as ButtonGroupInputExample from "../registry/shadcn/examples/button-group-input/main";
import * as ButtonGroupNestedExample from "../registry/shadcn/examples/button-group-nested/main";
import * as ButtonGroupOrientationExample from "../registry/shadcn/examples/button-group-orientation/main";
import * as ButtonGroupPopoverExample from "../registry/shadcn/examples/button-group-popover/main";
import * as ButtonGroupRtlExample from "../registry/shadcn/examples/button-group-rtl/main";
import * as ButtonGroupSelectExample from "../registry/shadcn/examples/button-group-select/main";
import * as ButtonGroupSeparatorExample from "../registry/shadcn/examples/button-group-separator/main";
import * as ButtonGroupSizeExample from "../registry/shadcn/examples/button-group-size/main";
import * as ButtonGroupSplitExample from "../registry/shadcn/examples/button-group-split/main";
import * as ShadcnButtonAsChildExample from "../registry/shadcn/examples/shadcn-button-as-child/main";
import * as ShadcnButtonBasicExample from "../registry/shadcn/examples/shadcn-button-basic/main";
import * as ShadcnButtonDefaultExample from "../registry/shadcn/examples/shadcn-button-default/main";
import * as ShadcnButtonDestructiveExample from "../registry/shadcn/examples/shadcn-button-destructive/main";
import * as ShadcnButtonGhostExample from "../registry/shadcn/examples/shadcn-button-ghost/main";
import * as ShadcnButtonGroupExample from "../registry/shadcn/examples/shadcn-button-group/main";
import * as ShadcnButtonIconExample from "../registry/shadcn/examples/shadcn-button-icon/main";
import * as ShadcnButtonLinkExample from "../registry/shadcn/examples/shadcn-button-link/main";
import * as ShadcnButtonOutlineExample from "../registry/shadcn/examples/shadcn-button-outline/main";
import * as ShadcnButtonRoundedExample from "../registry/shadcn/examples/shadcn-button-rounded/main";
import * as ShadcnButtonRtlExample from "../registry/shadcn/examples/shadcn-button-rtl/main";
import * as ShadcnButtonSecondaryExample from "../registry/shadcn/examples/shadcn-button-secondary/main";
import * as ShadcnButtonSizeExample from "../registry/shadcn/examples/shadcn-button-size/main";
import * as ShadcnButtonSpinnerExample from "../registry/shadcn/examples/shadcn-button-spinner/main";
import * as ShadcnButtonWithIconExample from "../registry/shadcn/examples/shadcn-button-with-icon/main";
import * as Main from "./main";

type Message = Main.Message;

export const badgeBasicExamplePreview = (
  model: BadgeBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BadgeBasicExample.view,
    toParentMessage: (message) => Main.GotBadgeBasicExampleMessage({ message }),
  });
};

export const badgeSpinnerExamplePreview = (
  model: BadgeSpinnerExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BadgeSpinnerExample.view,
    toParentMessage: (message) =>
      Main.GotBadgeSpinnerExampleMessage({ message }),
  });
};

export const badgeIconExamplePreview = (): Html =>
  BadgeIconExample.view(BadgeIconExample.init()[0]);

export const badgeLinkExamplePreview = (): Html =>
  BadgeLinkExample.view(BadgeLinkExample.init()[0]);

export const badgeCustomColorsExamplePreview = (): Html =>
  BadgeCustomColorsExample.view(BadgeCustomColorsExample.init()[0]);

export const badgeRtlExamplePreview = (): Html =>
  BadgeRtlExample.view(BadgeRtlExample.init()[0]);

export const breadcrumbBasicExamplePreview = (
  model: BreadcrumbBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BreadcrumbBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBreadcrumbBasicExampleMessage({ message }),
  });
};

export const breadcrumbSeparatorExamplePreview = (
  model: BreadcrumbSeparatorExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BreadcrumbSeparatorExample.view,
    toParentMessage: (message) =>
      Main.GotBreadcrumbSeparatorExampleMessage({ message }),
  });
};

export const breadcrumbDropdownExamplePreview = (
  model: BreadcrumbDropdownExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BreadcrumbDropdownExample.view,
    toParentMessage: (message) =>
      Main.GotBreadcrumbDropdownExampleMessage({ message }),
  });
};

export const breadcrumbCollapsedExamplePreview = (
  model: BreadcrumbCollapsedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BreadcrumbCollapsedExample.view,
    toParentMessage: (message) =>
      Main.GotBreadcrumbCollapsedExampleMessage({ message }),
  });
};

export const breadcrumbLinkExamplePreview = (
  model: BreadcrumbLinkExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BreadcrumbLinkExample.view,
    toParentMessage: (message) =>
      Main.GotBreadcrumbLinkExampleMessage({ message }),
  });
};

export const breadcrumbRtlExamplePreview = (
  model: BreadcrumbRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();
  return h.submodel({
    slotId,
    model,
    view: BreadcrumbRtlExample.view,
    toParentMessage: (message) =>
      Main.GotBreadcrumbRtlExampleMessage({ message }),
  });
};

export const buttonGroupBasicExamplePreview = (
  model: ButtonGroupBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupBasicExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupBasicExampleMessage({ message }),
  });
};

export const buttonGroupOrientationExamplePreview = (
  model: ButtonGroupOrientationExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupOrientationExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupOrientationExampleMessage({ message }),
  });
};

export const buttonGroupSizeExamplePreview = (
  model: ButtonGroupSizeExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupSizeExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupSizeExampleMessage({ message }),
  });
};

export const buttonGroupNestedExamplePreview = (
  model: ButtonGroupNestedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupNestedExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupNestedExampleMessage({ message }),
  });
};

export const buttonGroupSeparatorExamplePreview = (
  model: ButtonGroupSeparatorExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupSeparatorExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupSeparatorExampleMessage({ message }),
  });
};

export const buttonGroupSplitExamplePreview = (
  model: ButtonGroupSplitExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupSplitExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupSplitExampleMessage({ message }),
  });
};

export const buttonGroupInputExamplePreview = (
  model: ButtonGroupInputExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupInputExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupInputExampleMessage({ message }),
  });
};

export const buttonGroupInputGroupExamplePreview = (
  model: ButtonGroupInputGroupExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupInputGroupExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupInputGroupExampleMessage({ message }),
  });
};

export const buttonGroupSelectExamplePreview = (
  model: ButtonGroupSelectExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupSelectExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupSelectExampleMessage({ message }),
  });
};

export const buttonGroupPopoverExamplePreview = (
  model: ButtonGroupPopoverExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupPopoverExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupPopoverExampleMessage({ message }),
  });
};

export const buttonGroupRtlExamplePreview = (
  model: ButtonGroupRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonGroupRtlExample.view,
    toParentMessage: (message): Message =>
      Main.GotButtonGroupRtlExampleMessage({ message }),
  });
};

export const buttonBasicExamplePreview = (
  model: ButtonBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonBasicExample.view,
    toParentMessage: (message) =>
      Main.GotButtonBasicExampleMessage({ message }),
  });
};

export const baseUiButtonBasicExamplePreview = (
  model: BaseUiButtonBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiButtonBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiButtonBasicExampleMessage({ message }),
  });
};

export const baseUiAlertDialogBasicExamplePreview = (
  model: BaseUiAlertDialogBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAlertDialogBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAlertDialogBasicExampleMessage({ message }),
  });
};

export const baseUiAlertDialogCloseConfirmationExamplePreview = (
  model: BaseUiAlertDialogCloseConfirmationExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAlertDialogCloseConfirmationExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAlertDialogCloseConfirmationExampleMessage({ message }),
  });
};

export const baseUiAlertDialogControlledMultipleTriggersExamplePreview = (
  model: BaseUiAlertDialogControlledMultipleTriggersExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAlertDialogControlledMultipleTriggersExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAlertDialogControlledMultipleTriggersExampleMessage({
        message,
      }),
  });
};

export const baseUiAlertDialogOpenFromMenuExamplePreview = (
  model: BaseUiAlertDialogOpenFromMenuExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAlertDialogOpenFromMenuExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAlertDialogOpenFromMenuExampleMessage({ message }),
  });
};

export const baseUiAlertDialogDetachedTriggersExamplePreview = (
  model: BaseUiAlertDialogDetachedTriggersExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAlertDialogDetachedTriggersExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAlertDialogDetachedTriggersExampleMessage({ message }),
  });
};

export const baseUiAlertDialogMultipleTriggersExamplePreview = (
  model: BaseUiAlertDialogMultipleTriggersExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAlertDialogMultipleTriggersExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAlertDialogMultipleTriggersExampleMessage({ message }),
  });
};

export const shadcnButtonBasicExamplePreview = (
  model: ShadcnButtonBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ShadcnButtonBasicExample.view,
    toParentMessage: (message) =>
      Main.GotShadcnButtonBasicExampleMessage({ message }),
  });
};

export const buttonDisabledExamplePreview = (
  model: ButtonDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ButtonDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotButtonDisabledExampleMessage({ message }),
  });
};

export const shadcnButtonSizeExamplePreview = (): Html =>
  ShadcnButtonSizeExample.view(ShadcnButtonSizeExample.init()[0]);

export const shadcnButtonDefaultExamplePreview = (): Html =>
  ShadcnButtonDefaultExample.view(ShadcnButtonDefaultExample.init()[0]);

export const shadcnButtonOutlineExamplePreview = (): Html =>
  ShadcnButtonOutlineExample.view(ShadcnButtonOutlineExample.init()[0]);

export const shadcnButtonSecondaryExamplePreview = (): Html =>
  ShadcnButtonSecondaryExample.view(ShadcnButtonSecondaryExample.init()[0]);

export const shadcnButtonGhostExamplePreview = (): Html =>
  ShadcnButtonGhostExample.view(ShadcnButtonGhostExample.init()[0]);

export const shadcnButtonDestructiveExamplePreview = (): Html =>
  ShadcnButtonDestructiveExample.view(ShadcnButtonDestructiveExample.init()[0]);

export const shadcnButtonLinkExamplePreview = (): Html =>
  ShadcnButtonLinkExample.view(ShadcnButtonLinkExample.init()[0]);

export const shadcnButtonIconExamplePreview = (): Html =>
  ShadcnButtonIconExample.view(ShadcnButtonIconExample.init()[0]);

export const shadcnButtonWithIconExamplePreview = (): Html =>
  ShadcnButtonWithIconExample.view(ShadcnButtonWithIconExample.init()[0]);

export const shadcnButtonRoundedExamplePreview = (): Html =>
  ShadcnButtonRoundedExample.view(ShadcnButtonRoundedExample.init()[0]);

export const shadcnButtonSpinnerExamplePreview = (): Html =>
  ShadcnButtonSpinnerExample.view(ShadcnButtonSpinnerExample.init()[0]);

export const shadcnButtonGroupExamplePreview = (): Html =>
  ShadcnButtonGroupExample.view(ShadcnButtonGroupExample.init()[0]);

export const shadcnButtonAsChildExamplePreview = (): Html =>
  ShadcnButtonAsChildExample.view(ShadcnButtonAsChildExample.init()[0]);

export const shadcnButtonRtlExamplePreview = (): Html =>
  ShadcnButtonRtlExample.view(ShadcnButtonRtlExample.init()[0]);
