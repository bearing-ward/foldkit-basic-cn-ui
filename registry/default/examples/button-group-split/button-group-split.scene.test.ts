import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-split example", () => {
  test("renders the shadcn Button Group Split example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Save" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "More save actions" })
      ).toExist(),
      Scene.expect(
        Scene.role("group", { name: "Split save actions" })
      ).not.toHaveHandler("click")
    );
  });
});
