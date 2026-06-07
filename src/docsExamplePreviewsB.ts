import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as BadgeBasicExample from "../registry/default/examples/badge-basic/main";
import * as BadgeSpinnerExample from "../registry/default/examples/badge-spinner/main";
import * as BreadcrumbBasicExample from "../registry/default/examples/breadcrumb-basic/main";
import * as BreadcrumbCollapsedExample from "../registry/default/examples/breadcrumb-collapsed/main";
import * as BreadcrumbDropdownExample from "../registry/default/examples/breadcrumb-dropdown/main";
import * as BreadcrumbLinkExample from "../registry/default/examples/breadcrumb-link/main";
import * as BreadcrumbRtlExample from "../registry/default/examples/breadcrumb-rtl/main";
import * as BreadcrumbSeparatorExample from "../registry/default/examples/breadcrumb-separator/main";
import * as ButtonBasicExample from "../registry/default/examples/button-basic/main";
import * as ButtonDisabledExample from "../registry/default/examples/button-disabled/main";
import * as ButtonGroupBasicExample from "../registry/default/examples/button-group-basic/main";
import * as ButtonGroupInputGroupExample from "../registry/default/examples/button-group-input-group/main";
import * as ButtonGroupInputExample from "../registry/default/examples/button-group-input/main";
import * as ButtonGroupNestedExample from "../registry/default/examples/button-group-nested/main";
import * as ButtonGroupOrientationExample from "../registry/default/examples/button-group-orientation/main";
import * as ButtonGroupPopoverExample from "../registry/default/examples/button-group-popover/main";
import * as ButtonGroupRtlExample from "../registry/default/examples/button-group-rtl/main";
import * as ButtonGroupSelectExample from "../registry/default/examples/button-group-select/main";
import * as ButtonGroupSeparatorExample from "../registry/default/examples/button-group-separator/main";
import * as ButtonGroupSizeExample from "../registry/default/examples/button-group-size/main";
import * as ButtonGroupSplitExample from "../registry/default/examples/button-group-split/main";
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
