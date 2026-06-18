import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";

import * as Breadcrumb from "../../ui/breadcrumb";

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

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    Breadcrumb.rootView<Message>({
      children: [
        Breadcrumb.listView<Message>({
          children: [
            Breadcrumb.itemView<Message>({
              children: [
                Breadcrumb.linkView<Message>({ href: "/", children: ["Home"] }),
              ],
            }),
            Breadcrumb.separatorView<Message>(),
            Breadcrumb.itemView<Message>({
              children: [Breadcrumb.ellipsisView<Message>()],
            }),
            Breadcrumb.separatorView<Message>(),
            Breadcrumb.itemView<Message>({
              children: [
                Breadcrumb.linkView<Message>({
                  href: "/components",
                  children: ["Components"],
                }),
              ],
            }),
            Breadcrumb.separatorView<Message>(),
            Breadcrumb.itemView<Message>({
              children: [
                Breadcrumb.pageView<Message>({ children: ["Breadcrumb"] }),
              ],
            }),
          ],
        }),
      ],
    })
);
