import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSelectBasicExample from "./main";

describe("shadcn Select Basic example", () => {
  test("updates selected theme feedback", () => {
    Scene.scene(
      {
        update: ShadcnSelectBasicExample.update,
        view: ShadcnSelectBasicExample.view,
      },
      Scene.with(ShadcnSelectBasicExample.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Theme" })).toExist(),
      Scene.expect(Scene.text("Selected theme: system")).toExist(),
      Scene.change(Scene.role("combobox", { name: "Theme" }), "dark"),
      Scene.expect(Scene.text("Selected theme: dark")).toExist()
    );
  });
});
