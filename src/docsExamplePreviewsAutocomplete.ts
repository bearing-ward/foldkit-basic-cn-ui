import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AutocompleteBasicExample from "../registry/default/examples/autocomplete-basic/main";
import * as Main from "./main";

type Message = Main.Message;

export const autocompleteBasicExamplePreview = (
  model: AutocompleteBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: AutocompleteBasicExample.view,
    toParentMessage: (message) =>
      Main.GotAutocompleteBasicExampleMessage({ message }),
  });
};
