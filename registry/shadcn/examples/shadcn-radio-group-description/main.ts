import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as RadioGroup from "../../ui/shadcn-radio-group";

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

const optionView = (
  value: string,
  description: string,
  selected: boolean
): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex items-start gap-3")],
    [
      h.button(
        [
          h.Type("button"),
          h.Role("radio"),
          h.AriaChecked(selected),
          h.AriaLabel(value),
          h.Class("mt-0.5"),
        ],
        [selected ? RadioGroup.checkIcon() : RadioGroup.checkPlaceholder()]
      ),
      h.div(
        [h.Class(RadioGroup.shadcnRadioGroupMetaClassName)],
        [
          h.span([h.Class(RadioGroup.shadcnRadioGroupLabelClassName)], [value]),
          h.p(
            [h.Class(RadioGroup.shadcnRadioGroupDescriptionClassName)],
            [description]
          ),
        ]
      ),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Role("radiogroup"),
      h.AriaLabel("Layout density"),
      h.Class(RadioGroup.shadcnRadioGroupVerticalClassName),
    ],
    [
      optionView("Default", "Standard spacing for most use cases.", true),
      optionView("Comfortable", "More space between elements.", false),
      optionView("Compact", "Minimal spacing for dense layouts.", false),
    ]
  );
});
