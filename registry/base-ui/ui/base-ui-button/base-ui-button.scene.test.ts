import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, test } from "vitest";

import * as Button from "./index";

const ClickedButton = m("ClickedButton");

const Model = S.Struct({
  count: S.Number,
});

type Model = typeof Model.Type;

const Message = S.Union([ClickedButton]);
type Message = typeof Message.Type;

const initialModel: Model = { count: 0 };

const update = (model: Model): readonly [Model, []] => [
  { count: model.count + 1 },
  [],
];

const view = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-2")],
    [
      Button.view<Message>({
        onClick: ClickedButton(),
        toView: (attributes) =>
          h.button(
            [...attributes.button, h.Class(Button.baseUiButtonClassName)],
            ["Save changes"]
          ),
      }),
      h.p([], [`Clicked ${model.count} times`]),
    ]
  );
};

const disabledView = (): Html => {
  const h = html<Message>();

  return Button.view<Message>({
    isDisabled: true,
    toView: (attributes) =>
      h.button(
        [...attributes.button, h.Class(Button.baseUiButtonClassName)],
        ["Disabled"]
      ),
  });
};

describe("Base UI Button registry view", () => {
  test("dispatches click messages through the Foldkit primitive", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Save changes" })).toExist(),
      Scene.expect(Scene.text("Clicked 0 times")).toExist(),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.expect(Scene.text("Clicked 1 times")).toExist()
    );
  });

  test("supports disabled native button state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(Scene.role("button", { name: "Disabled" })).toBeDisabled()
    );
  });
});
