import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Slider from "../../ui/base-ui-slider";

// MODEL

export const Model = S.Struct({
  slider: Slider.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotSliderMessage = m("GotSliderMessage", {
  message: Slider.Message,
});

export const Message = S.Union([GotSliderMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [slider, commands] = Slider.init({
    id: "slider-basic",
    min: 0,
    max: 100,
    step: 1,
    initialValue: 25,
  });

  return [
    { slider },
    Command.mapMessages(commands, (message) => GotSliderMessage({ message })),
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
      GotSliderMessage: ({ message }) => {
        const [slider, commands] = Slider.update(model.slider, message);

        return [
          evo(model, { slider: () => slider }),
          Command.mapMessages(commands, (message) =>
            GotSliderMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.slider.id,
    model: model.slider,
    view: Slider.view,
    viewInputs: {
      name: "volume",
      formatValue: (value) => `${value}%`,
      toView: (attributes) =>
        h.div(
          [...attributes.root, h.Class(Slider.baseUiSliderRootClasses)],
          [
            h.div(
              [...attributes.track, h.Class(Slider.baseUiSliderTrackClasses)],
              [
                h.div(
                  [
                    ...attributes.filledTrack,
                    h.Class(Slider.baseUiSliderFilledTrackClasses),
                  ],
                  []
                ),
              ]
            ),
            h.div(
              [
                ...attributes.thumb,
                h.AriaLabel("Volume"),
                h.Class(Slider.baseUiSliderThumbClasses),
              ],
              []
            ),
            h.input(attributes.hiddenInput),
          ]
        ),
    },
    toParentMessage: (message) => GotSliderMessage({ message }),
  });
});
