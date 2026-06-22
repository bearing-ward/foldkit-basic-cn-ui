import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn button rtl example", () => {
  test("renders the origin visual button as inert", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "زر حذف" })).toExist(),
      Scene.expect(Scene.role("button", { name: "زر حذف" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
