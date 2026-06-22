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

const optionView = (value: string, selected: boolean): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex items-center gap-3")],
    [
      h.button(
        [
          h.Type("button"),
          h.Role("radio"),
          h.AriaChecked(selected),
          h.AriaLabel(value),
        ],
        [selected ? RadioGroup.checkIcon() : RadioGroup.checkPlaceholder()]
      ),
      h.span([h.Class(RadioGroup.shadcnRadioGroupLabelClasses)], [value]),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.fieldset(
    [h.Class("space-y-4")],
    [
      h.legend(
        [h.Class("text-sm font-medium text-gray-950")],
        ["Subscription Plan"]
      ),
      h.p(
        [h.Class(RadioGroup.shadcnRadioGroupDescriptionClasses)],
        ["Yearly and lifetime plans offer significant savings."]
      ),
      h.div(
        [
          h.Role("radiogroup"),
          h.AriaLabel("Subscription Plan"),
          h.Class(RadioGroup.shadcnRadioGroupVerticalClasses),
        ],
        [
          optionView("Monthly ($9.99/month)", true),
          optionView("Yearly ($99.99/year)", false),
          optionView("Lifetime ($299.99)", false),
        ]
      ),
    ]
  );
});
