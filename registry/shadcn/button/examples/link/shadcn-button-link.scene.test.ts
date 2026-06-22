import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn button link example", () => {
  test("renders the origin visual button as inert", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("button", { name: "Link" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Link" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
