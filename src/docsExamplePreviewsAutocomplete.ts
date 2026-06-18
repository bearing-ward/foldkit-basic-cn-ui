import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as AutocompleteBasicExample from "../registry/base-ui/examples/autocomplete-basic/main";
import * as BaseUiAutocompleteBasicExample from "../registry/base-ui/examples/base-ui-autocomplete-basic/main";
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

export const baseUiAutocompleteBasicExamplePreview = (
  model: BaseUiAutocompleteBasicExample.Model,
  slotId: string
): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId,
    model,
    view: BaseUiAutocompleteBasicExample.view,
    toParentMessage: (message) =>
      Main.GotBaseUiAutocompleteBasicExampleMessage({ message }),
  });
};
