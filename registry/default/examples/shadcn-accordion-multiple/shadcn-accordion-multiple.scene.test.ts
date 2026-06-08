import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Multiple example", () => {
  test("keeps multiple panels open", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Security alerts" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.click(Scene.role("button", { name: "Member invites" })),
      Scene.expect(
        Scene.role("button", { name: "Security alerts" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(Scene.role("button", { name: "Member invites" })).toHaveAttr(
        "aria-expanded",
        "true"
      ),
      Scene.expect(
        Scene.text("Invite approvals, role changes, and pending seat requests.")
      ).toExist()
    );
  });
});
