import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("item-rtl example", () => {
  test("renders the shadcn Item RTL example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("عنصر أساسي")).not.toHaveHandler("click")
    );
  });
});
