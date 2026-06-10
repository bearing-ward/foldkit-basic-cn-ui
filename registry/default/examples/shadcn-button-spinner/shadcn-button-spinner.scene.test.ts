import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn button spinner example", () => {
  test("renders the origin visual button as inert", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Generating" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Downloading" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Generating" })
      ).not.toHaveHandler("click"),
      Scene.expect(
        Scene.role("button", { name: "Downloading" })
      ).not.toHaveHandler("click")
    );
  });
});
