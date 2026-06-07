import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("data-table-basic example", () => {
  test("renders the shadcn Data Table Basic example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("m@example.com")).not.toHaveHandler("click"),
      Scene.expect(Scene.text("pending")).toExist()
    );
  });
});
