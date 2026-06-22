import { Schema as S } from "effect";
import { Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { describe, test } from "vitest";

import * as Select from "./index";

const UpdatedPlan = m("UpdatedPlan", { value: S.String });

interface Model {
  readonly value: string;
}

type Message = typeof UpdatedPlan.Type;

const initialModel: Model = { value: "team" };

const update = (model: Model, message: Message): readonly [Model, []] => [
  { value: message.value },
  [],
];

const view = (model: Model): Html => {
  const h = html<Message>();

  return Select.view<Message>({
    id: "plan-select",
    value: model.value,
    onChange: (value) => UpdatedPlan({ value }),
    toView: (attributes) =>
      h.div(
        [h.Class("space-y-2")],
        [
          h.label(attributes.label, ["Plan"]),
          h.div(
            [h.Class(Select.selectWrapperClasses)],
            [
              h.select(
                [
                  ...attributes.select,
                  h.Class(Select.selectClasses),
                  h.AriaLabel("Plan"),
                ],
                [
                  h.option([h.Value("team")], ["Team"]),
                  h.option([h.Value("enterprise")], ["Enterprise"]),
                ]
              ),
              h.span([h.Class(Select.chevronClasses)], ["v"]),
            ]
          ),
          h.p(attributes.description, ["Choose an account plan."]),
        ]
      ),
  });
};

const disabledView = (): Html => {
  const h = html<Message>();

  return Select.view<Message>({
    id: "disabled-plan-select",
    value: "team",
    isDisabled: true,
    toView: (attributes) =>
      h.div(
        [],
        [
          h.label(attributes.label, ["Disabled plan"]),
          h.select(
            [
              ...attributes.select,
              h.Class(Select.selectClasses),
              h.AriaLabel("Disabled plan"),
            ],
            [h.option([h.Value("team")], ["Team"])]
          ),
          h.p(attributes.description, ["Plan changes are locked."]),
        ]
      ),
  });
};

describe("Select registry view", () => {
  test("renders label, description, options, and change messages", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("combobox", { name: "Plan" })).toExist(),
      Scene.expect(Scene.text("Choose an account plan.")).toExist(),
      Scene.change(Scene.role("combobox", { name: "Plan" }), "enterprise"),
      Scene.expect(Scene.text("Enterprise")).toExist()
    );
  });

  test("supports disabled native select state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(
        Scene.role("combobox", { name: "Disabled plan" })
      ).toBeDisabled()
    );
  });
});
