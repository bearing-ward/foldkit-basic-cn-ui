import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Range example", () => {
  test("renders the origin range calendar layout as an inert preview", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("January 2026")).toExist(),
      Scene.expect(Scene.text("February 2026")).toExist(),
      Scene.expect(Scene.role("button", { name: "15" })).toBeDisabled()
    );
  });
});
