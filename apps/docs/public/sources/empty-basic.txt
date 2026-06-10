import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as Empty from "../../ui/empty";

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
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      Message: () => [model, []],
    })
  );

// VIEW

const buttonClassName =
  "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-4")],
    [
      Empty.view<Message>({
        title: "No Projects Yet",
        description:
          "You haven't created any projects yet. Get started by creating your first project.",
        icon: "□",
        action: h.div(
          [h.Class("flex flex-col items-center gap-2")],
          [
            h.div(
              [h.Class("flex flex-wrap justify-center gap-2")],
              [
                h.button(
                  [h.Type("button"), h.Class(buttonClassName)],
                  ["Create Project"]
                ),
                h.button(
                  [h.Type("button"), h.Class(buttonClassName)],
                  ["Import Project"]
                ),
              ]
            ),
            h.button(
              [
                h.Type("button"),
                h.Class(
                  "text-sm font-medium text-gray-600 hover:text-gray-950"
                ),
              ],
              ["Learn More"]
            ),
          ]
        ),
      }),
    ]
  );
});
