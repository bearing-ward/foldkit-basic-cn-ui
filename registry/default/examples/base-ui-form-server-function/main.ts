import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Form from "../../ui/base-ui-form";

// MODEL

export const Model = S.Struct({
  username: S.String,
  submitted: S.Boolean,
  submitting: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedUsername = m("UpdatedUsername", { value: S.String });
export const SubmittedUsername = m("SubmittedUsername");

export const Message = S.Union([UpdatedUsername, SubmittedUsername]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ username: "admin", submitted: false, submitting: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedUsername: ({ value }) => [
        evo(model, {
          username: () => value,
          submitted: () => false,
          submitting: () => false,
        }),
        [],
      ],
      SubmittedUsername: () => [
        evo(model, {
          submitted: () => true,
          submitting: () => model.username === "admin",
        }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const inputId = "username";
  const errorId = "username-error";
  const invalid = model.submitted && model.username.trim() === "admin";

  return Form.rootView<Message>({
    onSubmit: SubmittedUsername(),
    invalid,
    submitting: model.submitting,
    children: [
      Form.fieldView<Message>({
        invalid,
        children: [
          Form.labelView<Message>({
            forId: inputId,
            children: [h.span([], ["Username"])],
          }),
          Form.controlView<Message>({
            id: inputId,
            name: "username",
            type: "username",
            value: model.username,
            onInput: (value) => UpdatedUsername({ value }),
            ariaLabel: "Username",
            placeholder: "e.g. alice132",
            describedById: errorId,
            invalid,
          }),
          Form.errorView<Message>({
            id: errorId,
            show: invalid,
            children: [h.span([], ["This username is reserved"])],
          }),
        ],
      }),
      Form.submitView<Message>({
        submitting: model.submitting,
        children: [h.span([], ["Submit"])],
      }),
    ],
  });
});
