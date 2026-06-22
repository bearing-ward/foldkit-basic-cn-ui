import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as ScrollArea from "../../ui/base-ui-scroll-area";

// MODEL

export const Model = S.Struct({});

export type Model = typeof Model.Type;

// MESSAGE

export const Message = m("Message");

export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => [{}, []];

// UPDATE

export const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      Message: () => [model, []],
    })
  );

// VIEW

const wideRows = (): readonly Html[] => {
  const h = html<Message>();
  const labels = [
    "Header",
    "Content",
    "Sidebar",
    "Navigation",
    "Footer",
    "Actions",
  ];

  return labels.map((label) =>
    h.div(
      [
        h.Class(
          "grid w-[720px] grid-cols-6 gap-3 border-b border-gray-100 py-2 text-sm text-gray-700"
        ),
      ],
      [
        h.span([h.Class("font-medium text-gray-950")], [label]),
        h.span([], ["Column A"]),
        h.span([], ["Column B"]),
        h.span([], ["Column C"]),
        h.span([], ["Column D"]),
        h.span([], ["Column E"]),
      ]
    )
  );
};

export const view = Submodel.defineView<Model, Message>(
  (): Html =>
    ScrollArea.rootView<Message>({
      hasOverflowX: true,
      hasOverflowY: true,
      children: [
        ScrollArea.viewportView<Message>({
          ariaLabel: "Two axis content",
          children: [
            ScrollArea.contentView<Message>({
              classes: "space-y-0",
              children: wideRows(),
            }),
          ],
        }),
        ScrollArea.scrollbarView<Message>({
          children: [ScrollArea.thumbView<Message>({})],
        }),
        ScrollArea.scrollbarView<Message>({
          classes: "inset-x-1 bottom-1 top-auto h-1.5 w-auto",
          children: [
            ScrollArea.thumbView<Message>({
              classes: "h-full min-h-0 w-16",
            }),
          ],
        }),
        ScrollArea.cornerView<Message>({}),
      ],
    })
);
