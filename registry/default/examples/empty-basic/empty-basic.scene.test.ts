import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as EmptyBasicExample from "./main";

describe("Empty Basic example", () => {
  test("matches the upstream empty basic example content", () => {
    Scene.scene(
      { update: EmptyBasicExample.update, view: EmptyBasicExample.view },
      Scene.with(EmptyBasicExample.init()[0]),
      Scene.expect(Scene.text("No Projects Yet")).toExist(),
      Scene.expect(
        Scene.text(
          "You haven't created any projects yet. Get started by creating your first project."
        )
      ).toExist(),
      Scene.expect(Scene.role("button", { name: "Create Project" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Import Project" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Learn More" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Create Project" })
      ).not.toHaveHandler("click"),
      Scene.expect(
        Scene.role("button", { name: "Import Project" })
      ).not.toHaveHandler("click"),
      Scene.expect(
        Scene.role("button", { name: "Learn More" })
      ).not.toHaveHandler("click"),
      Scene.expect(Scene.text("No results found")).toBeAbsent(),
      Scene.expect(Scene.text("Show search state")).toBeAbsent()
    );
  });
});
