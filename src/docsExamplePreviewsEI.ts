import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as EmptyBackgroundExample from "../registry/default/examples/empty-background/main";
import * as EmptyAvatarGroupExample from "../registry/default/examples/empty-avatar-group/main";
import * as EmptyAvatarExample from "../registry/default/examples/empty-avatar/main";
import * as EmptyBasicExample from "../registry/default/examples/empty-basic/main";
import * as EmptyInputGroupExample from "../registry/default/examples/empty-input-group/main";
import * as EmptyOutlineExample from "../registry/default/examples/empty-outline/main";
import * as EmptyRtlExample from "../registry/default/examples/empty-rtl/main";
import * as FieldBasicExample from "../registry/default/examples/field-basic/main";
import * as FieldsetBasicExample from "../registry/default/examples/fieldset-basic/main";
import * as FieldsetDisabledExample from "../registry/default/examples/fieldset-disabled/main";
import * as FileDropBasicExample from "../registry/default/examples/file-drop-basic/main";
import * as FileDropDisabledExample from "../registry/default/examples/file-drop-disabled/main";
import * as FormBasicExample from "../registry/default/examples/form-basic/main";
import * as HoverCardBasicExample from "../registry/default/examples/hover-card-basic/main";
import * as HoverCardRtlExample from "../registry/default/examples/hover-card-rtl/main";
import * as HoverCardSidesExample from "../registry/default/examples/hover-card-sides/main";
import * as InputBasicExample from "../registry/default/examples/input-basic/main";
import * as InputDisabledExample from "../registry/default/examples/input-disabled/main";
import * as InputOtpBasicExample from "../registry/default/examples/input-otp-basic/main";
import * as InputOtpPatternExample from "../registry/default/examples/input-otp-pattern/main";
import * as InputOtpSeparatorExample from "../registry/default/examples/input-otp-separator/main";
import * as InputOtpDisabledExample from "../registry/default/examples/input-otp-disabled/main";
import * as InputOtpControlledExample from "../registry/default/examples/input-otp-controlled/main";
import * as InputOtpInvalidExample from "../registry/default/examples/input-otp-invalid/main";
import * as InputOtpFourDigitsExample from "../registry/default/examples/input-otp-four-digits/main";
import * as InputOtpAlphanumericExample from "../registry/default/examples/input-otp-alphanumeric/main";
import * as InputOtpFormExample from "../registry/default/examples/input-otp-form/main";
import * as InputOtpRtlExample from "../registry/default/examples/input-otp-rtl/main";
import * as ItemAvatarExample from "../registry/default/examples/item-avatar/main";
import * as ItemBasicExample from "../registry/default/examples/item-basic/main";
import * as ItemDropdownExample from "../registry/default/examples/item-dropdown/main";
import * as ItemGroupExample from "../registry/default/examples/item-group/main";
import * as ItemHeaderExample from "../registry/default/examples/item-header/main";
import * as ItemIconExample from "../registry/default/examples/item-icon/main";
import * as ItemImageExample from "../registry/default/examples/item-image/main";
import * as ItemLinkExample from "../registry/default/examples/item-link/main";
import * as ItemRtlExample from "../registry/default/examples/item-rtl/main";
import * as ItemSizeExample from "../registry/default/examples/item-size/main";
import * as ItemVariantExample from "../registry/default/examples/item-variant/main";
import * as Main from "./main";

type Message = Main.Message;

export const hoverCardBasicExamplePreview = (
  model: HoverCardBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: HoverCardBasicExample.view,
    toParentMessage: (message) =>
      Main.GotHoverCardBasicExampleMessage({ message }),
  });
};

export const hoverCardSidesExamplePreview = (
  model: HoverCardSidesExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: HoverCardSidesExample.view,
    toParentMessage: (message) =>
      Main.GotHoverCardSidesExampleMessage({ message }),
  });
};

export const hoverCardRtlExamplePreview = (
  model: HoverCardRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: HoverCardRtlExample.view,
    toParentMessage: (message) =>
      Main.GotHoverCardRtlExampleMessage({ message }),
  });
};

export const inputOtpBasicExamplePreview = (
  model: InputOtpBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpBasicExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpBasicExampleMessage({ message }),
  });
};

export const inputOtpPatternExamplePreview = (
  model: InputOtpPatternExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpPatternExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpPatternExampleMessage({ message }),
  });
};

export const inputOtpSeparatorExamplePreview = (
  model: InputOtpSeparatorExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpSeparatorExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpSeparatorExampleMessage({ message }),
  });
};

export const inputOtpDisabledExamplePreview = (
  model: InputOtpDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpDisabledExampleMessage({ message }),
  });
};

export const inputOtpControlledExamplePreview = (
  model: InputOtpControlledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpControlledExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpControlledExampleMessage({ message }),
  });
};

export const inputOtpInvalidExamplePreview = (
  model: InputOtpInvalidExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpInvalidExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpInvalidExampleMessage({ message }),
  });
};

export const inputOtpFourDigitsExamplePreview = (
  model: InputOtpFourDigitsExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpFourDigitsExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpFourDigitsExampleMessage({ message }),
  });
};

export const inputOtpAlphanumericExamplePreview = (
  model: InputOtpAlphanumericExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpAlphanumericExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpAlphanumericExampleMessage({ message }),
  });
};

export const inputOtpFormExamplePreview = (
  model: InputOtpFormExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpFormExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpFormExampleMessage({ message }),
  });
};

export const inputOtpRtlExamplePreview = (
  model: InputOtpRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputOtpRtlExample.view,
    toParentMessage: (message) =>
      Main.GotInputOtpRtlExampleMessage({ message }),
  });
};

export const itemAvatarExamplePreview = (
  model: ItemAvatarExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemAvatarExample.view,
    toParentMessage: (message) => Main.GotItemAvatarExampleMessage({ message }),
  });
};

export const itemBasicExamplePreview = (
  model: ItemBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemBasicExample.view,
    toParentMessage: (message) => Main.GotItemBasicExampleMessage({ message }),
  });
};

export const itemGroupExamplePreview = (
  model: ItemGroupExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemGroupExample.view,
    toParentMessage: (message) => Main.GotItemGroupExampleMessage({ message }),
  });
};

export const itemHeaderExamplePreview = (
  model: ItemHeaderExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemHeaderExample.view,
    toParentMessage: (message) => Main.GotItemHeaderExampleMessage({ message }),
  });
};

export const itemIconExamplePreview = (
  model: ItemIconExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemIconExample.view,
    toParentMessage: (message) => Main.GotItemIconExampleMessage({ message }),
  });
};

export const itemImageExamplePreview = (
  model: ItemImageExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemImageExample.view,
    toParentMessage: (message) => Main.GotItemImageExampleMessage({ message }),
  });
};

export const itemLinkExamplePreview = (
  model: ItemLinkExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemLinkExample.view,
    toParentMessage: (message) => Main.GotItemLinkExampleMessage({ message }),
  });
};

export const itemDropdownExamplePreview = (
  model: ItemDropdownExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemDropdownExample.view,
    toParentMessage: (message) =>
      Main.GotItemDropdownExampleMessage({ message }),
  });
};

export const itemRtlExamplePreview = (
  model: ItemRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemRtlExample.view,
    toParentMessage: (message) => Main.GotItemRtlExampleMessage({ message }),
  });
};

export const itemSizeExamplePreview = (
  model: ItemSizeExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemSizeExample.view,
    toParentMessage: (message) => Main.GotItemSizeExampleMessage({ message }),
  });
};

export const itemVariantExamplePreview = (
  model: ItemVariantExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ItemVariantExample.view,
    toParentMessage: (message) =>
      Main.GotItemVariantExampleMessage({ message }),
  });
};

export const emptyBasicExamplePreview = (
  model: EmptyBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: EmptyBasicExample.view,
    toParentMessage: (message) => Main.GotEmptyBasicExampleMessage({ message }),
  });
};

export const emptyBackgroundExamplePreview = (
  model: EmptyBackgroundExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: EmptyBackgroundExample.view,
    toParentMessage: (message) =>
      Main.GotEmptyBackgroundExampleMessage({ message }),
  });
};

export const emptyAvatarExamplePreview = (
  model: EmptyAvatarExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: EmptyAvatarExample.view,
    toParentMessage: (message) =>
      Main.GotEmptyAvatarExampleMessage({ message }),
  });
};

export const emptyAvatarGroupExamplePreview = (
  model: EmptyAvatarGroupExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: EmptyAvatarGroupExample.view,
    toParentMessage: (message) =>
      Main.GotEmptyAvatarGroupExampleMessage({ message }),
  });
};

export const emptyInputGroupExamplePreview = (
  model: EmptyInputGroupExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: EmptyInputGroupExample.view,
    toParentMessage: (message) =>
      Main.GotEmptyInputGroupExampleMessage({ message }),
  });
};

export const emptyOutlineExamplePreview = (
  model: EmptyOutlineExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: EmptyOutlineExample.view,
    toParentMessage: (message) =>
      Main.GotEmptyOutlineExampleMessage({ message }),
  });
};

export const emptyRtlExamplePreview = (
  model: EmptyRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: EmptyRtlExample.view,
    toParentMessage: (message) => Main.GotEmptyRtlExampleMessage({ message }),
  });
};

export const fieldBasicExamplePreview = (
  model: FieldBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FieldBasicExample.view,
    toParentMessage: (message) => Main.GotFieldBasicExampleMessage({ message }),
  });
};

export const formBasicExamplePreview = (
  model: FormBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FormBasicExample.view,
    toParentMessage: (message) => Main.GotFormBasicExampleMessage({ message }),
  });
};

export const fieldsetBasicExamplePreview = (
  model: FieldsetBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FieldsetBasicExample.view,
    toParentMessage: (message) =>
      Main.GotFieldsetBasicExampleMessage({ message }),
  });
};

export const fieldsetDisabledExamplePreview = (
  model: FieldsetDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FieldsetDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotFieldsetDisabledExampleMessage({ message }),
  });
};

export const fileDropBasicExamplePreview = (
  model: FileDropBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FileDropBasicExample.view,
    toParentMessage: (message) =>
      Main.GotFileDropBasicExampleMessage({ message }),
  });
};

export const fileDropDisabledExamplePreview = (
  model: FileDropDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: FileDropDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotFileDropDisabledExampleMessage({ message }),
  });
};

export const inputBasicExamplePreview = (
  model: InputBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputBasicExample.view,
    toParentMessage: (message) => Main.GotInputBasicExampleMessage({ message }),
  });
};

export const inputDisabledExamplePreview = (
  model: InputDisabledExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: InputDisabledExample.view,
    toParentMessage: (message) =>
      Main.GotInputDisabledExampleMessage({ message }),
  });
};
