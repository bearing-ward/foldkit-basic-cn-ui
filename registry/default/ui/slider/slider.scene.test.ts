import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Slider from "./index";

const GotSliderMessage = m("GotSliderMessage", {
  message: Slider.Message,
});

const Model = S.Struct({
  slider: Slider.Model,
  status: S.String,
});

type Model = typeof Model.Type;

const Message = S.Union([GotSliderMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  slider: Slider.init({
    id: "registry-slider",
    min: 0,
    max: 10,
    step: 1,
    initialValue: 4,
  })[0],
  status: "Rating: 4 of 10",
};

const update = (
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
              ChangedValue: ({ value }) => `Rating: ${value} of 10`,
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

const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.slider.id,
        model: model.slider,
        view: Slider.view,
        viewInputs: {
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
      h.p([], [model.status]),
    ]
  );
});

describe("Slider registry view", () => {
  test("renders accessible value and applies keyboard value changes", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("slider", { name: "Rating" })).toHaveAttr(
        "aria-valuenow",
        "4"
      ),
      Scene.expect(Scene.text("Rating: 4 of 10")).toExist(),
      Scene.keydown(Scene.role("slider", { name: "Rating" }), "ArrowRight"),
      Scene.expect(Scene.role("slider", { name: "Rating" })).toHaveAttr(
        "aria-valuenow",
        "5"
      ),
      Scene.expect(Scene.text("Rating: 5 of 10")).toExist()
    );
  });
});
