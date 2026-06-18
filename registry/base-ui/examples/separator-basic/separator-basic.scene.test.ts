import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SeparatorBasicExample from "./main";

describe("Separator Basic example", () => {
  test("renders separator utility without an artificial action", () => {
    Scene.scene(
      {
        update: SeparatorBasicExample.update,
        view: SeparatorBasicExample.view,
      },
      Scene.with(SeparatorBasicExample.init()[0]),
      Scene.expect(Scene.text("Account")).toExist(),
      Scene.expect(
        Scene.text("Profile, billing, and team settings.")
      ).toExist(),
      Scene.expect(Scene.text("Preview")).toExist(),
      Scene.expect(Scene.text("Code")).toExist(),
      Scene.expect(Scene.text("Deploy")).toExist(),
      Scene.expect(Scene.text("Preview")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Code")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("Deploy")).not.toHaveHandler("click"),
      Scene.expect(Scene.role("button", { name: "Toggle label" })).not.toExist()
    );
  });
});
