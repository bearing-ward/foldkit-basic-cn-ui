import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyBasicExample from "./main";

describe("Empty Basic example", () => {
  test("renders and updates the parent-owned example state", () => {
    Scene.scene(
      { update: EmptyBasicExample.update, view: EmptyBasicExample.view },
      Scene.with(EmptyBasicExample.init()[0]),
      Scene.expect(Scene.text("No projects yet")).toExist(),
      Scene.click(Scene.role("button", { name: "Show search state" })),
      Scene.expect(Scene.text("No results found")).toExist()
    );
  });
});
