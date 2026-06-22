import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Empty from "../../ui/empty";
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

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Empty.view<Message>({
    title: "404 - Not Found",
    description:
      "The page you're looking for doesn't exist. Try searching for what you need below.",
    icon: "404",
    action: h.div(
      [h.Class("flex w-full max-w-sm flex-col items-center gap-3")],
      [
        InputGroup.view<Message>({
          className: "w-full sm:w-3/4",
          children: [
            InputGroup.inputView<Message>({
              ariaLabel: "Search pages",
              placeholder: "Try searching for pages...",
            }),
            InputGroup.addonView<Message>({ children: [searchIcon()] }),
            InputGroup.addonView<Message>({
              align: "InlineEnd",
              children: [Kbd.view<Message>({ label: "/" })],
            }),
          ],
        }),
        h.p(
          [h.Class(Empty.emptyDescriptionClasses)],
          [
            "Need help? ",
            h.a(
              [h.Href("#"), h.Class("underline underline-offset-4")],
              ["Contact support"]
            ),
          ]
        ),
      ]
    ),
  });
});
