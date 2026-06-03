import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ButtonBasicExample from "./main";

describe("Button Basic example", () => {
  test("increments click feedback", () => {
    Scene.scene(
      { update: ButtonBasicExample.update, view: ButtonBasicExample.view },
      Scene.with(ButtonBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Click me" })).toExist(),
      Scene.expect(Scene.text("Clicked 0 times")).toExist(),
      Scene.click(Scene.role("button", { name: "Click me" })),
      Scene.expect(Scene.text("Clicked 1 time")).toExist()
    );
  });
});
