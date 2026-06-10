import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Popover from "../../ui/base-ui-popover";

const TriggerName = S.Union([S.Literal("Trigger 1"), S.Literal("Trigger 2")]);
type TriggerName = typeof TriggerName.Type;

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
  activeTrigger: TriggerName,
});

export type Model = typeof Model.Type;

// MESSAGE

export const ClickedTrigger = m("ClickedTrigger", {
  value: TriggerName,
});
export const ClickedClose = m("ClickedClose");

export const Message = S.Union([ClickedTrigger, ClickedClose]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{ open: false, activeTrigger: "Trigger 1" }, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      ClickedTrigger: ({ value }) => [
        evo(model, { open: () => true, activeTrigger: () => value }),
        [],
      ],
      ClickedClose: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

const triggerView = (label: TriggerName): Html => {
  const h = html<Message>();

  return h.button(
    [
      h.Type("button"),
      h.OnClick(ClickedTrigger({ value: label })),
      h.Class(Popover.baseUiPopoverTriggerClassName),
    ],
    [label]
  );
};

const panelView = (model: Model): Html => {
  const h = html<Message>();

  if (!model.open) {
    return h.empty;
  }

  return h.div(
    [h.Class("absolute left-0 top-full z-50 mt-2")],
    [
      h.div(
        [h.Class(Popover.baseUiPopoverPanelClassName)],
        [
          h.div(
            [h.Class("flex items-start justify-between gap-4")],
            [
              h.div(
                [h.Class("space-y-1")],
                [
                  h.p(
                    [h.Class("text-sm font-semibold text-gray-900")],
                    [model.activeTrigger]
                  ),
                  h.p(
                    [h.Class("text-sm text-gray-600")],
                    [`Content for ${model.activeTrigger}`]
                  ),
                ]
              ),
              h.button(
                [
                  h.Type("button"),
                  h.AriaLabel("Close"),
                  h.OnClick(ClickedClose()),
                  h.Class("text-gray-500 hover:text-gray-900"),
                ],
                ["x"]
              ),
            ]
          ),
        ]
      ),
    ]
  );
};

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class(Popover.baseUiPopoverRootClassName)],
    [
      h.div(
        [h.Class("flex gap-2")],
        [triggerView("Trigger 1"), triggerView("Trigger 2")]
      ),
      panelView(model),
    ]
  );
});
