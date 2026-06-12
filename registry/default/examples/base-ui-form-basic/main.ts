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
  homepage: S.String,
  submitted: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedHomepage = m("UpdatedHomepage", { value: S.String });
export const SubmittedHomepage = m("SubmittedHomepage");

export const Message = S.Union([UpdatedHomepage, SubmittedHomepage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ homepage: "https://example.com", submitted: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedHomepage: ({ value }) => [
        evo(model, { homepage: () => value, submitted: () => false }),
        [],
      ],
      SubmittedHomepage: () => [evo(model, { submitted: () => true }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const inputId = "homepage";
  const errorId = "homepage-error";
  const invalid =
    model.submitted && model.homepage.trim() === "https://example.com";

  return Form.rootView<Message>({
    onSubmit: SubmittedHomepage(),
    invalid,
    children: [
      Form.fieldView<Message>({
        invalid,
        children: [
          Form.labelView<Message>({
            forId: inputId,
            children: [h.span([], ["Homepage"])],
          }),
          Form.controlView<Message>({
            id: inputId,
            name: "homepage",
            type: "url",
            value: model.homepage,
            onInput: (value) => UpdatedHomepage({ value }),
            ariaLabel: "Homepage",
            placeholder: "https://example.com",
            required: true,
            pattern: "https?://.*",
            describedById: errorId,
            invalid,
          }),
          Form.errorView<Message>({
            id: errorId,
            show: invalid,
            children: [h.span([], ["The example domain is not allowed"])],
          }),
        ],
      }),
      Form.submitView<Message>({ children: [h.span([], ["Submit"])] }),
    ],
  });
});
