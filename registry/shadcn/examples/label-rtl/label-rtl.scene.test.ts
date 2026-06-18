import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Label RTL example", () => {
  test("renders right-to-left checkbox label content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("checkbox", { name: "قبول الشروط والأحكام" })
      ).toExist(),
      Scene.expect(
        Scene.role("checkbox", { name: "قبول الشروط والأحكام" })
      ).not.toHaveHandler("click")
    );
  });
});
