import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DisclosureDisabledExample from "./main";

describe("Disclosure Disabled example", () => {
  test("renders disabled trigger without opening content", () => {
    Scene.scene(
      {
        update: DisclosureDisabledExample.update,
        view: DisclosureDisabledExample.view,
      },
      Scene.with(DisclosureDisabledExample.init()[0]),
      Scene.expect(Scene.text("Disclosure is locked.")).toExist(),
      Scene.expect(
        Scene.role("button", { name: "Locked disclosure" })
      ).toHaveAttr("aria-disabled", "true"),
      Scene.expect(
        Scene.text(
          "This content remains unavailable while the disclosure is disabled."
        )
      ).not.toExist(),
      Scene.expect(Scene.text("Disclosure is locked.")).toExist()
    );
  });
});
