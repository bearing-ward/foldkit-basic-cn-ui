import { Match as M, Option, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Tooltip from "../../ui/shadcn-tooltip";

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
    [h.Class("space-y-4")],
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
              triggerLabel: "Hover",
              panelText: "Add to library",
            }),
        },
        toParentMessage: (message) => GotTooltipMessage({ message }),
      }),
      h.div(
        [h.Class("flex flex-wrap gap-2")],
        [
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["left"]
          ),
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["top"]
          ),
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["bottom"]
          ),
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["right"]
          ),
        ]
      ),
      h.button(
        [h.Type("button"), h.Class(`${Tooltip.tooltipTriggerClasses} gap-2`)],
        [
          h.span([], ["Save"]),
          h.span(
            [h.Class("rounded bg-gray-100 px-1.5 py-0.5 text-xs")],
            ["⌘S"]
          ),
        ]
      ),
      h.span(
        [
          h.Class(
            "inline-flex cursor-not-allowed rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-400"
          ),
        ],
        ["Disabled"]
      ),
      h.div(
        [h.Dir("rtl"), h.Class("flex flex-wrap gap-2")],
        [
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["يسار"]
          ),
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["أعلى"]
          ),
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["أسفل"]
          ),
          h.button(
            [h.Type("button"), h.Class(Tooltip.tooltipTriggerClasses)],
            ["يمين"]
          ),
        ]
      ),
      h.p([h.Class("text-sm text-gray-700")], [model.status]),
    ]
  );
});
