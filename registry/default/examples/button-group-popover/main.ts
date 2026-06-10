import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as ButtonGroup from "../../ui/button-group";
import * as Popover from "../../ui/popover";

const anchor = {
  placement: "bottom-start" as const,
  gap: 6,
  padding: 8,
};

// MODEL

export const Model = S.Struct({
  popover: Popover.Model,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotPopoverMessage = m("GotPopoverMessage", {
  message: Popover.Message,
});

export const Message = S.Union([GotPopoverMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [popover, popoverCommands] = Popover.init({
    id: "button-group-popover",
  });

  return [
    { popover },
    Command.mapMessages(popoverCommands, (message) =>
      GotPopoverMessage({ message })
    ),
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
      GotPopoverMessage: ({ message }) => {
        const [popover, popoverCommands] = Popover.update(
          model.popover,
          message
        );

        return [
          evo(model, { popover: () => popover }),
          Command.mapMessages(popoverCommands, (message) =>
            GotPopoverMessage({ message })
          ),
        ];
      },
    })
  );

const primaryButtonClassName =
  "inline-flex h-9 items-center justify-center bg-gray-950 px-4 text-sm font-medium text-white transition hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-600";

const iconButtonClassName =
  "inline-flex h-9 w-9 items-center justify-center bg-white text-sm font-semibold text-gray-900 transition hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-accent-600";

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  const toPopoverMessage = (message: Popover.Message): Message =>
    GotPopoverMessage({ message });

  return h.submodel({
    slotId: model.popover.id,
    model: model.popover,
    view: Popover.view,
    viewInputs: {
      anchor,
      toView: (render) =>
        Popover.root<Message>({
          children: [
            ButtonGroup.view<Message>({
              ariaLabel: "Assistant actions",
              children: [
                ButtonGroup.itemView<Message>({
                  children: [
                    h.button([h.Class(primaryButtonClassName)], ["Ask AI"]),
                  ],
                }),
                ButtonGroup.itemView<Message>({
                  children: [
                    h.button(
                      [
                        ...render.button,
                        h.Type("button"),
                        h.AriaLabel("Open AI options"),
                        h.Class(iconButtonClassName),
                      ],
                      ["v"]
                    ),
                  ],
                }),
              ],
            }),
            ...(render.isVisible
              ? [
                  Popover.backdrop<Message>({ render }),
                  Popover.panel<Message>({
                    render,
                    children: [
                      h.p(
                        [h.Class("text-sm font-semibold text-gray-900")],
                        ["Ask AI"]
                      ),
                      h.p(
                        [h.Class("mt-2 text-sm text-gray-600")],
                        [
                          "Generate, summarize, or rewrite the current selection.",
                        ]
                      ),
                    ],
                  }),
                ]
              : []),
          ],
        }),
    },
    toParentMessage: toPopoverMessage,
  });
});
