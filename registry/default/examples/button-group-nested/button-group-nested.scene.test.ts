import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-nested example", () => {
  test("renders the shadcn Button Group Nested example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Nested audio actions" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "Voice controls" })).toExist(),
      Scene.expect(Scene.role("group", { name: "Text controls" })).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Nested audio actions" })
      ).not.toHaveHandler("click")
    );
  });
});
