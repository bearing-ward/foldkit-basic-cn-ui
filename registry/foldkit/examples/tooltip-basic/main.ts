import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Tooltip from "../../ui/tooltip";

// MODEL

export const Model = S.Struct({
  tooltip: Tooltip.Model,
  status: S.String,
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
    { tooltip, status: "Tooltip hidden." },
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
        const [tooltip, commands, maybeOutMessage] = Tooltip.update(
          model.tooltip,
          message
        );
        const status = Option.match(maybeOutMessage, {
          onNone: () => model.status,
          onSome: M.type<Tooltip.OutMessage>().pipe(
            M.tagsExhaustive({
              Hidden: () => "Tooltip hidden.",
              Shown: () => "Tooltip shown.",
            })
          ),
        });

        return [
          evo(model, { tooltip: () => tooltip, status: () => status }),
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

  return h.div(
    [h.Class("space-y-3")],
    [
      h.submodel({
        slotId: model.tooltip.id,
        model: model.tooltip,
        view: Tooltip.view,
        viewInputs: {
          anchor: Tooltip.tooltipAnchor,
          toView: (render) =>
            Tooltip.tooltipView({
              render,
              triggerLabel: "Hover or focus me",
              panelText: "This is a tooltip",
            }),
        },
        toParentMessage: (message) => GotTooltipMessage({ message }),
      }),
      h.p([h.Class("text-sm text-gray-700")], [model.status]),
    ]
  );
});
