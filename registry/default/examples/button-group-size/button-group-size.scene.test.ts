import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-size example", () => {
  test("renders the shadcn Button Group Size example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Small Button Group")).toExist(),
      Scene.expect(Scene.text("Default Button Group")).toExist(),
      Scene.expect(Scene.text("Large Button Group")).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Default Button Group" })
      ).not.toHaveHandler("click")
    );
  });
});
