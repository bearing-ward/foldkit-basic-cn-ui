import { Effect, Option, Schema as S } from "effect";
import { Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, expect, test } from "vitest";

import * as VirtualList from "./index";
const primitiveContainerClassesKey = `${"container"}${"Class"}${"Name"}` as const;


const listId = "registry-virtual-list";
const rows = VirtualList.activityRows(100);

const GotVirtualListMessage = m("GotVirtualListMessage", {
  message: VirtualList.Message,
});
const ClickedJumpToMiddle = m("ClickedJumpToMiddle");

const Model = S.Struct({
  virtualList: VirtualList.Model,
});
type Model = typeof Model.Type;

const Message = S.Union([GotVirtualListMessage, ClickedJumpToMiddle]);
type Message = typeof Message.Type;

const initialModel: Model = {
  virtualList: VirtualList.init({ id: listId, rowHeightPx: 56 }),
};
const [measuredVirtualList] = VirtualList.update(
  initialModel.virtualList,
  VirtualList.MeasuredContainer({ containerHeight: 224 })
);
const measuredModel: Model = {
  virtualList: measuredVirtualList,
};

const toParentMessage = (message: VirtualList.Message): Message =>
  GotVirtualListMessage({ message });

type ApplyScrollCommand = Readonly<{
  name: string;
  args: Record<string, unknown>;
  effect: Effect.Effect<VirtualList.CompletedApplyScroll>;
}>;

const applyScrollCommand = (
  id: string,
  scrollTop: number,
  version: number
): ApplyScrollCommand => {
  const result = VirtualList.CompletedApplyScroll({ version });

  return {
    name: "ApplyScroll",
    args: { id, scrollTop, version },
    effect: Effect.succeed(result),
  };
};

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] => {
  if (message._tag === "ClickedJumpToMiddle") {
    const [virtualList, commands] = VirtualList.scrollToIndex(
      model.virtualList,
      50
    );

    return [
      evo(model, { virtualList: () => virtualList }),
      Command.mapMessages(commands, toParentMessage),
    ];
  }

  const [virtualList, commands] = VirtualList.update(
    model.virtualList,
    message.message
  );

  return [
    evo(model, { virtualList: () => virtualList }),
    Command.mapMessages(commands, toParentMessage),
  ];
};

const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [],
    [
      h.button([h.OnClick(ClickedJumpToMiddle())], ["Jump to middle"]),
      h.submodel({
        slotId: model.virtualList.id,
        model: model.virtualList,
        view: VirtualList.view<VirtualList.Activity>(),
        viewInputs: {
          items: rows,
          itemToKey: (row) => String(row.id),
          itemToView: (row) => VirtualList.activityRow(row),
          [primitiveContainerClassesKey]: VirtualList.activityListContainerClasses,
        },
        toParentMessage,
      }),
    ]
  );
});

describe("VirtualList registry view", () => {
  test("renders measured rows and applies programmatic scroll commands", () => {
    Scene.scene(
      { update, view },
      Scene.with(measuredModel),
      Scene.expect(Scene.text("Sarah Chen")).toExist(),
      Scene.click(Scene.role("button", { name: "Jump to middle" })),
      Scene.Command.resolve(
        applyScrollCommand(listId, 2800, 1),
        VirtualList.CompletedApplyScroll({ version: 1 }),
        toParentMessage
      )
    );
  });

  test("computes fixed and variable visible windows", () => {
    const [measured] = VirtualList.update(
      initialModel.virtualList,
      VirtualList.MeasuredContainer({ containerHeight: 112 })
    );
    const [scrolled] = VirtualList.update(
      measured,
      VirtualList.ScrolledContainer({ scrollTop: 112 })
    );

    expect(
      Option.getOrThrow(VirtualList.visibleWindow(scrolled, rows.length, 0))
    ).toEqual({
      startIndex: 2,
      endIndex: 4,
      topSpacerHeight: 112,
      bottomSpacerHeight: 5376,
    });
    expect(
      Option.getOrThrow(
        VirtualList.visibleWindowVariable(
          scrolled,
          rows,
          VirtualList.activityVariableRowHeightPx,
          0
        )
      )
    ).toEqual({
      startIndex: 1,
      endIndex: 3,
      topSpacerHeight: 112,
      bottomSpacerHeight: 6776,
    });
  });
});
