import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as Example from "./main";

describe("Command Shortcuts example", () => {
  test("renders shortcut rows from the origin command example", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.expect(Scene.text("Profile")).toExist(),
      Scene.expect(Scene.text("Billing")).toExist(),
      Scene.expect(Scene.text("Settings")).toExist(),
      Scene.expect(Scene.text("⌘P")).toExist(),
      Scene.expect(Scene.text("⌘B")).toExist(),
      Scene.expect(Scene.text("⌘S")).toExist(),
      Scene.expect(Scene.text("Profile")).not.toHaveHandler("click")
    );
  });

  test("filters shortcut command content", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "bill"),
      Scene.expect(Scene.text("Billing")).toExist(),
      Scene.expect(Scene.text("⌘B")).toExist(),
      Scene.expect(Scene.role("option", { name: "Profile" })).toBeAbsent()
    );
  });

  test("renders empty shortcut command results", () => {
    Scene.scene(
      { update: Example.update, view: Example.view },
      Scene.with(Example.init()[0]),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "zzz"),
      Scene.expect(Scene.text("No results found.")).toExist()
    );
  });
});
