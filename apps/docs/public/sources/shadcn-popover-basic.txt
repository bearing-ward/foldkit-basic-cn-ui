import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as Popover from "../../ui/shadcn-popover";

const anchor = {
  placement: "bottom-start" as const,
  gap: 4,
  padding: 8,
};

// MODEL

export const Model = S.Struct({
  popover: Popover.Model,
  width: S.String,
  maxWidth: S.String,
  height: S.String,
  maxHeight: S.String,
});

export type Model = typeof Model.Type;

// MESSAGE

export const GotPopoverMessage = m("GotPopoverMessage", {
  message: Popover.Message,
});
export const UpdatedWidth = m("UpdatedWidth", { value: S.String });
export const UpdatedMaxWidth = m("UpdatedMaxWidth", { value: S.String });
export const UpdatedHeight = m("UpdatedHeight", { value: S.String });
export const UpdatedMaxHeight = m("UpdatedMaxHeight", { value: S.String });

export const Message = S.Union([
  GotPopoverMessage,
  UpdatedWidth,
  UpdatedMaxWidth,
  UpdatedHeight,
  UpdatedMaxHeight,
]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const [popover, popoverCommands] = Popover.init({ id: "popover-basic" });

  return [
    {
      popover,
      width: "100%",
      maxWidth: "300px",
      height: "25px",
      maxHeight: "none",
    },
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
      UpdatedWidth: ({ value }) => [evo(model, { width: () => value }), []],
      UpdatedMaxWidth: ({ value }) => [
        evo(model, { maxWidth: () => value }),
        [],
      ],
      UpdatedHeight: ({ value }) => [evo(model, { height: () => value }), []],
      UpdatedMaxHeight: ({ value }) => [
        evo(model, { maxHeight: () => value }),
        [],
      ],
    })
  );

// VIEW

const dimensionField = (
  h: ReturnType<typeof html<Message>>,
  config: Readonly<{
    id: string;
    label: string;
    value: string;
    onInput: (value: string) => Message;
  }>
): Html =>
  h.div([h.Class("grid grid-cols-3 items-center gap-4")], [
    h.label([h.For(config.id), h.Class("text-sm font-medium")], [
      config.label,
    ]),
    h.input([
      h.Id(config.id),
      h.Value(config.value),
      h.OnChange(config.onInput),
      h.OnInput(config.onInput),
      h.Class(
        "col-span-2 h-8 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm outline-none transition focus-visible:border-gray-950 focus-visible:ring-2 focus-visible:ring-gray-950/10"
      ),
    ]),
  ]);

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
            Popover.trigger<Message>({
              render,
              label: "Open popover",
            }),
            ...(render.isVisible
              ? [
                  Popover.backdrop<Message>({ render }),
                  Popover.panel<Message>({
                    render,
                    children: [
                      h.div([h.Class("grid gap-4")], [
                        h.div([h.Class("space-y-2")], [
                          h.h4(
                            [h.Class("font-medium leading-none")],
                            ["Dimensions"]
                          ),
                          h.p(
                            [h.Class("text-sm text-gray-500")],
                            ["Set the dimensions for the layer."]
                          ),
                        ]),
                        h.div([h.Class("grid gap-2")], [
                          dimensionField(h, {
                            id: "width",
                            label: "Width",
                            value: model.width,
                            onInput: (value) => UpdatedWidth({ value }),
                          }),
                          dimensionField(h, {
                            id: "maxWidth",
                            label: "Max. width",
                            value: model.maxWidth,
                            onInput: (value) => UpdatedMaxWidth({ value }),
                          }),
                          dimensionField(h, {
                            id: "height",
                            label: "Height",
                            value: model.height,
                            onInput: (value) => UpdatedHeight({ value }),
                          }),
                          dimensionField(h, {
                            id: "maxHeight",
                            label: "Max. height",
                            value: model.maxHeight,
                            onInput: (value) => UpdatedMaxHeight({ value }),
                          }),
                        ]),
                      ]),
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
