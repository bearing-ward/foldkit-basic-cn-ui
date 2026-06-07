import { Scene } from "foldkit";
import { describe, expect, test } from "vitest";

import * as ResizableBasicExample from "./main";

describe("Resizable Basic example", () => {
  test("renders a functional controlled panel composition", () => {
    Scene.scene(
      {
        update: ResizableBasicExample.update,
        view: ResizableBasicExample.view,
      },
      Scene.with(ResizableBasicExample.init()[0]),
      Scene.expect(Scene.text("One")).toHaveAttr("data-size", "50"),
      Scene.expect(Scene.text("Two")).toHaveAttr("data-size", "50"),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).toExist(),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).toHaveHandler("pointerdown"),
      Scene.expect(
        Scene.role("separator", { name: "Resize panels" })
      ).toHaveHandler("keydown"),
      Scene.keydown(
        Scene.role("separator", { name: "Resize panels" }),
        "ArrowRight"
      ),
      Scene.expect(Scene.text("One")).toHaveAttr("data-size", "55"),
      Scene.expect(Scene.text("Two")).toHaveAttr("data-size", "45")
    );
  });

  test("updates panel size from pointer drag messages", () => {
    const [initialModel] = ResizableBasicExample.init();
    const [draggingModel] = ResizableBasicExample.update(
      initialModel,
      ResizableBasicExample.PressedResizeHandle({ screenX: 100 })
    );
    const [resizedModel] = ResizableBasicExample.update(
      draggingModel,
      ResizableBasicExample.MovedResizePointer({ screenX: 180 })
    );
    const [releasedModel] = ResizableBasicExample.update(
      resizedModel,
      ResizableBasicExample.ReleasedResizePointer()
    );

    expect(resizedModel.leftSize).toBe(70);
    expect(releasedModel.resizeState._tag).toBe("Idle");
  });
});
