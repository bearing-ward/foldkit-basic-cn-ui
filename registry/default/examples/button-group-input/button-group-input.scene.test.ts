import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-input example", () => {
  test("renders the shadcn Button Group Input example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("group", { name: "Search actions" })).toExist(),
      Scene.expect(Scene.placeholder("Search documentation...")).toExist(),
      Scene.expect(Scene.role("button", { name: "Search" })).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Search actions" })
      ).not.toHaveHandler("click")
    );
  });
});
