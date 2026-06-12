import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnContextMenuBasicExample from "./main";

describe("Shadcn Context Menu Basic example", () => {
  test("covers the current shadcn context menu examples", () => {
    Scene.scene(
      {
        update: ShadcnContextMenuBasicExample.update,
        view: ShadcnContextMenuBasicExample.view,
      },
      Scene.with(ShadcnContextMenuBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Profile" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Billing" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Team" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Subscription" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "More Tools >" })).toExist(),
      Scene.expect(Scene.text("⌘[")).toExist(),
      Scene.expect(Scene.text("Groups")).toExist(),
      Scene.expect(Scene.text("Copy")).toExist(),
      Scene.expect(Scene.text("Show Bookmarks Bar")).toExist(),
      Scene.expect(Scene.text("Panel position: Bottom")).toExist(),
      Scene.expect(Scene.text("Delete")).toExist(),
      Scene.expect(Scene.text("انقر بزر الماوس الأيمن هنا")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Share" })).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Share" })),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.expect(Scene.text("Selected: Share")).toExist()
    );
  });

  test("closes from the backdrop without selecting an item", () => {
    Scene.scene(
      {
        update: ShadcnContextMenuBasicExample.update,
        view: ShadcnContextMenuBasicExample.view,
      },
      Scene.with(ShadcnContextMenuBasicExample.init()[0]),
      Scene.click(Scene.role("button", { name: "Right click here" })),
      Scene.expect(Scene.role("menu")).toExist(),
      Scene.click(Scene.role("button", { name: "Close context menu" })),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.expect(Scene.text("Selected:")).not.toExist()
    );
  });
});
