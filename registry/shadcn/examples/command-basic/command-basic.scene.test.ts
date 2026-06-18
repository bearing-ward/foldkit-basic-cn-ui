import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as CommandBasicExample from "./main";

describe("Command Basic example", () => {
  test("opens the origin command menu and filters suggestion items", () => {
    Scene.scene(
      {
        update: CommandBasicExample.update,
        view: CommandBasicExample.view,
      },
      Scene.with(CommandBasicExample.init()[0]),
      Scene.expect(Scene.role("button", { name: "Open Menu" })).toExist(),
      Scene.expect(
        Scene.role("dialog", { name: "Command Palette" })
      ).toBeAbsent(),
      Scene.click(Scene.role("button", { name: "Open Menu" })),
      Scene.expect(Scene.role("dialog", { name: "Command Palette" })).toExist(),
      Scene.expect(Scene.text("Search for a command to run...")).toExist(),
      Scene.expect(
        Scene.role("combobox", { name: "Command search" })
      ).toExist(),
      Scene.expect(Scene.text("Suggestions")).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Search Emoji" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Calculator" })).toExist(),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "emoji"),
      Scene.expect(Scene.role("option", { name: "Search Emoji" })).toExist(),
      Scene.expect(Scene.role("option", { name: "Calendar" })).toBeAbsent(),
      Scene.type(Scene.role("combobox", { name: "Command search" }), "zzz"),
      Scene.expect(Scene.text("No results found.")).toExist()
    );
  });
});
