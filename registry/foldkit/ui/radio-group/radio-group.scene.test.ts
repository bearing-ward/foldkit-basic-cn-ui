import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as RadioGroup from "./index";

type Plan = "Startup" | "Business" | "Enterprise";

const PlanRadioGroup = RadioGroup.create<Plan>();
const plans: readonly Plan[] = ["Startup", "Business", "Enterprise"];

const GotRadioGroupMessage = m("GotRadioGroupMessage", {
  message: RadioGroup.Message,
});

const Model = S.Struct({
  radioGroup: RadioGroup.Model,
});

type Model = typeof Model.Type;

const Message = S.Union([GotRadioGroupMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  radioGroup: RadioGroup.init({
    id: "plan-radio-group",
    selectedValue: "Startup",
  })[0],
};

const update = (
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

const selectedLabel = (model: Model): string =>
  Option.getOrElse(model.radioGroup.selectedValue, () => "none");

const view = (model: Model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
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
              [...group, h.Class(RadioGroup.verticalGroupClassName)],
              [
                h.input(hiddenInput),
                ...options.map((option) =>
                  h.div(
                    [
                      ...option.option,
                      h.Class(RadioGroup.verticalOptionClassName),
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
                                  h.Class(RadioGroup.labelClassName),
                                ],
                                [option.value]
                              ),
                              h.p(
                                [
                                  ...option.description,
                                  h.Class(RadioGroup.descriptionClassName),
                                ],
                                [`${option.value} plan`]
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
      h.p([], [`Selected plan: ${selectedLabel(model)}`]),
    ]
  );
};

const disabledView = (model: Model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: "disabled-plan-radio-group",
    model: model.radioGroup,
    view: PlanRadioGroup.view,
    viewInputs: {
      options: plans,
      ariaLabel: "Locked server plan",
      isDisabled: true,
      toView: ({ group, options }) =>
        h.div(
          [...group, h.Class(RadioGroup.verticalGroupClassName)],
          options.map((option) =>
            h.div(
              [...option.option, h.Class(RadioGroup.verticalOptionClassName)],
              [
                h.span(
                  [...option.label, h.Class(RadioGroup.labelClassName)],
                  [option.value]
                ),
              ]
            )
          )
        ),
    },
    toParentMessage: (message) => GotRadioGroupMessage({ message }),
  });
};

describe("RadioGroup registry view", () => {
  test("renders options, hidden input, and selection messages", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.role("radio", { name: "Startup" })).toBeChecked(),
      Scene.expect(Scene.text("Startup plan")).toExist(),
      Scene.click(Scene.role("radio", { name: "Business" })),
      Scene.Command.expectHas(
        RadioGroup.FocusOption({ id: "plan-radio-group", index: 1 })
      ),
      Scene.Command.resolve(
        RadioGroup.FocusOption({ id: "plan-radio-group", index: 1 }),
        RadioGroup.CompletedFocusOption(),
        (message) => GotRadioGroupMessage({ message })
      ),
      Scene.expect(Scene.role("radio", { name: "Business" })).toBeChecked(),
      Scene.expect(Scene.text("Selected plan: Business")).toExist()
    );
  });

  test("supports disabled group state", () => {
    Scene.scene(
      { update, view: disabledView },
      Scene.with(initialModel),
      Scene.expect(Scene.role("radio", { name: "Startup" })).toBeDisabled(),
      Scene.expect(Scene.role("radio", { name: "Business" })).toBeDisabled()
    );
  });
});
