import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as InputGroupIconExample from "./main";

describe("Input Group Icon example", () => {
  test("renders search icon and input", () => {
    Scene.scene(
      { update: InputGroupIconExample.update, view: InputGroupIconExample.view },
      Scene.with(InputGroupIconExample.init()[0]),
      Scene.expect(Scene.text("⌕")).toExist(),
      Scene.expect(Scene.role("textbox", { name: "Search" })).toHaveAttr(
        "placeholder",
        "Search..."
      ),
      Scene.expect(Scene.text("⌕")).not.toHaveHandler("click")
    );
  });
});
