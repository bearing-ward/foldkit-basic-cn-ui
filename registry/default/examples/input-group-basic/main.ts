import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as InputGroup from "../../ui/input-group";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return InputGroup.view<Message>({
    className: "w-full max-w-xs",
    children: [
      InputGroup.addonView<Message>({ children: [h.span([], ["https://"])] }),
      InputGroup.inputView<Message>({
        ariaLabel: "Website",
        placeholder: "example.com",
      }),
    ],
  });
});
