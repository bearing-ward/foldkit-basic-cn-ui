import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";

import * as ButtonGroup from "../../../ui/button-group";
import * as Button from "../../ui";

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

const shadcnButton = (
  label: string,
  variant?: Button.ButtonVariantProps["variant"]
): Html =>
  Button.view<Message>({
    variant,
    children: [label],
  });

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    ButtonGroup.view<Message>({
      ariaLabel: "Report actions",
      children: [
        ButtonGroup.itemView<Message>({
          children: [shadcnButton("Archive Report")],
        }),
        ButtonGroup.itemView<Message>({
          children: [shadcnButton("Snooze", "secondary")],
        }),
      ],
    })
);
