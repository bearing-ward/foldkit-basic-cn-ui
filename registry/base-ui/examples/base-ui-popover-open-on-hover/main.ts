import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Popover from "../../ui/base-ui-popover";

// MODEL

export const Model = S.Struct({
  open: S.Boolean,
});

export type Model = typeof Model.Type;

// MESSAGE

export const HoveredTrigger = m("HoveredTrigger");
export const LeftPopover = m("LeftPopover");

export const Message = S.Union([HoveredTrigger, LeftPopover]);
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
      HoveredTrigger: () => [evo(model, { open: () => true }), []],
      LeftPopover: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [
      h.Class(Popover.baseUiPopoverRootClasses),
      h.OnMouseLeave(LeftPopover()),
    ],
    [
      h.button(
        [
          h.Type("button"),
          h.OnMouseEnter(HoveredTrigger()),
          h.AriaExpanded(model.open),
          h.Class(Popover.baseUiPopoverTriggerClasses),
        ],
        ["Hover me"]
      ),
      model.open
        ? h.div(
            [h.Class("absolute left-0 top-full z-50 mt-2")],
            [
              h.div(
                [
                  h.Role("dialog"),
                  h.Class(Popover.baseUiPopoverPanelClasses),
                ],
                [
                  h.p(
                    [h.Class("text-sm font-semibold text-gray-950")],
                    ["Popover opened on hover"]
                  ),
                  h.p(
                    [h.Class("mt-2 text-sm text-gray-600")],
                    ["Move the pointer away to close the popover."]
                  ),
                ]
              ),
            ]
          )
        : h.empty,
    ]
  );
});
