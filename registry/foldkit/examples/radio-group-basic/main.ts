import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as RadioGroup from "../../ui/radio-group";

type Plan = "Startup" | "Business" | "Enterprise";

const PlanRadioGroup = RadioGroup.create<Plan>();
const plans: readonly Plan[] = ["Startup", "Business", "Enterprise"];

const planDescriptions: Record<Plan, string> = {
  Startup: "12GB / 6 CPUs. Perfect for small projects.",
  Business: "16GB / 8 CPUs. For growing teams.",
  Enterprise: "32GB / 12 CPUs. Dedicated infrastructure.",
};

const planPrices: Record<Plan, string> = {
  Startup: "$40/mo",
  Business: "$80/mo",
  Enterprise: "$160/mo",
};

// MODEL

export const Model = S.Struct({
  radioGroup: RadioGroup.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotRadioGroupMessage = m("GotRadioGroupMessage", {
  message: RadioGroup.Message,
});

export const Message = S.Union([GotRadioGroupMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [radioGroup, radioGroupCommands] = RadioGroup.init({
    id: "radio-group-basic",
    selectedValue: "Startup",
  });

  return [
    { radioGroup },
    Command.mapMessages(radioGroupCommands, (message) =>
      GotRadioGroupMessage({ message })
    ),
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotRadioGroupMessage: ({ message }) => {
        const [radioGroup, radioGroupCommands] = PlanRadioGroup.update(
          model.radioGroup,
          message
        );

        return [
          evo(model, { radioGroup: () => radioGroup }),
          Command.mapMessages(radioGroupCommands, (message) =>
            GotRadioGroupMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

const selectedLabel = (model: Model): string =>
  Option.getOrElse(model.radioGroup.selectedValue, () => "none");

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-md space-y-3")],
    [
      h.submodel({
        slotId: model.radioGroup.id,
        model: model.radioGroup,
        view: PlanRadioGroup.view,
        viewInputs: {
          options: plans,
          ariaLabel: "Server plan",
          name: "plan",
          toView: ({ group, hiddenInput, options }) =>
            h.div(
              [...group, h.Class(RadioGroup.verticalGroupClasses)],
              [
                h.input(hiddenInput),
                ...options.map((option) => {
                  const plan = option.value;

                  return h.div(
                    [
                      ...option.option,
                      h.Class(RadioGroup.verticalOptionClasses),
                    ],
                    [
                      h.div(
                        [h.Class("flex w-full items-center justify-between")],
                        [
                          h.div(
                            [],
                            [
                              h.span(
                                [
                                  ...option.label,
                                  h.Class(RadioGroup.labelClasses),
                                ],
                                [plan]
                              ),
                              h.p(
                                [
                                  ...option.description,
                                  h.Class(RadioGroup.descriptionClasses),
                                ],
                                [planDescriptions[plan]]
                              ),
                            ]
                          ),
                          h.div(
                            [h.Class("flex items-center gap-3")],
                            [
                              h.span(
                                [h.Class(RadioGroup.metaClasses)],
                                [planPrices[plan]]
                              ),
                              option.isSelected
                                ? RadioGroup.checkIcon()
                                : RadioGroup.checkPlaceholder(),
                            ]
                          ),
                        ]
                      ),
                    ]
                  );
                }),
              ]
            ),
        },
        toParentMessage: (message) => GotRadioGroupMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected plan: ${selectedLabel(model)}`]
      ),
    ]
  );
});
