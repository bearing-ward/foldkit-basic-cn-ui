import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Collapsible from "../../ui/base-ui-collapsible";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedTrigger = m("ClickedTrigger");

export const Message = S.Union([ClickedTrigger]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedTrigger: () => [evo(model, { open: (open) => !open }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();
  const panelId = "recovery-keys-panel";

  return Collapsible.rootView<Message>({
    open: model.open,
    children: [
      Collapsible.triggerView<Message>({
        open: model.open,
        onOpenChange: ClickedTrigger(),
        ariaLabel: "Recovery keys",
        panelId,
        children: [h.span([], ["Recovery keys"])],
      }),
      Collapsible.panelView<Message>({
        open: model.open,
        id: panelId,
        children: [
          Collapsible.contentView<Message>([
            h.div([], ["alien-bean-pasta"]),
            h.div([], ["wild-irish-burrito"]),
            h.div([], ["horse-battery-staple"]),
          ]),
        ],
      }),
    ],
  });
});
