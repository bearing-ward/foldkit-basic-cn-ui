import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Collapsible from "../../ui/shadcn-collapsible";

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
  const panelId = "peduarte-repositories";

  return Collapsible.rootView<Message>({
    open: model.open,
    className: "space-y-2 border-0 p-0 shadow-none",
    children: [
      h.div(
        [h.Class("flex items-center justify-between space-x-4 px-4")],
        [
          h.h4(
            [h.Class("text-sm font-semibold")],
            ["@peduarte starred 3 repositories"]
          ),
          Collapsible.triggerView<Message>({
            open: model.open,
            onOpenChange: ClickedTrigger(),
            ariaLabel: "Toggle",
            panelId,
            className: "size-9 shrink-0 justify-center px-0",
            children: [],
          }),
        ]
      ),
      h.div(
        [h.Class("rounded-md border px-4 py-3 font-mono text-sm")],
        ["@radix-ui/primitives"]
      ),
      Collapsible.panelView<Message>({
        open: model.open,
        id: panelId,
        className: "border-0 bg-transparent",
        children: [
          Collapsible.contentView<Message>(
            [
              h.div(
                [h.Class("rounded-md border px-4 py-3 font-mono text-sm")],
                ["@radix-ui/colors"]
              ),
              h.div(
                [h.Class("rounded-md border px-4 py-3 font-mono text-sm")],
                ["@stitches/react"]
              ),
            ],
            "space-y-2 p-0"
          ),
        ],
      }),
    ],
  });
});
