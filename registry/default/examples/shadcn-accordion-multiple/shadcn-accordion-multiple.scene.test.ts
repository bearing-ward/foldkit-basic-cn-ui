import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Accordion Multiple example", () => {
  test("keeps multiple panels open", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(
        Scene.role("button", { name: "Notification Settings" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.click(Scene.role("button", { name: "Privacy & Security" })),
      Scene.expect(
        Scene.role("button", { name: "Notification Settings" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.role("button", { name: "Privacy & Security" })
      ).toHaveAttr("aria-expanded", "true"),
      Scene.expect(
        Scene.text(
          "Control your privacy settings, manage two-factor authentication, and review active sessions."
        )
      ).toExist()
    );
  });
});
