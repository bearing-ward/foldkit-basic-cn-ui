import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Radio from "../../ui/radio";

// MODEL

export const AppleValue = S.Union([
  S.Literal("fuji-apple"),
  S.Literal("gala-apple"),
  S.Literal("granny-smith-apple"),
]);
export type AppleValue = typeof AppleValue.Type;

export const Model = S.Struct({
  selectedApple: AppleValue,
});

export type Model = typeof Model.Type;

// MESSAGE

export const SelectedApple = m("SelectedApple", { value: AppleValue });
export const Message = S.Union([SelectedApple]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ selectedApple: "fuji-apple" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      SelectedApple: ({ value }) => [
        evo(model, { selectedApple: () => value }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>(
  (model): Html =>
    Radio.groupView<Message>({
      label: "Best apple",
      labelId: "best-apple-label",
      children: [
        Radio.itemView<Message>({
          value: "fuji-apple",
          selectedValue: model.selectedApple,
          label: "Fuji",
          onValueChange: SelectedApple({ value: "fuji-apple" }),
        }),
        Radio.itemView<Message>({
          value: "gala-apple",
          selectedValue: model.selectedApple,
          label: "Gala",
          onValueChange: SelectedApple({ value: "gala-apple" }),
        }),
        Radio.itemView<Message>({
          value: "granny-smith-apple",
          selectedValue: model.selectedApple,
          label: "Granny Smith",
          onValueChange: SelectedApple({ value: "granny-smith-apple" }),
        }),
      ],
    })
);
