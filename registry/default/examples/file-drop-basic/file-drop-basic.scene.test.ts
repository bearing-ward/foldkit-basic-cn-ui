import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FileDropBasicExample from "./main";

describe("FileDrop Basic example", () => {
  test("lists selected files and removes them", () => {
    const file = new globalThis.File(["hello"], "report.txt", {
      type: "text/plain",
    });

    Scene.scene(
      {
        update: FileDropBasicExample.update,
        view: FileDropBasicExample.view,
      },
      Scene.with(FileDropBasicExample.init()[0]),
      Scene.expect(Scene.text("Selected files: 0")).toExist(),
      Scene.changeFiles(Scene.label("Upload files"), [file]),
      Scene.expect(Scene.text("Selected files: 1")).toExist(),
      Scene.expect(Scene.text("report.txt")).toExist(),
      Scene.click(Scene.role("button", { name: "Remove" })),
      Scene.expect(Scene.text("Selected files: 0")).toExist(),
      Scene.expect(Scene.text("report.txt")).not.toExist()
    );
  });
});
