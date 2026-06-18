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
      Scene.expect(Scene.text("Side: right")).toExist(),
      Scene.expect(
        Scene.text(
          "No Close Button variant: omit Sheet.closeView from content."
        )
      ).toExist(),
      Scene.expect(Scene.text("فتح")).toExist(),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.expect(Scene.role("dialog")).toBeAbsent()
    );
  });

  test("opens the side variants", () => {
    Scene.scene(
      {
        update: SheetBasicExample.update,
        view: SheetBasicExample.view,
      },
      Scene.with(SheetBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "top" })),
      Scene.expect(Scene.role("dialog")).toExist(),
      Scene.expect(Scene.text("Side: top")).toExist(),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.click(Scene.role("button", { name: "bottom" })),
      Scene.expect(Scene.text("Side: bottom")).toExist(),
      Scene.click(Scene.role("button", { name: "Save changes" })),
      Scene.click(Scene.role("button", { name: "left" })),
      Scene.expect(Scene.text("Side: left")).toExist()
    );
  });
});
