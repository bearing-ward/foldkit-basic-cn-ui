import { Scene } from "foldkit";
import { describe, expect, test } from "vitest";

import * as DragAndDrop from "../../ui/drag-and-drop";
import * as DragAndDropBasicExample from "./main";

describe("DragAndDrop Basic example", () => {
  test("renders sortable tasks and applies keyboard reorder", () => {
    const [initialModel] = DragAndDropBasicExample.init();
    const [activatedModel] = DragAndDropBasicExample.update(
      initialModel,
      DragAndDropBasicExample.GotDragAndDropMessage({
        message: DragAndDrop.ActivatedKeyboardDrag({
          itemId: "plan",
          containerId: "tasks",
          index: 0,
        }),
      })
    );
    const [movingModel, movingCommands] = DragAndDropBasicExample.update(
      activatedModel,
      DragAndDropBasicExample.GotDragAndDropMessage({
        message: DragAndDrop.PressedArrowKey({ direction: "Down" }),
      })
    );
    const [resolvedModel] = DragAndDropBasicExample.update(
      movingModel,
      DragAndDropBasicExample.GotDragAndDropMessage({
        message: DragAndDrop.ResolvedKeyboardMove({
          targetContainerId: "tasks",
          targetIndex: 1,
        }),
      })
    );
    const [droppedModel, droppedCommands] = DragAndDropBasicExample.update(
      resolvedModel,
      DragAndDropBasicExample.GotDragAndDropMessage({
        message: DragAndDrop.ConfirmedKeyboardDrop(),
      })
    );

    expect(movingCommands).toHaveLength(1);
    expect(droppedCommands).toHaveLength(1);

    Scene.scene(
      {
        update: DragAndDropBasicExample.update,
        view: DragAndDropBasicExample.view,
      },
      Scene.with(droppedModel),
      Scene.expect(Scene.text("Plan")).toExist(),
      Scene.expect(Scene.text("Build")).toExist(),
      Scene.expect(Scene.text("Task order: Build, Plan, Verify")).toExist()
    );
  });
});
