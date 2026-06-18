import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Field from "../../ui/base-ui-field";

// MODEL

export const Model = S.Struct({
  name: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedName = m("UpdatedName", { value: S.String });

export const Message = S.Union([UpdatedName]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ name: "" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedName: ({ value }) => [evo(model, { name: () => value }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const inputId = "profile-name";
  const errorId = "profile-name-error";
  const descriptionId = "profile-name-description";

  return Field.rootView<Message>({
    name: "name",
    required: true,
    filled: model.name !== "",
    children: [
      Field.labelView<Message>({
        forId: inputId,
        children: [h.span([], ["Name"])],
      }),
      Field.controlView<Message>({
        id: inputId,
        ariaLabel: "Name",
        name: "name",
        value: model.name,
        onInput: (value) => UpdatedName({ value }),
        placeholder: "Required",
        required: true,
        filled: model.name !== "",
        describedByIds: [errorId, descriptionId],
      }),
      Field.errorView<Message>({
        id: errorId,
        show: false,
        children: [h.span([], ["Please enter your name"])],
      }),
      Field.descriptionView<Message>({
        id: descriptionId,
        children: [h.span([], ["Visible on your profile"])],
      }),
    ],
  });
});
