import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DragAndDropDisabledExample from "./main";

describe("DragAndDrop Disabled example", () => {
  test("renders a locked task order", () => {
    const [initialModel] = DragAndDropDisabledExample.init();

    Scene.scene(
      {
        update: DragAndDropDisabledExample.update,
        view: DragAndDropDisabledExample.view,
      },
      Scene.with(initialModel),
      Scene.expect(Scene.text("Task order is locked.")).toExist(),
      Scene.expect(Scene.text("Plan")).toExist(),
      Scene.expect(Scene.text("Build")).toExist(),
      Scene.expect(Scene.text("Verify")).toExist()
    );
  });
});
