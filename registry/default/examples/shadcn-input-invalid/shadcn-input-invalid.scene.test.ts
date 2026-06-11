import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnInputInvalidExample from "./main";

describe("Shadcn Input Invalid example", () => {
  test("renders invalid email state", () => {
    Scene.scene(
      {
        update: ShadcnInputInvalidExample.update,
        view: ShadcnInputInvalidExample.view,
      },
      Scene.with(ShadcnInputInvalidExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.role("textbox", { name: "Email" })).not.toHaveAttr(
        "disabled",
        "true"
      ),
      Scene.expect(Scene.text("Enter a valid email address.")).toExist()
    );
  });
});
