import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyOutlineExample from "./main";

describe("Empty Outline example", () => {
  test("matches the upstream empty outline example content", () => {
    Scene.scene(
      { update: EmptyOutlineExample.update, view: EmptyOutlineExample.view },
      Scene.with(EmptyOutlineExample.init()[0]),
      Scene.expect(
        Scene.role("heading", { name: "Cloud Storage Empty" })
      ).toExist(),
      Scene.expect(
        Scene.text("Upload files to your cloud storage to access them anywhere.")
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Upload Files" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Upload Files" })
      ).not.toHaveHandler("click")
    );
  });
});
