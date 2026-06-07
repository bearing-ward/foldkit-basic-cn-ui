import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AvatarBasicExample from "../registry/default/examples/avatar-basic/main";
import * as Main from "./main";

type Message = Main.Message;

export const avatarBasicExamplePreview = (
  model: AvatarBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AvatarBasicExample.view,
    toParentMessage: (message) =>
      Main.GotAvatarBasicExampleMessage({ message }),
  });
};
