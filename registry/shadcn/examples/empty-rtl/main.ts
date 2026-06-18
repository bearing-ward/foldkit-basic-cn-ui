import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

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
  "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Dir("rtl"), h.Class("text-right")],
    [
      Empty.view<Message>({
        title: "لا توجد مشاريع بعد",
        description:
          "لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.",
        icon: "□",
        action: h.div(
          [h.Class("flex flex-col items-center gap-2")],
          [
            h.div(
              [h.Class("flex flex-wrap justify-center gap-2")],
              [
                h.button(
                  [h.Type("button"), h.Class(buttonClassName)],
                  ["إنشاء مشروع"]
                ),
                h.button(
                  [h.Type("button"), h.Class(buttonClassName)],
                  ["استيراد مشروع"]
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
              ["تعرف على المزيد"]
            ),
          ]
        ),
      }),
    ]
  );
});
