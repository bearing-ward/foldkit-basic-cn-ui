import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("button-group-input-group example", () => {
  test("renders the shadcn Button Group Input Group example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("group", { name: "URL actions" })).toExist(),
      Scene.expect(Scene.text("https://")).toExist(),
      Scene.expect(Scene.role("button", { name: "Copy" })).toExist(),
      Scene.expect(
        Scene.role("group", { name: "URL actions" })
      ).not.toHaveHandler("click")
    );
  });
});
