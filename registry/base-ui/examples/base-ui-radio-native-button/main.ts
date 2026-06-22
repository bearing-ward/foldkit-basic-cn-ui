import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as RadioGroup from "../../ui/base-ui-radio";

type StorageType = "SSD" | "HDD";

const StorageRadioGroup = RadioGroup.create<StorageType>();
const storageTypes: readonly StorageType[] = ["SSD", "HDD"];

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
    id: "radio-native-button",
    selectedValue: "SSD",
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
        const [radioGroup, radioGroupCommands] = StorageRadioGroup.update(
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

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.radioGroup.id,
    model: model.radioGroup,
    view: StorageRadioGroup.view,
    viewInputs: {
      options: storageTypes,
      ariaLabel: "Storage type",
      name: "storageType",
      toView: ({ group, hiddenInput, options }) =>
        h.div(
          [...group, h.Class(RadioGroup.baseUiRadioVerticalClasses)],
          [
            h.input(hiddenInput),
            h.div(
              [h.Class(RadioGroup.baseUiRadioLabelClasses)],
              ["Storage type"]
            ),
            ...options.map((option) => {
              const controlId = `storage-type-${option.value.toLowerCase()}`;

              return h.div(
                [h.Class("flex items-center gap-3")],
                [
                  h.label(
                    [
                      h.For(controlId),
                      h.Class(
                        `${RadioGroup.baseUiRadioLabelClasses} cursor-pointer`
                      ),
                    ],
                    [option.value]
                  ),
                  h.button(
                    [
                      ...option.option,
                      h.Id(controlId),
                      h.Type("button"),
                      h.Class(RadioGroup.baseUiRadioVerticalOptionClasses),
                    ],
                    [
                      option.isSelected
                        ? RadioGroup.baseUiRadioCheckIcon()
                        : RadioGroup.baseUiRadioCheckPlaceholder(),
                    ]
                  ),
                ]
              );
            }),
          ]
        ),
    },
    toParentMessage: (message) => GotRadioGroupMessage({ message }),
  });
});
