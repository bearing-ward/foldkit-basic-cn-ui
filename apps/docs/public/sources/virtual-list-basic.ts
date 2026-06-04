import { Match as M, Schema as S } from "effect";
import { Command, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";

import * as VirtualList from "../../ui/virtual-list";

// MODEL

const ROW_COUNT = 1000;
const ROW_HEIGHT_PX = 56;
const MIDDLE_INDEX = Math.floor(ROW_COUNT / 2);

const activities = VirtualList.activityRows(ROW_COUNT);

export const Model = S.Struct({
  virtualList: VirtualList.Model,
  status: S.String,
});
export type Model = typeof Model.Type;

// MESSAGE

export const ClickedJumpToMiddle = m("ClickedJumpToMiddle");
export const GotVirtualListMessage = m("GotVirtualListMessage", {
  message: VirtualList.Message,
});

export const Message = S.Union([ClickedJumpToMiddle, GotVirtualListMessage]);
export type Message = typeof Message.Type;

// INIT

export const init = (): readonly [
  Model,
  readonly Command.Command<Message>[],
] => {
  const virtualList = VirtualList.init({
    id: "virtual-list-basic",
    rowHeightPx: ROW_HEIGHT_PX,
  });

  return [
    {
      virtualList,
      status: `${ROW_COUNT.toLocaleString()} activity events loaded.`,
    },
    [],
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
      ClickedJumpToMiddle: () => {
        const [virtualList, commands] = VirtualList.scrollToIndex(
          model.virtualList,
          MIDDLE_INDEX
        );

        return [
          evo(model, {
            virtualList: () => virtualList,
            status: () => `Jumping to row ${MIDDLE_INDEX.toLocaleString()}.`,
          }),
          Command.mapMessages(commands, (message) =>
            GotVirtualListMessage({ message })
          ),
        ];
      },
      GotVirtualListMessage: ({ message }) => {
        const [virtualList, commands] = VirtualList.update(
          model.virtualList,
          message
        );

        return [
          evo(model, { virtualList: () => virtualList }),
          Command.mapMessages(commands, (message) =>
            GotVirtualListMessage({ message })
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
      h.div(
        [h.Class(VirtualList.activityListHeaderClassName)],
        [
          h.span([], [model.status]),
          h.button(
            [
              h.Type("button"),
              h.Class(VirtualList.virtualListActionClassName),
              h.OnClick(ClickedJumpToMiddle()),
            ],
            ["Jump to middle"]
          ),
        ]
      ),
      h.submodel({
        slotId: model.virtualList.id,
        model: model.virtualList,
        view: VirtualList.view<VirtualList.Activity>(),
        viewInputs: {
          items: activities,
          itemToKey: (row) => String(row.id),
          itemToView: (row) => VirtualList.activityRow(row),
          containerClassName: VirtualList.activityListContainerClassName,
        },
        toParentMessage: (message) => GotVirtualListMessage({ message }),
      }),
    ]
  );
});
