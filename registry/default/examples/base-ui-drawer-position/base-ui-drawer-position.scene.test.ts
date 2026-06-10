import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as DrawerPositionExample from "./main";

describe("Base UI Drawer Position example", () => {
  test("matches the Base UI bottom drawer content", () => {
    Scene.scene(
      {
        update: DrawerPositionExample.update,
        view: DrawerPositionExample.view,
      },
      Scene.with(DrawerPositionExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Open bottom drawer" })),
      Scene.expect(Scene.role("dialog", { name: "Notifications" })).toExist(),
      Scene.expect(Scene.text("You are all caught up. Good job!")).toExist(),
      Scene.click(Scene.role("button", { name: "Close" })),
      Scene.expect(
        Scene.role("dialog", { name: "Notifications" })
      ).not.toExist()
    );
  });
});
