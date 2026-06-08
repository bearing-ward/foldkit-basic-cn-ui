import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as RadioGroup from "../../ui/shadcn-radio-group";

type Density = "Default" | "Comfortable" | "Compact";

const DensityRadioGroup = RadioGroup.create<Density>();
const densities: readonly Density[] = ["Default", "Comfortable", "Compact"];
const descriptions: Record<Density, string> = {
  Default: "Balanced spacing for most screens.",
  Comfortable: "More breathing room for touch-heavy workflows.",
  Compact: "Dense layout for data-heavy work.",
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
    id: "shadcn-radio-group-basic",
    selectedValue: "Default",
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
        const [radioGroup, radioGroupCommands] = DensityRadioGroup.update(
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
        view: DensityRadioGroup.view,
        viewInputs: {
          options: densities,
          ariaLabel: "Layout density",
          name: "density",
          toView: ({ group, hiddenInput, options }) =>
            h.div(
              [...group, h.Class(RadioGroup.shadcnRadioGroupVerticalClassName)],
              [
                h.input(hiddenInput),
                ...options.map((option) =>
                  h.div(
                    [
                      ...option.option,
                      h.Class(
                        RadioGroup.shadcnRadioGroupVerticalOptionClassName
                      ),
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
                                  h.Class(
                                    RadioGroup.shadcnRadioGroupLabelClassName
                                  ),
                                ],
                                [option.value]
                              ),
                              h.p(
                                [
                                  ...option.description,
                                  h.Class(
                                    RadioGroup.shadcnRadioGroupDescriptionClassName
                                  ),
                                ],
                                [descriptions[option.value]]
                              ),
                            ]
                          ),
                          option.isSelected
                            ? RadioGroup.checkIcon()
                            : RadioGroup.checkPlaceholder(),
                        ]
                      ),
                    ]
                  )
                ),
              ]
            ),
        },
        toParentMessage: (message) => GotRadioGroupMessage({ message }),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected density: ${selectedLabel(model)}`]
      ),
    ]
  );
});
