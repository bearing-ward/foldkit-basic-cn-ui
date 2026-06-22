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

export const ClickedDetachedTrigger = m("ClickedDetachedTrigger");
export const ClickedClose = m("ClickedClose");

export const Message = S.Union([ClickedDetachedTrigger, ClickedClose]);
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
      ClickedDetachedTrigger: () => [
        evo(model, { open: (open) => !open }),
        [],
      ],
      ClickedClose: () => [evo(model, { open: () => false }), []],
    })
  );

// VIEW

export const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("space-y-4")],
    [
      h.div(
        [h.Class("flex items-center gap-3")],
        [
          h.button(
            [
              h.Type("button"),
              h.OnClick(ClickedDetachedTrigger()),
              h.AriaExpanded(model.open),
              h.Class(Popover.baseUiPopoverTriggerClasses),
            ],
            ["Trigger outside root"]
          ),
          h.span([h.Class("text-sm text-gray-600")], [
            "The trigger is rendered separately from the popover root.",
          ]),
        ]
      ),
      h.div(
        [h.Class(Popover.baseUiPopoverRootClasses)],
        [
          model.open
            ? h.div(
                [h.Class("absolute left-0 top-0 z-50")],
                [
                  h.div(
                    [
                      h.Role("dialog"),
                      h.Class(Popover.baseUiPopoverPanelClasses),
                    ],
                    [
                      h.div(
                        [h.Class("flex items-start justify-between gap-4")],
                        [
                          h.div(
                            [h.Class("space-y-1")],
                            [
                              h.p(
                                [h.Class("text-sm font-semibold text-gray-950")],
                                ["Detached trigger"]
                              ),
                              h.p(
                                [h.Class("text-sm text-gray-600")],
                                ["The popover panel can be controlled from outside its root."],
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
              )
            : h.empty,
        ]
      ),
    ]
  );
});
