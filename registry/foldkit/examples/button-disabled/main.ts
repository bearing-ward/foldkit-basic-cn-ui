import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Button from "../../ui/button";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedDisabledButton = m("ClickedDisabledButton");

export const Message = S.Union([ClickedDisabledButton]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedDisabledButton: () => [model, []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-2")],
    [
      Button.view<Message>({
        isDisabled: true,
        onClick: ClickedDisabledButton(),
        toView: (attributes) =>
          h.button(
            [...attributes.button, h.Class(Button.buttonClasses)],
            ["Disabled"]
          ),
      }),
      h.span(
        [h.Class("text-sm text-gray-600")],
        ["Disabled buttons keep native disabled semantics."]
      ),
    ]
  );
});
