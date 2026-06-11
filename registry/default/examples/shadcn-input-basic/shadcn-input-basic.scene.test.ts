import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnInputBasicExample from "./main";

describe("Shadcn Input Basic example", () => {
  test("renders the origin email input and updates state", () => {
    Scene.scene(
      {
        update: ShadcnInputBasicExample.update,
        view: ShadcnInputBasicExample.view,
      },
      Scene.with(ShadcnInputBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "placeholder",
        "Email"
      ),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "type",
        "email"
      ),
      Scene.type(Scene.role("textbox", { name: "Email" }), "m@example.com"),
      Scene.expect(Scene.role("textbox", { name: "Email" })).toHaveAttr(
        "value",
        "m@example.com"
      )
    );
  });
});
