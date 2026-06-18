import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AspectRatioBasicExample from "../registry/shadcn/examples/aspect-ratio-basic/main";
import * as AspectRatioPortraitExample from "../registry/shadcn/examples/aspect-ratio-portrait/main";
import * as AspectRatioRtlExample from "../registry/shadcn/examples/aspect-ratio-rtl/main";
import * as AspectRatioSquareExample from "../registry/shadcn/examples/aspect-ratio-square/main";
import * as Main from "./main";

type Message = Main.Message;

export const aspectRatioBasicExamplePreview = (
  model: AspectRatioBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AspectRatioBasicExample.view,
    toParentMessage: (message) =>
      Main.GotAspectRatioBasicExampleMessage({ message }),
  });
};

export const aspectRatioSquareExamplePreview = (
  model: AspectRatioSquareExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AspectRatioSquareExample.view,
    toParentMessage: (message) =>
      Main.GotAspectRatioSquareExampleMessage({ message }),
  });
};

export const aspectRatioPortraitExamplePreview = (
  model: AspectRatioPortraitExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AspectRatioPortraitExample.view,
    toParentMessage: (message) =>
      Main.GotAspectRatioPortraitExampleMessage({ message }),
  });
};

export const aspectRatioRtlExamplePreview = (
  model: AspectRatioRtlExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AspectRatioRtlExample.view,
    toParentMessage: (message) =>
      Main.GotAspectRatioRtlExampleMessage({ message }),
  });
};
