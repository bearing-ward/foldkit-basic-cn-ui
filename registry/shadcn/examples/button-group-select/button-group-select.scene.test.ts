import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-select example", () => {
  test("renders the shadcn Button Group Select example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("group", { name: "Currency selector actions" })
      ).toExist(),
      Scene.expect(Scene.text("$")).toExist(),
      Scene.expect(Scene.role("button", { name: "Submit" })).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Currency selector actions" })
      ).not.toHaveHandler("click")
    );
  });
});
