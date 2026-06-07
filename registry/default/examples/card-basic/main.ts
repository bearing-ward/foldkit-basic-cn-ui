import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Card from "../../ui/card";

// MODEL

export const CardMode = S.Union([S.Literal("Summary"), S.Literal("Release")]);

export const Model = S.Struct({
  mode: CardMode,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedToggleCardExample = m("ClickedToggleCardExample");

export const Message = S.Union([ClickedToggleCardExample]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ mode: "Summary" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedToggleCardExample: () => [
        evo(model, {
          mode: (mode) => (mode === "Summary" ? "Release" : "Summary"),
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
      Card.view<Message>([
        Card.headerView<Message>([
          Card.titleView<Message>(
            model.mode === "Summary" ? "Project health" : "Release notes"
          ),
          Card.descriptionView<Message>(
            model.mode === "Summary"
              ? "Current registry progress and verification status."
              : "What changed in the latest component slice."
          ),
        ]),
        Card.contentView<Message>([
          h.p(
            [h.Class("text-sm leading-6 text-gray-700")],
            [
              model.mode === "Summary"
                ? "Badge and Avatar are public, and the next static shadcn components are being promoted with the same registry guardrails."
                : "This card groups title, description, content, and footer regions without owning any state.",
            ]
          ),
        ]),
        Card.footerView<Message>([
          h.span([h.Class("text-sm text-gray-600")], [model.mode]),
          h.button(
            [h.OnClick(ClickedToggleCardExample()), h.Class(buttonClassName)],
            ["Switch card"]
          ),
        ]),
      ]),
    ]
  );
});
