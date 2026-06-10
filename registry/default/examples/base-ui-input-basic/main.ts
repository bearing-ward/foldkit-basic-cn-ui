import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Input from "../../ui/base-ui-input";

// MODEL

export const Model = S.Struct({
  name: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedName = m("UpdatedName", { value: S.String });

export const Message = S.Union([UpdatedName]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ name: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedName: ({ value }) => [evo(model, { name: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return Input.view<Message>({
    id: "name-input",
    value: model.name,
    placeholder: "e.g. Colm Tuite",
    onInput: (value) => UpdatedName({ value }),
    toView: (attributes) =>
      h.label(
        [h.Class(Input.baseUiInputRootClassName)],
        [
          h.span(
            [...attributes.label, h.Class(Input.baseUiInputLabelClassName)],
            ["Name"]
          ),
          h.input([
            ...attributes.input,
            h.AriaLabel("Name"),
            h.Class(Input.baseUiInputControlClassName),
          ]),
        ]
      ),
  });
});
