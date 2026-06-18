import { Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";

import * as Card from "../../ui/card";

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
    [h.Dir("rtl"), h.Class("w-full max-w-sm")],
    [
      Card.view<Message>(
        [
          Card.headerView<Message>(
            [
              h.div(
                [h.Class("space-y-1")],
                [
                  Card.titleView<Message>("تسجيل الدخول إلى حسابك"),
                  Card.descriptionView<Message>(
                    "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك"
                  ),
                ]
              ),
              Card.actionView<Message>([
                h.a(
                  [
                    h.Href("#"),
                    h.Class(
                      "text-sm font-medium text-gray-950 underline-offset-4 hover:underline"
                    ),
                  ],
                  ["إنشاء حساب"]
                ),
              ]),
            ],
            "border-b border-gray-200"
          ),
          Card.contentView<Message>(
            [
              h.div(
                [h.Class("grid gap-4")],
                [
                  h.div(
                    [h.Class("grid gap-2")],
                    [
                      h.label([h.For("rtl-email")], ["البريد الإلكتروني"]),
                      h.input([
                        h.Id("rtl-email"),
                        h.Type("email"),
                        h.Class("h-9 rounded-md border border-gray-300 px-3"),
                      ]),
                    ]
                  ),
                  h.div(
                    [h.Class("grid gap-2")],
                    [
                      h.div(
                        [h.Class("flex items-center justify-between gap-4")],
                        [
                          h.label([h.For("rtl-password")], ["كلمة المرور"]),
                          h.a([h.Href("#")], ["نسيت كلمة المرور؟"]),
                        ]
                      ),
                      h.input([
                        h.Id("rtl-password"),
                        h.Type("password"),
                        h.Class("h-9 rounded-md border border-gray-300 px-3"),
                      ]),
                    ]
                  ),
                ]
              ),
            ]
          ),
          Card.footerView<Message>(
            [
              h.div(
                [h.Class("grid w-full gap-2")],
                [
                  h.button([h.Type("button")], ["تسجيل الدخول"]),
                  h.button([h.Type("button")], ["تسجيل الدخول باستخدام Google"]),
                ]
              ),
            ]
          ),
        ],
        "w-full"
      ),
    ]
  );
});
