import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Pagination from "../../ui/pagination";

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

const iconLink = (
  label: string,
  children: readonly string[],
  active = false
): Html =>
  Pagination.linkView<Message>({
    href: "#",
    label,
    active,
    className: "h-9 w-9 p-0",
    children,
  });

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Pagination.rootView<Message>({
    children: [
      Pagination.contentView<Message>({
        children: [
          Pagination.itemView<Message>({
            children: [
              Pagination.linkView<Message>({
                href: "#",
                label: "Go to previous page",
                className: "h-9 w-9 p-0",
                children: [h.span([h.AriaHidden(true)], ["<"])],
              }),
            ],
          }),
          Pagination.itemView<Message>({
            children: [iconLink("Go to page 1", ["1"])],
          }),
          Pagination.itemView<Message>({
            children: [iconLink("Go to page 2", ["2"], true)],
          }),
          Pagination.itemView<Message>({
            children: [iconLink("Go to next page", [">"])],
          }),
        ],
      }),
    ],
  });
});
