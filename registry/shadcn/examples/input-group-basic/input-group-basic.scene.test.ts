import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupBasicExample from "./main";

describe("Input Group Basic example", () => {
  test("renders an input with an inert addon", () => {
    Scene.scene(
      {
        update: InputGroupBasicExample.update,
        view: InputGroupBasicExample.view,
      },
      Scene.with(InputGroupBasicExample.init()[0]),
      Scene.expect(Scene.text("https://")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Website" })).toExist(),
      Scene.expect(Scene.text("https://")).not.toHaveHandler("click")
    );
  });
});
