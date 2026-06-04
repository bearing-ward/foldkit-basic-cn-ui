import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Fieldset from "../../ui/fieldset";

// MODEL

export const Model = S.Struct({
  name: S.String,
  bio: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedName = m("UpdatedName", { value: S.String });
export const UpdatedBio = m("UpdatedBio", { value: S.String });

export const Message = S.Union([UpdatedName, UpdatedBio]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ name: "", bio: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedName: ({ value }) => [evo(model, { name: () => value }), []],
      UpdatedBio: ({ value }) => [evo(model, { bio: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("max-w-md space-y-3")],
    [
      Fieldset.view<Message>({
        id: "profile-fieldset",
        toView: (attributes) =>
          h.fieldset(
            [...attributes.fieldset, h.Class(Fieldset.fieldsetClassName)],
            [
              h.legend(
                [...attributes.legend, h.Class(Fieldset.legendClassName)],
                ["Profile"]
              ),
              h.p(
                [
                  ...attributes.description,
                  h.Class(Fieldset.descriptionClassName),
                ],
                ["Keep public profile details grouped for form review."]
              ),
              h.div(
                [h.Class(Fieldset.fieldsClassName)],
                [
                  h.label(
                    [h.Class(Fieldset.fieldClassName)],
                    [
                      h.span([h.Class(Fieldset.labelClassName)], ["Name"]),
                      h.input([
                        h.AriaLabel("Name"),
                        h.Value(model.name),
                        h.Placeholder("Ada Lovelace"),
                        h.OnInput((value) => UpdatedName({ value })),
                        h.Class(Fieldset.inputClassName),
                      ]),
                    ]
                  ),
                  h.label(
                    [h.Class(Fieldset.fieldClassName)],
                    [
                      h.span([h.Class(Fieldset.labelClassName)], ["Bio"]),
                      h.textarea(
                        [
                          h.AriaLabel("Bio"),
                          h.Value(model.bio),
                          h.Placeholder("Short introduction"),
                          h.OnInput((value) => UpdatedBio({ value })),
                          h.Class(Fieldset.textareaClassName),
                        ],
                        []
                      ),
                    ]
                  ),
                ]
              ),
            ]
          ),
      }),
      h.p(
        [h.Class("text-sm text-gray-700")],
        [`Profile: ${model.name || "No name"} / ${model.bio || "No bio"}`]
      ),
    ]
  );
});
