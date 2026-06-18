import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as SeparatorBasicExample from "./main";

describe("Base UI Separator Basic example", () => {
  test("renders origin navigation links split by a vertical separator", () => {
    Scene.scene(
      {
        update: SeparatorBasicExample.update,
        view: SeparatorBasicExample.view,
      },
      Scene.with(SeparatorBasicExample.init()[0]),
      Scene.expect(Scene.role("link", { name: "Home" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Pricing" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Blog" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Support" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Log in" })).toExist(),
      Scene.expect(Scene.role("link", { name: "Sign up" })).toExist(),
      Scene.expect(Scene.text("Home")).not.toHaveHandler("click"),
      Scene.expect(Scene.role("button", { name: "Toggle label" })).not.toExist()
    );
  });
});
