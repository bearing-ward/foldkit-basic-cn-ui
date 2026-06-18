import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupButtonExample from "./main";

describe("Input Group Button example", () => {
  test("renders button addon", () => {
    Scene.scene(
      { update: InputGroupButtonExample.update, view: InputGroupButtonExample.view },
      Scene.with(InputGroupButtonExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Send" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
