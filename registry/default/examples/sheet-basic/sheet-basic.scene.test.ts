import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SheetBasicExample from "./main";

describe("Sheet Basic example", () => {
  test("opens and closes the sheet", () => {
    Scene.scene(
      {
        update: SheetBasicExample.update,
        view: SheetBasicExample.view,
      },
      Scene.with(SheetBasicExample.init()[0]),
      Scene.expect(Scene.role("dialog")).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "Open" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("Edit profile")).toExist(),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.expect(Scene.role("dialog")).toBeAbsent()
    );
  });
});
