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

const inputClassName =
  "mt-2 h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-950 outline-none placeholder:text-gray-500 focus-visible:border-gray-950 focus-visible:ring-2 focus-visible:ring-gray-950/10";

const labelClassName = "text-sm font-medium leading-none text-gray-950";

const primaryButtonClassName =
  "inline-flex h-9 w-full items-center justify-center rounded-md bg-black px-4 text-sm font-medium text-white transition hover:bg-black/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950";

const secondaryButtonClassName =
  "inline-flex h-9 w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-950 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-950";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return Card.view<Message>(
    [
      Card.headerView<Message>(
        [
          h.div(
            [h.Class("space-y-1")],
            [
              Card.titleView<Message>("Login to your account"),
              Card.descriptionView<Message>(
                "Enter your email below to login to your account"
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
              ["Sign Up"]
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
                  h.label([h.Class(labelClassName), h.For("email")], ["Email"]),
                  h.input([
                    h.Id("email"),
                    h.Type("email"),
                    h.Placeholder("m@example.com"),
                    h.Class(inputClassName),
                  ]),
                ]
              ),
              h.div(
                [h.Class("grid gap-2")],
                [
                  h.div(
                    [h.Class("flex items-center justify-between gap-4")],
                    [
                      h.label(
                        [h.Class(labelClassName), h.For("password")],
                        ["Password"]
                      ),
                      h.a(
                        [
                          h.Href("#"),
                          h.Class(
                            "text-sm font-medium text-gray-950 underline-offset-4 hover:underline"
                          ),
                        ],
                        ["Forgot your password?"]
                      ),
                    ]
                  ),
                  h.input([
                    h.Id("password"),
                    h.Type("password"),
                    h.Class(inputClassName),
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
              h.button(
                [h.Type("button"), h.Class(primaryButtonClassName)],
                ["Login"]
              ),
              h.button(
                [h.Type("button"), h.Class(secondaryButtonClassName)],
                ["Login with Google"]
              ),
            ]
          ),
        ]
      ),
    ],
    "w-full max-w-sm"
  );
});
