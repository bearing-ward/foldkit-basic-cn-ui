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

export const UpdatedRegion = m("UpdatedRegion", { value: S.String });

export const Message = S.Union([UpdatedRegion]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ value: "na" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedRegion: ({ value }) => [evo(model, { value: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-sm space-y-2")],
    [
      Select.view<Message>({
        id: "region-select",
        value: model.value,
        onChange: (value) => UpdatedRegion({ value }),
        toView: (attributes) =>
          h.div(
            [h.Class("space-y-2")],
            [
              h.label(attributes.label, ["Region"]),
              h.div(
                [h.Class(Select.selectWrapperClassName)],
                [
                  h.select(
                    [...attributes.select, h.Class(Select.selectClassName)],
                    [
                      h.option([h.Value("na")], ["North America"]),
                      h.option([h.Value("emea")], ["EMEA"]),
                      h.option([h.Value("apac")], ["APAC"]),
                    ]
                  ),
                  h.span([h.Class(Select.chevronClassName)], ["v"]),
                ]
              ),
              h.p(attributes.description, ["Choose the operating region."]),
            ]
          ),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Selected region: ${model.value}`]
      ),
    ]
  );
});
