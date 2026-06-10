import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Select from "../../ui/base-ui-select";

// MODEL

export const Model = S.Struct({
  value: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedApple = m("UpdatedApple", { value: S.String });

export const Message = S.Union([UpdatedApple]);
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
      UpdatedApple: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-sm space-y-2")],
    [
      Select.view<Message>({
        id: "apple-select",
        value: model.value,
        onChange: (value) => UpdatedApple({ value }),
        toView: (attributes) =>
          h.div(
            [h.Class("space-y-2")],
            [
              h.label(attributes.label, ["Apple"]),
              h.div(
                [h.Class(Select.baseUiSelectWrapperClassName)],
                [
                  h.select(
                    [
                      ...attributes.select,
                      h.Class(Select.baseUiSelectControlClassName),
                    ],
                    [
                      h.option([h.Value("")], ["Select apple"]),
                      h.option([h.Value("gala")], ["Gala"]),
                      h.option([h.Value("fuji")], ["Fuji"]),
                      h.option([h.Value("honeycrisp")], ["Honeycrisp"]),
                      h.option([h.Value("granny-smith")], ["Granny Smith"]),
                    ]
                  ),
                  h.span([h.Class(Select.baseUiSelectChevronClassName)], ["v"]),
                ]
              ),
            ]
          ),
      }),
    ]
  );
});
