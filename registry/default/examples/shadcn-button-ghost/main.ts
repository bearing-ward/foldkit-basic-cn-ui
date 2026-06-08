import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Button from "../../ui/shadcn-button";

// MODEL

export const Model = S.Struct({ count: S.Number });
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedButton = m("ClickedButton");
const Message = S.Union([ClickedButton]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ count: 0 }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedButton: () => [evo(model, { count: (count) => count + 1 }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("flex flex-col items-start gap-2")],
    [
      Button.view<Message>({
        onClick: ClickedButton(),
        toView: (attributes) =>
          h.button(
            [
              ...attributes.button,
              h.Class(
                `${Button.shadcnSecondaryButtonClassName} border-transparent bg-transparent shadow-none`
              ),
            ],
            ["Ghost"]
          ),
      }),
      h.span(
        [h.Class("text-sm text-gray-600")],
        [`Clicked ${model.count} time${model.count === 1 ? "" : "s"}`]
      ),
    ]
  );
});
