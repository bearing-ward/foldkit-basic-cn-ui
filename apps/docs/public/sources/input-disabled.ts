import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Input from "../../ui/input";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedDisabledName = m("UpdatedDisabledName", {
  value: S.String,
});

export const Message = S.Union([UpdatedDisabledName]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedDisabledName: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Input.view<Message>({
    id: "disabled-name-input",
    value: "Ada Lovelace",
    isDisabled: true,
    onInput: (value) => UpdatedDisabledName({ value }),
    toView: (attributes) =>
      h.div(
        [h.Class(Input.fieldClassName)],
        [
          h.label(
            [...attributes.label, h.Class(Input.labelClassName)],
            ["Disabled name"]
          ),
          h.input([...attributes.input, h.Class(Input.inputClassName)]),
          h.p(
            [...attributes.description, h.Class(Input.descriptionClassName)],
            ["This input is disabled."]
          ),
        ]
      ),
  });
});
