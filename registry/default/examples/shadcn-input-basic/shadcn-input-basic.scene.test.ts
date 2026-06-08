import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnInputBasicExample from "./main";

describe("Shadcn Input Basic example", () => {
  test("updates typed feedback", () => {
    Scene.scene(
      {
        update: ShadcnInputBasicExample.update,
        view: ShadcnInputBasicExample.view,
      },
      Scene.with(ShadcnInputBasicExample.init()[0]),
      Scene.expect(Scene.role("textbox", { name: "Name" })).toExist(),
      Scene.expect(Scene.text("Current value: empty")).toExist(),
      Scene.type(Scene.role("textbox", { name: "Name" }), "Ada Lovelace"),
      Scene.expect(Scene.text("Current value: Ada Lovelace")).toExist()
    );
  });
});
