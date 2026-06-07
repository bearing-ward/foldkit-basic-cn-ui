import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ContextMenuBasicExample from "./main";

describe("Context Menu Basic example", () => {
  test("matches the Base UI default context menu content", () => {
    Scene.scene(
      {
        update: ContextMenuBasicExample.update,
        view: ContextMenuBasicExample.view,
      },
      Scene.with(ContextMenuBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(
        Scene.role("menuitem", { name: "Add to Library" })
      ).toExist(),
      Scene.expect(
        Scene.role("menuitem", { name: "Add to Playlist" })
      ).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Play Next" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Play Last" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Favorite" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Share" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Share" })),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.expect(Scene.text("Selected: Share")).toExist()
    );
  });

  test("closes from the backdrop without selecting an item", () => {
    Scene.scene(
      {
        update: ContextMenuBasicExample.update,
        view: ContextMenuBasicExample.view,
      },
      Scene.with(ContextMenuBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.click(Scene.role("button", { name: "Close context menu" })),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.expect(Scene.text("Selected:")).not.toExist()
    );
  });
});
