import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-nested example", () => {
  test("renders the shadcn Button Group Nested example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Nested editor controls" })
      ).toExist(),
      Scene.expect(Scene.role("group", { name: "Text alignment" })).toExist(),
      Scene.expect(Scene.role("group", { name: "Text formatting" })).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Nested editor controls" })
      ).not.toHaveHandler("click")
    );
  });
});
