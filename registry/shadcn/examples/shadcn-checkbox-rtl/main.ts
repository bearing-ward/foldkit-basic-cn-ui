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
    [h.Dir("rtl"), h.Class("max-w-sm space-y-3")],
    [
      h.div(
        [h.Class(Checkbox.shadcnCheckboxRowClassName)],
        [
          h.button(
            [
              h.Type("button"),
              h.Id("terms-checkbox-rtl"),
              h.Name("terms-checkbox"),
              h.Role("checkbox"),
              h.AriaChecked(false),
              h.Class(Checkbox.shadcnCheckboxControlClassName),
            ],
            []
          ),
          h.label(
            [
              h.For("terms-checkbox-rtl"),
              h.Class(Checkbox.shadcnCheckboxLabelClassName),
            ],
            ["قبول الشروط والأحكام"]
          ),
        ]
      ),
      h.div(
        [h.Class(Checkbox.shadcnCheckboxRowClassName)],
        [
          h.button(
            [
              h.Type("button"),
              h.Id("terms-checkbox-2-rtl"),
              h.Name("terms-checkbox-2"),
              h.Role("checkbox"),
              h.AriaChecked(true),
              h.Class(Checkbox.shadcnCheckboxControlClassName),
            ],
            ["✓"]
          ),
          h.div(
            [h.Class(Checkbox.shadcnCheckboxTextClassName)],
            [
              h.label(
                [
                  h.For("terms-checkbox-2-rtl"),
                  h.Class(Checkbox.shadcnCheckboxLabelClassName),
                ],
                ["قبول الشروط والأحكام"]
              ),
              h.p(
                [h.Class(Checkbox.shadcnCheckboxDescriptionClassName)],
                ["بالنقر على هذا المربع، فإنك توافق على الشروط."]
              ),
            ]
          ),
        ]
      ),
      h.div(
        [
          h.DataAttribute("disabled", ""),
          h.Class(Checkbox.shadcnCheckboxRowClassName),
        ],
        [
          h.button(
            [
              h.Type("button"),
              h.Id("toggle-checkbox-rtl"),
              h.Name("toggle-checkbox"),
              h.Role("checkbox"),
              h.AriaChecked(false),
              h.Disabled(true),
              h.Class(Checkbox.shadcnCheckboxControlClassName),
            ],
            []
          ),
          h.label(
            [
              h.For("toggle-checkbox-rtl"),
              h.Class(Checkbox.shadcnCheckboxLabelClassName),
            ],
            ["تفعيل الإشعارات"]
          ),
        ]
      ),
    ]
  );
});
