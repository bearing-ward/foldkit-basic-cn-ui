import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Typography from "../../ui/typography";

// MODEL

export const TypographyMode = S.Union([
  S.Literal("Comfortable"),
  S.Literal("Dense"),
]);

export const Model = S.Struct({
  mode: TypographyMode,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleTypographyExample = m(
  "ClickedToggleTypographyExample"
);

export const Message = S.Union([ClickedToggleTypographyExample]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ mode: "Comfortable" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleTypographyExample: () => [
        evo(model, {
          mode: (mode) => (mode === "Comfortable" ? "Dense" : "Comfortable"),
        }),
        [],
      ],
    })
  );

// VIEW

const buttonClassName =
  "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-4")],
    [
      h.div(
        [
          h.Class(
            model.mode === "Comfortable"
              ? "max-w-2xl space-y-5"
              : "max-w-2xl space-y-3"
          ),
        ],
        [
          Typography.h1<Message>("Component registry"),
          Typography.p<Message>(
            "Reusable text helpers keep examples readable while preserving semantic HTML."
          ),
          Typography.h2<Message>("Principles"),
          Typography.ul<Message>([
            "Choose heading level by document outline.",
            "Use muted copy for supporting context.",
            "Use inline code for literal props like className.",
          ]),
          h.p(
            [],
            [
              "Use ",
              Typography.inlineCode<Message>("Typography.inlineCode"),
              " for API terms.",
            ]
          ),
          Typography.muted<Message>(`Density: ${model.mode}`),
          h.button(
            [
              h.OnClick(ClickedToggleTypographyExample()),
              h.Class(buttonClassName),
            ],
            ["Toggle density"]
          ),
        ]
      ),
    ]
  );
});
