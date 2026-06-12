import { Match as M, Schema as S } from "effect";
import type { Command } from "foldkit";
import { Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";

import * as ScrollArea from "../../ui/shadcn-scroll-area";

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

const tags = Array.from(
  { length: 50 },
  (_, index) => `v1.2.0-beta.${50 - index}`
);

const tagRows = (): readonly Html[] => {
  const h = html<Message>();

  return tags.flatMap((tag, index) => [
    h.div([h.Class("text-sm")], [tag]),
    ...(index === tags.length - 1
      ? []
      : [
          h.div(
            [
              h.Attribute("role", "separator"),
              h.Attribute("aria-orientation", "horizontal"),
              h.Class("my-2 h-px bg-gray-200"),
            ],
            []
          ),
        ]),
  ]);
};

const works = [
  {
    artist: "Ornella Binni",
    image: "Photo by Ornella Binni",
  },
  {
    artist: "Tom Byrom",
    image: "Photo by Tom Byrom",
  },
  {
    artist: "Vladimir Malyavko",
    image: "Photo by Vladimir Malyavko",
  },
];

const horizontalPhotos = (): readonly Html[] => {
  const h = html<Message>();

  return works.map((work) =>
    h.figure(
      [h.Class("shrink-0 space-y-2")],
      [
        h.div(
          [
            h.Attribute("role", "img"),
            h.AriaLabel(work.image),
            h.Class(
              "flex h-44 w-64 items-end rounded-md border border-gray-200 bg-gray-100 p-3 text-sm text-gray-600"
            ),
          ],
          [work.image]
        ),
        h.figcaption([h.Class("text-sm text-gray-600")], [
          "Photo by ",
          h.span([h.Class("font-medium text-gray-900")], [work.artist]),
        ]),
      ]
    )
  );
};

export const view = Submodel.defineView<Model, Message>((): Html => {
  const h = html<Message>();

  return h.div(
    [h.Class("grid gap-8")],
    [
      ScrollArea.view<Message>({
        ariaLabel: "Tags",
        className: "h-72 w-48 rounded-md border border-gray-200",
        viewportClassName: "p-4",
        contentClassName: "space-y-0",
        children: [
          h.h4([h.Class("mb-4 text-sm font-medium leading-none")], ["Tags"]),
          ...tagRows(),
        ],
      }),
      ScrollArea.view<Message>({
        ariaLabel: "Horizontal photo gallery",
        className: "w-96 whitespace-nowrap rounded-md border border-gray-200",
        viewportClassName: "p-4",
        contentClassName: "flex w-max gap-4",
        hasHorizontalScrollbar: true,
        children: horizontalPhotos(),
      }),
      h.div([h.Dir("rtl")], [
        ScrollArea.view<Message>({
          ariaLabel: "العلامات",
          className: "h-72 w-48 rounded-md border border-gray-200",
          viewportClassName: "p-4",
          contentClassName: "space-y-0",
          children: [
            h.h4([h.Class("mb-4 text-sm font-medium leading-none")], [
              "العلامات",
            ]),
            ...tagRows(),
          ],
        }),
      ]),
    ]
  );
});
