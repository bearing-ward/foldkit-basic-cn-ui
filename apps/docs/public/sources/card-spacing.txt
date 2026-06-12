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

const buttonClassName =
  "inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium";

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-4 md:grid-cols-2")],
    [
      Card.view<Message>(
        [
          Card.headerView<Message>(
            [
              Card.titleView<Message>("16px"),
              Card.descriptionView<Message>(
                "Default spacing keeps the login form compact."
              ),
            ],
            "border-b border-gray-200"
          ),
          Card.contentView<Message>(
            [
              h.div(
                [h.Class("grid gap-2")],
                [
                  h.label([h.For("spacing-email")], ["Email"]),
                  h.input([
                    h.Id("spacing-email"),
                    h.Type("email"),
                    h.Class("h-9 rounded-md border border-gray-300 px-3"),
                  ]),
                ]
              ),
            ]
          ),
        ],
        "w-full [--card-spacing:--spacing(4)]"
      ),
      Card.view<Message>(
        [
          Card.headerView<Message>(
            [
              Card.titleView<Message>("Terms of Service"),
              Card.descriptionView<Message>(
                "Review the terms before accepting the agreement."
              ),
            ],
            "border-b border-gray-200"
          ),
          Card.contentView<Message>(
            [
              h.div(
                [h.Class("-mx-(--card-spacing) space-y-3 bg-gray-50 p-4")],
                [
                  h.p([], [
                    "These terms govern your use of the workspace, including access to shared documents, project files, and collaboration tools.",
                  ]),
                  h.p([], [
                    "You are responsible for the content you upload and for ensuring that your team has the appropriate permissions to view or edit it.",
                  ]),
                  h.p([], [
                    "We may update features or limits as the service evolves. When those changes materially affect your workflow, we will notify your workspace administrators.",
                  ]),
                  h.p([], [
                    "By continuing, you agree to keep your account credentials secure and to follow your organization's acceptable use policies.",
                  ]),
                ]
              ),
            ],
            "-mb-(--card-spacing)"
          ),
          Card.footerView<Message>(
            [
              h.div(
                [h.Class("flex w-full justify-end gap-2")],
                [
                  h.button(
                    [
                      h.Type("button"),
                      h.Class(`${buttonClassName} border border-gray-300`),
                    ],
                    ["Decline"]
                  ),
                  h.button(
                    [
                      h.Type("button"),
                      h.Class(`${buttonClassName} bg-black text-white`),
                    ],
                    ["Accept"]
                  ),
                ]
              ),
            ]
          ),
        ],
        "w-full [--card-spacing:--spacing(6)]"
      ),
    ]
  );
});
