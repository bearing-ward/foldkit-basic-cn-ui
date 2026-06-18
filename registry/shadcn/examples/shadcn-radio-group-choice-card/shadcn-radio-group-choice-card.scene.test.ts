import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Radio Group Choice Card example", () => {
  test("renders the origin card-style selection demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("radiogroup", { name: "Plan" })).toExist(),
      Scene.expect(Scene.role("radio", { name: "Plus" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "Plus" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.role("radio", { name: "Pro" })).not.toBeChecked(),
      Scene.expect(Scene.text("For large teams and enterprises.")).toExist()
    );
  });
});
