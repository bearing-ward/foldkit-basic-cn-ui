import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnInputDisabledExample from "./main";

describe("Shadcn Input Disabled example", () => {
  test("renders the origin disabled email input", () => {
    Scene.scene(
      {
        update: ShadcnInputDisabledExample.update,
        view: ShadcnInputDisabledExample.view,
      },
      Scene.with(ShadcnInputDisabledExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "placeholder",
        "Email"
      ),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "disabled",
        "true"
      )
    );
  });
});
