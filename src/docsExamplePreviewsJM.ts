import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as KbdBasicExample from "../registry/shadcn/examples/kbd-basic/main";
import * as KbdInputGroupExample from "../registry/shadcn/examples/kbd-input-group/main";
import * as KbdRtlExample from "../registry/shadcn/examples/kbd-rtl/main";
import * as LabelBasicExample from "../registry/shadcn/examples/label-basic/main";
import * as LabelFieldExample from "../registry/shadcn/examples/label-field/main";
import * as LabelRtlExample from "../registry/shadcn/examples/label-rtl/main";
import * as ListboxAnimatedExample from "../registry/foldkit/examples/listbox-animated/main";
import * as ListboxBasicExample from "../registry/foldkit/examples/listbox-basic/main";
import * as MenuAnimatedExample from "../registry/foldkit/examples/menu-animated/main";
import * as MenuBasicExample from "../registry/foldkit/examples/menu-basic/main";
import * as MenubarBasicExample from "../registry/base-ui/examples/menubar-basic/main";
import * as MeterBasicExample from "../registry/base-ui/examples/meter-basic/main";
import * as Main from "./main";

type Message = Main.Message;

export const labelBasicExamplePreview = (
  model: LabelBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: LabelBasicExample.view,
    toParentMessage: (message) => Main.GotLabelBasicExampleMessage({ message }),
  });
};

export const labelFieldExamplePreview = (
  model: LabelFieldExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: LabelFieldExample.view,
    toParentMessage: (message) => Main.GotLabelFieldExampleMessage({ message }),
  });
};

export const labelRtlExamplePreview = (
  model: LabelRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: LabelRtlExample.view,
    toParentMessage: (message) => Main.GotLabelRtlExampleMessage({ message }),
  });
};

export const kbdBasicExamplePreview = (
  model: KbdBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: KbdBasicExample.view,
    toParentMessage: (message) => Main.GotKbdBasicExampleMessage({ message }),
  });
};

export const kbdRtlExamplePreview = (
  model: KbdRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: KbdRtlExample.view,
    toParentMessage: (message) => Main.GotKbdRtlExampleMessage({ message }),
  });
};

export const kbdInputGroupExamplePreview = (
  model: KbdInputGroupExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: KbdInputGroupExample.view,
    toParentMessage: (message) =>
      Main.GotKbdInputGroupExampleMessage({ message }),
  });
};

export const menubarBasicExamplePreview = (
  model: MenubarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: MenubarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotMenubarBasicExampleMessage({ message }),
  });
};

export const listboxBasicExamplePreview = (
  model: ListboxBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ListboxBasicExample.view,
    toParentMessage: (message) =>
      Main.GotListboxBasicExampleMessage({ message }),
  });
};

export const listboxAnimatedExamplePreview = (
  model: ListboxAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: ListboxAnimatedExample.view,
    toParentMessage: (message) =>
      Main.GotListboxAnimatedExampleMessage({ message }),
  });
};

export const menuBasicExamplePreview = (
  model: MenuBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: MenuBasicExample.view,
    toParentMessage: (message) => Main.GotMenuBasicExampleMessage({ message }),
  });
};

export const menuAnimatedExamplePreview = (
  model: MenuAnimatedExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: MenuAnimatedExample.view,
    toParentMessage: (message) =>
      Main.GotMenuAnimatedExampleMessage({ message }),
  });
};

export const meterBasicExamplePreview = (
  model: MeterBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: MeterBasicExample.view,
    toParentMessage: (message) => Main.GotMeterBasicExampleMessage({ message }),
  });
};
