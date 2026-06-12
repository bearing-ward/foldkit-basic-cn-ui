import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Checkbox from "../../ui/shadcn-checkbox";

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
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("mx-auto w-56")],
    [
      h.div(
        [
          h.DataAttribute("invalid", ""),
          h.Class(Checkbox.shadcnCheckboxRowClassName),
        ],
        [
          h.button(
            [
              h.Type("button"),
              h.Id("terms-checkbox-invalid"),
              h.Name("terms-checkbox-invalid"),
              h.Role("checkbox"),
              h.AriaChecked(false),
              h.AriaInvalid(true),
              h.Class(Checkbox.shadcnCheckboxControlClassName),
            ],
            []
          ),
          h.label(
            [
              h.For("terms-checkbox-invalid"),
              h.Class(Checkbox.shadcnCheckboxLabelClassName),
            ],
            ["Accept terms and conditions"]
          ),
        ]
      ),
    ]
  );
});
