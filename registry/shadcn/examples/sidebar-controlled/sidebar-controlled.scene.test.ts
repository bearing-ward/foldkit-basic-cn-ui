import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Sidebar controlled example", () => {
  test("updates parent-owned state from trigger and input messages", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Expanded")).toHaveText("Expanded"),
      Scene.click(Scene.role("button", { name: "Toggle Sidebar" })),
      Scene.expect(Scene.text("Collapsed")).toHaveText("Collapsed"),
      Scene.type(
        Scene.role("textbox", { name: "Search documentation" }),
        "invoices"
      ),
      Scene.expect(Scene.text("Searching for invoices")).toHaveText(
        "Searching for invoices"
      )
    );
  });
});
