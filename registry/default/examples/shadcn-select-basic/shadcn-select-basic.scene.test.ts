import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnSelectBasicExample from "./main";

describe("shadcn Select Basic example", () => {
  test("opens the composed fruit select and selects an item", () => {
    Scene.scene(
      {
        update: ShadcnSelectBasicExample.update,
        view: ShadcnSelectBasicExample.view,
      },
      Scene.with(ShadcnSelectBasicExample.init()[0]),
      Scene.expect(Scene.role("combobox", { name: "Fruit" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.text("Select a fruit")).toExist(),
      Scene.click(Scene.role("combobox", { name: "Fruit" })),
      Scene.expect(Scene.role("listbox")).toExist(),
      Scene.expect(Scene.text("Fruits")).toExist(),
      Scene.expect(Scene.role("option", { name: "Apple" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Banana" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Blueberry" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Grapes" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Pineapple" })).toExist(),
      Scene.click(Scene.role("option", { name: "Banana" })),
      Scene.expect(Scene.role("combobox", { name: "Fruit" })).toHaveAttr(
        "aria-expanded",
        "false"
      ),
      Scene.expect(Scene.text("Banana")).toExist()
    );
  });

  test("covers shadcn select variants", () => {
    Scene.scene(
      {
        update: ShadcnSelectBasicExample.update,
        view: ShadcnSelectBasicExample.view,
      },
      Scene.with(ShadcnSelectBasicExample.init()[0]),
      Scene.expect(Scene.text("Groups")).toExist(),
      Scene.expect(Scene.text("North America")).toExist(),
      Scene.expect(Scene.text("Europe")).toExist(),
      Scene.expect(Scene.text("Scrollable")).toExist(),
      Scene.expect(Scene.text("Pacific Standard Time")).toExist(),
      Scene.expect(Scene.text("Disabled")).toExist(),
      Scene.expect(
        Scene.role("combobox", { name: "Disabled fruit" })
      ).toBeDisabled(),
      Scene.expect(Scene.text("Invalid")).toExist(),
      Scene.expect(Scene.role("combobox", { name: "Invalid fruit" })).toHaveAttr(
        "aria-invalid",
        "true"
      ),
      Scene.expect(Scene.text("RTL")).toExist(),
      Scene.expect(Scene.text("Align Item With Trigger")).toExist()
    );
  });
});
