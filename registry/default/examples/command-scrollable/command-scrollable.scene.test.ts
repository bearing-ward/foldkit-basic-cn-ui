import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Command Scrollable example", () => {
  test("renders a longer scrollable command list", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Pages")).toExist(),
      Scene.expect(Scene.role("option", { name: "Dashboard" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Support" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Dashboard" })).not.toHaveHandler(
        "click"
      )
    );
  });

  test("filters scrollable command content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "report"),
      Scene.expect(Scene.role("option", { name: "Reporting" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Dashboard" })).toBeAbsent()
    );
  });

  test("renders empty scrollable command results", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "zzz"),
      Scene.expect(Scene.text("No results found.")).toExist()
    );
  });
});
