import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupTextExample from "./main";

describe("Input Group Text example", () => {
  test("renders text addon", () => {
    Scene.scene(
      { update: InputGroupTextExample.update, view: InputGroupTextExample.view },
      Scene.with(InputGroupTextExample.init()[0]),
      Scene.expect(Scene.text("https://")).not.toHaveHandler("click"),
      Scene.expect(Scene.role("textbox", { name: "Website" })).toExist()
    );
  });
});
