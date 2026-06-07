import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Direction from "../../ui/direction";

// MODEL

export const DirectionValue = S.Union([S.Literal("ltr"), S.Literal("rtl")]);
export const Model = S.Struct({ direction: DirectionValue });
export type Model = typeof Model.Type;

// MESSAGE

export const SelectedDirection = m("SelectedDirection", {
  direction: DirectionValue,
});

export const Message = S.Union([SelectedDirection]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ direction: "rtl" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      SelectedDirection: ({ direction }) => [
        evo(model, { direction: () => direction }),
        [],
      ],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-4")],
    [
      h.div(
        [h.Class(Direction.directionControlsClassName)],
        [
          Direction.buttonView<Message>({
            direction: "ltr",
            currentDirection: model.direction,
            label: "Use left to right direction",
            onClick: SelectedDirection({ direction: "ltr" }),
          }),
          Direction.buttonView<Message>({
            direction: "rtl",
            currentDirection: model.direction,
            label: "Use right to left direction",
            onClick: SelectedDirection({ direction: "rtl" }),
          }),
        ]
      ),
      Direction.view<Message>({
        direction: model.direction,
        className: Direction.directionPreviewClassName,
        children: [
          h.div(
            [h.Class(Direction.directionCardClassName)],
            [
              h.h3(
                [h.Class("text-lg font-semibold")],
                [
                  model.direction === "rtl"
                    ? "تسجيل الدخول إلى حسابك"
                    : "Sign in to your account",
                ]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  model.direction === "rtl"
                    ? "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك"
                    : "Enter your email below to sign in to your account",
                ]
              ),
              h.div(
                [h.Class("grid gap-2")],
                [
                  h.label(
                    [h.Class("text-sm font-medium")],
                    [model.direction === "rtl" ? "البريد الإلكتروني" : "Email"]
                  ),
                  h.input([
                    h.Type("email"),
                    h.Value("m@example.com"),
                    h.Class(
                      "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm"
                    ),
                  ]),
                ]
              ),
              h.button(
                [
                  h.Type("button"),
                  h.Class(
                    "inline-flex h-9 items-center rounded-md bg-gray-950 px-4 text-sm font-medium text-white"
                  ),
                ],
                [model.direction === "rtl" ? "تسجيل الدخول" : "Sign in"]
              ),
            ]
          ),
        ],
      }),
    ]
  );
});
