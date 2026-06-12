import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Radio Group Description example", () => {
  test("renders the origin description radio group demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("radiogroup", { name: "Layout density" })).toExist(),
      Scene.expect(Scene.role("radio", { name: "Default" })).toBeChecked(),
      Scene.expect(Scene.role("radio", { name: "Default" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.text("Standard spacing for most use cases.")).toExist(),
      Scene.expect(Scene.text("More space between elements.")).toExist(),
      Scene.expect(Scene.text("Minimal spacing for dense layouts.")).toExist()
    );
  });
});
