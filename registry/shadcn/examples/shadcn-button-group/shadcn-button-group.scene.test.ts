import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Button Group example", () => {
  test("renders the shadcn Button Group example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.role("group", { name: "Report actions" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Archive Report" })).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Archive Report" })
      ).not.toHaveHandler("click"),
      Scene.expect(Scene.role("button", { name: "Snooze" })).toExist(),
      Scene.expect(Scene.role("button", { name: "Snooze" })).not.toHaveHandler(
        "click"
      )
    );
  });
});
