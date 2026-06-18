import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CollapsibleBasicExample from "./main";

describe("Collapsible Basic example", () => {
  test("matches the Base UI default Recovery keys example", () => {
    Scene.scene(
      {
        update: CollapsibleBasicExample.update,
        view: CollapsibleBasicExample.view,
      },
      Scene.with(CollapsibleBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.text("alien-bean-pasta")).not.toExist(),
      Scene.click(Scene.role("button", { name: "Recovery keys" })),
      Scene.expect(Scene.role("button", { name: "Recovery keys" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(Scene.text("alien-bean-pasta")).toExist(),
      Scene.expect(Scene.text("wild-irish-burrito")).toExist(),
      Scene.expect(Scene.text("horse-battery-staple")).toExist()
    );
  });
});
