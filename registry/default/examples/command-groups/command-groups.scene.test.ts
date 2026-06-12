import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Command Groups example", () => {
  test("renders grouped command content with a separator", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Suggestions")).toExist(),
      Scene.expect(Scene.text("Settings")).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Profile" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).not.toHaveHandler(
        "click"
      )
    );
  });

  test("filters grouped command content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "bill"),
      Scene.expect(Scene.role("option", { name: "Billing" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toBeAbsent()
    );
  });

  test("renders empty grouped command results", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "zzz"),
      Scene.expect(Scene.text("No results found.")).toExist()
    );
  });
});
