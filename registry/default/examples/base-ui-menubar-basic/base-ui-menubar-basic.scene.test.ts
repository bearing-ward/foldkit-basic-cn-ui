import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as MenubarBasicExample from "./main";

describe("Base UI Menubar Basic example", () => {
  test("matches the controlled Base UI default menubar preview", () => {
    Scene.scene(
      {
        update: MenubarBasicExample.update,
        view: MenubarBasicExample.view,
      },
      Scene.with(MenubarBasicExample.init()[0]),
      Scene.expect(Scene.role("menubar")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "File" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Edit" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "View" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Help" })).toExist(),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("menuitem", { name: "File" })),
      Scene.expect(Scene.role("menuitem", { name: "New" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Open" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Save" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Export" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Print" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Edit" })),
      Scene.expect(Scene.role("menuitem", { name: "Cut" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Copy" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Paste" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "View" })),
      Scene.expect(Scene.role("menuitem", { name: "Zoom In" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Zoom Out" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Help" })),
      Scene.expect(Scene.role("menuitem", { name: "Documentation" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "About" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "About" })),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.expect(Scene.text("Selected: About")).toExist()
    );
  });
});
