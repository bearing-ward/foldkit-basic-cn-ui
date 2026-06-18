import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Shadcn Checkbox Group example", () => {
  test("renders and toggles the origin checkbox list", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Show these items on the desktop:")).toExist(),
      Scene.expect(
        Scene.text("Select the items you want to show on the desktop.")
      ).toExist(),
      Scene.expect(Scene.role("checkbox", { name: "External disks" })).toHaveAttr(
        "aria-checked",
        "true"
      ),
      Scene.click(Scene.role("checkbox", { name: "Hard disks" })),
      Scene.expect(Scene.role("checkbox", { name: "Hard disks" })).toHaveAttr(
        "aria-checked",
        "true"
      )
    );
  });
});
