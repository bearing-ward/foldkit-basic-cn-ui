import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Resizable Handle example", () => {
  test("renders a visible inert handle", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("One")).toHaveAttr("data-size", "50"),
      Scene.expect(Scene.text("Two")).toHaveAttr("data-size", "50"),
      Scene.expect(Scene.text("||")).toExist(),
      Scene.expect(Scene.text("||")).not.toHaveHandler("pointerdown")
    );
  });
});
