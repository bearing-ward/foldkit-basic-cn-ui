import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Select from "../../ui/shadcn-select";

// MODEL

export const Model = S.Struct({
  value: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedFruit = m("UpdatedFruit", { value: S.String });

export const Message = S.Union([UpdatedFruit]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ value: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedFruit: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("w-[180px]")],
    [
      Select.view<Message>({
        id: "shadcn-fruit-select",
        value: model.value,
        onChange: (value) => UpdatedFruit({ value }),
        toView: (attributes) =>
          h.div([h.Class(Select.shadcnSelectWrapperClassName)], [
            h.select(
              [...attributes.select, h.Class(Select.shadcnSelectClassName)],
              [
                h.option([h.Value(""), h.Disabled(true)], [
                  "Select a fruit",
                ]),
                h.option([h.Value("apple")], ["Apple"]),
                h.option([h.Value("banana")], ["Banana"]),
                h.option([h.Value("blueberry")], ["Blueberry"]),
                h.option([h.Value("grapes")], ["Grapes"]),
                h.option([h.Value("pineapple")], ["Pineapple"]),
              ]
            ),
            h.span([h.Class(Select.shadcnSelectChevronClassName)], ["v"]),
          ]),
      }),
    ]
  );
});
