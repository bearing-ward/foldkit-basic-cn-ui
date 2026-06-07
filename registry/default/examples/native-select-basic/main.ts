import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as NativeSelect from "../../ui/native-select";

// MODEL

export const Model = S.Struct({
  fruit: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ChangedFruit = m("ChangedFruit", { value: S.String });
export const Message = S.Union([ChangedFruit]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ fruit: "apple" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ChangedFruit: ({ value }) => [evo(model, { fruit: () => value }), []],
    })
  );

// VIEW

const fruitOptions: readonly NativeSelect.OptionConfig[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const descriptionId = "fruit-description";

  return NativeSelect.rootView<Message>({
    children: [
      NativeSelect.labelView<Message>({
        forId: "fruit",
        children: [h.span([], ["Fruit"])],
      }),
      NativeSelect.triggerView<Message>({
        id: "fruit",
        value: model.fruit,
        onChange: (value) => ChangedFruit({ value }),
        options: fruitOptions,
        describedById: descriptionId,
      }),
      NativeSelect.descriptionView<Message>({
        id: descriptionId,
        children: [h.span([], [`Selected: ${model.fruit}`])],
      }),
    ],
  });
});
