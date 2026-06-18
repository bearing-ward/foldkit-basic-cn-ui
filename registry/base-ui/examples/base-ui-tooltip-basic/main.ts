import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Tooltip from "../../ui/base-ui-tooltip";

// MODEL

export const Model = S.Struct({
  tooltip: Tooltip.Model,
});
export type Model = typeof Model.Type;

// MESSAGE

export const GotTooltipMessage = m("GotTooltipMessage", {
  message: Tooltip.Message,
});

export const Message = S.Union([GotTooltipMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [tooltip, commands] = Tooltip.init({ id: "tooltip-basic" });

  return [
    { tooltip },
    Command.mapMessages(commands, (message) => GotTooltipMessage({ message })),
  ];
};

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotTooltipMessage: ({ message }) => {
        const [tooltip, commands] = Tooltip.update(model.tooltip, message);

        return [
          evo(model, { tooltip: () => tooltip }),
          Command.mapMessages(commands, (message) =>
            GotTooltipMessage({ message })
          ),
        ];
      },
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.submodel({
    slotId: model.tooltip.id,
    model: model.tooltip,
    view: Tooltip.view,
    viewInputs: {
      anchor: Tooltip.baseUiTooltipAnchor,
      toView: (render) =>
        Tooltip.baseUiTooltipView({
          render,
          triggerLabel: "Bold",
          panelText: "Bold",
        }),
    },
    toParentMessage: (message) => GotTooltipMessage({ message }),
  });
});
