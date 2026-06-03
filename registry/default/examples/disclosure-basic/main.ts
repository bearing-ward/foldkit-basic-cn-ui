import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Disclosure from "../../ui/disclosure";

// MODEL

export const Model = S.Struct({
  disclosure: Disclosure.Model,
  status: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotDisclosureMessage = m("GotDisclosureMessage", {
  message: Disclosure.Message,
});

export const Message = S.Union([GotDisclosureMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [disclosure, commands] = Disclosure.init({ id: "disclosure-basic" });

  return [
    {
      disclosure,
      status: "Disclosure is closed.",
    },
    Command.mapMessages(commands, (message) =>
      GotDisclosureMessage({ message })
    ),
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotDisclosureMessage: ({ message }) => {
        const [disclosure, commands, maybeOutMessage] = Disclosure.update(
          model.disclosure,
          message
        );

        const status = Option.match(maybeOutMessage, {
          onNone: () => model.status,
          onSome: M.type<Disclosure.OutMessage>().pipe(
            M.tagsExhaustive({
              ToggledOpenState: ({ isOpen }) =>
                `Disclosure is ${isOpen ? "open" : "closed"}.`,
            })
          ),
        });

        return [
          evo(model, {
            disclosure: () => disclosure,
            status: () => status,
          }),
          Command.mapMessages(commands, (message) =>
            GotDisclosureMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.disclosure.id,
        model: model.disclosure,
        view: Disclosure.view,
        viewInputs: {
          toView: (attributes) =>
            Disclosure.disclosureView({
              attributes,
              isOpen: model.disclosure.isOpen,
              title: "What is Foldkit?",
              body: "Foldkit is an Elm-inspired UI framework powered by Effect.",
            }),
        },
        toParentMessage: (message) => GotDisclosureMessage({ message }),
      }),
      h.p([h.Class("text-sm text-gray-700")], [model.status]),
    ]
  );
});
