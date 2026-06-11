import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSelectBasicExample from "./main";

describe("shadcn Select Basic example", () => {
  test("matches the shadcn select fruit demo", () => {
    Scene.scene(
      {
        update: ShadcnSelectBasicExample.update,
        view: ShadcnSelectBasicExample.view,
      },
      Scene.with(ShadcnSelectBasicExample.init()[0]),
      Scene.expect(Scene.role("combobox")).toHaveValue(""),
      Scene.expect(Scene.text("Select a fruit")).toExist(),
      Scene.expect(Scene.text("Apple")).toExist(),
      Scene.expect(Scene.text("Banana")).toExist(),
      Scene.expect(Scene.text("Blueberry")).toExist(),
      Scene.expect(Scene.text("Grapes")).toExist(),
      Scene.expect(Scene.text("Pineapple")).toExist(),
      Scene.change(Scene.role("combobox"), "banana"),
      Scene.expect(Scene.role("combobox")).toHaveValue("banana"),
      Scene.expect(Scene.text("Selected theme: banana")).not.toExist()
    );
  });
});
