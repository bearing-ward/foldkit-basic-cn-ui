import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CommandBasicExample from "./main";

describe("Command Basic example", () => {
  test("filters and selects command items", () => {
    Scene.scene(
      {
        update: CommandBasicExample.update,
        view: CommandBasicExample.view,
      },
      Scene.with(CommandBasicExample.init()[0]),
      Scene.expect(
        Scene.role("combobox", { name: "Command search" })
      ).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toExist(),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "bill"),
      Scene.expect(Scene.text("Billing")).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toBeAbsent(),
      Scene.click(Scene.text("Billing")),
      Scene.expect(Scene.text("Selected Billing")).toExist(),
      Scene.expect(
        Scene.role("combobox", { name: "Command search" })
      ).toHaveValue("Billing")
    );
  });
});
