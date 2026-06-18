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

const buttonClassName =
  "inline-flex cursor-pointer items-center rounded-lg bg-gray-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Empty.view<Message>({
    title: "No Team Members",
    description: "Invite your team to collaborate on this project.",
    media: Avatar.groupView<Message>([
      Avatar.view<Message>({ fallback: "CN" }),
      Avatar.view<Message>({ fallback: "LR" }),
      Avatar.view<Message>({ fallback: "ER" }),
    ]),
    mediaClassName: "bg-transparent p-0",
    action: h.button(
      [h.Type("button"), h.Class(buttonClassName)],
      ["Invite Members"]
    ),
  });
});
