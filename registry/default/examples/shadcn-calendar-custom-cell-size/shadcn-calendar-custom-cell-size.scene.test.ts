import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Calendar Custom Cell Size example", () => {
  test("renders the origin custom cell size price layout with local state", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("December 2026")).toExist(),
      Scene.expect(Scene.text("$100")).toExist(),
      Scene.expect(Scene.text("$120")).toExist(),
      Scene.expect(Scene.text("Selected date: 2026-12-16")).toExist(),
      Scene.click(Scene.role("button", { name: "5 $120" })),
      Scene.expect(Scene.text("Selected date: 2026-12-05")).toExist()
    );
  });
});
