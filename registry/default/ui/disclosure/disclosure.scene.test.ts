import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, test } from "vitest";

import * as Disclosure from "./index";

const GotDisclosureMessage = m("GotDisclosureMessage", {
  message: Disclosure.Message,
});

const Model = S.Struct({
  disclosure: Disclosure.Model,
  status: S.String,
});

type Model = typeof Model.Type;

const Message = S.Union([GotDisclosureMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  disclosure: Disclosure.init({ id: "registry-disclosure" })[0],
  status: "Closed",
};

const update = (
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
              ToggledOpenState: ({ isOpen }) => (isOpen ? "Open" : "Closed"),
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

const view = Submodel.defineView<Model, Message>((model): Html => {
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
              title: "Registry disclosure",
              body: "Registry disclosure content.",
            }),
        },
        toParentMessage: (message) => GotDisclosureMessage({ message }),
      }),
      h.p([], [`Status: ${model.status}`]),
    ]
  );
});

describe("Disclosure registry view", () => {
  test("opens and closes with parent-visible OutMessage state", () => {
    Scene.scene(
      { update, view },
      Scene.with(initialModel),
      Scene.expect(Scene.text("Status: Closed")).toExist(),
      Scene.click(Scene.role("button", { name: "Registry disclosure" })),
      Scene.expect(Scene.text("Status: Open")).toExist(),
      Scene.expect(Scene.text("Registry disclosure content.")).toExist(),
      Scene.click(Scene.role("button", { name: "Registry disclosure" })),
      Scene.Command.resolve(
        Disclosure.FocusButton({ id: "registry-disclosure" }),
        Disclosure.CompletedFocusButton(),
        (message) => GotDisclosureMessage({ message })
      ),
      Scene.expect(Scene.text("Status: Closed")).toExist(),
      Scene.expect(Scene.text("Registry disclosure content.")).not.toExist()
    );
  });
});
