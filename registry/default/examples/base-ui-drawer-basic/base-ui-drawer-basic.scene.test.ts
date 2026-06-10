import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DrawerBasicExample from "./main";

describe("Base UI Drawer Basic example", () => {
  test("matches the Base UI default side drawer example", () => {
    Scene.scene(
      {
        update: DrawerBasicExample.update,
        view: DrawerBasicExample.view,
      },
      Scene.with(DrawerBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open drawer" })),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).toExist(),
      Scene.expect(
        Scene.text(
          "This is a drawer that slides in from the side. You can swipe to dismiss it."
        )
      ).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.expect(Scene.role("dialog", { name: "Drawer" })).not.toExist()
    );
  });
});
