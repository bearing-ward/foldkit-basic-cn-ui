import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as AvatarBasicExample from "./main";

describe("Avatar Basic example", () => {
  test("renders avatar group and toggles featured fallback", () => {
    Scene.scene(
      { update: AvatarBasicExample.update, view: AvatarBasicExample.view },
      Scene.with(AvatarBasicExample.init()[0]),
      Scene.expect(Scene.role("img", { name: "Ada Lovelace" })).toExist(),
      Scene.expect(Scene.text("Featured contributor")).toExist(),
      Scene.expect(Scene.role("img", { name: "4 more people" })).toExist(),
      Scene.click(Scene.role("button", { name: "Toggle featured avatar" })),
      Scene.expect(Scene.text("Grace Hopper")).toExist(),
      Scene.expect(Scene.text("GH")).toExist()
    );
  });
});
