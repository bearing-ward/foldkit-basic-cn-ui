import { Scene } from "foldkit";
import { describe, expect, test } from "vitest";

import * as DragAndDrop from "../../ui/drag-and-drop";
import * as DragAndDropBasicExample from "./main";

describe("DragAndDrop Basic example", () => {
  test("renders functional sortable attributes", () => {
    Scene.scene(
      {
        update: DragAndDropBasicExample.update,
        view: DragAndDropBasicExample.view,
      },
      Scene.with(DragAndDropBasicExample.init()[0]),
      Scene.expect(Scene.role("listbox", { name: "Task order" })).toHaveAttr(
        "data-droppable-id",
        "tasks"
      ),
      Scene.expect(Scene.role("option", { name: /Plan/u })).toHaveAttr(
        "data-draggable-id",
        "plan"
      ),
      Scene.expect(Scene.role("option", { name: /Plan/u })).toHaveHandler(
        "pointerdown"
      ),
      Scene.expect(Scene.role("option", { name: /Plan/u })).toHaveHandler(
        "keydown"
      ),
      Scene.keydown(Scene.role("option", { name: /Plan/u }), " "),
      Scene.expect(Scene.role("option", { name: /Plan/u })).toHaveAttr(
        "data-keyboard-dragging",
        ""
      )
    );
  });

  test("applies keyboard reorder through the real drag lifecycle", () => {
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
    expect(movingCommands[0]?.name).toBe("ResolveKeyboardMove");
    expect(movingCommands[0]?.args).toEqual({
      itemId: "plan",
      currentContainerId: "tasks",
      currentIndex: 0,
      direction: "Down",
    });
    expect(droppedCommands).toHaveLength(1);
    expect(droppedCommands[0]?.name).toBe("FocusItem");
    expect(droppedCommands[0]?.args).toEqual({ itemId: "plan" });

    Scene.scene(
      {
        update: DragAndDropBasicExample.update,
        view: DragAndDropBasicExample.view,
      },
      Scene.with(droppedModel),
      Scene.expect(Scene.text("Task order: Build, Plan, Verify")).toExist()
    );
  });
});
