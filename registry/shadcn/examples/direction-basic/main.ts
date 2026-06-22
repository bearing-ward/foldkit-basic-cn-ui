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

const directionFromValue = (value: string): typeof DirectionValue.Type =>
  value === "rtl" ? "rtl" : "ltr";

const text = (
  direction: typeof DirectionValue.Type,
  rtlText: string,
  ltrText: string
): string => (direction === "rtl" ? rtlText : ltrText);

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const oppositeDirection = model.direction === "rtl" ? "ltr" : "rtl";

  return h.div(
    [h.Class("space-y-4")],
    [
      h.div(
        [h.Class(Direction.directionControlsClasses)],
        [
          h.label([h.Class("sr-only"), h.For("direction-language")], [
            "Language",
          ]),
          h.select(
            [
              h.Id("direction-language"),
              h.Value(model.direction),
              h.OnChange((value) =>
                SelectedDirection({ direction: directionFromValue(value) })
              ),
              h.Class(
                "h-9 rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-950 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600"
              ),
            ],
            [
              h.option([h.Value("rtl")], ["Arabic (العربية)"]),
              h.option([h.Value("ltr")], ["English"]),
            ]
          ),
          h.button(
            [
              h.Type("button"),
              h.Class(Direction.directionButtonClasses),
              h.OnClick(SelectedDirection({ direction: oppositeDirection })),
            ],
            ["Toggle"]
          ),
        ]
      ),
      Direction.view<Message>({
        direction: model.direction,
        classes: Direction.directionPreviewClasses,
        children: [
          h.div(
            [h.Class(Direction.directionCardClasses)],
            [
              h.h3(
                [h.Class("text-lg font-semibold")],
                [
                  text(
                    model.direction,
                    "تسجيل الدخول إلى حسابك",
                    "Sign in to your account"
                  ),
                ]
              ),
              h.p(
                [h.Class("text-sm text-gray-600")],
                [
                  text(
                    model.direction,
                    "أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك",
                    "Enter your email below to sign in to your account"
                  ),
                ]
              ),
              h.button(
                [
                  h.Type("button"),
                  h.Class(
                    "inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-950 shadow-sm"
                  ),
                ],
                [text(model.direction, "إنشاء حساب", "Create account")]
              ),
              h.div(
                [h.Class("grid gap-2")],
                [
                  h.label(
                    [h.Class("text-sm font-medium")],
                    [text(model.direction, "البريد الإلكتروني", "Email")]
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
              h.div(
                [h.Class("grid gap-2")],
                [
                  h.div(
                    [h.Class("flex items-center justify-between gap-3")],
                    [
                      h.label(
                        [h.Class("text-sm font-medium")],
                        [text(model.direction, "كلمة المرور", "Password")]
                      ),
                      h.a(
                        [
                          h.Href("#"),
                          h.Class("text-sm text-gray-600 underline"),
                        ],
                        [
                          text(
                            model.direction,
                            "نسيت كلمة المرور؟",
                            "Forgot your password?"
                          ),
                        ]
                      ),
                    ]
                  ),
                  h.input([
                    h.Type("password"),
                    h.Value("password"),
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
                [text(model.direction, "تسجيل الدخول", "Sign in")]
              ),
              h.button(
                [
                  h.Type("button"),
                  h.Class(
                    "inline-flex h-9 items-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-950 shadow-sm"
                  ),
                ],
                [
                  text(
                    model.direction,
                    "تسجيل الدخول باستخدام Google",
                    "Sign in with Google"
                  ),
                ]
              ),
            ]
          ),
        ],
      }),
    ]
  );
});
