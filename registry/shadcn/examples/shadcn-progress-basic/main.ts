import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Progress from "../../ui/shadcn-progress";

// MODEL

export const Model = S.Struct({
  value: S.Number,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedAdvanceProgress = m("ClickedAdvanceProgress");
export const Message = S.Union([ClickedAdvanceProgress]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ value: 33 }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedAdvanceProgress: () => [
        evo(model, {
          value: (value) => (value >= 100 ? 0 : value + 25),
        }),
        [],
      ],
    })
  );

// VIEW

const sectionTitleClassName = "text-sm font-medium text-gray-950";

const progressBar = (value: number): Html => {
  const h = html<Message>();

  return Progress.rootView<Message>({
    value,
    children: [
      Progress.trackView<Message>({
        children: [
          Progress.indicatorView<Message>({
            value,
          }),
        ],
      }),
    ],
  });
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex w-[60%] flex-col gap-8")],
    [
      h.section([h.Class("space-y-2")], [
        h.h3([h.Class(sectionTitleClassName)], ["Basic"]),
        progressBar(33),
      ]),
      h.section([h.Class("space-y-2")], [
        h.div(
          [h.Class("flex items-center justify-between text-sm")],
          [
            h.label([h.Class("font-medium text-gray-950")], [
              "Upload progress",
            ]),
            h.span([h.Class("tabular-nums text-gray-600")], ["66%"]),
          ]
        ),
        progressBar(66),
      ]),
      h.section([h.Class("space-y-2")], [
        h.div(
          [h.Class("flex items-center justify-between text-sm")],
          [
            h.h3([h.Class(sectionTitleClassName)], ["Controlled"]),
            h.span([h.Class("tabular-nums text-gray-600")], [
              `${model.value}%`,
            ]),
          ]
        ),
        progressBar(model.value),
        h.button(
          [
            h.Type("button"),
            h.OnClick(ClickedAdvanceProgress()),
            h.Class(
              "inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-950 shadow-sm"
            ),
          ],
          ["Advance progress"]
        ),
      ]),
      h.section([h.Class("space-y-2 text-right"), h.Dir("rtl")], [
        h.h3([h.Class(sectionTitleClassName)], ["تقدم الرفع"]),
        h.span([h.Class("text-sm tabular-nums text-gray-600")], ["٦٦%"]),
        progressBar(66),
      ]),
    ]
  );
});
