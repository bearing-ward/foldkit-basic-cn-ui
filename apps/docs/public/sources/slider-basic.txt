import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Slider from "../../ui/slider";

// MODEL

export const Model = S.Struct({
  slider: Slider.Model,
  status: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotSliderMessage = m("GotSliderMessage", {
  message: Slider.Message,
});

export const Message = S.Union([GotSliderMessage]);
export type Message = typeof Message.Type;

// INIT

const statusForValue = (value: number): string => `Rating: ${value} of 10`;

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [slider, commands] = Slider.init({
    id: "slider-basic",
    min: 0,
    max: 10,
    step: 1,
    initialValue: 4,
  });

  return [
    {
      slider,
      status: statusForValue(slider.value),
    },
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
        const [slider, commands, maybeOutMessage] = Slider.update(
          model.slider,
          message
        );
        const status = Option.match(maybeOutMessage, {
          onNone: () => model.status,
          onSome: M.type<Slider.OutMessage>().pipe(
            M.tagsExhaustive({
              ChangedValue: ({ value }) => statusForValue(value),
            })
          ),
        });

        return [
          evo(model, {
            slider: () => slider,
            status: () => status,
          }),
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

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.slider.id,
        model: model.slider,
        view: Slider.view,
        viewInputs: {
          name: "rating",
          formatValue: (value) => `${value} of 10`,
          toView: (attributes) =>
            Slider.sliderFieldView({
              attributes,
              label: "Rating",
              valueText: `${model.slider.value} of 10`,
            }),
        },
        toParentMessage: (message) => GotSliderMessage({ message }),
      }),
      h.p([h.Class("text-sm text-gray-700")], [model.status]),
    ]
  );
});
