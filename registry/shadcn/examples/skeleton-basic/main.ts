import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Skeleton from "../../ui/skeleton";

// MODEL

export const SkeletonMode = S.Union([
  S.Literal("Loading"),
  S.Literal("Loaded"),
]);

export const Model = S.Struct({
  mode: SkeletonMode,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleSkeletonExample = m("ClickedToggleSkeletonExample");

export const Message = S.Union([ClickedToggleSkeletonExample]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ mode: "Loading" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleSkeletonExample: () => [
        evo(model, {
          mode: (mode) => (mode === "Loading" ? "Loaded" : "Loading"),
        }),
        [],
      ],
    })
  );

// VIEW

const buttonClasses =
  "inline-flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-600";

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-6")],
    [
      model.mode === "Loading"
        ? h.div(
            [h.Class("w-full max-w-xl space-y-6")],
            [
              h.div(
                [h.Class("flex items-center gap-3"), h.AriaLabel("Avatar skeleton")],
                [
                  Skeleton.view<Message>({ shape: "Avatar" }),
                  h.div(
                    [h.Class("space-y-2")],
                    [
                      Skeleton.view<Message>({
                        shape: "Text",
                        className: "w-32",
                      }),
                      Skeleton.view<Message>({
                        shape: "Text",
                        className: "w-48",
                      }),
                    ]
                  ),
                ]
              ),
              h.div(
                [h.Class("space-y-3 rounded-lg border border-gray-200 p-4"), h.AriaLabel("Card skeleton")],
                [
                  Skeleton.view<Message>({
                    shape: "Block",
                    className: "h-32",
                  }),
                  Skeleton.view<Message>({
                    shape: "Text",
                    className: "w-52",
                  }),
                  Skeleton.view<Message>({
                    shape: "Text",
                    className: "w-36",
                  }),
                ]
              ),
              h.div([h.Class("space-y-2"), h.AriaLabel("Text skeleton")], [
                Skeleton.view<Message>({ shape: "Text", className: "w-72" }),
                Skeleton.view<Message>({ shape: "Text", className: "w-64" }),
                Skeleton.view<Message>({ shape: "Text", className: "w-56" }),
              ]),
              h.div(
                [h.Class("grid w-full gap-3"), h.AriaLabel("Form skeleton")],
                [
                  Skeleton.view<Message>({ shape: "Text", className: "w-24" }),
                  Skeleton.view<Message>({
                    shape: "Block",
                    className: "h-9",
                  }),
                  Skeleton.view<Message>({ shape: "Text", className: "w-24" }),
                  Skeleton.view<Message>({
                    shape: "Block",
                    className: "h-9",
                  }),
                  Skeleton.view<Message>({ shape: "Button" }),
                ]
              ),
              h.div(
                [h.Class("grid w-full gap-3"), h.AriaLabel("Table skeleton")],
                [
                  Skeleton.view<Message>({ shape: "Text", className: "w-32" }),
                  Skeleton.view<Message>({
                    shape: "Block",
                    className: "h-8",
                  }),
                  Skeleton.view<Message>({
                    shape: "Block",
                    className: "h-8",
                  }),
                  Skeleton.view<Message>({
                    shape: "Block",
                    className: "h-8",
                  }),
                ]
              ),
              h.button(
                [
                  h.OnClick(ClickedToggleSkeletonExample()),
                  h.Class(buttonClasses),
                ],
                ["Show content"]
              ),
            ]
          )
        : h.div(
            [h.Class("space-y-3")],
            [
              h.p([h.Class("font-medium text-gray-950")], ["Content loaded"]),
              h.p(
                [h.Class("text-sm text-gray-600")],
                ["Skeleton placeholders are replaced by parent-owned content."]
              ),
              h.button(
                [
                  h.OnClick(ClickedToggleSkeletonExample()),
                  h.Class(buttonClasses),
                ],
                ["Show loading"]
              ),
            ]
          ),
    ]
  );
});
