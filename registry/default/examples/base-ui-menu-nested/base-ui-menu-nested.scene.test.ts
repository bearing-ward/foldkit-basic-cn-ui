import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as MenuNestedExample from "./main";

describe("Base UI Menu Nested example", () => {
  test("opens the origin Add to Playlist submenu", () => {
    Scene.scene(
      {
        update: MenuNestedExample.update,
        view: MenuNestedExample.view,
      },
      Scene.with(MenuNestedExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Format" })),
      Scene.expect(Scene.text("Add to Playlist")).toExist(),
      Scene.click(Scene.text("Add to Playlist")),
      Scene.expect(Scene.text("Get Up!")).toExist(),
      Scene.expect(Scene.text("Inside Out")).toExist(),
      Scene.expect(Scene.text("Nightcall")).toExist(),
      Scene.click(Scene.text("Nightcall")),
      Scene.expect(Scene.text("Selected: Nightcall")).toExist()
    );
  });
});
