import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as InputGroup from "../../ui/input-group";
import * as Kbd from "../../ui/kbd";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = m("Message");
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

const searchIcon = (): Html => {
  const h = html<Message>();

  return h.span([h.AriaHidden(true)], ["⌕"]);
};

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    InputGroup.view<Message>({
      className: "w-full max-w-xs",
      children: [
        InputGroup.inputView<Message>({
          ariaLabel: "Search",
          placeholder: "Search...",
        }),
        InputGroup.addonView<Message>({ children: [searchIcon()] }),
        InputGroup.addonView<Message>({
          align: "InlineEnd",
          children: [
            Kbd.view<Message>({ label: "⌘" }),
            Kbd.view<Message>({ label: "K" }),
          ],
        }),
      ],
    })
);
