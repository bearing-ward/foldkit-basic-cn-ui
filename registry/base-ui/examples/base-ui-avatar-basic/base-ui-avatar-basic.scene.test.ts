import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as BaseUiAvatarBasicExample from "./main";

describe("Base UI Avatar Basic example", () => {
  test("matches the Base UI default two avatar example", () => {
    Scene.scene(
      {
        update: BaseUiAvatarBasicExample.update,
        view: BaseUiAvatarBasicExample.view,
      },
      Scene.with(BaseUiAvatarBasicExample.init()[0]),
      Scene.expect(Scene.role("img", { name: "Lena Taylor" })).toExist(),
      Scene.expect(Scene.text("LT")).toExist(),
      Scene.expect(Scene.text("LT")).not.toHaveHandler("click")
    );
  });
});
