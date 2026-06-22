import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Select from "../../ui/select";

// MODEL

export const Model = S.Struct({
  value: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedPlan = m("UpdatedPlan", { value: S.String });

export const Message = S.Union([UpdatedPlan]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ value: "team" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedPlan: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-sm space-y-2")],
    [
      Select.view<Message>({
        id: "plan-select",
        value: model.value,
        isDisabled: true,
        toView: (attributes) =>
          h.div(
            [h.Class("space-y-2")],
            [
              h.label(attributes.label, ["Plan"]),
              h.div(
                [h.Class(Select.selectWrapperClasses)],
                [
                  h.select(
                    [...attributes.select, h.Class(Select.selectClasses)],
                    [
                      h.option([h.Value("team")], ["Team"]),
                      h.option([h.Value("enterprise")], ["Enterprise"]),
                    ]
                  ),
                  h.span([h.Class(Select.chevronClasses)], ["v"]),
                ]
              ),
              h.p(attributes.description, ["Plan changes are locked."]),
            ]
          ),
      }),
      h.p([h.Class("text-sm text-gray-700")], ["Current plan: Team"]),
    ]
  );
});
