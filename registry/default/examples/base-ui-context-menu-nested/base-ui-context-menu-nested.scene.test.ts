import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ContextMenuNestedExample from "./main";

describe("Base UI Context Menu Nested example", () => {
  test("opens the Add to Playlist submenu and selects an item", () => {
    Scene.scene(
      {
        update: ContextMenuNestedExample.update,
        view: ContextMenuNestedExample.view,
      },
      Scene.with(ContextMenuNestedExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(
        Scene.role("menuitem", { name: "Add to Playlist" })
      ).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Add to Playlist" })),
      Scene.expect(Scene.role("menuitem", { name: "Get Up!" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Inside Out" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Night Beats" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "New playlist…" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "New playlist…" })),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.expect(Scene.text("Selected: New playlist…")).toExist()
    );
  });
});
