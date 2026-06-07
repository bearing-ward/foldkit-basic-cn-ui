import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as AvatarBasicExample from "./main";

describe("Avatar Basic example", () => {
  test("matches the Base UI default two avatar example", () => {
    Scene.scene(
      { update: AvatarBasicExample.update, view: AvatarBasicExample.view },
      Scene.with(AvatarBasicExample.init()[0]),
      Scene.expect(Scene.role("img", { name: "Lena Taylor" })).toExist(),
      Scene.expect(Scene.text("LT")).toExist(),
      Scene.expect(Scene.text("LT")).not.toHaveHandler("click")
    );
  });
});
