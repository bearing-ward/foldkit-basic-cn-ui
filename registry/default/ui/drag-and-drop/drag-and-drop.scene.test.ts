import { Match as M, Option, Schema as S } from "effect";
import { Command, Scene, Submodel } from "foldkit";
import type { Html } from "foldkit/html";
import { html } from "foldkit/html";
import { m } from "foldkit/message";
import { evo } from "foldkit/struct";
import { describe, expect, test } from "vitest";

import * as DragAndDrop from "./index";

const GotDragAndDropMessage = m("GotDragAndDropMessage", {
  message: DragAndDrop.Message,
});

const Item = S.Struct({
  id: S.String,
  label: S.String,
});

const Model = S.Struct({
  dragAndDrop: DragAndDrop.Model,
  items: S.Array(Item),
  status: S.String,
});

type Model = typeof Model.Type;

const Message = S.Union([GotDragAndDropMessage]);
type Message = typeof Message.Type;

const initialModel: Model = {
  dragAndDrop: DragAndDrop.init({ id: "registry-drag-and-drop" })[0],
  items: [
    { id: "alpha", label: "Alpha" },
    { id: "bravo", label: "Bravo" },
    { id: "charlie", label: "Charlie" },
  ],
  status: "Current order: Alpha, Bravo, Charlie",
};

const reorderItems = (
  items: readonly (typeof Item.Type)[],
  fromIndex: number,
  toIndex: number
): readonly (typeof Item.Type)[] => {
  const item = items[fromIndex];

  if (item === undefined) {
    return items;
  }

  const withoutItem = items.filter((_, index) => index !== fromIndex);
  const boundedTargetIndex = Math.max(0, Math.min(toIndex, withoutItem.length));

  return [
    ...withoutItem.slice(0, boundedTargetIndex),
    item,
    ...withoutItem.slice(boundedTargetIndex),
  ];
};

const orderStatus = (items: readonly (typeof Item.Type)[]): string =>
  `Current order: ${items.map((item) => item.label).join(", ")}`;

const update = (
  model: Model,
  message: Message
): readonly [Model, readonly Command.Command<Message>[]] =>
  M.value(message).pipe(
    M.withReturnType<readonly [Model, readonly Command.Command<Message>[]]>(),
    M.tagsExhaustive({
      GotDragAndDropMessage: ({ message }) => {
        const [dragAndDrop, commands, maybeOutMessage] = DragAndDrop.update(
          model.dragAndDrop,
          message
        );

        const nextItems = Option.match(maybeOutMessage, {
          onNone: () => model.items,
          onSome: M.type<DragAndDrop.OutMessage>().pipe(
            M.tagsExhaustive({
              Reordered: ({ fromIndex, toIndex }) =>
                reorderItems(model.items, fromIndex, toIndex),
              Cancelled: () => model.items,
            })
          ),
        });

        return [
          evo(model, {
            dragAndDrop: () => dragAndDrop,
            items: () => nextItems,
            status: () => orderStatus(nextItems),
          }),
          Command.mapMessages(commands, (message) =>
            GotDragAndDropMessage({ message })
          ),
        ];
      },
    })
  );

const view = Submodel.defineView<Model, Message>((model): Html => {
  const h = html<Message>();

  return h.div(
    [],
    [
      DragAndDrop.sortableListView({
        model: model.dragAndDrop,
        containerId: "registry-list",
        items: model.items,
        label: "Registry sortable list",
        status: model.status,
        toParentMessage: (message) => GotDragAndDropMessage({ message }),
      }),
    ]
  );
});

describe("DragAndDrop registry view", () => {
  test("renders sortable items and applies keyboard reorder output", () => {
    const [activatedModel] = update(
      initialModel,
      GotDragAndDropMessage({
        message: DragAndDrop.ActivatedKeyboardDrag({
          itemId: "alpha",
          containerId: "registry-list",
          index: 0,
        }),
      })
    );
    const [movingModel, movingCommands] = update(
      activatedModel,
      GotDragAndDropMessage({
        message: DragAndDrop.PressedArrowKey({ direction: "Down" }),
      })
    );
    const [resolvedModel] = update(
      movingModel,
      GotDragAndDropMessage({
        message: DragAndDrop.ResolvedKeyboardMove({
          targetContainerId: "registry-list",
          targetIndex: 1,
        }),
      })
    );
    const [droppedModel, droppedCommands] = update(
      resolvedModel,
      GotDragAndDropMessage({
        message: DragAndDrop.ConfirmedKeyboardDrop(),
      })
    );

    expect(movingCommands).toHaveLength(1);
    expect(droppedCommands).toHaveLength(1);

    Scene.scene(
      { update, view },
      Scene.with(droppedModel),
      Scene.expect(Scene.text("Alpha")).toExist(),
      Scene.expect(Scene.text("Bravo")).toExist(),
      Scene.expect(Scene.text("Current order: Bravo, Alpha, Charlie")).toExist()
    );
  });
});
