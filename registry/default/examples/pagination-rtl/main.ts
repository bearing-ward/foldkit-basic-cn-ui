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

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Dir("rtl")],
    [
      Pagination.rootView<Message>({
        label: "ترقيم الصفحات",
        children: [
          Pagination.contentView<Message>({
            children: [
              Pagination.itemView<Message>({
                children: [
                  Pagination.previousView<Message>({
                    href: "#",
                    label: "الصفحة السابقة",
                  }),
                ],
              }),
              Pagination.itemView<Message>({
                children: [
                  Pagination.linkView<Message>({
                    href: "#",
                    label: "اذهب إلى الصفحة 1",
                    children: ["1"],
                  }),
                ],
              }),
              Pagination.itemView<Message>({
                children: [
                  Pagination.linkView<Message>({
                    href: "#",
                    label: "اذهب إلى الصفحة 2",
                    active: true,
                    children: ["2"],
                  }),
                ],
              }),
              Pagination.itemView<Message>({
                children: [Pagination.ellipsisView<Message>()],
              }),
              Pagination.itemView<Message>({
                children: [
                  Pagination.nextView<Message>({
                    href: "#",
                    label: "الصفحة التالية",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ]
  );
});
