import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Checkbox Disabled example", () => {
  test("renders the origin disabled checkbox demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "Enable notifications" })
      ).toHaveAttr("disabled", "true")
    );
  });
});
