import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupSpinnerExample from "./main";

describe("Input Group Spinner example", () => {
  test("renders loading status addon", () => {
    Scene.scene(
      { update: InputGroupSpinnerExample.update, view: InputGroupSpinnerExample.view },
      Scene.with(InputGroupSpinnerExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toExist(),
      Scene.expect(Scene.role("status", { name: "Loading" })).toExist(),
      Scene.expect(Scene.role("status", { name: "Loading" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
