import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Slider from "../../ui/slider";

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
    id: "slider-disabled",
    min: 0,
    max: 100,
    step: 5,
    initialValue: 40,
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
      GotSliderMessage: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.slider.id,
        model: model.slider,
        view: Slider.view,
        viewInputs: {
          isDisabled: true,
          formatValue: (value) => `${value} percent`,
          toView: (attributes) =>
            Slider.sliderFieldView({
              attributes,
              label: "Volume",
              valueText: `${model.slider.value}%`,
            }),
        },
        toParentMessage: (message) => GotSliderMessage({ message }),
      }),
      h.p([h.Class("text-sm text-gray-700")], ["Volume is locked."]),
    ]
  );
});
