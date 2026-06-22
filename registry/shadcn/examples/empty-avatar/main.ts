import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Avatar from "../../ui/shadcn-avatar";
import * as Empty from "../../ui/empty";

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

const buttonClasses =
  "inline-flex cursor-pointer items-center rounded-lg bg-gray-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Empty.view<Message>({
    title: "User Offline",
    description:
      "This user is currently offline. You can leave a message to notify them or try again later.",
    media: Avatar.view<Message>({ fallback: "LR" }),
    mediaClasses: "bg-transparent p-0",
    action: h.button(
      [h.Type("button"), h.Class(buttonClasses)],
      ["Leave Message"]
    ),
  });
});
