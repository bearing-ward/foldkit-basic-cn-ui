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
          h.DataAttribute("disabled", ""),
          h.Class(Checkbox.shadcnCheckboxRowClassName),
        ],
        [
          h.button(
            [
              h.Type("button"),
              h.Id("toggle-checkbox-disabled"),
              h.Name("toggle-checkbox-disabled"),
              h.Role("checkbox"),
              h.AriaChecked(false),
              h.Disabled(true),
              h.Class(Checkbox.shadcnCheckboxControlClassName),
            ],
            []
          ),
          h.label(
            [
              h.For("toggle-checkbox-disabled"),
              h.Class(Checkbox.shadcnCheckboxLabelClassName),
            ],
            ["Enable notifications"]
          ),
        ]
      ),
    ]
  );
});
