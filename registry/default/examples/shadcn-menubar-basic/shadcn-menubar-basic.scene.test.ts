import { Scene } from "foldkit";
import { describe, test } from "vitest";

import * as ShadcnMenubarBasicExample from "./main";

describe("Shadcn Menubar Basic example", () => {
  test("matches the shadcn default menubar preview", () => {
    Scene.scene(
      {
        update: ShadcnMenubarBasicExample.update,
        view: ShadcnMenubarBasicExample.view,
      },
      Scene.with(ShadcnMenubarBasicExample.init()[0]),
      Scene.expect(Scene.role("menubar")).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "File" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Edit" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "View" })).toExist(),
      Scene.expect(Scene.role("menuitem", { name: "Profiles" })).toExist(),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.click(Scene.role("menuitem", { name: "File" })),
      Scene.expect(Scene.text("New Tab")).toExist(),
      Scene.expect(Scene.text("⌘T")).toExist(),
      Scene.expect(Scene.text("New Window")).toExist(),
      Scene.expect(Scene.text("⌘N")).toExist(),
      Scene.expect(Scene.text("New Incognito Window")).toExist(),
      Scene.expect(Scene.text("Share")).toExist(),
      Scene.expect(Scene.text("Print...")).toExist(),
      Scene.expect(Scene.text("⌘P")).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Edit" })),
      Scene.expect(Scene.text("Undo")).toExist(),
      Scene.expect(Scene.text("⌘Z")).toExist(),
      Scene.expect(Scene.text("Redo")).toExist(),
      Scene.expect(Scene.text("⇧⌘Z")).toExist(),
      Scene.expect(Scene.text("Find")).toExist(),
      Scene.expect(Scene.text("Cut")).toExist(),
      Scene.expect(Scene.text("Copy")).toExist(),
      Scene.expect(Scene.text("Paste")).toExist(),
      Scene.click(Scene.role("menuitem", { name: "View" })),
      Scene.expect(Scene.text("Always Show Bookmarks Bar")).toExist(),
      Scene.expect(Scene.text("Always Show Full URLs")).toExist(),
      Scene.expect(Scene.text("Reload")).toExist(),
      Scene.expect(Scene.text("⌘R")).toExist(),
      Scene.expect(Scene.text("Force Reload")).toExist(),
      Scene.expect(Scene.text("⇧⌘R")).toExist(),
      Scene.expect(Scene.text("Toggle Fullscreen")).toExist(),
      Scene.expect(Scene.text("Hide Sidebar")).toExist(),
      Scene.click(Scene.role("menuitem", { name: "Profiles" })),
      Scene.expect(Scene.text("Andy")).toExist(),
      Scene.expect(Scene.text("Benoit")).toExist(),
      Scene.expect(Scene.text("Luis")).toExist(),
      Scene.expect(Scene.text("Edit...")).toExist(),
      Scene.expect(Scene.text("Add Profile...")).toExist(),
      Scene.click(Scene.text("Benoit")),
      Scene.expect(Scene.role("menu")).not.toExist(),
      Scene.expect(Scene.text("Selected: Benoit")).toExist()
    );
  });
});
