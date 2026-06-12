import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("shadcn Radio Group Invalid example", () => {
  test("renders the origin invalid radio group demo", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Notification Preferences")).toExist(),
      Scene.expect(
        Scene.text("Choose how you want to receive notifications.")
      ).toExist(),
      Scene.expect(Scene.role("radio", { name: "Email only" })).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.role("radio", { name: "Email only" })).not.toHaveHandler(
        "click"
      ),
      Scene.expect(Scene.role("radio", { name: "Both Email & SMS" })).toExist()
    );
  });
});
