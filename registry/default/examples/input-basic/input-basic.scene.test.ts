import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputBasicExample from "./main";

describe("Input Basic example", () => {
  test("updates typed feedback", () => {
    Scene.scene(
      { update: InputBasicExample.update, view: InputBasicExample.view },
      Scene.with(InputBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toExist(),
      Scene.expect(Scene.text("Current value: empty")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada Lovelace"),
      Scene.expect(Scene.text("Current value: Ada Lovelace")).toExist()
    );
  });
});
