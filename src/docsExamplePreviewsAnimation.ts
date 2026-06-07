import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AnimationBasicExample from "../registry/default/examples/animation-basic/main";
import * as Main from "./main";

type Message = Main.Message;

export const animationBasicExamplePreview = (
  model: AnimationBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AnimationBasicExample.view,
    toParentMessage: (message) =>
      Main.GotAnimationBasicExampleMessage({ message }),
  });
};
