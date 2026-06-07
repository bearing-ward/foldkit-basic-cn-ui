import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as CheckboxGroup from "../../ui/checkbox-group";

// MODEL

export const AppleValue = S.Union([
  S.Literal("fuji-apple"),
  S.Literal("gala-apple"),
  S.Literal("granny-smith-apple"),
]);
export type AppleValue = typeof AppleValue.Type;

export const Model = S.Struct({
  selectedApples: S.Array(AppleValue),
});

export type Model = typeof Model.Type;

const appleValues: readonly AppleValue[] = [
  "fuji-apple",
  "gala-apple",
  "granny-smith-apple",
];

// MESSAGE

export const ToggledApple = m("ToggledApple", { value: AppleValue });
export const ToggledAllApples = m("ToggledAllApples");

export const Message = S.Union([ToggledApple, ToggledAllApples]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedApples: ["fuji-apple"] }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ToggledApple: ({ value }) => [
        evo(model, {
          selectedApples: (selectedApples) =>
            CheckboxGroup.toggleValue(selectedApples, value),
        }),
        [],
      ],
      ToggledAllApples: () => [
        evo(model, {
          selectedApples: (selectedApples) =>
            CheckboxGroup.parentState(selectedApples, appleValues) === "checked"
              ? []
              : appleValues,
        }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>(
  (model): Html =>
    CheckboxGroup.groupView<Message>({
      label: "Apples",
      labelId: "checkbox-group-apples-label",
      name: "apple",
      children: [
        CheckboxGroup.parentItemView<Message>({
          selectedValues: model.selectedApples,
          allValues: appleValues,
          label: "All apples",
          onValueChange: ToggledAllApples(),
          className: "mb-1",
        }),
        CheckboxGroup.itemView<Message>({
          value: "fuji-apple",
          selectedValues: model.selectedApples,
          label: "Fuji",
          onValueChange: ToggledApple({ value: "fuji-apple" }),
        }),
        CheckboxGroup.itemView<Message>({
          value: "gala-apple",
          selectedValues: model.selectedApples,
          label: "Gala",
          onValueChange: ToggledApple({ value: "gala-apple" }),
        }),
        CheckboxGroup.itemView<Message>({
          value: "granny-smith-apple",
          selectedValues: model.selectedApples,
          label: "Granny Smith",
          onValueChange: ToggledApple({ value: "granny-smith-apple" }),
        }),
      ],
    })
);
