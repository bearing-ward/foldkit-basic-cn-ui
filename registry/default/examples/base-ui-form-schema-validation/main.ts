import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Form from "../../ui/base-ui-form";

// MODEL

const ProfileSchema = S.Struct({
  name: S.NonEmptyString,
  age: S.NumberFromString.check(S.isGreaterThan(0)),
});

export const Model = S.Struct({
  name: S.String,
  age: S.String,
  submitted: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const UpdatedName = m("UpdatedName", { value: S.String });
export const UpdatedAge = m("UpdatedAge", { value: S.String });
export const SubmittedProfile = m("SubmittedProfile");

export const Message = S.Union([UpdatedName, UpdatedAge, SubmittedProfile]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ name: "", age: "", submitted: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      UpdatedName: ({ value }) => [
        evo(model, { name: () => value, submitted: () => false }),
        [],
      ],
      UpdatedAge: ({ value }) => [
        evo(model, { age: () => value, submitted: () => false }),
        [],
      ],
      SubmittedProfile: () => [evo(model, { submitted: () => true }), []],
    })
  );

// VIEW

const validationErrors = (
  model: Model
): Readonly<{ name: string | undefined; age: string | undefined }> => {
  if (!model.submitted) {
    return { name: undefined, age: undefined };
  }

  try {
    S.decodeUnknownSync(ProfileSchema)({ name: model.name, age: model.age });
    return { name: undefined, age: undefined };
  } catch {
    return {
      name: model.name.trim() === "" ? "Name is required" : undefined,
      age:
        model.age.trim() === "" || Number.isNaN(Number(model.age))
          ? "Age must be a number"
          : Number(model.age) <= 0
            ? "Age must be a positive number"
            : undefined,
    };
  }
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const errors = validationErrors(model);
  const nameId = "profile-name";
  const nameErrorId = "profile-name-error";
  const ageId = "profile-age";
  const ageErrorId = "profile-age-error";

  return Form.rootView<Message>({
    onSubmit: SubmittedProfile(),
    invalid: errors.name !== undefined || errors.age !== undefined,
    children: [
      Form.fieldView<Message>({
        invalid: errors.name !== undefined,
        children: [
          Form.labelView<Message>({
            forId: nameId,
            children: [h.span([], ["Name"])],
          }),
          Form.controlView<Message>({
            id: nameId,
            name: "name",
            type: "text",
            value: model.name,
            onInput: (value) => UpdatedName({ value }),
            ariaLabel: "Name",
            placeholder: "Enter name",
            describedById: nameErrorId,
            invalid: errors.name !== undefined,
          }),
          Form.errorView<Message>({
            id: nameErrorId,
            show: errors.name !== undefined,
            children: [h.span([], [errors.name ?? ""])],
          }),
        ],
      }),
      Form.fieldView<Message>({
        invalid: errors.age !== undefined,
        children: [
          Form.labelView<Message>({
            forId: ageId,
            children: [h.span([], ["Age"])],
          }),
          Form.controlView<Message>({
            id: ageId,
            name: "age",
            type: "text",
            value: model.age,
            onInput: (value) => UpdatedAge({ value }),
            ariaLabel: "Age",
            placeholder: "Enter age",
            describedById: ageErrorId,
            invalid: errors.age !== undefined,
          }),
          Form.errorView<Message>({
            id: ageErrorId,
            show: errors.age !== undefined,
            children: [h.span([], [errors.age ?? ""])],
          }),
        ],
      }),
      Form.submitView<Message>({ children: [h.span([], ["Submit"])] }),
    ],
  });
});
