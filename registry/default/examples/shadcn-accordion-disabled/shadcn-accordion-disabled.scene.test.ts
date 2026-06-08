import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Disabled example", () => {
  test("renders disabled items without click handlers", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Single sign-on" })
      ).toBeDisabled(),
      Scene.expect(
        Scene.role("button", { name: "Single sign-on" })
      ).not.toHaveHandler("click"),
      Scene.click(Scene.role("button", { name: "Retention policy" })),
      Scene.expect(
        Scene.role("button", { name: "Retention policy" })
      ).toHaveAttr("aria-expanded", "true")
    );
  });
});
