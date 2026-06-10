import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ToggleBasicExample from "./main";

describe("Base UI Toggle Basic example", () => {
  test("matches the Base UI toggle hero pressed behavior", () => {
    Scene.scene(
      {
        update: ToggleBasicExample.update,
        view: ToggleBasicExample.view,
      },
      Scene.with(ToggleBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "false"
      ),
      Scene.expect(Scene.text("Not favorited")).toExist(),
      Scene.click(Scene.role("button", { name: "Favorite" })),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "aria-pressed",
        "true"
      ),
      Scene.expect(Scene.role("button", { name: "Favorite" })).toHaveAttr(
        "data-pressed",
        ""
      ),
      Scene.expect(Scene.text("Added to favorites")).toExist()
    );
  });
});
