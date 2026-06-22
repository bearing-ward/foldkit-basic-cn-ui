import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Button from "../../ui/shadcn-button";
import * as Spinner from "../../ui/spinner";

// MODEL

export const Model = S.Struct({});
export type Model = typeof Model.Type;

// MESSAGE

export const Message = S.Never;
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  _message: Message
): readonly [Model, readonly Command.Command<Message>[]] => [model, []];

// VIEW

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-2")],
    [
      Button.view<Message>({
        toView: (attributes) =>
          h.button(
            [...attributes.button, h.Class(Button.shadcnButtonClasses)],
            [
              Spinner.view<Message>({
                classes: "h-4 w-4",
                attributes: [h.DataAttribute("icon", "inline-start")],
              }),
              "Generating",
            ]
          ),
      }),
      Button.view<Message>({
        toView: (attributes) =>
          h.button(
            [...attributes.button, h.Class(Button.shadcnButtonClasses)],
            [
              Spinner.view<Message>({
                classes: "h-4 w-4",
                attributes: [h.DataAttribute("icon", "inline-start")],
              }),
              "Downloading",
            ]
          ),
      }),
    ]
  );
});
