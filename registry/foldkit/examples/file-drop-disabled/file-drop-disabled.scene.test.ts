import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as FileDropDisabledExample from "./main";

describe("FileDrop Disabled example", () => {
  test("renders disabled upload input", () => {
    Scene.scene(
      {
        update: FileDropDisabledExample.update,
        view: FileDropDisabledExample.view,
      },
      Scene.with(FileDropDisabledExample.init()[0]),
      Scene.expect(Scene.text("File uploads disabled")).toExist(),
      Scene.expect(Scene.label("Upload files")).toBeDisabled()
    );
  });
});
