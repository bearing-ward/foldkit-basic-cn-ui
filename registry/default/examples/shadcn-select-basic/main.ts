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

export const UpdatedTheme = m("UpdatedTheme", { value: S.String });

export const Message = S.Union([UpdatedTheme]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ value: "system" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedTheme: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-sm space-y-2")],
    [
      Select.view<Message>({
        id: "shadcn-theme-select",
        value: model.value,
        onChange: (value) => UpdatedTheme({ value }),
        toView: (attributes) =>
          h.div(
            [h.Class("space-y-2")],
            [
              h.label(attributes.label, ["Theme"]),
              h.div(
                [h.Class(Select.shadcnSelectWrapperClassName)],
                [
                  h.select(
                    [
                      ...attributes.select,
                      h.Class(Select.shadcnSelectClassName),
                    ],
                    [
                      h.option([h.Value("system")], ["System"]),
                      h.option([h.Value("light")], ["Light"]),
                      h.option([h.Value("dark")], ["Dark"]),
                    ]
                  ),
                  h.span([h.Class(Select.shadcnSelectChevronClassName)], ["v"]),
                ]
              ),
              h.p(
                [
                  ...attributes.description,
                  h.Class(Select.shadcnSelectDescriptionClassName),
                ],
                ["Choose the preferred interface theme."]
              ),
            ]
          ),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected theme: ${model.value}`]
      ),
    ]
  );
});
